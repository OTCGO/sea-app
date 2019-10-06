import { ActionReducer } from '@ngrx/store'
import { Bonus } from '../../shared/models'
import { BonusActionTypes, BonusActions } from '../actions/bonus.action'

export interface State {
    loading: boolean
    error: string | Error
    entities?: Bonus
}

const initialBonsuState: State = {
    loading: false,
    error: ''
}


export function reducer(state = initialBonsuState, action: BonusActions): State {
    switch (action.type) {
        case BonusActionTypes.LOAD: {
            return {
                ...state,
                loading: true
            }
        }

        case BonusActionTypes.LOAD_FAIL: {
            return {
                ...state,
                error: action.payload
            }
        }

        case BonusActionTypes.LOAD_SUCCESS: {
            console.log('BalancesActionTypes.LOAD_SUCCESS', action.payload)

            return {
                ...state,
                entities: action.payload,
                loading: false
            }
        }

        default: return state
    }
}