import app from './app';

//connect with mongoose
import mongoose from 'mongoose';
import config from './app/config';
async function main() {
  await mongoose.connect(config.db_url as string);

  try {
    app.listen(config.port, () => {});
  } catch (error) {
    console.log(error);
  }
}
main();

