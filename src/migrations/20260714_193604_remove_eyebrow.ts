import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stats" DROP COLUMN "eyebrow";
  ALTER TABLE "services_bands" DROP COLUMN "eyebrow";
  ALTER TABLE "services" DROP COLUMN "eyebrow";
  ALTER TABLE "industries" DROP COLUMN "eyebrow";
  ALTER TABLE "process" DROP COLUMN "eyebrow";
  ALTER TABLE "offer" DROP COLUMN "eyebrow";
  ALTER TABLE "why" DROP COLUMN "eyebrow";
  ALTER TABLE "faq" DROP COLUMN "eyebrow";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "stats" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "services_bands" ADD COLUMN "eyebrow" varchar NOT NULL;
  ALTER TABLE "services" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "industries" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "process" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "offer" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "why" ADD COLUMN "eyebrow" varchar;
  ALTER TABLE "faq" ADD COLUMN "eyebrow" varchar;`)
}
