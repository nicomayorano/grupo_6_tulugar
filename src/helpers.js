const { resolve } = require('path');
const { readdir } = require('fs/promises');
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

  async readFilesRec(dir) {
    const entries = await readdir(dir, { withFileTypes: true });
    const thisDir = {
      folder: path.basename(dir),
      files: [],
      directories: [],
    };

    const innersPromises = [];
    for (let i = 0; i < entries.length; i += 1) {
      if (entries[i].isDirectory()) {
        innersPromises.push(helpers.readFilesRec(resolve(dir, entries[i].name)));
      } else {
        thisDir.files.push(entries[i].name);
      }
    }

    thisDir.directories = await Promise.all(innersPromises);
    return thisDir;
  },

  getRouters(objetizedDir, acc = {}, history = []) {
    history.push(objetizedDir.folder);

    for (let i = 0; i < objetizedDir.files.length; i += 1) {
      Object.defineProperty(acc, `${history.join('/').replace('routes', '')}/${objetizedDir.files[i] === 'main.js' ? '' : objetizedDir.files[i].replace('.js', '')}`, {
        value: `${history.join('/')}/${objetizedDir.files[i]}`,
        enumerable: true,
      });
    }
    if (objetizedDir.directories.length) {
      objetizedDir.directories.forEach((elem, index) => {
        helpers.getRouters(objetizedDir.directories[index], acc, history);
      });
    }
    return acc;
  },
};

module.exports = helpers;
