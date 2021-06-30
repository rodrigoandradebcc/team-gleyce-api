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
            isNullable: true,
          },
          {
            name: 'serie',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'interval',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar',
            isNullable: true,
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
