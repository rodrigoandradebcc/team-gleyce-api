import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import PlanExercisePrescription from './PlanExercisePrescription';

@Entity('prescriptions')
class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repetition: string;

  @Column()
  serie: string;

  @Column()
  weight: string;

  @Column()
  interval: string;

  @Column()
  observation: string;

  // @Column()
  // exercise_id: string;

  @OneToOne(type => PlanExercisePrescription, prescription => Prescription)
  planexerciseprescription: PlanExercisePrescription;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Prescription;
