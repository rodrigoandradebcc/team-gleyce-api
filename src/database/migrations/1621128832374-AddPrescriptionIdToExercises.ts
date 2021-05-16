import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddPrescriptionIdToExercises1621128832374
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'exercises',
      new TableColumn({
        name: 'prescription_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'exercises',
      new TableForeignKey({
        name: 'ExercisesPrescription',
        columnNames: ['prescription_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'prescriptions',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('exercises', 'ExercisesPrescription');

    await queryRunner.dropColumn('exercises', 'prescription_id');
  }
}
