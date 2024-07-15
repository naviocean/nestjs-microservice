import { UseGuards, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from './role.decorator';

export const ROLES_KEY = 'roles';
export const Auth = ({
  roles,
  description,
}: {
  roles: Role[];
  description: string;
}) => {
  return applyDecorators(
    UseGuards(JwtAuthGuard, RoleGuard),
    Roles(...roles),
    ApiBearerAuth(),
    ApiResponse({
      status: 200,
      description,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' })
  );
};
