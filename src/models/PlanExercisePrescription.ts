import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

import Plan from './Plan';
import Exercise from './Exercise';
import Prescription from './Prescription';

@Entity('planexerciseprescription')
class PlanExercisePrescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ select: false })
  plan_id: string;

  @Column({ select: false })
  exercise_id: string;

  @Column({ select: false })
  prescription_id: string;

  @ManyToOne(() => Plan, plan => plan.id)
  @JoinColumn({ name: 'plan_id' })
  exercicios: Plan;

  @ManyToOne(() => Exercise, exercise => exercise.id, { eager: true })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @OneToOne(
    type => Prescription,
    planExercisePrescription => PlanExercisePrescription,
    { eager: true },
  )
  @JoinColumn({ name: 'prescription_id' })
  prescription: Prescription;
}

export default PlanExercisePrescription;
