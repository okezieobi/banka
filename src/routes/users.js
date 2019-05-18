import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.signupClients(), userController.signUp);

router.post('/auth/signin', userMiddleware.signinClients(), userController.signIn);

router.post('/auth/signup/admin', userMiddleware.signupAdmin(), userController.signUpAdmin);

router.post('/auth/signin/admin', userMiddleware.signinAdmin(), userController.signinAdminStaff);

router.post('/auth/signin/staff', userMiddleware.signinStaff(), userController.signinAdminStaff);

router.post('/auth/signup/staff', userMiddleware.signupStaff(), userController.signUpStaff);

export default router;
