type GenericEvent = React.SyntheticEvent<HTMLElement> | Event;
type GenericKeyboardEvent = React.KeyboardEvent<HTMLElement> | KeyboardEvent;

type Handler<E extends GenericEvent = GenericEvent> = ((e: E) => void);
type KeyboardHandler<E extends GenericKeyboardEvent = GenericKeyboardEvent> = Handler<E>;

export const isolate = (f: Handler): Handler => (
  (e) => {
    e.stopPropagation();
    f(e);
  }
);

export const adapt = (keys: string[], f: Handler): KeyboardHandler => (
  (e) => {
    if (keys.includes(e.key)) {
      f(e);
    }
  }
);
