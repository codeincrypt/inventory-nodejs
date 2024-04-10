const adminService = require('../services/adminService');
const orderService = require('../services/orderService');

module.exports = {
    getUserProfile : async (req, res) => {
        const userId = req.user.email
        try {
            const users = await adminService.getUsersByEmail(userId);
            return res.json({statusCode:1, message:'Profile fetch successfully', data:users});
        } catch (error) {
            console.log("USER CONTROLLER -- getUserProfile :: ", error);
            return res.status(500).json({statusCode:2, message: 'Internal Server Error'});
        }
    }
}