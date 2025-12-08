import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        console.log(request.user)

        if (!request.user) {
            throw new InternalServerErrorException('User not found in request')
        }
        return request.user;
    },
);