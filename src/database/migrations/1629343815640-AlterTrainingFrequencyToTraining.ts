import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AlterTrainingFrequencyToTraining1629343815640 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'trainings',
        new TableColumn({
            name: 'training_frequency',
            type: 'varchar',
            isNullable: true,
        }),
    );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('trainings', 'training_frequency');
    }

}
