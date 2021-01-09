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

  // @ManyToOne(() => Plan)
  // @JoinColumn({ name: 'plan_id' })
  // plan: Plan;

  @OneToMany(
    () => PlanExercisePrescription,
    planExercisePrescription => planExercisePrescription.plan_id,
  )
  planExercisePrescription: PlanExercisePrescription[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exercise;
