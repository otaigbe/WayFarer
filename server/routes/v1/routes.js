import express from 'express';
import createUserController from '../../controller/createUser';
import signInController from '../../controller/signIn';
import sanitizer from '../../middleware/sanitizer';

const router = express.Router();

router.post('/auth/signup', sanitizer.sanitizeUserBioData(), createUserController.signUp);
router.post('/auth/signin', sanitizer.sanitizeUserSignInData(), signInController.signIn);

export default router;
