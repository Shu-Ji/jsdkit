import * as esbuild from 'esbuild';
import * as path from 'path';

(async () => {
    await build(resolve(`../src/host/index.ts`), resolve(`../plugin/host.js`));
})();

/**
 * 编译 ts 文件
 *
 * @param src_filepath - 源文件路径
 * @param target_filepath - 目标文件路径
 */
async function build(src_filepath: string, target_filepath: string) {
    await esbuild.build({
        entryPoints: [src_filepath],
        outfile: target_filepath,
        minify: false,
        bundle: true,
        watch: true,
        logLevel: 'info',
    });
}

/**
 * resolve_path
 *
 * @param filepath - The filepath to resolve.
 */
function resolve(filepath: string) {
    return path.join(__dirname, filepath);
}
