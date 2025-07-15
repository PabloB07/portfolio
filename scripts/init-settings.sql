-- Insertar configuraciones iniciales del sistema

-- Configuración de autenticación
INSERT INTO system_settings (settings_type, settings) 
VALUES (
  'auth',
  '{
    "enableRegistration": true,
    "requireEmailVerification": false,
    "enablePasswordReset": true,
    "enableSocialLogin": false
  }'::json
) ON CONFLICT (settings_type) DO NOTHING;

-- Configuración general
INSERT INTO system_settings (settings_type, settings) 
VALUES (
  'general',
  '{
    "siteName": "Portfolio Personal",
    "siteDescription": "Mi portfolio de desarrollo",
    "contactEmail": "admin@portfolio.com"
  }'::json
) ON CONFLICT (settings_type) DO NOTHING;

-- Crear constraint único para settings_type si no existe
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'system_settings_settings_type_unique'
    ) THEN
        ALTER TABLE system_settings 
        ADD CONSTRAINT system_settings_settings_type_unique 
        UNIQUE (settings_type);
    END IF;
END $$;
