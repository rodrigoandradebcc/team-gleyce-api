import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePlanExercisePrescription1610170681131
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'planexerciseprescription',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'plan_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'exercise_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'prescription_id',
            type: 'uuid',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'PlanId',
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plans',
            onDelete: `SET NULL`,
            onUpdate: 'CASCADE',
          },
          {
            name: 'ExerciseId',
            columnNames: ['exercise_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exercises',
            onDelete: `SET NULL`,
            onUpdate: 'CASCADE',
          },
          {
            name: 'PrescriptionId',
            columnNames: ['prescription_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'prescriptions',
            onDelete: `SET NULL`,
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'planexerciseprescription',
      'PrescriptionId',
    );

    await queryRunner.dropForeignKey('planexerciseprescription', 'ExerciseId');

    await queryRunner.dropForeignKey('planexerciseprescription', 'PlanId');

    await queryRunner.dropTable('planexerciseprescription');
  }
}
