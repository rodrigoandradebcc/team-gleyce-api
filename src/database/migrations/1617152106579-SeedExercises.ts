import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SeedExercises1617152106579 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO EXERCISES (name, exercise_group) VALUES ('DESENVOLVIMENTO SUPINO MAQUINA PA', 'OMBRO/TRAPEZIO')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'DESENVOLVIMENTO SUPINO MAQUINA PF', 'OMBRO/TRAPEZIO')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 15 HALTER', 'HIPEREXTENSÃO LOMBAR')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 30 HALTER', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 30 MAQ' , 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 30 MAQ PF', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 45 HALTER PF', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 45 MAQ PF', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO 45 MAQUINA', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO FECHADO INCLINADO', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO FECHADO RETO', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO INCLINADO ARTICULADO', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO INCLINADO BARRA', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO INCLINADO HALTER', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO INCLINADO MAQUINA', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO RETO ARTICULADO', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO RETO BARRA', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO RETO HALTER', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO RETO MAQ', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO RETO MAQ PF', 'PEITORAL')`,
    );
    await queryRunner.query(
      `INSERT INTO EXERCISES (id, name, exercise_group) VALUES (uuid_generate_v4(), 'SUPINO VERTICAL', 'PEITORAL')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
