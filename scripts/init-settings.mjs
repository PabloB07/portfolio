import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { systemSettings } from '../src/lib/db/schema.js';

// Initialize database connection
const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql);

const initializeSettings = async () => {
  try {
    console.log('Initializing system settings...');

    // Insert authentication settings
    await db.insert(systemSettings).values({
      settingsType: 'auth',
      settings: {
        enableRegistration: true,
        requireEmailVerification: false,
        enablePasswordReset: true,
        enableSocialLogin: false
      }
    }).onConflictDoNothing();

    // Insert general settings
    await db.insert(systemSettings).values({
      settingsType: 'general',
      settings: {
        siteName: 'Portfolio Personal',
        siteDescription: 'Mi portfolio de desarrollo',
        contactEmail: 'admin@portfolio.com'
      }
    }).onConflictDoNothing();

    console.log('✅ System settings initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing settings:', error);
  } finally {
    await sql.end();
  }
};

initializeSettings();
