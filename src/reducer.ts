import { Action, Type } from 'action';
import { State } from 'state';
import { Element, Connected, Terminal, Shunt, update } from 'lib/element';
import { equal, prefix } from 'lib/util';

const spin = (id: number[], i: number, n: number) => [...id.slice(0, i), id[i] + n, ...id.slice(i + 1)];

const patch = (entry: Element, path: number[], f: (_: Element) => Element): Element => {
  if (equal([0], path)) {
    return f(entry);
  } else if (prefix([0], path)) {
    if (entry instanceof Shunt) {
      return entry.merge(patch(entry.branch, path.slice(1), f));
    } else {
      throw new Error(`expected '${Shunt.name}', got '${entry.kind}'`);
    }
  } else {
    if (entry instanceof Connected) {
      return entry.connect(patch(entry.next, spin(path, 0, -1), f));
    } else {
      throw new Error(`expected ${Connected.name}, got '${entry.kind}'`);
    }
  }
};

export default (state = State.init(), action: Action): State => {
  const { entry, active } = state;

  switch (action.type) {
    case Type.hydrate:
      return action.state;

    case Type.activate:
      return { entry, active: action.id };

    case Type.insert:
      return {
        entry: patch(entry, active, (e) => Connected.fromKind(action.kind).connect(e)),
        active: spin(active, active.length - 1, 1),
      };

    case Type.remove:
      const lead = action.id.slice(0, -1);

      return {
        entry: patch(entry, action.id, (e) => {
          if (e instanceof Terminal) {
            throw new Error(`element of kind '${e.kind}' cannot be removed`);
          }

          return e.next;
        }),

        active: (prefix(lead, active) && action.id[lead.length] < active[lead.length])
          ? spin(active, lead.length, -1)
          : active
        ,
      };

    case Type.update:
      return {
        entry: patch(entry, action.id, (e) => update(e, action.value)),
        active,
      };

    default:
      return state;
  }
};
