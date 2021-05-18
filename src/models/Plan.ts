import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Exercise from './Exercise';
import Training from './Training';
import PlansExercises from './PlansExercises';

@Entity('plans')
class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  training_id: string;

  @OneToMany(() => PlansExercises, plan_exercises => plan_exercises.plan, {
    cascade: true,
  })
  plan_exercises: PlansExercises[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Plan;
