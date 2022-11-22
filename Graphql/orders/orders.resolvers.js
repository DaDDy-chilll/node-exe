const orderModel = require('./orders.model');
console.log('order',orderModel.getAllOrders());
module.exports = {
    Query:{
        orders:()=>{
            return orderModel.getAllOrders();
        }
    }
}