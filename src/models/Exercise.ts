import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import Plan from './Plan';
import PlanExercisePrescription from './PlanExercisePrescription';
import Prescription from './Prescription';

@Entity('exercises')
class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  exercise_group: string;

  @Column()
  link: string;

  // @Column()
  // plan_id: string;

  @OneToOne(() => Prescription)
  @JoinColumn({ name: 'prescription_id' })
  prescription: Prescription;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exercise;
