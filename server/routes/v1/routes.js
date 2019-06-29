import express from 'express';
import createUserController from '../../controller/createUser';
import signInController from '../../controller/signIn';
import tripController from '../../controller/trips';
import sanitizer from '../../middleware/sanitizer';
import Auth from '../../middleware/auth';
import response from '../../helper/responseSchema';

const router = express.Router();

router.post('/auth/signup', sanitizer.sanitizeUserBioData(), createUserController.signUp);
router.post('/auth/signin', sanitizer.sanitizeUserSignInData(), signInController.signIn);
router.post('/trips', sanitizer.sanitizeCreateTripData(), Auth.auth, tripController.createTrip);


export default router;
