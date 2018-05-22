import * as CryptoJS from 'crypto-js'
import * as KJ from 'jsrsasign'

export const doSign = (prvkey, msg) => {
	const sha256withECDSA = new (<any>KJ).crypto.Signature({ 'alg': 'SHA256withECDSA' })

	sha256withECDSA.initSign({
		'ecprvhex': prvkey,
		'eccurvename': 'secp256r1'
	})
	sha256withECDSA.updateString(msg)

	return sha256withECDSA.sign()
}

export const doVerify = (pubkey, msg, sigval) => {
	const provSignature = new (<any>KJ).crypto.Signature({
		'alg': 'SHA256withECDSA',
		'prov': 'cryptojs/jsrsa'
	})
	provSignature.initVerifyByPublicKey({
		'ecpubhex': pubkey,
		'eccurvename': 'secp256r1'
	})
	provSignature.updateString(msg)
	return provSignature.verify(sigval)
}

export const decryptPrv = (enckey, pwd) => CryptoJS.AES
                                                   .decrypt(enckey, pwd)
                                                   .toString((<any>CryptoJS).enc.Utf8)

export const verifyKeyPair = (prvkey, pubkey) => {
	const msg = 'aaa'
	const sigval = doSign(prvkey, msg)
	return doVerify(pubkey, msg, sigval)
}
