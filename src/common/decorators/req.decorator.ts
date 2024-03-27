import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqDec = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = await ctx.switchToHttp().getRequest();
    return request;
  },
);
