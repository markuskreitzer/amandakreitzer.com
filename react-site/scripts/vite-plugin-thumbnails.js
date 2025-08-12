import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export function thumbnailsPlugin() {
  return {
    name: 'generate-thumbnails',
    buildStart: async () => {
      console.log('\n🖼️  Checking for missing thumbnails...');
      try {
        const { stdout } = await execAsync('node scripts/generate-thumbnails.js');
        console.log(stdout);
      } catch (error) {
        console.warn('Thumbnail generation failed:', error.message);
      }
    }
  };
}