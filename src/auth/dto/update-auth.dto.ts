import { PartialType } from '@nestjs/mapped-types';

import { CreateAuthDto } from './login-input.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
