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
  currency: DEFAULT_CURRENCY,
  preCurrency: DEFAULT_CURRENCY,
	loading: false,
	error: '',
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
			const { currency, language } = action.payload

			return {
				...state,
        currency,
        language,
				loading: false
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
