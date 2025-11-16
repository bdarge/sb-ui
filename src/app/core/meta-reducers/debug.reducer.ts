import { ActionReducer } from '@ngrx/store';

import { AppState } from '../core.state';

export function debug(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state, action) {
    return reducer(state, action);
  };
}
