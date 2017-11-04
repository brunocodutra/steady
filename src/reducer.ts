import {combineReducers} from 'redux';

import {reducer as schematics, State as Schematics} from 'reducers/schematics';

export type State = {
  readonly schematics: Schematics,
};

export const reducer = combineReducers({
  schematics,
});
