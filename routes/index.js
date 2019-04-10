const express = require('express');
const router = express.Router();
const banners = require('../public/data/banners/index.get.json');
const prodCategories = require('../public/data/categories/index.get.json');
const products = require('../public/data/products/index.get.json');

const cart = {
  items: [],
  count: 0
};
/* GET home page. */
router.get('/', function(req, res, next) {
  ActiveBanners = banners.filter(banner => banner.isActive);
  ActiveCategories = prodCategories.filter(category => category.enabled);
  res.render('home', {banners:ActiveBanners,categories:ActiveCategories, cart});
});

router.get('/products', function(req, res, next) {

  ActiveCategories = prodCategories.filter(category => category.enabled);
  
  res.render('products', {products:products,categories:ActiveCategories, cart});
  
  });
  
  router.get('/products/:id', function(req, res, next) {
  
  const CatId = req.params.id;
  
  CategoryProducts = products.filter(product => product.category==CatId);
  
  ActiveCategories = prodCategories.filter(category => category.enabled);
  
  res.render('products', {products:CategoryProducts,categories:ActiveCategories,cart});
  
  });
  
   
  
  router.get('/login', function(req, res, next) {
  
  res.render('login',{cart});
  
  });
  
  router.get('/register', function(req, res, next) {
  
  res.render('register',{cart});
  
  });

  router.get('/cart', function(req, res, next) {
  
    res.render('cart',{cart});
    
    });
    
  // post operation to add of remove item from cart
router.post('/cart/:operation', function(req, res) {
  const operation = req.params.operation;
  let count = 0;
  if (operation === 'add') {
    count = 1;
  } else if (operation === 'remove') {
    count = -1;
  } else {
    return res.status(404).send('Not Found');
  }
  const product = products.find(val => val.id === req.body.productId);
  if (product) {
    const oldItem = cart.items.find(item => item.product.id === product.id);
    if (oldItem) {
      oldItem.count += count;
      cart.count += count;
      if (oldItem.count <= 0) {
        cart.items.splice(cart.items.findIndex(item => item.product.id === product.id), 1);
      }
    } else {
      cart.items.push({ product, count });
      cart.count += count;
    }
    return res.send(cart);
  }
  return res.status(404).send('Not Found');
});

module.exports = router;