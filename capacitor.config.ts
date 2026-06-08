import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.rkds.dental',
  appName: 'Ramkalyan Dental',
  webDir: 'dist/application',
  server: {
    androidScheme: 'https'
  },
  android: {
    allowMixedContent: true,
    backgroundColor: '#1a1a2e'
  }
};

export default config;
