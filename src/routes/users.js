import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middleware/users';

router.post('/auth/signup', userMiddleware.signupClients(), userController.signUp.bind(userController));

router.post('/auth/signin', userMiddleware.signinClients(), userController.signinClients.bind(userController));

router.post('/auth/signup/admin', userMiddleware.signupAdmin(), userController.signUpAdmin.bind(userController));

router.post('/auth/signin/admin', userMiddleware.signinAdmin(), userController.signinAdminStaff.bind(userController));

router.post('/auth/signin/staff', userMiddleware.signinStaff(), userController.signinAdminStaff.bind(userController));

router.post('/auth/signup/staff', userMiddleware.signupStaff(), userController.signUpStaff.bind(userController));

export default router;
