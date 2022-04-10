export default Promise.all([import('react'), import('react-dom/client')]).then(async ([React, ReactDOM]) => {
  const [{ default: Steady }, { unwrap }] = await Promise.all([import('component/steady'), import('lib/util')]);
  const container = unwrap(document.getElementById('steady'), '#steady not found');
  const root = ReactDOM.createRoot(container);
  root.render(<Steady />);
});

window.addEventListener('load', async () => {
  try {
    console.log('SW registered: ', await navigator.serviceWorker.register('/steady/sw.js'));
  } catch (error) {
    console.error('SW registration failed: ', error);
  }
});
