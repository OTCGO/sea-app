export * from './debug'
export * from './wallet.utils'
const R = require('ramda')


export const isEmpty = array => Array.isArray(array) && array.length === 0

declare let window: { navigator: any }

export function getBrowserLanguage() {
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

	console.log('getBrowserLanguage', browserLang)
	return browserLang || 'zh'
}



export function balanceSort(balance) {
	console.log('balanceSort:balance', balance)

	if (!balance) {
		return []
	}
	if (balance.length === 0) {
		return []
	}

	const diff = function (a, b) {
		if (a.symbol < b.symbol)
			return -1
		if (a.symbol > b.symbol)
			return 1
		return 0
		// console.log('a.symbol[0]', a.symbol[0], b.symbol[0])
		// return a.symbol[0] > b.symbol[0]
	}
	const result = R.sort(diff, balance)


	console.log('balanceSort:result', result)

	const seas = R.find(R.propEq('symbol', 'SEAS'))(result)
	const seac = R.find(R.propEq('symbol', 'SEAC'))(result)
	const neo = R.find(R.propEq('symbol', 'NEO'))(result)
	const gas = R.find(R.propEq('symbol', 'GAS'))(result)
	const ont = R.find(R.propEq('symbol', 'ontology-ONT'))(result)
	const ong = R.find(R.propEq('symbol', 'ontology-ONG'))(result)

	const s = new Set()


	if (neo) {
		s.add(neo)
	}
	if (gas) {
		s.add(gas)
	}
	if (ont) {
		s.add(ont)
	}
	if (ong) {
		s.add(ong)
	}
	if (seas) {
		s.add(seas)
	}
	if (seac) {
		s.add(seac)
	}
	// s.add(seas)
	// s.add(seac)
	// s.add(neo)
	// s.add(gas)



	result.forEach(item => {
		if (item) {
			s.add(item)
		}

	})


	console.log('s', Array.from(s))

	return Array.from(s)
}

// There only have two language is available, so..
// export const getDefaultCurrency = () => getBrowserLanguage() === 'en' ? 'usd' : 'cny'
