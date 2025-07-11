import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

// Cargar variables de entorno
config({ path: '.env.local' });

export default {
  schema: './src/lib/db/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL!,
  },
} satisfies Config;