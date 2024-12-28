const express = require('express');
const { Op } = require('sequelize');
const { check, query } = require('express-validator');
const { requireAuth, requireProperAuth, successfulDeleteRes } = require('../../utils/auth');
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
router.get('/', async (req, res) => {
    try{
        const spots = await Spot.findAll();
        res.status(200).json({ Spots: spots });
    }
    catch(error){
        console.error('An error occurred', error);
        res.status(500).json({ error: 'An error occurred' });
    }
    
});


//* Get Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
    try {
        const userId = req.user.id;
        const spots = await Spot.findAll({
            where: { ownerId: userId }
        });

        res.status(200).json({ Spots: spots });
    } catch (error) {
        console.error('An error occurred', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

//* Get detailed of a Spot from an id
router.get('/:spotId', async(req,res)=>{
    const op = {
        include:[
            {
                model:SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model:User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model:Review
            }
        ]
    };

    try{ 
        let spot = await Spot.findByPk(req.params.spotId, op);
        spot.numReviews = spot.Reviews.length;
        // console.log(spot.numReviews);
        if (spot.Reviews.length) {
            const spotReview = spot.Review
            const sum = spot.Reviews.reduce((acc, spotReview) => acc + spotReview.stars, 0);
            // console.log(sum);
            spot.avgStarRating = (sum / (spot.Reviews.length)).toFixed(1);//round tp decimal
          } else {
            spot.avgStarRating = null;
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
            numReviews:spot.numReviews,
            avgRating:spot.avgStarRating,
            SpotImages:spot.SpotImages,
            owner:spot.User
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
      res.status(200).json(newImageRes);
    } catch (error) {
      // Handle the error here
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
        // Validate the request body
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        // }
        //update spot
        const editedSpot = await req.spot.update({...req.body})
        res.status(200).json(editedSpot);
  }catch(error){
    console.error('An error occurred while editing a spot:', error);
    res.status(500).json({ error: "An error occurred while editing a spot" });
}
});



//* Delete a spot
router.delete('/:spotId', requireAuth, isSpotOwner, async(req, res) => {
    try{
    const spot = req.spot;
    await req.spot.destroy();
    successfulDeleteRes(res);
    }catch (error) {
        console.error('An error occurred while deleting a spot:', error);
        res.status(500).json({ error: "An error occurred while deleting a spot" });
      }
  });


// * Get all Reviews by a Spot's id
router.get('/:spotId/reviews', isSpotOwner, async (req, res) => {
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
    const formattedReviews = reviews.map((review) => {
        const reviewJson = review.toJSON();
        if (reviewJson.Spot) {
            reviewData.Spot.previewImage = reviewData.Spot.SpotImages[0].url;
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
    console.error('An error occurred while getting reviews for a spot:', error);
    res.status(500).json({ error: "An error occurred while getting reviews for a spot" });
  }
});


// * Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, isSpotOwner, validateReview, async (req, res) => {
    try{
    const IsReviewed = await Review.findOne({ where: { userId: req.user.id, spotId: req.params.spotId } });
    if (IsReviewed) {
        return res.status(500).json({
            "message": "User already has a review for this spot",
            "statusCode": 500
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
    })


module.exports = router;