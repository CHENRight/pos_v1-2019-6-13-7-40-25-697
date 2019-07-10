

function createReceipt(cart,database,promotionBarcode) {
  let receipt = new Array();
  cart.forEach(item => {
    database.forEach(data => {
      if(item['barcode'] == data['barcode']){
        if(promotionBarcode.includes(item) && item.num >= 2){
          let tempsum1 = data['price'] * ((item['num']) - 1);
          receipt.push({'name':data['name'],'num':item['num'],'price':data['price'],'unit':data.unit,'tempsum':tempsum1,'Itemdiscount':data.price})
        }else {
          let tempsum2 = data['price'] * item['num'];
          receipt.push({'name':data['name'],'num':item['num'],'price':data['price'],'unit':data.unit,'tempsum':tempsum2,'Itemdiscount':0});
        }
      }
    })
  });
  console.log(receipt);
  return receipt;
}

module.exports = {
  createReceipt,
}
