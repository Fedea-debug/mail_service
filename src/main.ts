import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as yaml from 'yaml';
import * as fs from 'fs';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';

function createSwaggerDocument(
  pApp: INestApplication,
  pConfig,
  pName: string,
  pOptions: SwaggerDocumentOptions,
) {
  const document = SwaggerModule.createDocument(pApp, pConfig, pOptions);
  const yamlString = yaml.stringify(document, {});
  try {
    fs.writeFileSync('./' + pName + '.yaml', yamlString);
  } catch { }
  try {
    const jsonxml = require('jsontoxml');
    const xml = jsonxml(JSON.stringify(document));
    fs.writeFileSync('./' + pName + '.xml', xml);
  } catch { }
  SwaggerModule.setup(pName, pApp, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform query payloads to match DTO classes
      whitelist: true, // Strip out properties not expected by the DTO
      forbidNonWhitelisted: false, // Throw errors if non-whitelisted values are provided
      transformOptions: {
        enableImplicitConversion: true, // Allow implicit conversion based on the decorators
      },
    }),
  );
  const preconfig = new DocumentBuilder()
    .setTitle('CRM Documentation')
    .setDescription('API description')
    .setVersion('1.0');

  preconfig.addSecurity('JWT-Auth', {
    type: 'http',
    scheme: 'bearer',
    name: 'BearerAuth',
    in: 'header',
    bearerFormat: 'JWT',
    description: 'Jwt token',
  });

  const config = preconfig.build();

  app.use(
    bodyParser.json({
      verify: function (req, res, buf, encoding) {
        req['rawBody'] = buf;
        req['rawBodyText'] = buf.toString();
      },
    }),
  );
  createSwaggerDocument(app, config, 'api', {});
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  try {
    await app.listen(port || 8080, '0.0.0.0');
  } catch (e) {
    console.log(e);
  }
}
bootstrap();
