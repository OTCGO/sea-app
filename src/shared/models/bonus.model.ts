export interface Bonus {
    total: string,
    remain: string,
    fee: string,
    withdraw_max: string,
    withdraw_actually: string,
    history: [{
        "lockedbonus": string,
        "teambonus": string,
        "signinbonus": string,
        "amount": string,
        "total": string,
        "remain": string,
        "bonustime": string,
    }]
    // id: string
    // address: string
    // lockedbonus: string
    // // referralsbonus: string
    // signinbonus: string
    // teambonus: string
    // amount: string
    // total: string
    // remain: string
    // bonustime: string
}



// "total": "3.6",
//         "history": [
//             {
//                 "lockedbonus": "1.64",
//                 "teambonus": "0",
//                 "signinbonus": "0.16",
//                 "amount": "1.8",
//                 "total": "3.6",
//                 "remain": "3.6",
//                 "bonustime": 1568995818
//             },
//             {
//                 "lockedbonus": "1.64",
//                 "teambonus": "0",
//                 "signinbonus": "0.16",
//                 "amount": "1.8",
//                 "total": "1.8",
//                 "remain": "1.8",
//                 "bonustime": 1568909418
//             }
//         ]