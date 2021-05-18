import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddExerciseIdToPlansExercises1621216590748
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'plans_exercises',
      new TableColumn({
        name: 'exercise_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'plans_exercises',
      new TableForeignKey({
        name: 'PlansExercisesExercise',
        columnNames: ['exercise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'exercises',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'plans_exercises',
      'PlansExercisesExercise',
    );

    await queryRunner.dropForeignKey('plans_exercises', 'exercise_id');
  }
}
