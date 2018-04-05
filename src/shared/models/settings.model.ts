export interface I18n {
	'zh-cn': string
	'en': string
}

export interface ICurrency {
	aud: string,
	brl: string,
	cad: string,
	chf: string,
	clp: string,
	cny: string,
	czk: string,
	dkk: string,
	eur: string,
	gbp: string,
	hkd: string,
	huf: string,
	idr: string,
	ils: string,
	inr: string,
	jpy: string,
	krw: string,
	mxn: string,
	myr: string,
	nok: string,
	nzd: string,
	php: string,
	pkr: string,
	pln: string,
	rub: string,
	sek: string,
	sgd: string,
	thb: string,
	try: string,
	twd: string,
	usd: string,
	zar: string,
	gas: string,
	btc: string
}

export interface ISetting {
	currency: keyof ICurrency,
	language: keyof I18n
}