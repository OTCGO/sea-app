import { Action } from '@ngrx/store'
import { Pick } from '../../shared/models/pick.model'

export enum PickActionTypes {
    LOAD = '[Pick] Load',
    LOAD_FAIL = '[Pick] Load Error',
    LOAD_SUCCESS = '[Pick] Load Success',

}

export class Load implements Action {
    readonly type = PickActionTypes.LOAD
}


export class LoadSuccess implements Action {
    readonly type = PickActionTypes.LOAD_SUCCESS

    constructor(public payload: Pick) { }
}

export class LoadFail implements Action {
    readonly type = PickActionTypes.LOAD_FAIL

    constructor(public payload: Error | string) { }
}

export type PickActions =
    Load
    | LoadSuccess
    | LoadFail
