const fs = require('fs');
const path = require('path');

exports.post = function (req, res) {

    const IdUser = req.body.IdUser;
    const IdProduct=req.body.IdProduct;
    const DescripciónSP=req.body.DescripciónSP;
    const tipoPropiedad=req.body.tipoPropiedad;
    const tipoAlquiler=req.body.tipoAlquiler;
    let wifi=req.body.wifi; if(!wifi) wifi="off";    
    let servicio=req.body.servicio;  if(!servicio) servicio="off";
    let desayuno=req.body.desayuno; if(!desayuno) desayuno="off";
    let mascotas=req.body.mascotas; if(!mascotas) mascotas="off";
    let chkcantPersonas=req.body.chkcantPersonas; if(!chkcantPersonas) chkcantPersonas="off";
    const cantPersonas=req.body.cantPersonas;
    const valorestadia=req.body.valorestadia;
    const valorsemana=req.body.valorsemana;
    const valormes=req.body.valormes;
    const valortemporada=req.body.valortemporada;
    const valorestancia=req.body.valorestancia;
    const condicionesdecontratacion=req.body.condicionesdecontratacion;
    const direccion=req.body.direccion;
    const contacto=req.body.contacto;
    const email=req.body.email;
    const images=[];
    for(var i=0;i<req.files.length;i++){
      //console.log(req.files[i].path);
      images.push(path.basename(req.files[i].path));
  }
    
    const propiedad = {
      IdUser:IdUser,
      idProduct:IdProduct,
      descripcionSp :DescripciónSP,
      tipoPropiedad:tipoPropiedad,
      tipoAlquiler:tipoAlquiler,
      wifi:wifi,
      servicio:servicio,
      desayuno:desayuno,
      mascotas:mascotas,
      chkcantPersonas:chkcantPersonas,
      cantPersonas:cantPersonas,
      valorestadia:valorestadia,
      valorsemana:valorsemana,
      valormes:valormes,
      valortemporada:valortemporada,
      valorestancia:valorestancia,
      condicionesdecontratacion:condicionesdecontratacion,
      direccion:direccion,
      contacto:contacto,
      email:email,
      images:images
    };
    savePersonToPublicFolder(propiedad, function(err) {
        if (err) {
            console.log(err);
          res.status(404).send('Propierty not saved');
          return;
        }
        //cambiar a la que corresponda
        res.redirect('/products/hostMenu');
      });
    
    //res.json("body" + req.body.username);


};

exports.get = function (req, res) {
    //res.send('welcome, ' + req.body.username)
    return res.redirect('/products/hostMenu');
  };
  
  function savePersonToPublicFolder(person, callback) {
    let file =path.resolve(__dirname, '../data/propiedades.json')
    fs.readFile(file, function (err, data) {
      var json = JSON.parse(data);
      console.log(json);
      json.push(person);    
      fs.writeFile(file, JSON.stringify(json), function(err){
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      },callback);
  })
    //fs.writeFile(path.resolve(__dirname, '../db/propiedades.json'), JSON.stringify(person), callback);
  }

 