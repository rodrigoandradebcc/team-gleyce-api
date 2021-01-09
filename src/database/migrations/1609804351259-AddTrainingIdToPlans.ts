import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddTrainingIdToPlans1609804351259
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'plans',
      new TableColumn({
        name: 'training_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'plans',
      new TableForeignKey({
        name: 'PlansTraining',
        columnNames: ['training_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'trainings',
        onDelete: `SET NULL`,
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('plans', 'PlansTraining');

    await queryRunner.dropColumn('plans', 'training_id');
  }
}
