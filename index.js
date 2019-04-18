import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App is live and listening on port ${port}!`);
});

export default app;
