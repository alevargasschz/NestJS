import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoutinesService } from './routines.service';
import { RoutinesController } from './routines.controller';
import { Routine } from './entities/routine.entity';

@Module({
    controllers: [RoutinesController],
    providers: [RoutinesService],
    imports: [TypeOrmModule.forFeature([Routine])],
    exports: [TypeOrmModule],
})
export class RoutinesModule {}
