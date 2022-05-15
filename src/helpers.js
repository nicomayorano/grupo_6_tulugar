const fs = require('fs');
const path = require('path');

const helpers = {
  /**
   * Transforma una frase camel case a proper case, con palabras espaciadas
   * Se puede mejorar para que separe las palabras en un array de palabras para quitar los espacios
   * En caso de un input de palabras separados por espacios, no devolveria dos espacios antes del
   * comienzo de cada palabra
   * @example input: 'holaMundo'. output: 'Hola Mundo'.
   * @param {Sting} phr String camel case
   * @returns {String} Palabras que inician en mayúsucula y luego minúsculas separadas por espacio
   */
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
  /**
   * Transforma una frase en mayúsculas a proper case. No modifica espacios
   * @example Input: 'HOLA MUNDO'. Output: 'Hola Mundo'.
   * @example Input: 'HOLAMUNDO'. Output: 'Holamundo'.
   * @param {Sting} phr String de palabras en mayúscula
   * @returns {String} Palabras que inician en mayúsucula y luego minúsculas separadas por espacio
   */
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
  /**
   * Remueve las imágenes que no deben persistirr por edición o eliminación del producto
   * @param {String|Array} arr Array con el nombre de los archivos a eliminar
   */
  removeOldProductsImages(arr) {
    const basePath = path.resolve(process.cwd(), 'src', 'public', 'productsImages');
    if (arr.length) {
      for (let i = 0; i < arr.length; i += 1) {
        fs.rm(path.resolve(basePath, arr[i]));
      }
    }
  },
};

module.exports = helpers;
