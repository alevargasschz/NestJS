import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/entities/user.entity';

@Entity('activity_logs')
export class ActivityLog {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ name: 'started_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    startedAt!: Date;
    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt!: Date;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    user!: User;
    routine!: string;
}
