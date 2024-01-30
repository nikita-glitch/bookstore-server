import { SetMetadata } from "@nestjs/common";

export const AuthRequired = (auth: boolean) => SetMetadata('auth', auth)