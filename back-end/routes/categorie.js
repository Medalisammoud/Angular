//require express
const express = require("express");
const { addCategory, getCategorys, getCategory, updateCategory, deleteCategory } = require("../controllers/categorie");
//reqquire router
const router = express.Router();

/**
 * @desc : Route Get All Category
 * @path : 'http://localhost:8000/api/category/'
 * @method : GET
 * @data : No Data
 */
router.get('/', getCategorys)

/**
 * @desc : Route Add New Category
 * @path : 'http://localhost:8000/api/category/add'
 * @method : POST
 * @data : req.body
 */
router.post('/add', addCategory)

/**
* @desc : Route Get Category
* @path : 'http://localhost:8000/api/category/:id'
* @method : GET
* @data : req.params
*/
router.get('/:id', getCategory)

/**
* @desc : Route Update Category
* @path : 'http://localhost:8000/api/category/update/:id'
* @method : PUT
* @data : req.params , req.body
*/
router.put('/update/:id', updateCategory)

/**
* @desc : Route Delete category
* @path : 'http://localhost:8000/api/category/delete/:id'
* @method : DELETE
* @data : req.params
*/
router.delete('/delete/:id', deleteCategory)


module.exports = router;