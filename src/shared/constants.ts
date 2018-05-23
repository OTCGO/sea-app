import { I18n } from '@shared/models'
import { getBrowserLanguage } from '../shared/utils'
import {
	ICurrency,
	ISetting
} from './models'
import { dev } from '../environments/environment'

const ASSET_HASH = {
	'NEO': 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
	'GAS': '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
	'QLC': '0d821bd7b6d53f5c2b40e217c6defc8bbe896cf5',
	'TNC': '08e8c4400f1af2c20c28e0018f29535eb85d15b6',
	'TKY': '132947096727c84c7f9e076c90f08fec3bc17f18',
	'RHT': '2328008e6f6c7bd157a342e789389eb034d9cbc4',
	'CPX': '45d493a6f73fa5f404244a5fb8472fc014ca5885',
	'ACAT': '7f86d61ff377f1b12e589a5907152b57e2ad9a7a',
	'ZPT': 'ac116d4b8d4ca55e6b6d4ecce2192039b51cccc5',
	'APH': 'a0777c3ce2b169d4a23bcba4565e3225a0122d95',
	'DBC': 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
	'RPX': 'ecc6b20d3ccac1ee9ef109af5a7cdb85706b1df9',
	'BCS': '546c5872a992b2754ef327154f4c119baabff65f',
	'TestCoin': '025d82f7b00a9ff1cfe709abe3c4741a105d067178e645bc3ebad9bc79af47d4',
	'Hello AntShares Mainnet': '439af8273fbe25fec2f5f2066679e82314fe0776d52a8c1c87e863bd831ced7d',
	'量子股份': '1b504c5fb070aaca3d57c42b5297d811fe6f5a0c5d4cd4496261417cf99013a5',
	'赏金（SJ-Money)': '459ef82138f528c5ff79dd67dcfe293e6a348e447ed8f6bce5b79dded2e63409',
	'申一股份': '30e9636bc249f288139651d60f67c110c3ca4c3dd30ddfa3cbcec7bb13f14fd4',
	'量子积分': '0ab0032ade19975183c4ac90854f1f3c3fc535199831e7d8f018dabb2f35081f',
	'开拍学园币（KAC）': '07de511668e6ecc90973d713451c831d625eca229242d34debf16afa12efc1c1',
	'宝贝评级': '7ed4d563277f54a1535f4406e4826882287fb74d06a1a53e76d3d94d9b3b946a',
	'橙诺': 'dd977e41a4e9d5166003578271f191aae9de5fc2 de90e966c8d19286e37fa1e1',
	'申一币': 'a52e3e99b6c2dd2312a94c635c050b4c2bc2485fcb924eecb615852bd534a63f',
	'无忧宝': '7f48028c38117ac9e42c8e1f6f06ae027cdbb904eaf1a0bdc30c9d81694e045c',
	'未来研究院': '9b63fa15ed58e93339483619175064ecadbbe953436a22c31c0053dedca99833',
	'明星资本': '308b0b336e2ed3d718ef92693b70d30b4fe20821265e8e76aecd04a643d0d7fa',
	'量子人民币': '6161af8875eb78654e385a33e7334a473a2a0519281d33c06780ff3c8bce15ea',
	'人民币CNY': 'cb453a56856a236cbae8b8f937db308a15421daada4ba6ce78123b59bfb7253c',
	'开拍学园': 'c0b3c094efd1849c125618519ae733e3b63c976d60fc7e3d0e88af86a65047e3',
	'币区势': '3ff74cf84869a7df96ede132de9fa62e13aa3ac8a6548e546ad316f4bda6460c',
	'花季股': 'c39631b351c1f385afc1eafcc0ff365977b59f4aa4a09a0b7b1f5705241457b7'
}

const ASSET_HASH_TEST = {
	'GAS': '602c79718b16e442de58778e148d0b1084e3b2dffd5de6b7b16cee7969282de7',
	'NEO': 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
	'QLC': 'a0a527e08dbcd51f602a6df20ece7af515d5087b',
	'NXT': '0b6c1f919e95fe61c17a7612aebfaf4fda3a2214',
	'RHTT': '400cbed5b41014788d939eaf6286e336e7140f8c',
	'RHTT2': 'd3de84c166d93ad2581cb587bda8e02b12dc37ca',
	'GDEX': '21855aa0c7a373403e88b461003a6ec03533d193923c6a43537900148361b357',
	'QLC_T2': '67817fa4003996bf9ecf2a55aaa7eb5ee08a8514cf8cbe9065c3e5404f2c1adc',
	'TestCoin': '0c092117b4ba47b81001712425e6e7f760a637695eaf23741ba335925b195ecd',
	'NeoToken': '90f98951b2528541a19db9a7a452faf81cd6890a0e6262679c7617eb5fa5694d',
	'RevTokens': '1521c9b5153513eaa965835d5e69fced87f07f09532bca9269781aa29ab18167',
	'NEOVERSION': '4a629db0af0d9c7ee0e11f4f4894765f5ab2579bcc8b4a203e4c6814a9784f00',
	'测试股': '21ef3190e1c8fb9986d63ab98eed4937a3f095e2ed9fd05220a9047c88561319',
	'申一币': 'e13440dccae716e16fc01adb3c96169d2d08d16581cad0ced0b4e193c472eac1',
	'申一股份': 'bbb7a08e52a5242079487fead6753dd038d41197e04e342b6f7b7358936551ea',
	'量子积分': 'beb6f821b9141269f06ee5205531a13777be727ec005c53334f2ea82585426fb',
	'量子股份': 'ab84419d6a391b50400dc6f5ab63528ea8ecb32b81addfb4c7f8afe44be6c1ac',
	'人民币CNY': '2dbd5d6be093f6bdd7e59d1faedfd2656422aaf749719903e8dab412b4349e81',
	'开拍学园币（KAC）': 'b426d50907c2b1ff91a8d5c8f1da3bea77e79ada05885719130d99cabae697c0',
	'注册代币类资产': 'bb9d95d887558e73a27af025f2b7b93d6c9ac9a7d5c811118afb2d6e28599fbe',
	'LOCALTOKEN': '7a52ff333efff6d57c6d08382f706184509a594f2c00ba659d626d3cde3ea2e0',
	'ctest': '98f1a907614a94315d5f2d407bee567f43cc8d1c873aaaaa4d2a1983ea089126',
	'TKY': 'dbe1ae10018c199a7fb35c5c0c65043e3a67bb28',
	'CGE8': 'dcd44e1ee477bc62654d1325ad0d960f58167bdc',
	'为啥转我neo': '0a88b77093f62f81dc1b30832cef335e9c515b1b4e7aff817fcc105d947dc79b',
	'HER': '49aba29e544ae2b6bedc617c0c7f0d09cac0ecab5444364ba06152cee653a274',
	'WTC': '24c60cca01698ed268af6511fbe7164ec90e69299623ca7a6ead409250584269',
	'测试': '252a904aac6c2205e47968e407ce64531218e637e2ac073266da06d68fce71d8',
	'QLC2': '47f0b6b4ed9022acb18651aec5724c0e3addcda9',
	'DBC': 'b951ecbbc5fe37a9c280a76cb0ce0014827294cf',
	'APHPTest10.2X': 'a2df2e12d76bcf4580ca3178d3790b697eece053',
	'HelloNep-6': '400ead36b1bea6205bcf53cfe119ead756eecd602366947c8c4fcae931f2aa6b',
	'CGE7': 'ccc46b6ef854aff01fde3cdf78cf7c78bd4200e0',
	'.1': '8467f6df3723f5bdbb5eb892c0852995dceba372f99fa6a32b23f66d1261759a',
	'TNC': '0d44fe9d77c0e578355d9834a2a55677a1fbab34',
	'RHTT4': 'f9572c5b119a6b5775a6af07f1cef5d310038f55',
	'GWM_Area': 'fdfb91f66e98867dd40fcb4cb6b332ae508ea503c62875bfbab90b9e0907022d',
	'GWMCoin': 'e2d8fd60e0ca94be17efd7f56587fa6901d2aef404ebc7b952b43fd4a96d2733',
	'X2T': '0fe9513776f43ddaadf0dc211b635719953c469f',
	'1': '4714923678a93e4598353a2dcf4dccfdf8f8c90a76944a8ba0b0f0726ae07fbe',
	'Z1T': 'cdca68b6eecad1189ff054000c308ecb10db505d',
	'CGE': '3b2013c9a003eb81db07b2b64479653e4198968c86b3c2c2ff7ba5ff7a36f6ea',
	'XShare': 'd2d3cd54f25ea0d6baa2e676b535dfcdaf040c6f5af0e03b051c0ab1117e43b0',
	'TEST2': '691b82ca893efb66c21fb99bf7827449df05e165b12cc35abb7dfbc3a9ddd251',
	'WEEE': 'eaad28f7de3cd4fa92dca4c29e0ccec290a966df8afa09a43e19655e114591a0',
	'Aphelion': 'd2305f4ae49f449bf0ade51c0935e108529e359b50b17bb156e24a36fda2c8f4',
	'testcoin': '6cf8fe04868181d597fc882f44bfe0b6fe75ba8cd74e9fd1e4e733afa20f87bd',
	'BEER': '30f01e96570642bbba756056f2c580756d41f19f61022fa67483486d887c2e28',
	'Boknaai': '6ca744fd47ae501b15c29a7e6207b4d398884d63078a89d1e03ac7260efd1334',
	'为啥转我neo2': '88d230121be7e9e28ea9c328e0b6d6820aebbdc8b7a499c0a1b873d872460b69',
	'Widgits': '26ab5289b1f16046a3bf0050db2701cf9cf7f262402c84612c04ab01a162f138',
	'NEO2': 'cc58dd29a7dd3caa1d59018d599079def5acc8c00333d849b05e4356e02f64b2',
	'NEO+': '6ab42708e860905a9274f3e1b7a7902ba2346f8052978fedcc14de42d72ca615',
	'Wu-tang Coin': 'd2a312575aebfa0c65850ea13899b0a97e8cfd7f0346b772717659f669d5622c',
	'测试2': '432694cb5b9a2040e3a003d42066f32bbc0a2c45e6dab42abbba1e6031545555',
	'test': '39ff08d0a97057cf5ca8789be8e58e4e9e45a702cec7a97bac792c544e352dc7',
	'ts': '4922029d21a49942ea65fe57d3ef5c9bc5aad7285b6a49e487bcb6603a9f61f9',
	'GlobalAssetTest02': 'f7c8f7bb9367bd5100c67c65522fb5ffb90fb7614d051f3cdc940da7298c995c',
	'GlobalAssetTest01': 'd00053c2ff38c7b26c7a72997d3e3ed851082b277e4f518768c086458db52114',
	'iProud': '556befd5be5e3c0b8344b4b053f61d071e33316a33335f3d40024ea76832b59a'
}

export const NEO_HASH = 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b'


function enumeralize (obj) {
	return Object.keys(obj)
							 .map(key => ({ [key]: obj[key], [obj[key]]: key }))
							 .reduce((acc, cur) => Object.assign({}, acc, cur))
}

/**
 * Example:
 * ASSET: {
 *   'NEO': 'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b',
 *   'c56f33fc6ecfcd0c225c4ab356fee59390af8560be0e930faebe74a6daff7c9b': 'NEO',
 * }
 */
export const ASSET_ENUM = dev ? enumeralize(ASSET_HASH_TEST) : enumeralize(ASSET_HASH)


export const OLD_WALLET_CHECK_LIST = ['address', 'privateKeyEncrypted', 'publicKey', 'publicKeyCompressed']

export const NEW_WALLET_CHECK_LIST = ['name', 'version', 'scrypt', 'accounts', 'extra']

export const OTCGO_WALLET_FILE_NAME = 'OTCGO-mobile-wallet.json'

export const OTCGO_SETTING_FILE_NAME = 'OTCGO-settings.json'

export const DEFAULT_LANGUAGE = getBrowserLanguage()

export const DEFAULT_CURRENCY = DEFAULT_LANGUAGE === 'en' ? 'usd' : 'cny'

export const DEFAULT_SETTING: ISetting = {
	currency: DEFAULT_CURRENCY,
	language: DEFAULT_LANGUAGE
}

export const DEFAULT_SCRYPT = { n: 16384, r: 8, p: 8, size: 64 }

export const DEFAULT_EMPTY_WALLET = {
	name: 'OTCGO-mobile-wallet',
	scrypt: DEFAULT_SCRYPT,
	accounts: [],
	version: 'beta-0.6',
	extra: null
}

export const Currency: ICurrency = {
	'aud': '$',
	'brl': 'R$',
	'cad': '$',
	'chf': 'Fr.',
	'clp': '$',
	'cny': '¥',
	'czk': 'Kč',
	'dkk': 'kr. ',
	'eur': '€',
	'gbp': '£',
	'hkd': '$',
	'huf': 'Ft ',
	'idr': 'Rp ',
	'ils': '₪',
	'inr': '₹',
	'jpy': '¥',
	'krw': '₩',
	'mxn': '$',
	'myr': 'RM',
	'nok': 'kr ',
	'nzd': '$',
	'php': '₱',
	'pkr': '₨ ',
	'pln': 'zł',
	'rub': '₽',
	'sek': 'kr ',
	'sgd': 'S$',
	'thb': '฿',
	'try': '₺',
	'twd': 'NT$',
	'usd': '$',
	'zar': 'R ',
	'gas': 'gas',
	'btc': 'btc'
}

export const Languages: I18n = {
	'zh-cn': 'Chinese',
	'en': 'English'
}

export const FIVE_MINUTES_MS = 300000
