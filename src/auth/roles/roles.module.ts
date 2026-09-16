import { Module } from '@nestjs/common';
import { TypeOrmModule } from 'node_modules/@nestjs/typeorm/dist/typeorm.module';

import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    exports: [RolesService],
    imports: [TypeOrmModule.forFeature([Role])],
})
export class RolesModule {}
