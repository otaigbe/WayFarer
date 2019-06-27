import express from 'express';
import createUserController from '../../controller/createUser';
import sanitizer from '../../middleware/sanitizer';

const router = express.Router();

router.post('/auth/signup', sanitizer.sanitizeUserBioData(), createUserController.signUp);

export default router;
