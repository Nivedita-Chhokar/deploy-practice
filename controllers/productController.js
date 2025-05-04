const Product = require('../models/product');

/*        FEATURES
1. get all products (public)
2. get product by id (public)
3. create new product (admin)
4. update product (admin)
5. delete product (admin)
6. update product stock (admin)
- for each specified variant
- inStock status based on variants
*/

const getAllProducts = async(req,res) => {
    try {
        const filter = {};
        if(req.query.category) {
            filter.category = req.query.category;
        }

        if(req.query.includeOutOfStock !== true) {
            filter.inStock = true;
        }

        const products = await Product.find(filter);
        res.status(200).json({
            success: true,
            data: products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getProductById = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "internal server error"
        })
    }
}

const createProduct = async(req,res) => {
    try {
        const hasStock = req.body.variants.some(
            variant => variant.stock > 0
        )
        const newProduct = new Product({
            ...req.body,
            inStock: hasStock,
        })

        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "successfully created a product"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const updateProduct = async(req,res) => {
    try {
        const updateData = req.body;
        const updateProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        )

        if(!updateProduct){
            res.status(404).json({
                success: false,
                message: "Product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "successfully updated the product"
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const deleteProduct = async(req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            res.status(404).json({
                success: false,
                message: "product not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Deleted product successfully"
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}