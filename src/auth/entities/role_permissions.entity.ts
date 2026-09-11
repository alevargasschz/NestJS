import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('role_permissions')
export class RolePermissions {
    @PrimaryGeneratedColumn()
    id!: number;
    @ManyToOne(() => Role, (role) => role.rolePermissions, { nullable: false })
    @JoinColumn({ name: 'role_id' })
    role!: Role;
    @ManyToOne(() => Permission, (permission) => permission.rolePermissions, { nullable: false })
    @JoinColumn({ name: 'permission_id' })
    permission!: Permission;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
}
