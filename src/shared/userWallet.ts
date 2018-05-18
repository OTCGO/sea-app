import { Contact } from '../shared/models'

const CONTACT_A: Contact = {
	name: 'John',
	address: 'AHZDq78w1ERcDYVBWjU5owWcbFZKLvhg7X',
	description: 'Work friend'
}

const CONTACT_B: Contact = {
	name: 'Joe',
	address: 'AXoibWhJXYRxckemGa8ZydGpQdBP7GX7st',
	description: 'Special friend'
}

const CONTACT_C: Contact = {
	name: 'Tom',
	address: 'AJnNUn6HynVcco1p8LER72s4zXtNFYDnys'
}

const CONTACT_D: Contact = {
  name: '张三',
  address: 'ANsvyS9q1n6SBDVSdB6uFwVeqT512YSAoW',
	description: '我的中国朋友'
}

export const TEST_CONTACTS: Contact[] = [
  CONTACT_A,
  CONTACT_B,
  CONTACT_C,
  CONTACT_D
]

export const nep5Wallet = {
  'name': 'userWallet',
  'version': '1.0',
  'scrypt': {
    'cost': 16384,
    'blockSize': 8,
    'parallel': 8,
    'size': 64
  },
  'accounts': [
    {
      'address': 'AWqp5iP81A8boBcheWFQgLqnks4wkPkmRg',
      'label': '1',
      'isDefault': false,
      'lock': false,
      'key': '6PYLnNeafXYEt3jnv9Z7oLa3obcTM3BLqt13MBBzk25yo613WQ3pnBD93B',
      'contract': {},
      'extra': {
        CONTACT_A,
        CONTACT_B
      }
    },
    {
      'address': 'AXoibWhJXYRxckemGa8ZydGpQdBP7GX7st',
      'label': '1234',
      'isDefault': true,
      'lock': false,
      'key': '6PYU48pchs8osmxzHoKFX4Ka16SyutmvzkdH1ptjhJymPxJ39nx6qfBs8x',
      'contract': {},
      'extra': {
        CONTACT_A,
        CONTACT_B
      }
    }
  ],
  'extra': null
}

export const oldWallet = {
  'address': 'AHZDq78w1ERcDYVBWjU5owWcbFZKLvhg7X',
  'publicKey': '0483cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a180eee2ada65ddb65154863c57bac9ab1b89a61593235991d5fb6f627c0cadbd',
  'publicKeyCompressed': '0383cdbc3f4d2213043c19d6bd041c08fbe0a3bacd43ef695500a1b33c609a9e8a',
  'privateKeyEncrypted': 'U2FsdGVkX1/TSwg9yTR+kDT8QKgC5yAQpc64KI0XyiCz97ozFLJK8YNJxvahqHr4lmBLYxZkM4E9tpIVHsblJjcjio19hb8L+uiYM4WXUAFQtpXIDDvwIP+TutTKQHOH'
}
