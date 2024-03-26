import { SetMetadata } from '@nestjs/common';

export const IS_CHECK_AUTH_KEY = 'isCheckAuth';
export const IsCheckAuth = () => SetMetadata(IS_CHECK_AUTH_KEY, true);
