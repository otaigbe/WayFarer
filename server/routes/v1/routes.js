import express from 'express';
import createUserController from '../../controller/createUser';
import signInController from '../../controller/signIn';
import tripController from '../../controller/trips';
import sanitizer from '../../middleware/sanitizer';
import Auth from '../../middleware/auth';
import busController from '../../controller/bus';

const router = express.Router();

router.post('/auth/signup', sanitizer.sanitizeUserBioData(), createUserController.signUp);
router.post('/auth/signin', sanitizer.sanitizeUserSignInData(), signInController.signIn);
router.post('/trips', sanitizer.sanitizeCreateTripData(), Auth.auth, tripController.createTrip);
router.get('/trips', sanitizer.sanitizeTripQueries(), Auth.auth, tripController.getAllTrips);
router.post('/buses', sanitizer.sanitizeBusData(), Auth.auth, busController.registerBus);

export default router;
