import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddRelationPrescriptionExercise1609824224830
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'prescriptions',
      new TableColumn({
        name: 'exercise_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'prescriptions',
      new TableForeignKey({
        name: 'PrescriptionExercise',
        columnNames: ['exercise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'plans',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('prescriptions', 'PrescriptionExercise');

    await queryRunner.dropColumn('prescriptions', 'exercise_id');
  }
}
