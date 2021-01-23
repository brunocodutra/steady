describe('App', () => {
  it('should mount if #navbar, #toggler, and #steady exist', () => {
    document.body.innerHTML = '<div id="navbar"></div><div id="toggler"></div><div id="steady"></div>';

    expect(require('index').default).resolves;
  });

  it('should fail to mount if #navbar is missing', () => {
    document.body.innerHTML = '<div></div><div id="toggler"></div><div id="steady"></div>';

    expect(require('index').default).rejects;
  });

  it('should fail to mount if #toggler is missing', () => {
    document.body.innerHTML = '<div id="navbar"></div><div></div><div id="steady"></div>';

    expect(require('index').default).rejects;
  });

  it('should fail to mount if #steady is missing', () => {
    document.body.innerHTML = '<div id="navbar"></div><div id="toggler"></div><div></div>';

    expect(require('index').default).rejects;
  });
});
