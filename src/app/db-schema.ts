import { DBSchema } from '@ngrx/db'

export const schema: DBSchema = {
	version: 1,
	name: 'sea_app',
	stores: {
		markets: {
			autoIncrement: false,
			primaryKey: 'symbol'
		},
		prices: {
			autoIncrement: true
		}
	}
}
