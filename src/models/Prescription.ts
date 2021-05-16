import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: Date;

  // @OneToOne(() => Prescription)
  // @JoinColumn({ name: 'prescription_id' })
  // prescription: Prescription;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Prescription;
