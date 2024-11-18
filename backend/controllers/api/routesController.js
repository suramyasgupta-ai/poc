const Trip = require('../../model/Trip');

const getTrips = async (req, res) => {
    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({
            message: "Missing origin or destination"
        });
    }

    try {
        const trips = await Trip.find({
            $and: [
                { destination: destination },
                { origin: origin }
            ]
        });
        return res.status(200).json(trips);
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getTrips };