const express = require('express');
const productRouter = express.Router();
const roleCheck = require('../middleware/roleMiddleware');

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

// public routes
productRouter.get('/', getAllProducts);
productRouter.get('/:id', getProductById);

//admin routes
productRouter.post('/', roleCheck('admin'), createProduct);
productRouter.put('/:id', roleCheck('admin'), updateProduct);
productRouter.delete('/:id', roleCheck('admin'), deleteProduct);

module.exports = productRouter;
