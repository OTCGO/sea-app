export interface IBalance {
	hash: string,
	symbol: string,
	amount: string
}

export interface IBalanceEntities {
	[address: string]: IBalance[]
}
