import {combineReducers} from 'redux';

import {reducer as schematics, State as Schematics} from 'reducer/schematics';
import {reducer as toolbox, State as Toolbar} from 'reducer/toolbox';

export type State = {
  readonly toolbox: Toolbar,
  readonly schematics: Schematics,
};

export default combineReducers({
  toolbox,
  schematics,
});
