import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'se.gotainnovation.statuskoll',
  appName: 'Stugkoll',
  webDir: 'dist',
  server: {
    url: 'https://2150d111-842e-489a-b350-2a738d3e0e7d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  }
};

export default config;
