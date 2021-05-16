import { MigrationInterface, QueryRunner } from 'typeorm';

export default class SeedUserAdmin1621183207669 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO USERS (id,full_name,cpf,date_of_birth,active,plan_type,email,phone,password,observation,last_acess) VALUES (uuid_generate_v4(),'Rod Andrade','12345678900','2011/05/26 09:00:00',${true},'Personal','rod@admin.com','91981401807','$2a$08$ptzida/C2Me/PvsM1opI8ew7BvwOBmyr.gH2wwVBQ/XSJvIj3mc8y','obs','2011/05/26 09:00:00')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
