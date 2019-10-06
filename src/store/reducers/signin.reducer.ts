import { ActionReducer } from '@ngrx/store'
import { Signin } from '../../shared/models'
import { NodeActionTypes, NodeActions } from '../actions/node.action'

export interface State {
    loading: boolean
    error: string | Error
    entities?: Signin
}

const initialSigninState: State = {
    loading: false,
    error: ''
}


export function reducer(state = initialSigninState, action: NodeActions): State {
    switch (action.type) {
        case NodeActionTypes.SIGNIN: {
            return {
                ...state,
                loading: true
            }
        }

        case NodeActionTypes.SIGNIN_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case NodeActionTypes.SIGNIN_SUCCESS: {
            console.log('NodeActionTypes.SIGNIN_SUCCESS', action.payload)

            return {
                ...state,
                entities: action.payload,
                loading: false
            }
        }

        default: return state
    }
}