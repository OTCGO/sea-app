import 'reflect-metadata'

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from './app.module'
import { dev } from '../environments/environment'

if (!dev) {
	enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
