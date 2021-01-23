Promise.all([import('react'), import('react-dom')]).then(async ([React, ReactDOM]) => {
  const { default: Steady } = await import('component/steady');
  ReactDOM.render(<Steady />, document.getElementById('steady'));
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
