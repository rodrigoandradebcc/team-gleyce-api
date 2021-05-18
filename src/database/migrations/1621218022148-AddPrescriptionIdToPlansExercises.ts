import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPrescriptionIdToPlansExercises1621218022148
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'plans_exercises',
      new TableColumn({
        name: 'prescription_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'plans_exercises',
      new TableForeignKey({
        name: 'PlansExercisesPrescription',
        columnNames: ['prescription_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prescriptions',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'plans_exercises',
      'PlansExercisesPrescription',
    );

    await queryRunner.dropForeignKey('plans_exercises', 'prescription_id');
  }
}
