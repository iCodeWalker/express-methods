import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * By default express does not put the body data on the request parameter, we have to do it using a middleware
 * express.json() is a middleware that puts the body data on the req object
 */
app.use(express.json());

/**
 * Read the data from "dev-data"
 */

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

/**
 * GET http method
 */
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({ status: 'success', data: { tours: tours } });
});

/**
 * POST http method
 */
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

const port = 5000;
/**
 * Listening
 */
app.listen(port, () => {
  console.log(`Started listening on port ${port}`);
});
