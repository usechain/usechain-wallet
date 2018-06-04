
var cfg= {
    "cahost":"http://39.108.126.88:8090/",
    "usthost":"http://39.108.171.121:8545"
} 
var web3 = new Web3();
var error = web3.setProvider(new web3.providers.HttpProvider(cfg.usthost));
web3.eth.getGasPrice().then(function(p) {
});
console.log("web3初始化a:"+error)
//if(!web3._provider.connected){
//	alert("连接失败,钱包无法使用", "警告") 
//
//}
console.log() 
var wallet = Wallet.fromPrivateKey(Buffer.from('4ac8a6c0effc132f35f77803d50e94e8d4ffde41cd500d81db2d1a5e89dd4ac3', 'hex'));
console.log("ethereum.js 初始化完成")
//保存(下载)一个js对象为文件 
function download(data) {
    //data = JSON.stringify(Obj);
    var urlObject = window.URL || window.webkitURL || window;

    var downloadData = new Blob([data]);

    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(downloadData);
    save_link.download = "USB--"+Obj.address;
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click", true, false, window, 0, 0, 0, 0, 0
      , false, false, false, false, 0, null
    );
    save_link.dispatchEvent(ev);
    //fake_click(save_link);
} 
//签名交易
function sendtx(tx){
	console.log("sendtx")

 web3.eth.sendSignedTransaction(tx, function(err, hash) {
  if (!err) {
     console.log("交易hash:"+hash);
     return hash;
  } else {
      console.log(err);
      return false;
  }
});

}
function outputObj(obj) {  
  var des = "";  
    for(var name in obj){  
    des += name + ":" + obj[name] + ";";  
     }  
  console.log(des); 
}  
function signeg(wallet){
    const privateKey = wallet.getPrivateKey()
    //var tcert = gettcert();
    var tcert = 'MIICVDCCAbagAwIBAgIRAPY/0ahy5ZW6DFVIlOQDvzMwCgYIKoZIzj0EAwQwIDELMAkGA1UEBhMCQ04xETAPBgNVBAoTCFVzZUNoYWluMB4XDTE4MDMyMjA1NDI0NFoXDTI4MDMyMjA1NDI0NFowIDELMAkGA1UEBhMCQ04xETAPBgNVBAoTCFVzZUNoYWluMIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQArR96ImQpzbL3wT12iB5ezPUcN6Yl5DYK/GqvNJ4RYQR+gFD9UMIm3Hg3Caff5dYihFXdVfqJNa+IiSANpvC9NeEANm443CP+s2FbjWH6PQRDBrZ47KsBSMAmop/gAbnEbcn0v/zQ5YGGpSAeC24VhwCsOsFWpko8QvUQ27sADDfxhsKjgY0wgYowDgYDVR0PAQH/BAQDAgKkMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjAPBgNVHRMBAf8EBTADAQH/MEgGA1UdEQRBMD+CCWxvY2FsaG9zdIEyMHhkMmExMzIxMzljYTYzNDQ3YTdhZmZjNDkxNDNjMTdiZjgxOTQ4ZDU0QDE2My5jb20wCgYIKoZIzj0EAwQDgYsAMIGHAkIBYxNUNDVXGnBykASp00FLevafgM0hBz5M3Mi2SBOYOhzXCdzjwSbXjRdbYgeM+0yFSvxbzt2qSbSoMjOPAt4jeQwCQVUICYeckEQ15stoAJExROiYaIrAcmdGZHSPaz980KLDf4oETLDr4Rk1r6tnYeTRbDrOvJHMJU+rNyzjCXhuzf1s';
    var level = 1;
    console.log(wallet.getAddress())
    var nonce =web3.eth.getTransactionCount(wallet.getAddressString(),'pending')
    alert(nonce)
    const txParams = {
        nonce: nonce,
        gasPrice: '0x3B9ACA00', 
        gasLimit: '0x33C20A',
        to: '0xcc73428bD9B2a5bbCd49289C1e1966D24b50433D', 
        value: '0x00', 
        //data: '0x' + '60fe47b1' + '000000000000000000000000000000000000000000000000000000000000000a'
        // nonce: '0x14',
        // gasPrice: '0x3B9ACA00', 
        // gasLimit: '0xC20A',
        // to: '0x8c60e6a473bedb869edf0ae5991fecb7ebdb6aee', 
        // value: '0x00', 
        //前缀32位 共64个16进制字符
        data: '0x' + 'd95f1e84'+ '0000000000000000000000000000000000000000000000000000000'+ level + tcert,
        // data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
        // chainId: 3
    }

    const tx = new Tx(txParams)
    tx.sign(privateKey)
    const serializedTx = tx.serialize()
    console.log (serializedTx);
    return serializedTx;
    
}


function send(wallet){
    var addr = wallet.getAddressString();

    console.log(addr)
    web3.eth.getBalance(             
        addr
    , function(err, result){
        if(!err)
            alert( 'Account has a balance of ' + String(web3.fromWei(result, 'ether')) + ' ether...');
    });
    serializedTx = signtx(wallet)
    console.log("send transation")
    web3.eth.sendRawTransaction('0x'+ serializedTx.toString('hex'), function(err, hash) {
        if (!err) {
            console.log(hash);
        } else {
            console.log(err)
        }
    }

    );
    // web3.eth.sendTransaction({
    //     from: $("web3_fromAddress").value
    //     , to: $("web3_toAddress").value
    //     , value: web3.toWei($("web3_value").value, 'ether')
    //     , gas: 300000
    // }, function(err, result){
    //     var html = '';
        
    //     if(err)
    //         html = 'There was an error with the transaciton: ' + String(err);
    //     else
    //         html = 'The transaction went through succesfully, hash: ' + String(result);
        
    //     $("web3_result").innerHTML = html;
    // });
}