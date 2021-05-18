import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Plan from './Plan';
import User from './User';

@Entity('trainings')
class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  note: string;

  @Column()
  observation: string;

  @Column('timestamp with time zone')
  expiration_date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(
  //   () => Plan,
  //   planExercisePrescription => planExercisePrescription.training,
  // )
  // @JoinColumn({ name: 'id' })
  // plan: Plan;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Training;
