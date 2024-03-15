import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.test.angular',
  appName: 'test',
  webDir: 'dist/ngx-leaflet-demo',
  server: {
    androidScheme: 'https'
  }
};

export default config;
