const express = require('express');
const router = express.Router();
const tripsController = require('../../controllers/api/tripsController');

router.route('/')
    .get(tripsController.getTrips)
    .post(tripsController.createTrip)
    .delete(tripsController.deleteTrip);

router.route('/requestJoin')
    .post(tripsController.requestJoin);

router.route('/acceptRequest')
    .post(tripsController.acceptRequest);

router.route('/rejectRequest')
    .post(tripsController.rejectRequest);

module.exports = router;