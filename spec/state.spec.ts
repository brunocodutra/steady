import {init, serialize, State, unserialize} from 'state';

const Base64 = /^[ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-]+[$]{0,2}$/;

describe('State', () => {
  it('should be serializable', () => {
    const digest = serialize(init);

    expect(digest).toEqual(expect.stringMatching(Base64));
    expect(unserialize(digest)).toEqual(init);

    expect(unserialize('')).toBeUndefined();
    expect(unserialize('?')).toBeUndefined();
    expect(unserialize('#')).toBeUndefined();
    expect(unserialize(serialize({} as State))).toBeUndefined();
  });
});
