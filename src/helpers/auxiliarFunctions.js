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

export const normalizeDate = (date) => {
  const aux = new Date(date)
  var numberOfMlSeconds = aux.getTime();
  var addMlSeconds = 60 * 60000 * 24;
  var newDateObj = new Date(numberOfMlSeconds + addMlSeconds);
  var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  return newDateObj.toLocaleDateString('es-ES', options);
}

export const normalizeDateWithHour = (date) => {
  const aux = new Date(date)
  var options = { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return aux.toLocaleDateString('es-ES', options);
}