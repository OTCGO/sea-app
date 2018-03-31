export interface Coin {
	symbol: string
	currentPrice: string
	percent_change_1h: string
	percent_change_24h: string
	percent_change_7d: string
}

export interface DetailData {
	high: number
	low: number
	time: number
	close: number
	open: number
	volumefrom: number
	volumeto: number
}
