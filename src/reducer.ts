import {combineReducers} from 'redux';

import {reducer as schematics, State as Schematics} from 'reducer/schematics';
import {reducer as toolbar, State as Toolbar} from 'reducer/toolbar';

export type State = {
  readonly toolbar: Toolbar,
  readonly schematics: Schematics,
};

export default combineReducers({
  toolbar,
  schematics,
});
