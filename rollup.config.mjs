import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import dts from 'rollup-plugin-dts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    input: resolve(__dirname, 'dist/temp/index.d.ts'),
    output: {
        file: 'dist/index.d.ts',
        format: 'es',
    },
    plugins: [
        dts(),
    ],
};
