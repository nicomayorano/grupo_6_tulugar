const fs = require("fs");
const path = require("path");

const propiedadesFilePath = path.join(__dirname, '../data/products.json');
const propiedades = JSON.parse(fs.readFileSync(propiedadesFilePath, 'utf-8'));

const adminController = {
  index: (req, res) => {
    res.render('admin/dashboard.ejs'); // En un futuro /admin/dashboard.ejs?
  },

  // ///////////////////////////////////// edicion /////////////////////////
  editForm: (req, res) => {
    const idParaEditar = Number(req.params.id);
    const propiedadParaEditar = propiedades.find((p) => p.id === idParaEditar);
    console.log(propiedadParaEditar)
    res.render('admin/edit-form.ejs', { propiedad: propiedadParaEditar });
  },
  edit: (req, res) => {
    const buscado = Number(req.params.id);
    const propiedaEditar = propiedades.find((p) => p.id === buscado);

    let image = "imagen-default-tulugar.png";

    if (req.file) {
      image = req.file.filename;
    }

    propiedaEditar = {
      id: buscado,
      ...req.body,
      image,
    }
    const propiedadesUpdate = propiedades.map((p) => {
      if (p.id === propiedaEditar.id) {
        return ( p ={...propiedaEditar});
      }
      return p;
    });
    fs.writeFileSync(
      propiedadesFilePath,
      JSON.stringify(propiedadesUpdate),
      'utf-8');

    res.render('index.ejs'); 
  },
/////////////////////////////////////////////////TERMINA EDICION///////////////

  newForm: (req, res) => {
    res.render('admin/new.ejs');
  },
  new: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
};

module.exports = adminController;
