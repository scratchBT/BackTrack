import express from 'express';
const router = express.Router();
import controller from '../controllers/controller.js';

router.get('/db/topAlbums', controller.getTopAlbums);
router.get('/db/topArtists', controller.getTopArtists);
router.get('/db/topTracks', controller.getTopTracks);
router.get('/db/topTracksByYear', controller.getTopTracksByYear);

//Ross added this to set up a route for front end slider to get tracks by year. This is still timing out at the database call in models
// router.get('/db/topTracksByYear', controller.getTopTracksByYear, controller.filterByYear);


// get field names
router.get('/db/getFields', controller.getFields)

// Sample route for get 10 records
router.get('/db/get10', controller.get10Sessions);

// ES6 syntax
export default router;
