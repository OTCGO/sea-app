import {
	DEFAULT_CURRENCY,
	DEFAULT_LANGUAGE
} from '../../shared/constants'
import {
	I18n,
	ICurrency
} from '../../shared/models'

import {
	SettingsActions,
	SettingsActionTypes
} from '../actions/settings.action'

export interface State {
	language: keyof I18n
	loading: boolean
	error: string | Error
	currency: keyof ICurrency
  preCurrency: keyof ICurrency
}

const initialSettingsState: State = {
	language: DEFAULT_LANGUAGE,
	loading: false,
	error: '',
	currency: DEFAULT_CURRENCY,
  	preCurrency: DEFAULT_CURRENCY
}

export const reducer = (state = initialSettingsState, action: SettingsActions): State => {
	switch (action.type) {
		case SettingsActionTypes.LOAD: {
			return {
				...state,
				loading: true,
				error: ''
			}
		}

		case SettingsActionTypes.LOAD_FAIL: {
			return {
				...state,
				loading: false,
				error: action.payload
			}
		}

		case SettingsActionTypes.LOAD_SUCCESS: {
			return {
				...state,
				loading: false,
				currency: action.payload.currency,
				language: action.payload.language
			}
		}

		case SettingsActionTypes.CHANGE_CURRENCY: {
			return {
				...state,
				loading: false,
				currency: action.payload,
        		preCurrency: state.currency
			}
		}

		case SettingsActionTypes.CHANGE_LANGUAGE: {
			return {
				...state,
				loading: false,
				language: action.payload
			}
		}

		default:
			return state
	}
}
