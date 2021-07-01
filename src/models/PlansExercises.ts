import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Exercise from './Exercise';
import Plan from './Plan';
import Prescription from './Prescription';

@Entity('plans_exercises')
class PlansExercises {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plan, plan => plan.plan_exercises)
  @JoinColumn({ name: 'plan_id' })
  plan: Plan;

  @ManyToOne(() => Exercise, exercise => exercise.plan_exercises, {
    eager: true,
  })
  @JoinColumn({ name: 'exercise_id' })
  exercise: Exercise;

  @OneToOne(type => Prescription, plan_exercises => PlansExercises, {
    eager: true,
  })
  @JoinColumn({ name: 'prescription_id' })
  prescription: Prescription;

  @Column()
  plan_id: string;

  @Column()
  exercise_id: string;

  @Column()
  prescription_id: string;
}

export default PlansExercises;
