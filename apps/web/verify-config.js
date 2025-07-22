import { resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const configPath = resolve(__dirname, '../../packages/typescript-config/nextjs.json');

console.log('Checking TypeScript config path:', configPath);
try {
  const exists = await import('fs').then(fs => fs.existsSync(configPath));
  console.log('Config exists:', exists);
} catch (error) {
  console.error('Error checking config:', error);
} 