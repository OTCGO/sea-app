export * from './debug'
export * from './wallet.utils'

export const isEmpty = array => Array.isArray(array) && array.length === 0

export const arrayToObjectReducer = (acc, cur) => Object.assign(acc, cur)
