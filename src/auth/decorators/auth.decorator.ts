import { applyDecorators, UseGuards } from "@nestjs/common";
import { ValidRoles } from "../interfaces";
import { RoleProcted } from "./role-procted.decorator";
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role/user-role.guard";


export function Auth(...roles: ValidRoles[]) {

    return applyDecorators(
      RoleProcted( ...roles ),
      UseGuards( AuthGuard(), UserRoleGuard )

    );
}