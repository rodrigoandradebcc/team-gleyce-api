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
  JoinTable,
} from 'typeorm';
import Plan from './Plan';
import PlansExercises from './PlansExercises';
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

  @OneToMany(() => PlansExercises, plan_exercises => plan_exercises.exercise)
  plan_exercises: PlansExercises[];

  // @OneToOne(() => Prescription)
  // @JoinColumn({ name: 'prescription_id' })
  // prescription: Prescription;

  // @OneToOne(() => Exercise)
  // @JoinTable({
  //   name: 'plans_exercises',
  //   joinColumn: {
  //     name: 'prescription_id',
  //   },
  // inverseJoinColumn: {
  //   name: 'exercise_id',
  // },
  // })
  // exercises: Exercise;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Exercise;
