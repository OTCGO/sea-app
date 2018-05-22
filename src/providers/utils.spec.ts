import { decryptPrv, verifyKeyPair } from './utils'

const oldWallet = {
	'address': 'AHZDq78w1ERcDYVBWjU5owWcbFZKLvhg7X',
	'publicKey': '0483cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a180eee2ada65ddb65154863c57bac9ab1b89a61593235991d5fb6f627c0cadbd',
	'publicKeyCompressed': '0383cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a',
	'privateKeyEncrypted': 'U2FsdGVkX1/TSwg9yTR+kDT8QKgC5yAQpc64KI0XyiCz97ozFLJK8YNJxvahqHr4lmBLYxZkM4E9tpIVHsblJjcjio19hb8L+uiYM4WXUAFQtpXIDDvwIP+TutTKQHOH'
}

const pwd = '12345678'
const wrongPwd = 'AOSIND2)(*A_X*('

describe('Test utils', () => {
	it('should decryptOldWallet without throw', () => {
		const pr = decryptPrv(oldWallet.privateKeyEncrypted, pwd)
		const result = verifyKeyPair(pr, oldWallet.publicKey)
		expect(result).toBeTruthy()

	})

	it('should decryptOldWallet with throw error', () => {
		const pr = decryptPrv(oldWallet.privateKeyEncrypted, wrongPwd)
		const result = verifyKeyPair(pr, oldWallet.publicKey)
		expect(result).toBeFalsy()
	})
})
