import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPlanIdToExercises1609819378114
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'exercises',
      new TableColumn({
        name: 'plan_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'exercises',
      new TableForeignKey({
        name: 'ExercisesPlan',
        columnNames: ['plan_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plans',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exercises', 'ExercisesPlan');

    await queryRunner.dropColumn('exercises', 'plan_id');
  }
}
