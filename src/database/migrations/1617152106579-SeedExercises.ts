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
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
