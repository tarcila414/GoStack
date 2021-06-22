import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    provider: string;

    @Column('time with time zone')
    date: Date;
}

export default Appointment;