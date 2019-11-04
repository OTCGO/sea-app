import { ActionReducer } from '@ngrx/store'
import { Node } from '../../shared/models'
import { NodeActionTypes, NodeActions } from '../actions/node.action'

export interface State {
    loading: boolean
    error: string | Error
    entities?: Node
}

const initialNodeState: State = {
    loading: false,
    error: ''
}


export function reducer(state = initialNodeState, action: NodeActions): State {
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
                loading: true,
                error: action.payload
            }
        }

        case NodeActionTypes.LOAD_SUCCESS: {
            console.log('NodeActionTypes.LOAD_SUCCESS', action.payload)

            return {
                ...state,
                entities: action.payload,
                loading: false
            }
        }

        case NodeActionTypes.CLEAN: {

            return {
                loading: false,
                error: '',
                entities: undefined
            }
        }


        default:
            return state
    }
}