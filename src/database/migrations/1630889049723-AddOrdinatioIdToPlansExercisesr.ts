import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddOrdinatioIdToPlansExercisesr1630889049723 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'plans_exercises',
          new TableColumn({
              name: 'ordination_id',
              type: 'int',
              isNullable: true,
              default: 0
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('plans_exercises', 'ordination_id');

    }

}
