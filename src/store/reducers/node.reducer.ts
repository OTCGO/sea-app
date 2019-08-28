import { ActionReducer } from '@ngrx/store'
import { Node } from '../../shared/models'
import { NodeActionTypes, NodeActions } from '../actions/node.action'

export interface State {
    loading: boolean
    error: string | Error
    entities?: Node
}

const initialBalancesState: State = {
    loading: false,
    error: ''
}


export function reducer(state = initialBalancesState, action: NodeActions): State {
    switch (action.type) {
        case NodeActionTypes.LOAD: {
            return {
                ...state,
                loading: true
            }
        }

        case NodeActionTypes.LOAD_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case NodeActionTypes.LOAD_SUCCESS: {
            console.log('BalancesActionTypes.LOAD_SUCCESS', action.payload)

            return {
                ...state,
                entities: action.payload,
                loading: false
            }
        }
    }
}