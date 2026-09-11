import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { RoutinesModule } from './routines/routines.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ActivityLogsModule } from './activity_logs/activity_logs.module';
import { RoutinesExercisesModule } from './routines_exercises/routines_exercises.module';
import { ActivitiesExercisesModule } from './activities_exercises/activities_exercises.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get<string>('POSTGRES_USER'),
                password: configService.get<string>('POSTGRES_PASSWORD'),
                database: configService.get<string>('POSTGRES_DB'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true, // Sincroniza esquemas automáticamente en desarrollo
            }),
        }),
        AuthModule,
        RoutinesModule,
        ExercisesModule,
        ActivityLogsModule,
        RoutinesExercisesModule,
        ActivitiesExercisesModule,
    ],
})
export class AppModule {}
