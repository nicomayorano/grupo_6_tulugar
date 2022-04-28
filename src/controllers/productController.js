const fs = require('fs');
const path = require('path');
const propiedadesFilePath = path.join(__dirname, '../data/products.json');
const propiedades = JSON.parse(fs.readFileSync(propiedadesFilePath, 'utf-8'));
let idPropiedad=0;

const productController = {
  index: (req, res) => {
    res.render('products/products.ejs');
  },
  detail: (req, res) => {
    let PropiedadId = Number(req.params.id);
    let detallePropiedad = propiedades.find((p) => p.id === PropiedadId);
    res.render('/products/detail', { propiedad: detallePropiedad });
  },
  cart: (req, res) => {
    res.render('products/cart.ejs');
  },
  add: (req, res) => {
    res.render('index.ejs'); // TO DO
  },
  propiedad:(req,res)=>{
    res.render('admin/new.ejs');
  },
  post:(req,res)=>{
    const IdUser = req.body.IdUser;
    const IdProduct=req.body.IdProduct;
    const DescripciónSP=req.body.DescripciónSP;
    const tipoPropiedad=req.body.tipoPropiedad;
    const tipoAlquiler=req.body.tipoAlquiler;
    let wifi=(req.body.wifi) ? true :false;  
    let servicio=(req.body.servicio) ? true :false; 
    let desayuno=(req.body.desayuno) ? true :false; 
    let mascotas=(req.body.mascotas) ? true :false; 
    //let chkcantPersonas=req.body.chkcantPersonas; if(!chkcantPersonas) chkcantPersonas="off";
    const cantPersonas=req.body.cantPersonas;
    const valorestadia=req.body.valorestadia;

    const provincia=req.body.provincia;
    const ciudad=req.body.ciudad;
    const direccion=req.body.direccion;
    const contacto=req.body.contacto;
    const email=req.body.email;
    const images=[];
    for(var i=0;i<req.files.length;i++){
      //console.log(req.files[i].path);
      images.push(path.basename(req.files[i].path));
  }
    
    const propiedad = {
      id:0,
      fk:IdUser,
      idProduct:IdProduct,
      descripcionSp :DescripciónSP,
      tipoPropiedad:tipoPropiedad,
      tipoAlquiler:tipoAlquiler,
      wifi:wifi,
      servicio:servicio,
      desayuno:desayuno,
      mascotas:mascotas,  
      cantPersonas:cantPersonas,
      valorestadia:valorestadia,    
      provincia:provincia,
      ciudad:ciudad,
      direccion:direccion,    
      images:images
    };

   
    savePropertyToJson(propiedad, function(err) {
        if (err) {
            console.log(err);
          res.status(404).send('Propierty not saved');
          return;
        }else{
          const contact={
            idProp:idPropiedad,      
            contacto:contacto,
            email:email,
          }
          
          saveContactToJson(contact, function(err) {
            if (err) {
                console.log(err);
              res.status(404).send('Contact not saved');
              return;
            }
            //cambiar a la que corresponda
            res.redirect('/');
          });

        }
     
      });
  }
};


function savePropertyToJson(property, callback) {
  let file =path.resolve(__dirname, '../data/products.json')
  fs.readFile(file, function (err, data) {
    var json = JSON.parse(data);
    //console.log(json);
    let id = 0;
    if( json.length > 0){
      id = (json[json.length-1].id)
    } 
   
    property.id= ++id;
    idPropiedad=property.id;
    json.push(property);    
    fs.writeFile(file, JSON.stringify(json), function(err){
      if (err) throw err;
      console.log('Property Save');
    },callback);
})
  
}

function saveContactToJson(contact, callback) {
  let file =path.resolve(__dirname, '../data/contacts.json')
  fs.readFile(file, function (err, data) {
    var json = JSON.parse(data);
    //console.log(json);

    json.push(contact);    
    fs.writeFile(file, JSON.stringify(json), function(err){
      if (err) throw err;

      
      console.log('Contact Saved!');
    },callback);
})
  
}

module.exports = productController;
