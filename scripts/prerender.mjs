import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

export async function runPrerender() {
  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');
  const distIndexPath = path.resolve(distDir, 'index.html');
  const ssrOutDir = path.resolve(rootDir, 'dist-ssr');

  if (!fs.existsSync(distIndexPath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }

  const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');
  if (!templateHtml.includes('<div id="root"></div>')) {
    console.log('[prerender] dist/index.html is already prerendered.');
    return;
  }

  await build({
    configFile: false,
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.mjs',
        },
      },
    },
    logLevel: 'warn',
  });

  try {
    const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.mjs');
    const serverEntryUrl = `${pathToFileURL(serverEntryPath).href}?t=${Date.now()}`;
    const { render } = await import(serverEntryUrl);

    const routes = [
      { url: '/', lang: 'en', outFile: path.resolve(distDir, 'index.html') },
      { url: '/sr/', lang: 'sr', outFile: path.resolve(distDir, 'sr/index.html') },
      { url: '/ru/', lang: 'ru', outFile: path.resolve(distDir, 'ru/index.html') },
    ];

    for (const route of routes) {
      const renderedAppHtml = render(route.url);
      const routeHtml = templateHtml
        .replace('<html lang="en">', `<html lang="${route.lang}">`)
        .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);

      fs.mkdirSync(path.dirname(route.outFile), { recursive: true });
      fs.writeFileSync(route.outFile, routeHtml, 'utf-8');
      console.log(`[prerender] Prerendered ${route.url} -> ${path.relative(rootDir, route.outFile)}`);
    }
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPrerender().catch((err) => {
    console.error('[prerender] Failed:', err);
    process.exit(1);
  });
}
