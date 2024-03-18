const express = require('express');
const { getProduct, removeProduct, updateProduct, addProduct, getAllProducts } = require('../controllers/productController');
const { authCheck } = require('../middlewares/authMiddleware');
const { updateCheck, fileCheck } = require('../middlewares/fileCheck');
const router = express.Router();


const notAllowed = (req,res) => res.status(405).json('method not allowed');


router.route('/').get((req,res) =>{
  return res.status(200).json('Welcome to ministore backend');
}).all(notAllowed);

router.route('/api/products').get(getAllProducts).all(notAllowed);

router.route('/api/product/:id').get(getProduct).delete(authCheck,removeProduct).patch(authCheck,updateCheck,updateProduct).all(notAllowed);


router.route('/api/add-product').post(authCheck,fileCheck,addProduct).all(notAllowed);


module.exports = router;