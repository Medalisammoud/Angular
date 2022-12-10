//require express
const express = require("express");
const { addProduct, getProduct, getOneProduct, updateProduct, deleteProduct } = require("../controllers/produit");
const upload = require("../middlewares/multer");
//reqquire router
const router = express.Router();

/**
 * @desc : Route Get All Products
 * @path : 'http://localhost:8000/api/product/'
 * @method : GET
 * @data : No Data
 */
router.get('/',getProduct)

/**
 * @desc : Route Add New Product
 * @path : 'http://localhost:8000/api/product/add'
 * @method : POST
 * @data : req.body
 */
 router.post('/add',upload.single('productImage'),addProduct)

 /**
 * @desc : Route get product
 * @path : 'http://localhost:8000/api/product/:id'
 * @method : GET
 * @data : req.params
 */
  router.get('/:id',getOneProduct)

 /**
 * @desc : Route Update product
 * @path : 'http://localhost:8000/api/product/update/:id'
 * @method : PUT
 * @data : req.params , req.body
 */
  router.put('/update/:id',upload.single('productImage'),updateProduct)

   /**
 * @desc : Route Delete product
 * @path : 'http://localhost:8000/api/product/delete/:id'
 * @method : DELETE
 * @data : req.params
 */
    router.delete('/delete/:id',deleteProduct)


 module.exports = router;