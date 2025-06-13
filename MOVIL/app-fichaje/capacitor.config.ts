import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.miempresa.fichajeapp',
  appName: 'FichajeApp',
  webDir: 'www', // importante: debe ser el output de Angular (`ng build`)
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
    }
  },

};

export default config;
