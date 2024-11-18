const Trip = require('../../model/Trip');

const getTrips = async (req, res) => {
    const { type } = req.query;

    try {
        if (type === "created"){
            const trips = await Trip.find({
                driver: req.username
            });
            res.status(200).json(trips);
        }
        else if (type === "joined"){
            const trips = await Trip.find({
                passengers: { $in: [req.username] }
            });
            res.status(200).json(trips);
        }
        else {
            return res.send(400).json({
                message: "Invalid Type"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

const createTrip = async (req, res) => {
    const { 
        driver, 
        origin, 
        destination, 
        departure_date, 
        seats_available, 
    } = req.body;

    if (driver !== req.username) {
        return res.sendStatus(401);
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const departureDate = new Date(departure_date);
    departureDate.setHours(0, 0, 0, 0);

    if (departureDate < today || seats_available < 1) {
        return res.status(400).json({
            message: "Invalid Trip"
        });
    }

    try {
        const trip = {
            driver: driver,
            origin: origin,
            destination: destination,
            departure_date: departureDate,
            seats_available: seats_available,
            passengers: [],
            requests: []
        };
        await Trip.create(trip);
        return res.status(201).json(trip);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
};

module.exports = { getTrips, createTrip };