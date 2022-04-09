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
        res.render('products/productDetail')
    },
    submitProduct: function(req,res){
        res.render('products/submitProduct')
    },
    register: function(req,res){
        res.render('users/register')
    },
    login: function(req,res){
        res.render('users/login.ejs')
    },
}

module.exports= mainController
