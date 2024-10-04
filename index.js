import { setupServer } from './server.js';
import { initMongoDB } from './src/db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
};
bootstrap();
