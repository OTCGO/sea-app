export * from './debug'
export * from './wallet.utils'

export const isEmpty = array => Array.isArray(array) && array.length === 0

declare let window: { navigator: any }

export function getBrowserLanguage () {
	if (typeof window === 'undefined' || typeof window.navigator === 'undefined')
	  return undefined

	let browserLang: any = window.navigator.languages ? window.navigator.languages[0] : null
	browserLang = browserLang || window.navigator.language || window.navigator.browserLanguage || window.navigator.userLanguage

	if (browserLang.indexOf('-') !== -1) {
		browserLang = browserLang.split('-')[0]
	}

	if (browserLang.indexOf('_') !== -1) {
		browserLang = browserLang.split('_')[0]
	}

	return browserLang
}

// There only have two language is available, so..
// export const getDefaultCurrency = () => getBrowserLanguage() === 'en' ? 'usd' : 'cny'
