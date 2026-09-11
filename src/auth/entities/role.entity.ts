import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true, nullable: false, length: 50 })
    name!: string;

    @OneToMany(() => User, (user) => user.role)
    users!: User[];
}
