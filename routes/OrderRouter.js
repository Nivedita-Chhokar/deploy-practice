const express = require('express');
const orderRouter = express.Router();
const ensureAuth = require('../middleware/authMiddleware');
const roleCheck = require('../middleware/roleMiddleware');
const {
    getAllOrders,
    getOrderById,
    getMyOrders,
    createOrder,
    updateOrderStatus, 
    deleteOrder
} = require('../controllers/orderController');  

orderRouter.get('/myorders', ensureAuth, getMyOrders); 
orderRouter.get('/', ensureAuth, roleCheck('admin'), getAllOrders);
orderRouter.get('/:id', ensureAuth, roleCheck('admin'), getOrderById);
orderRouter.post('/', ensureAuth, createOrder);
orderRouter.put('/:id', ensureAuth, roleCheck('admin'), updateOrderStatus); 
orderRouter.delete('/:id', ensureAuth, roleCheck('admin'), deleteOrder); 

module.exports = orderRouter;