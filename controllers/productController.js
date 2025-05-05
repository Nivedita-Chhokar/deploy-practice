const Product = require('../models/product');

/*        FEATURES
1. get all products (public)
2. get product by id (public)
3. create new product (admin)
4. update product (admin)
5. delete product (admin)
*/

const getAllProducts = async(req, res) => {
    try {
        const filter = {};
        
        // Handle category filter
        if(req.query.category) {
            filter.category = req.query.category;
        }

        // Handle stock filter (string 'true' becomes boolean true)
        if(req.query.includeOutOfStock !== 'true') {
            filter.inStock = true;
        }

        console.log('Product filter:', filter);
        
        const products = await Product.find(filter);
        console.log(`Found ${products.length} products`);
        
        return res.status(200).json({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error in getAllProducts:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const getProductById = async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            data: product
        });
    } catch (error) {
        console.error('Error in getProductById:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const createProduct = async(req, res) => {
    try {
        // Set inStock based on stock value
        const inStock = req.body.stock > 0;
        
        const newProduct = new Product({
            ...req.body,
            inStock
        });

        await newProduct.save();
        
        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.error('Error in createProduct:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const updateProduct = async(req, res) => {
    try {
        const updateData = req.body;
        
        // Update inStock if stock is provided
        if (typeof updateData.stock !== 'undefined') {
            updateData.inStock = updateData.stock > 0;
        }
        
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );

        if(!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch(error) {
        console.error('Error in updateProduct:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

const deleteProduct = async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch(error) {
        console.error('Error in deleteProduct:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal server error'
        });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};