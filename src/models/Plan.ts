import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import PlanExercisePrescription from './PlanExercisePrescription';
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

  @OneToMany(
    () => PlanExercisePrescription,
    planExercisePrescription => planExercisePrescription.exercicios,
    { eager: true },
  )
  @JoinColumn({ name: 'id' })
  exercicios: PlanExercisePrescription;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Plan;
