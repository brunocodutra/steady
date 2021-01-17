import { activate, insert, Insertable, remove, Type, update } from 'action';
import { Kind } from 'lib/element';
import { rect } from 'lib/phasor';

export const rand = (n = 10): number => Math.floor(Math.random() * n);

const kinds: Insertable[] = [
  Kind.vsrc,
  Kind.isrc,
  Kind.impedance,
  Kind.admittance,
  Kind.line,
  Kind.xformer,
  Kind.shunt,
];

describe('Actions', () => {
  it('should make it possible to insert new elements', () => {
    kinds.forEach((kind) => {
      expect(insert(kind)).toEqual({ type: Type.insert, kind });
    });
  });

  it('should make it possible to remove removable elements', () => {
    const id = Array.from({ length: rand() }, rand);
    expect(remove(id)).toEqual({ type: Type.remove, id });
  });

  it('should make it possible to activate activable elements', () => {
    const id = Array.from({ length: rand() }, rand);
    expect(activate(id)).toEqual({ type: Type.activate, id });
  });

  it('should make it possible to update parametric elements', () => {
    const id = Array.from({ length: rand() }, rand);
    const value = rect(rand(), rand());
    expect(update(id, value)).toEqual({ type: Type.update, id, value });
  });
});
