import { SetMetadata } from '@nestjs/common';
import { rolesEnum } from 'src/enums/roles.enum';

export const META_ROLES = 'roles';

export const RoleProtected = (...args: rolesEnum[]) => {
  return SetMetadata(META_ROLES, args);
};
