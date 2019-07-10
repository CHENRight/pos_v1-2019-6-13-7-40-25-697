'use strict';

function getTags(tags) {
    const result = {};
    const keys = [];
    const pushItem = (key, value) => {
        !keys.includes(key) && keys.push(key);
        result[key] = result[key] ? result[key] + parseFloat(value) : parseFloat(value);
    };
    const splitKeys = ['-'];

    const matchSplitKey = str => {
        const matchKeys = splitKeys.filter(item => str.includes(item));
        return matchKeys.length > 0 ? matchKeys[0] : undefined;
    };

    for(var i in tags){
        var temp = tags[i];
        const flag = matchSplitKey(temp);
        if(flag){
            const [key,value] = temp.split(flag);
            pushItem(key,value);
        }else{
            pushItem(temp,1);
        }
    }
    return keys.map(temp => ({ barcode: temp, num: result[temp] }));
    //返回  "ITEM000003", count: 2.5
}

function includeBarcode(promotionBarcode,itemBarcode) {
    let flag = false;
    promotionBarcode.forEach(pro =>{
        if(pro == itemBarcode){
            flag = true;
        }
    });
    return flag;
}

function createReceipt(cart,database,promotionBarcode) {
    let receipt = new Array();
    cart.forEach(item => {
        database.forEach(data => {
            if(item['barcode'] == data['barcode']){
                if(includeBarcode(promotionBarcode,item.barcode) && item.num >= 2 ){
                    let tempsum = parseFloat(data.price) * (parseFloat(item.num) - 1.0);
                    receipt.push({'name':data['name'],'num':item['num'],'price':data['price'],'unit':data.unit,'tempsum':tempsum,'Itemdiscount':data.price});
                }else {
                    //let tempsum2 = data['price'] * item['num'];
                    receipt.push({'name':data['name'],'num':item['num'],'price':data['price'],'unit':data.unit,'tempsum':data['price'] * item['num'],'Itemdiscount':0.0});
                }
            }
        })
    });
    return receipt;
}

function printReceipt(tags) {
    const database = loadAllItems();
    const promotionItem = loadPromotions();
    const promotionBarcode1 = promotionItem.map(item => item.barcodes);
    const promotionBarcode = [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
    ];
    let finalReceipt = '***<没钱赚商店>收据***' + "\n";
    let sum = 0;
    let sumDiscount = 0;
    //整理商品
    let cart = getTags(tags);
    //获取商品所有信息
    let receipt = createReceipt(cart,database,promotionBarcode);
    //打印收据
    receipt.forEach(item =>{
        //名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
        finalReceipt += ("名称：" + item.name + "，数量：" + item.num + item.unit + "，单价：" + (parseFloat(item.price)).toFixed(2) + "(元)，小计：" + (parseFloat(item.tempsum)).toFixed(2) + "(元)\n");
        sum += item.tempsum;
        sumDiscount += item.Itemdiscount;
    })
    finalReceipt += "----------------------\n";
    finalReceipt += ("总计：" + (sum).toFixed(2) + "(元)\n");
    finalReceipt += ("节省："+ (sumDiscount).toFixed(2) + "(元)\n**********************");

    console.log(finalReceipt);
}

module.exports = {
    printReceipt,
}

