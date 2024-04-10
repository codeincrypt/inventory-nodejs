const moment = require('moment-timezone');
const productService = require('../services/productService');

module.exports = {
    insertProduct : async (req, res) => {
        const { title, description, price, quantity } = req.body;
        try {
            let date = moment().format('DD-MM-YYYY hh:mm a');
            let item = { title, description, price, quantity, date }
            const response = await productService.insertNewProduct(item);
            if(response === true){
                return res.send({statusCode:1, message: `New Product added successfully`});
            } else {
                return res.send({statusCode:0, message: 'Product already exist'});
            }
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getProductById : async (req, res) => {
        const { id } = req.params;
        try {
            const response = await productService.getProductById(id);
            if(response === false){
                return res.send({statusCode:1, message: 'No Product found from this Product Id', data : {}});
            } else {
                return res.send({statusCode:1, message: 'Product fetched successfully', data : response[0]});
            }
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProductById :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    getProduct : async (req, res) => {
        let {page, limit} = req.query
        try {
            let currentPage = (page === "" || page === 0 || page === "0" || page === undefined) ? 1 : parseInt(page)
            let currentLimit = (limit === "" || limit === 0 || limit === "0" || limit === undefined) ? 10 : parseInt(limit)
            let offset = (currentPage-1)*currentLimit
            const response = await productService.getProduct(currentLimit, offset);
            const responseCount = await productService.getProductCount();
            if(response === false){
                return res.send({statusCode:0, message: 'Unable fo fetch products', data:[]});
            }
            let totalCount = responseCount[0].count
            // let totalPages = Math.ceil(totalCount / currentPage)
            return res.send({
                statusCode:1,
                message     : 'All Product fetched successfully', 
                data        : response, 
                totalData   : totalCount,
                pageData    : response.length,
                page        : currentPage
            });
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProducts :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    },
    searchProduct : async (req, res) => {
        let {searchquery} = req.body
        try {
            const response = await productService.getSearchProduct(searchquery);
            if(response === false){
                return res.send({statusCode:0, message: 'Unable fo fetch products', data:[]});
            }
            return res.send({
                statusCode:1,
                message     : 'Search Product fetched successfully', 
                data        : response, 
            });
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProducts :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    }
}