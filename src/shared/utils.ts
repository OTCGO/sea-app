export function debug(title): (...args: any[]) => void {
	return (...args: any[]): void => {
		console.group(title)
		args.forEach(arg => console.log(arg))
		console.groupEnd()
	}
}
