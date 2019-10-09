import { Component, OnInit } from '@angular/core'
import {
    IonicPage,
    NavController,
    NavParams
} from 'ionic-angular'
import { MenuService } from '../../shared/services'
import { Store } from '@ngrx/store'
import { RootState } from '../../store/reducers'
import { BalancesSelectors, NodeSelectors, WalletSelectors, BonusSelectors } from '../../store/selectors'
import { BalancesActions, NodeActions, BonusActions } from '../../store/actions'
// import { ApiProvider } from '../../providers/api'
import { AccountProvider, ApiProvider } from '../../providers'
import { NodeService } from '../../shared/services'

declare var Wechat: any;

@IonicPage({
    name: 'Node',
    segment: 'node'
})
@Component({
    selector: 'page-node',
    templateUrl: 'node.html',
})

export class NodePage implements OnInit {

    private address;
    private seacBanlance;
    private isJoin: boolean;
    private node
    private belowNodeNum // 对应旗下数
    private bonus = {
        total: '0'
    }

    private joinTitle

    constructor(private navCtrl: NavController, private menuService: MenuService,
        private store: Store<RootState>,
        private apiProvider: ApiProvider,
        private nodeService: NodeService,
        private accountProvider: AccountProvider,
    ) {

    }

    private tips = {
        '-10': '无效交易',
        '-9': '收款方不一致',
        '-8': '交易金额不一致',
        '-7': '解锁已确认',
        '-6': '解锁已退币待确认',
        '-5': '解锁未退币',
        '-4': '已到期已确认',
        '-3': '已到期已退币待确认',
        '-2': '已到期未退币',
        '-1': '新节点未确认',
        '610': '节点正在创建，请稍候'
    }


    async ngOnInit() {


        // seac balance
        this.store.dispatch(new BalancesActions.Load())
        this.store.select(BalancesSelectors.getSeacBalance).subscribe(balance => {
            // console.log('getSeacBalance:ngOnInit', balance)
            if (balance) {
                this.seacBanlance = balance.amount || '0';
            }

            return

            // // const result = parseFloat(balance.amount)

            //  this.ongBalance = result

        })


        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        }
        // 
        console.log('1')
        // this.store.select(WalletSelectors.getAddress).subscribe(address => {
        //     console.log('address', address)
        //     this.address = address
        // })
        // // const addresss = this.account.addresss;
        // // console.log('addresss', this.address)
        // this.apiProvider.getV2(`node/status/${this.address}`).subscribe(result => {

        //     this.store.dispatch(new NodeActions.LoadSuccess(result.data))
        // })

        this.store.dispatch(new NodeActions.Load())

        // console.log('2')
        // check is join
        this.store.select(NodeSelectors.getEntities).subscribe(async node => {
            this.node = node


            if (node && (node.code === 610)) {
                this.isJoin = false
                this.joinTitle = this.tips[`610`]

                await sleep(5000)
                this.store.dispatch(new NodeActions.Load())
                return
            }


            if (node && (node.status < 0)) {
                this.isJoin = false
                console.log('this.tips', this.tips[`${node.status}`])
                this.joinTitle = this.tips[`${node.status}`]

                await sleep(5000)
                this.store.dispatch(new NodeActions.Load())
                return
            }

            if (node && (node.status >= 0)) {
                this.isJoin = true
            }



            console.log('node:ngOnInit:node', node)
            if (node && node.nodelevel) {

                this.store.dispatch(new BonusActions.Load())

                this.store.select(BonusSelectors.getEntities).subscribe(bonus => {
                    if (bonus) {
                        console.log('bonus', bonus)
                        this.bonus = bonus
                    }


                })

                //显示旗下星数  >=5 才显示 
                if (node.nodelevel >= 5) {
                    const num = parseInt(node.teamlevelinfo.toString().substr((node.nodelevel - 1) * 4, 4), 18)
                    this.belowNodeNum = `旗下${node.nodelevel}星数：${num}`
                }
                return
            }



        })


        console.log('this.isJoin', this.isJoin)
        // Wechat.isInstalled().then(() => {

        // }).catch(() => {

        // });
    }
    gotoJoin() {
        console.log('handleJoin')

        //  if(node)
        // code === 600 not exist
        if (this.node.code === 600 || this.node.status === -4 || this.node.status === -7) {
            this.navCtrl.push("Join")
        }

    }

    gotoPick() {
        this.navCtrl.push("NodePick")
    }

    gotoCheckIn() {
        this.navCtrl.push("CheckIn")
    }

    gotoStatus() {
        this.navCtrl.push("NodeStatus")
    }

    handleMenu() {
        console.log('handleMenu')
        this.menuService.sendMessage("change")
    }

    share() {
        console.log('share')
        Wechat.share({
            text: "这是分享的标题",
            scene: Wechat.Scene.TIMELINE
        }, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
    }
}