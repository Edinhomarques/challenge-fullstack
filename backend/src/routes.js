const express = require('express');

const routes = express.Router();
const DeliveriesControllers = require('./controllers/DeliveriesControllers');

routes.get('/deliveries', DeliveriesControllers.index);
routes.post('/deliveries', DeliveriesControllers.createDeliveries);
routes.delete('/deliveries/:id', DeliveriesControllers.DeleteDeliveries);
routes.delete('/deliveries', DeliveriesControllers.DeleteAllDeliveries);



module.exports = routes;