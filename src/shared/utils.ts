export function debug(title): (...args: any[]) => void {
	return (...args: any[]): void => {
		console.group(title)
		args.forEach(arg => console.log(arg))
		console.groupEnd()
	}
}

export function contains (str, contained) {
	for (let i = 0, strLen = str.length, sliceLen = contained.length; i < (strLen - sliceLen + 1); i++) {
		if (str.substr(i, sliceLen) === contained) {
			return true
		}
	}
	return false
}
