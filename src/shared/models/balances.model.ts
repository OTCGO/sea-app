export interface IBalance {
	hash: string,
	symbol: string,
	amount: BigNumber
}

export interface IBalanceEntities {
	[address: string]: IBalance[]
}
