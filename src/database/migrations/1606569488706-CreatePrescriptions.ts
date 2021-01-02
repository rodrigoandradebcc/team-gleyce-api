import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreatePrescriptions1606569488706
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'prescriptions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'repetition',
            type: 'varchar',
          },
          {
            name: 'serie',
            type: 'varchar',
          },
          {
            name: 'weight',
            type: 'varchar',
          },
          {
            name: 'interval',
            type: 'varchar',
          },
          {
            name: 'observation',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('prescriptions');
  }
}
