import { Action } from '@ngrx/store'
import { Node, Signin as Sign } from '../../shared/models/index'

export enum NodeActionTypes {
    LOAD = '[Node] Load',
    LOAD_FAIL = '[Node] Load Error',
    LOAD_SUCCESS = '[Node] Load Success',


    SIGNIN = '[Node] Signin',
    SIGNIN_FAIL = '[Node] Signin Error',
    SIGNIN_SUCCESS = '[Node] Signin Success',


    CLEAN = '[Node] Clean',

}

export class Load implements Action {
    readonly type = NodeActionTypes.LOAD
}


export class LoadSuccess implements Action {
    readonly type = NodeActionTypes.LOAD_SUCCESS

    constructor(public payload: Node) { }
}

export class LoadFail implements Action {
    readonly type = NodeActionTypes.LOAD_FAIL

    constructor(public payload: Error | string) { }
}


export class Clean implements Action {
    readonly type = NodeActionTypes.CLEAN
}


export class Signin implements Action {
    readonly type = NodeActionTypes.SIGNIN
}

export class SigninSuccess implements Action {
    readonly type = NodeActionTypes.SIGNIN_SUCCESS

    constructor(public payload: Sign) { }
}

export class SigninFail implements Action {
    readonly type = NodeActionTypes.SIGNIN_FAIL

    constructor(public payload: Error | string) { }
}



export type NodeActions =
    Load
    | LoadSuccess
    | LoadFail
    | Signin
    | SigninSuccess
    | SigninFail
    | Clean
