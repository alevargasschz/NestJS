import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ActivityLog } from '../../activity_logs/entities/activity_log.entity';
import { Routine } from '../../routines/entities/routine.entity';

import { Role } from './role.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: false, length: 100 })
    name!: string;

    @Column({ unique: true, nullable: false, length: 255 })
    email!: string;

    @Column({ nullable: false, length: 255 })
    password!: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;

    @ManyToOne(() => Role, (role) => role.users, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role!: Role;

    @OneToMany(() => Routine, (routine) => routine.user)
    routines!: Routine[];

    @OneToMany(() => ActivityLog, (activityLog) => activityLog.user)
    activityLogs!: ActivityLog[];
}
