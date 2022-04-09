const path= require("path");

const mainController= {
    index:(req,res)=>{
        return res.render('index')
    },
    hostMenu: function(req,res){
        res.render('products/hostMenu')
    },
    productCar: function(req,res){
        res.render('products/productCar')
    },
    productDetail: function(req,res){
        res.render('products/hostMenu')
    },
    submitProduct: function(req,res){
        res.render('products/hostMenu')
    },
    register: function(req,res){
        res.render('users/register')
    },
    login: function(req,res){
        res.render('users/login')
    },
}

module.exports= mainController
