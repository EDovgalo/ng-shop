import {routerReducer} from '@ngrx/router-store';
import {RouterState} from './router.state';
import {ActionReducerMap} from '@ngrx/store';

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};
