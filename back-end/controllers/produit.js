const Category = require("../models/categorie");
const Product = require("../models/produit");

exports.addProduct = async (req, res) => {
    try {
        if (req.file) {
            let image = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            const { name, price, qty, desc, categorie } = req.body;

            const newProduct = new Product({ name, price, qty, desc, image, categorie });
            await newProduct.save();
            res.status(200).send({ msg: "Add New Product Success", newProduct })
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: { msg: "can not save the Product" } });
    }
}

//Get Products
exports.getProduct = async (req, res) => {
    try {
        const result = await Product.find({});
        res.status(200).send({ msg: "Get All Product Success", products: result })
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: { msg: "can not Get Products" } });
    }
}

//Get Product
exports.getOneProduct = async (req, res) => {
    try {
        const result = await Product.findOne({ _id: req.params.id });
        res.status(200).send(result)
    } catch (error) {
        console.log(error);
        res.status(400).send({ errors: { msg: "can not Get Product" } });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const result = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
        if (!result.nModified) {
            res.status(400).send({ msg: "Product Already Updated !!!", error })
            return;
        }
        res.status(200).send({ msg: 'Product is Updated ...', result })
    } catch (error) {
        res.status(400).send({ msg: "Can Not Updated Product with this id !!!", error })
    }
}

//Delete Product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.deleteOne({ _id: req.params.id })
        res.status(200).send({ msg: 'Product is Deleted ...' })
    } catch (error) {
        res.status(400).send({ msg: "Can Not Deleted Product with this id !!!", error })
    }
}
