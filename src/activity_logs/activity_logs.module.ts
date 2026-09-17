import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ActivityLogsService } from './activity_logs.service';
import { ActivityLogsController } from './activity_logs.controller';
import { ActivityLog } from './entities/activity_log.entity';

@Module({
    controllers: [ActivityLogsController],
    providers: [ActivityLogsService],
    imports: [TypeOrmModule.forFeature([ActivityLog])],
    exports: [TypeOrmModule],
})
export class ActivityLogsModule {}
