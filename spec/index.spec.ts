describe('App', () => {
  it('should mount', () => {
    document.body.innerHTML = '<div id="toggler"></div><div id="steady"></div>';

    require('index');
  });
});
