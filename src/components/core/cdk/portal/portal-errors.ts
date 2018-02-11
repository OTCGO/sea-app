export const throwNullPortalError = () => {throw Error('Must provide a portal to attach')}

export const throwPortalAlreadyAttachedError = () => {throw Error('Host already has a portal attached')}

export const throwPortalOutletAlreadyDisposedError = () => {throw Error('This PortalOutlet has already been disposed')}

export const throwUnknownPortalTypeError = () => {
	throw Error('Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal')
}

export const throwNullPortalOutletError = () => {throw Error('Attempting to attach a portal to a null PortalOutlet')}

export const throwNoPortalAttachedError = () => {throw Error('Attempting to detach a portal that is not attached to a host')}
