import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Exercise from './Exercise';
import Training from './Training';

@Entity('plans')
class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column()
  training_id: string;

  @ManyToOne(() => Training)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @ManyToMany(() => Exercise)
  @JoinTable({
    name: 'plans_exercises',
    joinColumn: {
      name: 'plan_id',
    },
    inverseJoinColumn: {
      name: 'exercise_id',
    },
  })
  exercises: Exercise[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Plan;
