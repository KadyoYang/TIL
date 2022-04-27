import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!!req.decoded) {
    return !!data ? req.decoded[data] : req.decoded;
  }
});
