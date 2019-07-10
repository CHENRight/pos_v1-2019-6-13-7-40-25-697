const createR = require("../../practices/test/createReceipt.js");

const cart = [
  {
    barcode: 'ITEM000002',
    num:3,
  },{
    barcode: 'ITEM000003',
    num:2.5,
  },{
    barcode: 'ITEM000004',
    num:3,
  }
];

const promotionBarcode = ['ITEM000002','ITEM000003','ITEM000005'];

const database = [
  {
    barcode: 'ITEM000000',
    name: '可口可乐',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000001',
    name: '雪碧',
    unit: '瓶',
    price: 3.00
  },
  {
    barcode: 'ITEM000002',
    name: '苹果',
    unit: '斤',
    price: 5.50
  },
  {
    barcode: 'ITEM000003',
    name: '荔枝',
    unit: '斤',
    price: 15.00
  },
  {
    barcode: 'ITEM000004',
    name: '电池',
    unit: '个',
    price: 2.00
  },
  {
    barcode: 'ITEM000005',
    name: '方便面',
    unit: '袋',
    price: 4.50
  }
];

describe("create a receipt object array",function () {
  it('should return a object array when given cart and database and promotionBarcode', function () {
    //when
    let receipt = createR.createReceipt(cart,database,promotionBarcode);
    //then
    expect(receipt).toEqual([{
      Itemdiscount: 5.5,
      name: "苹果",
      num: 3,
      price: 5.5,
      tempsum: 16.5,
      unit: "斤",
    },{
      Itemdiscount: 15,
      name: "荔枝",
      num: 2.5,
      price: 15,
      tempsum: 30,
      unit: "斤",
    },{
      Itemdiscount: 2,
      name: "电池",
      num: 3,
      price: 2,
      tempsum: 6,
      unit: "个",
    }
    ]);
  });
})
