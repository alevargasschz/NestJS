import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/auth/users/entities/user.entity';

@Entity('routines')
export class Routine {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ unique: true, nullable: false, length: 50 })
    name!: string;
    @Column({ nullable: false, length: 255 })
    description!: string;
    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
    @Column({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt!: Date;

    user!: User;
}
