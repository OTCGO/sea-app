export const OLD_WALLET_CHECK_LIST = ['address', 'privateKeyEncrypted', 'publicKey', 'publicKeyCompressed']

export const NEW_WALLET_CHECK_LIST = ['name', 'version', 'scrypt', 'accounts', 'extra']

export const OTCGO_WALLET_FILE_NAME = 'OTCGO-mobile-wallet.json'

export const DEFAULT_SCRYPT = { n: 16384, r: 8, p: 8, size: 64 }

export const DEFAULT_EMPTY_WALLET = {
	name: 'OTCGO-mobile-wallet',
	scrypt: DEFAULT_SCRYPT,
	accounts: [],
	version: 'beta-0.6',
	extra: null
}
