function getTags(tags) {
  let result = {};
  let keys = [];
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
  return keys.map(temp => ({ key: temp, count: result[temp] }));
}

console.log(getTags(tags));

module.exports = {
  getTags,
}
