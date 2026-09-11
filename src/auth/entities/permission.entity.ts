import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { RolePermissions } from './role_permissions.entity';

@Entity('permissions')
export class Permission {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true, nullable: false, length: 50 })
    name!: string;
    @Column({ nullable: false, length: 255 })
    description!: string;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => RolePermissions, (rolePermission) => rolePermission.permission)
    rolePermissions!: RolePermissions[];
}
