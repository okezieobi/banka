import userRouter from './users';
import accountRouter from './accounts';
import transactionRouter from './transactions';

const versionNumber = '/api/v1';

export default (app) => {
  app.use(versionNumber, userRouter);
  app.use(versionNumber, accountRouter);
  app.use(versionNumber, transactionRouter);
};
