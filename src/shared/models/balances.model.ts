export interface IBalance {
	hash: string,
	symbol: string,
	amount: string
	type: string
}

export interface IBalanceEntities {
	[address: string]: IBalance[]
}
