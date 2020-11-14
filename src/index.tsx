import { unwrap } from 'lib/util';

Promise.all([import('react'), import('react-dom')]).then(([React, ReactDOM]) => {
  const Steady = React.lazy(() => import('component/steady'));

  ReactDOM.render(
    <React.Suspense fallback={null}>
      <Steady />
    </React.Suspense >,
    unwrap(document.getElementById('steady'), '#steady not found'),
  );
});

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
