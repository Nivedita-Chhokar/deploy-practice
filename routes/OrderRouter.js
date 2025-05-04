const express = require('express');
const orderRouter = express.Router();
const roleCheck = require('../middleware/roleMiddleware');
const {
    getAllOrders,
    getOrderById,
    getMyOrders,
    createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');  

orderRouter.get('/myorders', getMyOrders); 
orderRouter.get('/', roleCheck('admin'), getAllOrders);
orderRouter.get('/:id', roleCheck('admin'), getOrderById);
orderRouter.post('/', createOrder);
orderRouter.put('/:id', roleCheck('admin'), updateOrder);
orderRouter.delete('/:id', roleCheck('admin'), deleteOrder); 

module.exports = orderRouter;