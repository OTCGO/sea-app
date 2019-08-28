import { Action } from '@ngrx/store'
import { Node } from '../../shared/models/node.model'

export enum NodeActionTypes {
    LOAD = '[Node] Load',
    LOAD_FAIL = '[Node] Load Error',
    LOAD_SUCCESS = '[Node] Load Success',

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

export type NodeActions =
    Load
    | LoadSuccess
    | LoadFail
