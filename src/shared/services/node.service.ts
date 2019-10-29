import { Injectable } from '@angular/core'
import { AccountProvider, ApiProvider } from '../../providers'
import secureRandom from 'secure-random'
import wa, { u, wallet } from '../../libs/neon'
import { GetPrivateKeyFromNep2 } from '../../shared/utils'
import { MSG } from '../../constants'


@Injectable()
export class NodeService {
    account = this.accountProvider.defaultAccount

    constructor(private apiProvider: ApiProvider,
        private accountProvider: AccountProvider,
    ) {

    }
    // {
    //     "referrer":"AZ2FJDreaBA9v4YzxsNPnkcvir1Jh3SdoG",
    //     "amount":"1000",
    //     "days":"30",
    //     "publicKey":"",
    //     "signature":"",
    //     "message":""
    // }
    async insert(body, passphrase) {
        // console.log('NodeService', 'insert')
        // console.log('accountProvider:encrypted', this.account)

        let rk;
        try {
            rk = await GetPrivateKeyFromNep2(this.account.encrypted, passphrase)
            console.log('NodeService:rk', rk)
        } catch (err) {
            throw new Error(MSG[206])
        }
        body.message = u.ab2hexstring(secureRandom(10))
        body.signature = wa.create.signature(body.message, rk)

        body.publicKey = wallet.getPublicKeyFromPrivateKey(rk, true)

        // console.log('NodeService', body)

        const result = await this.apiProvider.postV2(`node/new`, body).toPromise()


        if (result.code !== 200) {
            throw new Error(MSG[result.code])
        }

        const resultBroadcast = await this.apiProvider.postV2(`node/broadcast`, {
            "publicKey": body.publicKey,
            "signature": wa.create.signature(result.data.transaction, rk),
            "transaction": result.data.transaction
        }).toPromise()

        if (resultBroadcast.code !== 200) {
            throw new Error(MSG[result.code])
        }


        return true;

        /*
        this.apiProvider.postV2(`node/new`, body).subscribe(result => {
            console.log('NodeService', result)
            // {

            //     "publicKey":"",
            //     "signature":"",
            //     "transaction":""
            // }
            if (result.code === '200') {
                this.apiProvider.postV2(`node/broadcast`, {
                    "publicKey": body.publicKey,
                    "signature": wa.create.signature(result.data.transaction, 'c5ba9b99c81cefe9227160669a5f3058fa8a7fb40abfd85cd7eee57d6315107d'),
                    "transaction": result.data.transaction
                })
                    .subscribe(broadcast => {
                        console.log('NodeService:broadcast', broadcast)
                    })
            }

        })
        */

    }

    // amount      	提取数量
    // publicKey   	公钥
    // signature   	签名
    // message	随机信息

    async withdraw(passphrase) {
        let rk;
        try {
            rk = await GetPrivateKeyFromNep2(this.account.encrypted, passphrase)
            console.log('NodeService:rk', rk)
        } catch (err) {
            console.log('NodeService:rk', err)
            throw new Error(MSG[206])

        }

        const body = {
            message: '',
            signature: '',
            publicKey: '',
        };


        body.message = u.ab2hexstring(secureRandom(10))
        body.signature = wa.create.signature(body.message, rk)

        body.publicKey = wallet.getPublicKeyFromPrivateKey(rk, true)

        const result: any = await this.apiProvider.postV2(`node/withdraw`, body).toPromise()

        if (result.code !== 200) {
            console.log('MSG[result.code]', result.code)
            console.log('MSG[result.code]', MSG[result.code])
            throw new Error(MSG[result.code])
        }

        return true
    }


    async signin(wif) {
        // let rk;
        // try {
        //     rk = await GetPrivateKeyFromNep2(this.account.encrypted, passphrase)
        //     console.log('NodeService:rk', rk)
        // } catch (err) {
        //     throw new Error(206)
        // }

        const body = {
            message: '',
            signature: '',
            publicKey: '',
        };

        const rk = wallet.getPrivateKeyFromWIF(wif)

        // console.log('rk', rk)

        body.message = u.ab2hexstring(secureRandom(10))
        body.signature = wa.create.signature(body.message, rk)
        body.publicKey = wallet.getPublicKeyFromPrivateKey(rk, true)


        // console.log('rk', rk)
        // console.log('publicKey', body)

        const result: any = await this.apiProvider.postV2(`node/signin`, body).toPromise()

        if (result.code !== 200) {
            throw new Error(MSG[result.code])
        }

        return true
    }

    // signinHistory() {
    //     this.apiProvider.getV2(`node/history/signin/${this.account.address}`).toPromise()
    // }


    async bonusHistory() {
        // this.apiProvider.getV2(`node/history/bonus/${this.account.address}`).subscribe(result => {
        //     console.log('bonusHistory', result)
        //     if (result.code === 2000) {
        //         return result.data
        //     }
        // })
    }

    async unlock(passphrase) {
        let rk;
        try {
            rk = await GetPrivateKeyFromNep2(this.account.encrypted, passphrase)
            console.log('NodeService:rk', rk)
        } catch (err) {
            console.log('NodeService:rk', err)
            throw new Error(MSG[206])
        }

        const body = {
            message: '',
            signature: '',
            publicKey: '',
        };

        body.message = u.ab2hexstring(secureRandom(10))
        body.signature = wa.create.signature(body.message, rk)
        body.publicKey = wallet.getPublicKeyFromPrivateKey(rk, true)

        // this.apiProvider.postV2(`node/unlock`, body).subscribe(result => {
        //     console.log('unlock', result)
        //     // return 'ok'
        //     if (result.code === 200) {
        //         return 'ok'
        //     }
        // })

        const result: any = await this.apiProvider.postV2(`node/unlock`, body).toPromise()

        if (result.code !== 200) {
            throw new Error(MSG[result.code])
        }

        return true
    }

}
