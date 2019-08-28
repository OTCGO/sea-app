import { ActionReducer } from '@ngrx/store'
import { Pick } from '../../shared/models'
import { PickActionTypes, PickActions } from '../actions/pick.action'

export interface State {
    loading: boolean
    error: string | Error
    entities?: Pick
}

const initialBalancesState: State = {
    loading: false,
    error: ''
}


export function reducer(state = initialBalancesState, action: PickActions): State {
    switch (action.type) {
        case PickActionTypes.LOAD: {
            return {
                ...state,
                loading: true
            }
        }

        case PickActionTypes.LOAD_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case PickActionTypes.LOAD_SUCCESS: {
            console.log('BalancesActionTypes.LOAD_SUCCESS', action.payload)

            return {
                ...state,
                entities: action.payload,
                loading: false
            }
        }
    }
}