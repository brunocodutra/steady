describe('App', () => {
  it('should mount', () => {
    document.body.innerHTML = '<div id="navbar"></div><div id="toggler"></div><div id="steady"></div>';

    require('index');
  });
});
