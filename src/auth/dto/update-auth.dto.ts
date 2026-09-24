import { PartialType } from '@nestjs/mapped-types';

import { LoginInputDto } from './login-input.dto';

export class UpdateAuthDto extends PartialType(LoginInputDto) {}
