// Script para inicializar configuraciones del sistema
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Cargar variables de entorno
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables de entorno de Supabase no configuradas');
  console.log('Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en tu .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initializeSettings = async () => {
  try {
    console.log('🚀 Inicializando configuraciones del sistema...');
    console.log('🔗 URL de Supabase:', supabaseUrl);

    // Verificar conexión
    const { data: testData, error: testError } = await supabase
      .from('system_settings')
      .select('count')
      .limit(1);

    if (testError) {
      console.error('❌ Error de conexión:', testError);
      return;
    }

    console.log('✅ Conexión a Supabase exitosa');

    // Insertar configuración de autenticación
    const { error: authError } = await supabase
      .from('system_settings')
      .upsert({
        settings_type: 'auth',
        settings: {
          enableRegistration: true,
          requireEmailVerification: false,
          enablePasswordReset: true,
          enableSocialLogin: false
        }
      }, {
        onConflict: 'settings_type'
      });

    if (authError) {
      console.error('❌ Error insertando configuración de auth:', authError);
    } else {
      console.log('✅ Configuración de autenticación inicializada');
    }

    // Insertar configuración general
    const { error: generalError } = await supabase
      .from('system_settings')
      .upsert({
        settings_type: 'general',
        settings: {
          siteName: 'Portfolio Personal',
          siteDescription: 'Mi portfolio de desarrollo',
          contactEmail: 'admin@portfolio.com'
        }
      }, {
        onConflict: 'settings_type'
      });

    if (generalError) {
      console.error('❌ Error insertando configuración general:', generalError);
    } else {
      console.log('✅ Configuración general inicializada');
    }

    console.log('🎉 Inicialización completada exitosamente!');
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
  }
};

initializeSettings();
