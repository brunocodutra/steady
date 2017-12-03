import {combineReducers} from 'redux';

import {reducer as schematics, State as Schematics} from 'reducers/schematics';
import {reducer as toolbar, State as Toolbar} from 'reducers/toolbar';

export type State = {
  readonly toolbar: Toolbar,
  readonly schematics: Schematics,
};

export default combineReducers({
  toolbar,
  schematics,
});
