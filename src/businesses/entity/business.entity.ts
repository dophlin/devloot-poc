import { User } from 'src/users/entity/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Business {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('simple-array', { nullable: false })
    activities: string[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
