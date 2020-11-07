// A dependency graph that contains any wasm must be imported asynchronously.
import('steady.tsx');

/* istanbul ignore next */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      // tslint:disable:no-console
      console.log('SW registered: ', await navigator.serviceWorker.register('/steady/sw.js'));
    } catch (error) {
      // tslint:disable:no-console
      console.error('SW registration failed: ', error);
    }
  });
}
