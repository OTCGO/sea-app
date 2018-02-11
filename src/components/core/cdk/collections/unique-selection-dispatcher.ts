import { Injectable, Optional, SkipSelf } from '@angular/core'

export type UniqueSelectionDispatcherListener = (id: string, name: string) => void

@Injectable()
export class UniqueSelectionDispatcher {
	private _listeners: UniqueSelectionDispatcherListener[] = []

	notify(id: string, name: string) {
		for (let listener of this._listeners) listener(id, name)
	}

	listen(listener: UniqueSelectionDispatcherListener): () => void {
		this._listeners.push(listener)
		return () => {
			this._listeners = this._listeners.filter(
				(registered: UniqueSelectionDispatcherListener) => listener !== registered
			)
		}
	}
}

export const UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY =
	(parentDispatcher: UniqueSelectionDispatcher) => parentDispatcher || new UniqueSelectionDispatcher()

export const UNIQUE_SELECTION_DISPATCHER_PROVIDER = {
	provide: UniqueSelectionDispatcher,
	deps: [[new Optional(), new SkipSelf(), UniqueSelectionDispatcher]],
	useFactory: UNIQUE_SELECTION_DISPATCHER_PROVIDER_FACTORY
}
