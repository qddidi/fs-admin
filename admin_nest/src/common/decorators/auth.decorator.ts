import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

export function ApiBearerAuthGlobal() {
    return applyDecorators(ApiBearerAuth());
}