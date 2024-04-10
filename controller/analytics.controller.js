const {productService} = require('../services/index');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    addProduct : async (req, res) => {
        const { title, description, image1, variants, categoryId } = req.body;
        try {
            let productId = uuidv4();
            let item = {title, description, image1, productId, categoryId}
            const response1 = await productService.createNewProduct(item);
            variants.map((item) => {
                item.productId = response1.data._id;
                item.variantId = uuidv4();
            })
            const response2 = await productService.createNewVariants(variants);
            let countVariant = response2.data.length
            return res.send({statusCode:successCode, message: `New Product ${title} with ${countVariant} Variants added successfully`});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return handleCustomError(res, error)
        }
    },
    addVariants : async (req, res) => {
        const { productId, variants } = req.body;
        try {
            variants.map((item) => {
                item.productId = productId;
                item.variantId = uuidv4();
            })
            const response2 = await productService.createNewVariants(variants);
            let countVariant = response2.data.length
            return res.send({statusCode:successCode, message: `${countVariant} Variants added successfully`});
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- addProduct :: ", error);
            return handleCustomError(res, error)
        }
    },
    getProductById : async (req, res) => {
        const { id } = req.params;
        try {
            const response = await productService.getProductById(id);
            if(response){
                return res.send({statusCode:successCode, message: 'Product fetched successfully', data : response[0]});
            } else {
                return res.send({statusCode:successCode, message: 'No Product found from this Product Id', data : {}});
            }
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProductById :: ", error);
            return handleCustomError(res, error)
        }
    },
    getProduct : async (req, res) => {
        const {page, limit} = req.query
        try {
            let skip = (page-1)*limit
            const response = await productService.getProducts(skip, limit);
            const responseCount = await productService.getProductCount();
            if(!response){
                return res.send({statusCode:1, message: 'All Product fetched successfully', data:[]});
            }
            return res.send({
                statusCode:1,
                message: 'All Product fetched successfully', 
                data:response, 
                totalData : responseCount,
                pageData : response.length,
                page : page
            });
        } catch (error) {
            console.log("PRODUCT CONTROLLER -- getProducts :: ", error);
            return handleCustomError(res, error)
        }
    }
}