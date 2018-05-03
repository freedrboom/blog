const getFromObject = (object, path) => {
  let temp = {}
  path.forEach(value => {
    if (value in object) {
      temp[value] = object[value]
    }
  })
  return temp
}

export default getFromObject
