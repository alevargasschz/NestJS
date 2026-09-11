import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true, nullable: false })
    username!: string;
    @Column({ unique: true, nullable: false })
    email!: string;
    @Column({ nullable: false })
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

    @ManyToOne(() => Role, (role) => role.users, { nullable: false, eager: false })
    @JoinColumn({ name: 'role_id' })
    role!: Role;
}
