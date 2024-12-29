const express = require('express');
const { Op, where } = require('sequelize');
const { check, query } = require('express-validator');
const { requireAuth,requireProperAuth,successfulDeleteRes } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot, Review, SpotImage, User, sequelize, ReviewImage, Booking } = require('../../db/models');


const router = express.Router();

//Spot Validation check
 const validateSpot = [
        check('address')
            .exists({ checkFalsy: true })
            .withMessage('Street address is required.'),
        check('city')
            .exists({ checkFalsy: true })
            .withMessage('City is required.'),
        check('state')
            .exists({ checkFalsy: true })
            .withMessage('State is required.'),
        check('country')
            .exists({ checkFalsy: true })
            .withMessage('Country is required'),
        check('lat')
            .exists({ checkFalsy: true })
            .withMessage('Latitude is not valid'),
        check('lng')
            .exists({ checkFalsy: true })
            .withMessage('Longitude is not valid'),
        check('name')
            .exists({ checkFalsy: true })
            .withMessage('Name is required')
            .isLength({max:50})
            .withMessage('Name must be less than 50 characters'),
        check('description')
            .exists({ checkFalsy: true })
            .withMessage('Description is required'),
        check('price')
            .exists({ checkFalsy: true })
            .withMessage('Price is required'),
            handleValidationErrors

    ];

//Review Validation Check
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .isIn([1, 2, 3, 4, 5])
        .withMessage('Stars must be an integer from 1 to 5'),
        handleValidationErrors
];


// validate Query
const validateSpotQuery = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Page must be greater than or equal to 1")
        .isInt({ max: 10 })
        .withMessage("Page must be less than or equal to 10"),
    query('size')
        .optional()
        .isInt({ min: 1 })
        .withMessage("Size must be greater than or equal to 1")
        .isInt({ max: 10 })
        .withMessage("Size must be less than or equal to 20"),
    query('minLat')
        .optional()
        .isFloat()
        .withMessage("Minimum latitude is invalid"),
    query('maxLat')
        .optional()
        .isFloat()
        .withMessage("Maximum latitude is invalid"),
    query('minLng')
        .optional()
        .isFloat()
        .withMessage("Minimum longitude is invalid"),
    query('maxLng')
        .optional()
        .isFloat()
        .withMessage("Maximum longitude is invalid"),
    query('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Minimum price must be greater than or equal to 0"),
    query('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage("Maximum price must be greater than or equal to 0"),
        handleValidationErrors
];

//middleware for getting new json Spot info
async function getSpots(req,res){
    let {
        page,
        size,
        minLat,
        maxLat,
        minLng,
        maxLng,
        minPrice,
        maxPrice
    } = req.query;


        page = page ? +page : 1;
        size = size ? +size : 20;
        req.query.page = page;
        req.query.size = size;

    const options =
        {
            limit:parseInt(size),
            offset:(page - 1) * size,
            include:[
                {
                    model:Review,
                    attributes:['stars']
                },
                {
                    model:SpotImage,
                    attributes:['url']
                }
            ],
            where:{}
    }


        if (minLat && maxLat) options.where.lat = { [Op.between]: [minLat, maxLat] };
        else if (minLat) options.where.lat = { [Op.gte]: minLat };
        else if (maxLat) options.where.lat = { [Op.lte]: maxLat };

        if (minLng && maxLng) options.where.lng = { [Op.between]: [+minLng, +maxLng] };
        else if (minLng) options.where.lng = { [Op.gte]: +minLng };
        else if (maxLng) options.where.lng = { [Op.lte]: +maxLng };

        if (minPrice && maxPrice) options.where.price = { [Op.between]: [+minPrice, +maxPrice] };
        else if (minPrice) options.where.price = { [Op.gte]: +minPrice };
        else if (maxPrice) options.where.price = { [Op.lte]: +maxPrice };


    const spots = await Spot.findAll(options);

         const formattedSpots = spots.map((spot,i )=>{
            const spotJson = spot.toJSON();
            const reviews = spot.Reviews;
            const spotImages = spot.SpotImages;

            //calculate the avg rating
            if (reviews.length > 0) {
              const sum = reviews.reduce((acc, review) => acc + review.stars, 0);
              spotJson.avgRating = (sum / (reviews.length)).toFixed(1);//round tp decimal
            } else {
              spot.avgRating = 0;
         }

         //get preview image
         if (spotImages.length) {
                spotJson.previewImage = spot.SpotImages[0].url;
              } else {
                spot.previewImage = null;
              };

        return {
            id: spotJson.id,
            ownerId: spotJson.ownerId,
            address: spotJson.address,
            city: spotJson.city,
            state: spotJson.state,
            country: spotJson.country,
            lat: Number(spotJson.lat),
            lng: Number(spotJson.lng),
            name: spotJson.name,
            description: spotJson.description,
            price: Number(spotJson.price),
            createdAt: spotJson.createdAt,
            updatedAt: spotJson.updatedAt,
            avgRating:spotJson.avgRating,
            previewImage:spotJson.previewImage
        }
    });
    return formattedSpots;
}


//Middleware for check proper authorization of current user
async function isSpotOwner(req, res, next){
    const spot = await Spot.findByPk(req.params.spotId);

    //Couldn't find a Spot with the id
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    req.spot = spot;
    if(req.user.id === req.spot.ownerId) {
        return next();
    }else{
        requireProperAuth(res);
    }
}


//* Get all Spots
router.get('/', validateSpotQuery, async (req, res) => {
    try {
        const {page, size} = req.query;
        const spots = await getSpots(req, res);
        for (const spot of spots) {
            const reviews = await Review.findAll({
                where: { spotId: spot.id },
                attributes: ['stars']
            });
            if (reviews.length > 0) {
                const sum = reviews.reduce((acc, review) => acc + review.stars, 0);
                spot.avgRating = (sum / reviews.length).toFixed(1);
            } 
            else {
                spot.avgRating = 0;
            }
        }
        res.status(200).json({ Spots: spots, page: page || 1, size: size || 20 });
    } 
    catch (error) {
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'An error occurred while processing get all spots' });
    }
});


//* Get Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    try {
      const allSpotArr = await getSpots(req, res);
      const userSpotsArr = allSpotArr.filter((spot) => spot.ownerId === req.user.id);
      res.json({ Spots: userSpotsArr });
    } 
    catch (error) {
      // Handle the error here, e.g., send an error response to the client
      console.error('An error occurred:', error);
      res.status(500).json({ error: 'An error occurred while processing the get spots by the current user' });
    }
});




//* Get details of a Spot from an id
router.get('/:spotId',async(req,res)=>{
    try{ 
        let spot = await Spot.findOne({where: {id: req.params.spotId}})
        const spotImages = await SpotImage.findAll({where: {spotId: req.params.spotId}});
        const user = await User.findOne({where: {id: spot.ownerId}});
        const reviews = await Review.findAll({where: {spotId: req.params.spotId}});
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        spot = spot.toJSON();
        if (reviews.length) {
            const sum = reviews.reduce((acc, review) => acc + review.stars, 0);
            spot.avgStarRating = (sum / (reviews.length)).toFixed(1);//round to decimal
        }
        const spotByPkRes = {
            id: spot.id,
            ownerId: spot.ownerId,
            address: spot.address,
            city: spot.city,
            state: spot.state,
            country: spot.country,
            lat: spot.lat,
            lng: spot.lng,
            name: spot.name,
            description: spot.description,
            price: spot.price,
            createdAt: spot.createdAt,
            updatedAt: spot.updatedAt,
            numReviews:reviews.length,
            avgStarRating:spot.avgStarRating || 0,
            SpotImages:spotImages.map(image => 
                ({
                    id: image.id,
                    url: image.url,
                    preview: image.preview
                })
            ),
            Owner:{
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
            },
       };
       res.status(200).json(spotByPkRes);
    }
    //Error response: Couldn't find a Spot with the specified id
    catch (error) {
        res.status(404).json({ message: "Spot couldn't be found" });
    }
});



//*Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    try {
      const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
      } = req.body;

      // Create a new Spot
      const newSpot = await Spot.create({
        ownerId: req.user.id,
        ...req.body
      });

      res.status(201).json(newSpot);
    } catch (error) {
      console.error('An error occurred while creating a spot:', error);
      res.status(500).json({ error: 'An error occurred while creating a spot' });
    }
  });




//* Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', requireAuth, isSpotOwner, async (req, res) => {
    try {
      const { url, preview } = req.body;
      const spot = req.spot;

      // If couldn't find a Spot with id
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      const newImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
      });

      const newImageRes = {
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
      };
      res.status(201).json(newImageRes);
    } 
    catch (error) {
      console.error('An error occurred while adding an image to a spot:', error);
      res.status(500).json({ error: "An error occurred while adding an image to a spot" });
    }
  });



//* Edit a spot
router.put(
    '/:spotId',
    requireAuth,
    isSpotOwner,
    validateSpot,
    async(req, res) => {
        try{const {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
            } = req.body;

        const spot = req.spot;

        // If couldn't find a Spot with id
        if (!spot){
            return res.status(404).json({ message: "Spot couldn't be found" });
        }
        const editedSpot = await req.spot.update({...req.body})
        res.status(200).json(editedSpot);
  }
  catch(error){
    console.error('An error occurred while editing a spot:', error);
    res.status(500).json({ error: "An error occurred while editing a spot" });
}
});



//* Delete a spot
router.delete('/:spotId', requireAuth,isSpotOwner, async(req, res) => {
    try{
        await req.spot.destroy();
        successfulDeleteRes(res);
    }catch (error) {
        console.error('An error occurred while deleting a spot:', error);
        res.status(500).json({ error: "An error occurred while deleting a spot" });
      }
  });


// * Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res) => {
    try{
        const op = {
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            },
        ],
        where: { spotId: req.params.spotId }
    };

    const reviews = await Review.findAll(op);
    if (!reviews.length) {
        return res.status(404).json({ message: "Spot couldn't be found" });
    }
    const formattedReviews = reviews.map((review) => {
        const reviewJson = review.toJSON();
        if (reviewJson.Spot) {
            reviewJson.Spot.previewImage = reviewJson.Spot.SpotImages[0].url;
        }
        return {
                id: reviewJson.id,
                userId: reviewJson.userId,
                spotId: reviewJson.spotId,
                review: reviewJson.review,
                stars: reviewJson.stars,
                createdAt: reviewJson.createdAt,
                updatedAt: reviewJson.updatedAt,
                User: {
                    id: reviewJson.User.id,
                    firstName: reviewJson.User.firstName,
                    lastName: reviewJson.User.lastName
                },
                ReviewImages: reviewJson.ReviewImages
        };
    })
    res.json({ Reviews: formattedReviews });
}catch (error) {
    console.info('An error occurred while getting reviews for a spot:', error);
    res.status(404).json({ message: "Spot couldn't be found" });
  }
});


// * Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    try{
    const IsReviewed = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
    if (IsReviewed) {
        return res.status(500).json({
            "message": "User already has a review for this spot",
            "statusCode": 500
        })
    }
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
        const { review, stars } = req.body;
        const record = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review,
            stars });
        res.status(201).json(record);
    }catch (error) {
        console.error('An error occurred while creating a review for a spot:', error);
        res.status(500).json({ error: "An error occurred while creating a review for a spot" });
      }
    });



// * Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    try{
    const spot = await Spot.findByPk(req.params.spotId);
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    else{
    if (req.user.id === spot.ownerId) {
        const options = {
            where: { spotId: req.params.spotId },
            include: {
                model: Spot,
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            }
        };
        const bookings = await Booking.findAll(options);
        const formattedBookings = bookings.map((booking)=>{
            const bookingJson = booking.toJSON();
            if (bookingJson.Spot) {
                bookingJson.User = bookingJson.Spot.User;
                delete bookingJson.Spot
            }
            return {
                User:bookingJson.User,
                ...bookingJson
            }
        })
            res.json({ Bookings: formattedBookings });

        } 
        else {
        const op = {
            where: { spotId: req.params.spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        };
        const bookings = await Booking.findAll(op);
        const formattedBookings = bookings.map((booking)=>{
            const bookingJson = booking.toJSON();
            if(bookingJson.Spot){
                bookingJson.User = bookingJson.Spot.User;
            }
            return {
                spotId:bookingJson.spotId,
                startDate:bookingJson.startDate,
                endDate:bookingJson.endDate
            }
        })
        res.json({ Bookings: formattedBookings});
        }
    }}
    catch (error) {
        console.error('An error occurred while getting bookings for a spot:', error);
        res.status(500).json({ error: "An error occurred while getting bookings for a spot" });
      }
    });



module.exports = router;