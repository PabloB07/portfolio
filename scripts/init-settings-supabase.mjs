// Script para inicializar configuraciones del sistema
import { supabase } from '../src/lib/supabase.js';

const initializeSettings = async () => {
  try {
    console.log('🚀 Inicializando configuraciones del sistema...');

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
