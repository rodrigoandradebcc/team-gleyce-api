import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import Exercise from './Exercise';
import Training from './Training';

@Entity('prescription')
class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  repetition: string;

  @Column()
  serie: string;

  @Column()
  wight: string;

  @Column()
  interval: string;

  @Column()
  observation: string;

  @OneToOne(type => Exercise, prescription => Prescription)
  @JoinColumn()
  exercise: Exercise;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Prescription;
