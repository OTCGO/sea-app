// this.onmessage = function(msg) {
//     console.log('work', msg)    //  10
//     this.postMessage('work')  // 向主线程发送数据
// }

onmessage = function(msg){
    // 收到
    console.log('work', msg)    //  10


    postMessage(11111);
   
}
