import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity'

type I18n = {
	"zh-cn": 'chinease'
	"en": 'english'
}

type Currency = {
	aud: { symbol: '$' },
	brl: { symbol: 'R$' },
	cad: { symbol: '$' },
	chf: { symbol: 'Fr.' },
	clp: { symbol: '$' },
	cny: { symbol: '¥' },
	czk: { symbol: 'Kč' },
	dkk: { symbol: 'kr. ' },
	eur: { symbol: '€' },
	gbp: { symbol: '£' },
	hkd: { symbol: '$' },
	huf: { symbol: 'Ft ' },
	idr: { symbol: 'Rp ' },
	ils: { symbol: '₪' },
	inr: { symbol: '₹' },
	jpy: { symbol: '¥' },
	krw: { symbol: '₩' },
	mxn: { symbol: '$' },
	myr: { symbol: 'RM' },
	nok: { symbol: 'kr ' },
	nzd: { symbol: '$' },
	php: { symbol: '₱' },
	pkr: { symbol: '₨ ' },
	pln: { symbol: 'zł' },
	rub: { symbol: '₽' },
	sek: { symbol: 'kr ' },
	sgd: { symbol: 'S$' },
	thb: { symbol: '฿' },
	try: { symbol: '₺' },
	twd: { symbol: 'NT$' },
	usd: { symbol: '$' },
	zar: { symbol: 'R ' },
	gas: { symbol: 'gas' }
}

export type SettingsState = {
	lang: keyof I18n
	currency: keyof Currency
}

const initialSettingsState: SettingsState = {
	lang: 'zh-cn',
	currency: 'gas'
}

export const reducer = (state = initialSettingsState, action) => {
	switch (action.type) {

	}
}
