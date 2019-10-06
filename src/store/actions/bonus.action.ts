import { Action } from '@ngrx/store'
import { Bonus } from '../../shared/models/bonus.model'

export enum BonusActionTypes {
    LOAD = '[Bonus] Load',
    LOAD_FAIL = '[Bonus] Load Error',
    LOAD_SUCCESS = '[Bonus] Load Success',

}

export class Load implements Action {
    readonly type = BonusActionTypes.LOAD
}


export class LoadSuccess implements Action {
    readonly type = BonusActionTypes.LOAD_SUCCESS

    constructor(public payload: Bonus) { }
}

export class LoadFail implements Action {
    readonly type = BonusActionTypes.LOAD_FAIL

    constructor(public payload: Error | string) { }
}

export type BonusActions =
    Load
    | LoadSuccess
    | LoadFail
