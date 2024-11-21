const express = require('express');
const router = express.Router();
const tripsController = require('../../controllers/api/tripsController');

router.route('/')
    .get(tripsController.getTrips)
    .post(tripsController.createTrip)
    .delete(tripsController.deleteTrip);

router.route('/requestJoin')
    .post(tripsController.requestJoin);


module.exports = router;