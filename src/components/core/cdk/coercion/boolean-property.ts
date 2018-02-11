export const coerceBooleanProperty = (value): boolean =>
	(value != null && `${value}` !== 'false')