export interface TransactionHistory {
	txid: string  // "0x276dbf245a365898c4f76fb67dedb7d9f849f22b8c083deaa1cdb9933130760d"
	asset: string  // "0xc56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b"
	operation: string  // "out" | "in"
	time: string  // "2018-03-27 07:38:43"
	value: string  // "117"
	symbol: string  // "NEO"
}

export interface TransactionHistoryDetail {
	txid: string
	size: number
	type: string
	version: number
	attributes
	vin
	vout: VOut[]
	sys_fee
	net_fee
	scripts
	blockhash
	confirmations: number
	blocktime: number
}

export interface VOut {
	n: number
	asset: string
	value: string
	address: string
}
