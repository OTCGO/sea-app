import { Injectable } from '@angular/core'
import { ApiProvider } from '../../providers'


@Injectable()
export class VersionProvider {

    private isDisplay: boolean
    constructor(private apiProvider: ApiProvider, ) {
        this.isDisplay = true
    }

    getVersion(type) {
        console.log('this.isDisplay', this.isDisplay)
        console.log('getVersion', type)
        if (this.isDisplay) {
            this.isDisplay = false
            return this.apiProvider.get(`version/${type}`).toPromise()
        }

    }
}
