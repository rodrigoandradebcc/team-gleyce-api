import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAnamnesis1621274964080
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Anamnesis',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'practice_activities',
            type: 'boolean',
          },
          {
            name: 'sleep_hours',
            type: 'varchar',
          },
          {
            name: 'enough_hours',
            type: 'boolean',
          },
          {
            name: 'professional_activity',
            type: 'varchar',
          },
          {
            name: 'work_hours',
            type: 'int',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
