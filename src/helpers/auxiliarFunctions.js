export const uniqBy = (_arr, _key) => {
  let index = [];
  return _arr.filter((item) => {
      let k = _key(item);
      return index.indexOf(k) >= 0 ? false : index.push(k);
  });
}

export const capitalize = (word) => {
  if (word[0] === undefined) {
    return ""
  }else {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }
}

export const lettersOnly = (str) => {
  return str.replace(/[^a-z A-Z]/g, "")
}

export const regionNames = new Intl.DisplayNames(
  ['es'], { type: 'region' }
);