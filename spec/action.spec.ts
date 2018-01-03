import {Type, toggle, insert, activate} from 'action';
import {Kind} from 'lib/element';

const kinds: Kind[] = [
  Kind.vsrc,
  Kind.isrc,
  Kind.impedance,
  Kind.admittance,
  Kind.line,
  Kind.xformer,
  Kind.shunt,
];

const rand = (N = 10) => Math.floor(Math.random() * N);

describe('Actions', () => {
  it('should make it possible to toggle the toolbox', () => {
    expect(toggle()).toEqual({type: Type.toggle});
  });

  it('should make it possible to activate existing elements', () => {
    const id = Array.from({length: rand()}, rand);
    expect(activate(id)).toEqual({type: Type.activate, id});
  });

  it('should make it possible to insert new elements', () => {
    kinds.forEach((kind) => {
      expect(insert(kind)).toEqual({type: Type.insert, kind});
    });
  });
});
