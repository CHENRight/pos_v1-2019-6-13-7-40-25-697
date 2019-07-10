const opratecart = require("../../practices/test/getTagss.js");

const tags = [
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000001',
  'ITEM000003-2.5',
  'ITEM000005',
  'ITEM000005-2',
];

describe('manage the tags to cart', function() {

  it('should return array', function () {

    //when
    let result = opratecart.getTags(tags);
    //then
    expected(result).toEqual([
      {
        'barcode':'ITEM000002',
        'num':6,
      },
      {
        'barcode':'ITEM000001',
        'num':3,
      },
      {
        'barcode':'ITEM000003',
        'num':4,
      }
    ])
  });

})

