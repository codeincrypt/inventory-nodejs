const orderService = require('../services/orderService');

module.exports = {
    createNewOrder : async (req, res) => {
        const { orderArray } = req.body;
        try {
            let prices = []
            let orderDetails = []
            for (const order of orderArray){
                const checkQuantity = await orderService.checkQuantity(order.productid);
                if(parseInt(checkQuantity[0].available_quantity) < parseInt(order.quantity)){
                    return res.json({ statusCode:0, message:`${checkQuantity[0].product_name} is not available in Stock`})
                }
                prices.push(parseFloat(checkQuantity[0].price))
                orderDetails.push({
                    productid: order.productid,
                    quantity: order.quantity,
                    price : checkQuantity[0].price
                })
                let currentQuantity = parseInt(checkQuantity[0].available_quantity) - parseInt(order.quantity)
                await orderService.updateStockQuantity(currentQuantity, order.productid);
            }
            let userId = req.user.id
            let totalPrice = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            const response = await orderService.createNewOrder(userId, totalPrice, orderDetails);
            if(response === false) {
                return res.send({statusCode:0, message: 'Unable fo place order'});
            }
            res.send({statusCode:1, message: `New order places successfully`});
        } catch (error) {
            console.log("ORDER CONTROLLER -- createNewOrder :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getOrdersByUserId : async (req, res) => {
        const userid = req.params.id
        let {page, limit} = req.query
        try {
            let currentPage = (page === "" || page === 0 || page === "0" || page === undefined) ? 1 : parseInt(page)
            let currentLimit = (limit === "" || limit === 0 || limit === "0" || limit === undefined) ? 10 : parseInt(limit)
            let offset = (currentPage-1)*currentLimit
            const response = await orderService.getOrdersByUserId(userid, currentLimit, offset);
            const responseCount = await orderService.getUserOrderCount(userid);
            if(response === false){
                return res.send({statusCode:0, message: 'Unable fo fetch products', data:[]});
            }
            let totalCount = responseCount[0].count
            // let totalPages = Math.ceil(totalCount / currentPage)
            return res.send({
                statusCode:1,
                message     : 'All Orders fetched successfully', 
                data        : response, 
                totalData   : totalCount,
                pageData    : response.length,
                page        : currentPage
            });
        } catch (error) {
            console.log("ORDERS CONTROLLER -- getOrdersByUserId :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getOrderViewByUserId : async (req, res) => {
        const userid = req.params.id
        const orderid = req.params.orderid
        try {
            const response = await orderService.getOrdersViewByUserId(userid, orderid);
            if(response === false){
                return res.send({statusCode:1, message: 'No Product found from this Product Id', data : {}});
            } else {
                return res.send({statusCode:1, message: 'Product fetched successfully', data : response});
            }
        } catch (error) {
            console.log("ORDERS CONTROLLER -- getOrderViewByUserId :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getMyOrders : async (req, res) => {
        let userId = req.user.id
        let {page, limit} = req.query
        try {
            let currentPage = (page === "" || page === 0 || page === "0" || page === undefined) ? 1 : parseInt(page)
            let currentLimit = (limit === "" || limit === 0 || limit === "0" || limit === undefined) ? 10 : parseInt(limit)
            let offset = (currentPage-1)*currentLimit
            const response = await orderService.getOrdersByUserId(userId, currentLimit, offset);
            const responseCount = await orderService.getUserOrderCount(userId);
            if(response === false){
                return res.send({statusCode:0, message: 'Unable fo fetch products', data:[]});
            }
            let totalCount = responseCount[0].count
            return res.send({
                statusCode:1,
                message     : 'All Orders fetched successfully', 
                data        : response, 
                totalData   : totalCount,
                pageData    : response.length,
                page        : currentPage
            });
        } catch (error) {
            console.log("ORDERS CONTROLLER -- getOrdersByUserId :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getMyOrderView : async (req, res) => {
        let userId = req.user.id
        const orderid = req.params.id
        try {
            const response = await orderService.getOrdersViewByUserId(userId, orderid);
            if(response === false){
                return res.send({statusCode:1, message: 'No Product found from this Product Id', data : {}});
            } else {
                return res.send({statusCode:1, message: 'Product fetched successfully', data : response});
            }
        } catch (error) {
            console.log("ORDERS CONTROLLER -- getOrdersByUserId :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getTopProducts : async (req, res) => {
        let {page, limit} = req.query
        try {
            const currentPage = (page === "" || page === 0 || page === "0" || page === undefined) ? 1 : parseInt(page)
            const currentLimit = (limit === "" || limit === 0 || limit === "0" || limit === undefined) ? 10 : parseInt(limit)
            const offset = (currentPage-1)*currentLimit
            const response = await orderService.getTopOrderedProduct(currentLimit, offset);
            const responseCount = await orderService.getTopOrderedProductCount();
            if(response === false){
                return res.send({statusCode:0, message: 'Unable fo fetch products', data:[]});
            }
            let totalCount = responseCount.length
            // let totalPages = Math.ceil(totalCount / currentPage)
            return res.send({
                statusCode:1,
                message     : 'All Top Product fetched successfully', 
                data        : response, 
                totalData   : totalCount,
                pageData    : response.length,
                page        : currentPage
            });
        } catch (error) {
            console.log("ORDERS CONTROLLER -- getTopProducts :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getTopUsers : async (req, res) => {
        try {
            const users = await orderService.getTopUserOrders();
            return res.json({statusCode:1, message:'User fetch successfully', data:users});
        } catch (error) {
            console.log("ORDER CONTROLLER -- getTopUsers :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    }
}