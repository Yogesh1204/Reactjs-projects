const express = require('express');
const busController = require('../controller/bus_controller');
const router = express.Router();

router.post("/users", busController.addUser);
router.get("/users", busController.getUser);
router.post("/buses", busController.addBus);
router.get("/buses/available/:seats", busController.availableBusSeats);

module.exports = router;
