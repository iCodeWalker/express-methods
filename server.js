import dotenv from 'dotenv';
/**
 * This command will read the variables from the file and save them node js environment variable
 *
 * We have to configure the env file at the top so that it can be accessed in the below files.
 */

dotenv.config({ path: './config.env' });

import app from './app.js';

/**
 * Setting up environment variables
 */

// console.log(app.get('env'));
// console.log(process.env);

/**
 * From terminal we can set it using cmd
 *
 * NODE_ENV=development X=23 nodemon server.js
 *
 * This will create variables in process.env with name "NODE_ENV" and value "development"
 */

const port = process.env.PORT || 5000;
/**
 * Listening
 */
app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
