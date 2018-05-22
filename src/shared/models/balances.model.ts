export interface IBalance {
	hash: string,
	symbol: string,
	amount: number
}

export interface IBalanceEntities {
	[address: string]: IBalance[]
}
