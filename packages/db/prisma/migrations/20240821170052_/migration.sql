-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Language" ADD VALUE 'ASTRO';
ALTER TYPE "Language" ADD VALUE 'CPP';
ALTER TYPE "Language" ADD VALUE 'HTML';
ALTER TYPE "Language" ADD VALUE 'JAVA';
ALTER TYPE "Language" ADD VALUE 'JSX';
ALTER TYPE "Language" ADD VALUE 'PHP';
ALTER TYPE "Language" ADD VALUE 'PYTHON';
ALTER TYPE "Language" ADD VALUE 'TSX';
ALTER TYPE "Language" ADD VALUE 'YAML';
