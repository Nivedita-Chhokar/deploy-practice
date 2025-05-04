const Order = require('../models/order');

/*      FEATURES
1. get all orders(admin)
2. get order by id(admin)
3. get order for current user
4. create new order
5. update order status (admin)
6. update delivery status
*/

const getAllOrders = async(req,res) => {
    try {
        const orders = await Order.find();
        if(!orders || orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }
        return res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error"
        });
    }
}

const getOrderById = async(req,res) => {
    try {
        const orders = await Order.findById(req.params.id);
        if (!orders){
            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the data",
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getMyOrders = async(req,res) =>{
    try {
        const userId = req.user._id; 
        const orders = await Order.find({user: userId});
        return res.status(200).json({
            success: true,
            message: "fetched all orders successfully",
            data: orders
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const createOrder = async(req,res) =>{
    try {
        const newOrder = new Order({
            ...req.body,
            user: req.user._id
        });
        await newOrder.save();
        return res.status(200).json({
            success: true,
            message: "order created successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const updateOrderStatus = async(req,res) =>{
    try {
        const {orderId, status} = req.body;

        if(!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: "both the fields are required"
            });
        }
        const updateOrder = await Order.findByIdAndUpdate(
            {_id: orderId},
            {orderStatus: status}, 
            {new: true}
        );

        if(!updateOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Updated order successfully",
            data: updateOrder
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const deleteOrder= async(req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Deleted order successfully"
        });
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        }); 
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    getMyOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder 
}