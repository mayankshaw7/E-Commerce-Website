const Product = require("./models/product");
const { productSchema } = require("./schema");
const { reviewSchema } = require("./schema");

const validateProduct = (req,res,next)=>{
    const {name, img, price , desc} = req.body;
    const {error} = productSchema.validate({name,img,price,desc});
    
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}

const validateReview = (req,res,next)=>{

    const {rating, comment} = req.body;
    const {error} = reviewSchema.validate({rating,comment});

    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        return res.render('error' , {err:msg});
    }
    next();
}

const isLoggedIn = (req,res,next)=>{

    if(req.xhr && !req.isAuthenticated()){
        return res.status(401).send('unauthorised');
        // console.log(req.xhr);//ajax hai ya nhi hai?
    }

    if(!req.isAuthenticated()){
        req.flash('error' , 'You need to login first');
        return res.redirect('/login')
    }
    next();
}

const isSeller = (req, res, next) => {
  let { id } = req.params;

  if (!req.user.role) {
    req.flash('error', 'You do not have the permissions');
    return res.redirect('/products');
  }

  // Allow either seller or admin
  if (req.user.role !== 'seller' && req.user.role !== 'admin') {
    req.flash('error', 'You do not have the permissions');
    return res.redirect(`/products/${id}`);
  }

  next();
};

const isProductAuthor = async (req, res, next) => {
  let { id } = req.params;
  let product = await Product.findById(id);

  if (!product) {
    req.flash('error', 'Product not found');
    return res.redirect('/products');
  }

  // Check if the logged-in user is either the author OR an admin
  if (product.author.equals(req.user._id) || req.user.role === 'admin') {
    return next();
  }

  req.flash('error', 'You are not authorized to perform this action');
  res.redirect(`/products/${id}`);
};

module.exports = { isProductAuthor };



module.exports = {validateProduct ,validateReview , isLoggedIn , isSeller , isProductAuthor } ;