const express = require('express');
const productRouter = express.Router();
const ensureAuth = require('../middleware/authMiddleware');
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

//admin routes - Added ensureAuth middleware
productRouter.post('/', ensureAuth, roleCheck('admin'), createProduct);
productRouter.put('/:id', ensureAuth, roleCheck('admin'), updateProduct);
productRouter.delete('/:id', ensureAuth, roleCheck('admin'), deleteProduct);

module.exports = productRouter;