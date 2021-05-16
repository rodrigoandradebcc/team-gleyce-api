import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateManyToManyPlanExercise1621131064369
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plans_exercises',
        columns: [
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
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'PlanIdKey',
            columnNames: ['plan_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'plans',
            onDelete: `SET NULL`,
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ExerciseIdKey',
            columnNames: ['exercise_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'exercises',
            onDelete: `SET NULL`,
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('plans_exercises', 'PlanIdKey');
    await queryRunner.dropForeignKey('plans_exercises', 'ExerciseIdKey');

    await queryRunner.dropTable('plans_exercises');
  }
}
