import { SetMetadata } from '@nestjs/common';

export const META_ROLES = 'roles'

export const RoleProcted = (...args: string[]) => {


    return SetMetadata( META_ROLES, args);
}     
