const Category = require('../models/categorie');

//Add New Categgory
exports.addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;
        const foundCategory = await Category.findOne({ categoryName });
        if (foundCategory) {
            res.status(400).send({
                errors: [{ msg: "Category already exist should be unique" }],
            });
            return;
        }
        const newCategory = new Category({ categoryName });
        await newCategory.save();
        res.status(200).send({ msg: "Add New Category Success", newCategory })
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: "can not save the Category" }] });
    }
}

//Get All Categorys
exports.getCategorys = async (req, res) => {
    try {
        const allCategorys = await Category.find();
        res.status(200).send({ msg: "Get All Categorys Success", categorys: allCategorys })
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: "can not get Categorys" }] });
    }
}

//Get One Category with Id
exports.getCategory = async (req, res) => {
    try {
        const oneCategory = await Category.findById({ _id: req.params.id });
        res.status(200).send({ msg: "Get One Category Success", category: oneCategory })
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: [{ msg: "can not get Category" }] });
    }
}


//update Category
exports.updateCategory = async (req, res) => {
    try {
        const result = await Category.updateOne({ _id: req.params.id }, { $set: req.body })
        if (!result.nModified) {
            res.status(400).send({ msg: "Category Already Updated !!!", error })
            return;
        }
        res.status(200).send({ msg: 'Category is Updated ...', result })
    } catch (error) {
        res.status(400).send({ msg: "Can Not Updated Category with this id !!!", error })
    }
}


//Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id })
        res.status(200).send({ msg: 'Category is Deleted ...' })
    } catch (error) {
        res.status(400).send({ msg: "Can Not Deleted Category with this id !!!", error })
    }
}
