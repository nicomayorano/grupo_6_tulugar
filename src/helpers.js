const helpers = {
  camelCaseToProperCase(phr) {
    let acc = '';
    acc += phr[0].toUpperCase();
    for (let i = 1; i < phr.length; i += 1) {
      if (phr.charCodeAt(i) < 90) {
        acc += ` ${phr[i]}`;
      } else {
        acc += phr[i];
      }
    }
    return acc;
  },
  upperCaseToProperCase(phr) {
    let acc = '';
    let next = false;
    const phrase = phr.trim().toLowerCase();
    acc += phrase[0].toUpperCase();
    for (let i = 1; i < phrase.length; i += 1) {
      if (next) {
        acc += phrase[i].toUpperCase();
        next = false;
      } else {
        if (phrase[i] === ' ') next = true;
        acc += phrase[i];
      }
    }
    return acc;
  },
};

module.exports = helpers;
