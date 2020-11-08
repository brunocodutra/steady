// A dependency graph that contains any wasm must be imported asynchronously.
import('steady.tsx');

/* istanbul ignore next */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      console.log('SW registered: ', await navigator.serviceWorker.register('/steady/sw.js'));
    } catch (error) {
      console.error('SW registration failed: ', error);
    }
  });
}
