export interface Global {
	admin: string
	amount: string  // It supposed to be type of number
	id: string
	name: GlobalName[]
	owner: string
	precision: number
	time: string
	type: string
}

export interface GlobalName {
	lang: 'zh-CN' | 'en' | 'en-US'
	name: string
}

export interface NEP5 {
	author: string
	contract_name: string
	decimals: string
	description: string
	email: string
	id: string
	name: string
	parameter: string[]
	return_type: string
	symbol: string
	time: string
	totalSupply: string
	type: string
	use_storage: boolean
	version: string
}

// example
const nERC20: NEP5 = {
	author: 'Robert Stigsson',
	contract_name: 'NEO_ERC20_SmartContract',
	decimals: '8',
	description: 'First ERC20 Smart Contract on the NEO Test Blockchain',
	email: 'anon@ymous.com',
	id: 'bbfcce22ca9120662bf0595037246070827b86c9',
	name: 'NEO_ERC20_SmartContract',
	parameter: ['bytearray'],
	return_type: 'ByteArray',
	use_storage: true,
	symbol: 'nERC20',
	time: '2017-08-28 20:46:39',
	totalSupply: '1',
	type: 'NEP5',
	version: '0.1',
}
