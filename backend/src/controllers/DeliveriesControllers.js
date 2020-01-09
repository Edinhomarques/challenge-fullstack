const Deliveries = require('../models/Deliveries');

module.exports = {
    async index(req , res ) {
        const deliverie = await Deliveries.find()
        return res.json(deliverie)

    },
    async createDeliveries(req, res) {
        try {
            const {name, weight, address} = req.body
            deliveries = await Deliveries.create({name, weight, address});
            return res.json(deliveries)
        } catch (error) {
            return res.json(error)
        }
       
    },
    async DeleteDeliveries(req, res) {
        const {id} = req.query
       const deliveriesDelete = await Deliveries.findByIdAndDelete(id)
        return res.json(deliveriesDelete)
    }, 

    async DeleteAllDeliveries(req, res) {
       const deliveriesAllDelete = await Deliveries.remove();
        return res.json(deliveriesAllDelete)
    }
}