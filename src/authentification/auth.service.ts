import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { LoginBodyDto } from './dto/body/login-body.dto';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');
import * as crypto from 'crypto';
import { RegisterBodyDto } from './dto/body/register-body.dto';
import { HelperService } from 'src/common/helper/helper.service';
import { PostgresService } from 'src/providers/database/postgres/postgres.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private helperService: HelperService,
        private readonly postgresService: PostgresService
    ) { }

    async validateUser(loginDto: LoginBodyDto) {
        const query = `SELECT * FROM ${process.env.POSTGRES_SCHEMA}.t_users WHERE email = $1 AND deleted IS NULL LIMIT 1`;
        const values = [loginDto.email];
        const getUser = await this.postgresService.executeQuery(query, values)
        const user = getUser.rows[0]

        if (user) {
            const isCorrectPassword: boolean = await this.checkUserPassword(
                loginDto.password,
                user.password,
            );
            if (isCorrectPassword) {
                if (user.activated == null)
                    throw new ForbiddenException({
                        message:
                            'Your account email has not been verified. Check your email or reset your password',
                        code: 'email_not_verified',
                    });

                const { email, id, password, ...rest } = user;
                const result = {
                    email: email,
                    userId: id,
                };
                return result;
            }
        }
        return null;
    }

    async checkUserPassword(
        receivedPassword: string,
        hashUserPassword: string,
    ): Promise<boolean> {
        return await bcrypt.compare(receivedPassword, hashUserPassword);
    }

    async passwordToHash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async login(loginDto: LoginBodyDto) {
        const isValidUser = await this.validateUser(loginDto);
        if (!isValidUser)
            throw new ForbiddenException({ message: 'Wrong email or password' });
        const access_token: string = this.generateJwtToken(isValidUser);

        return {
            access_token: access_token,
            ttl: parseInt(process.env.JWT_TTL),
        };
    }

    generateJwtToken(userData: { userId: number; email: string }) {
        const randomString = crypto.randomBytes(8).toString('hex');
        const payload = {
            userId: userData.userId,
            email: userData.email,
            type: randomString,
        };
        return this.jwtService.sign(payload);
    }

    generateRandomSHA1(): string {
        const randomString = crypto.randomBytes(8).toString('hex');
        const hash = crypto.createHash('sha1').update(randomString).digest('hex');
        return hash;
    }

    async registerNewUser(registerDto: RegisterBodyDto) {
        try {
            const activationCode = this.generateRandomSHA1();
            const hashPassword = await this.passwordToHash(registerDto.password);

            const query = `
            INSERT INTO ${process.env.POSTGRES_SCHEMA}.t_users (email, password, activation_code, activation_code_expiry)
            VALUES ($1, $2, $3, NOW() + INTERVAL '24 hours');
            `
            const values = [registerDto.email, hashPassword, activationCode]

            await this.postgresService.executeQuery(query, values)
            return {
                success: true,
                activationCode: activationCode // test parameter - in real world app need to send email with confirmation link
            };
        } catch (error) {
            if (error.code == 23505) {
                throw new ForbiddenException({
                    code: 'email_exist',
                    message: 'This email is registered in the system',
                });
            } else {
                throw error;
            }
        }
    }

    async activateUser(activationCode: string) {
        if (/^[a-fA-F0-9]{40}$/.test(activationCode)) {
            const query = `
            UPDATE ${process.env.POSTGRES_SCHEMA}.t_users
                SET activation_code = null, activation_code_expiry = null, activated = NOW()
                WHERE activation_code = $1
                    AND activation_code_expiry > NOW()
                    AND activated IS NULL
            `
            const values = [activationCode]

            const activatedUser = await this.postgresService.executeQuery(query, values)

            if (activatedUser.rowCount == 1) {
                return {
                    success: true,
                };
            }
        }

        throw new ForbiddenException({
            message: 'Invalid code or already exhausted',
        });
    }
}
