exports.random = (min, max)=> {
  return min + Math.floor(Math.random() * (max - min + 1))
}

exports.randomArray = (arr)=> {
  return arr[exports.random(0, arr.length - 1)]
}
