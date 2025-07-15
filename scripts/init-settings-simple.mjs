import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL);

const initializeSettings = async () => {
  try {
    console.log('Initializing system settings...');

    // Insert authentication settings
    await sql`
      INSERT INTO system_settings (settings_type, settings) 
      VALUES (
        'auth',
        ${JSON.stringify({
          enableRegistration: true,
          requireEmailVerification: false,
          enablePasswordReset: true,
          enableSocialLogin: false
        })}
      ) ON CONFLICT (settings_type) DO NOTHING
    `;

    // Insert general settings
    await sql`
      INSERT INTO system_settings (settings_type, settings) 
      VALUES (
        'general',
        ${JSON.stringify({
          siteName: 'Portfolio Personal',
          siteDescription: 'Mi portfolio de desarrollo',
          contactEmail: 'admin@portfolio.com'
        })}
      ) ON CONFLICT (settings_type) DO NOTHING
    `;

    console.log('✅ System settings initialized successfully!');
  } catch (error) {
    console.error('❌ Error initializing settings:', error);
  } finally {
    await sql.end();
  }
};

initializeSettings();
