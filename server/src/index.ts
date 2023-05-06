import express, { Request, Response } from 'express';

// Define the food items and serving sizes
const foodItems = {
  'apple': ['Small', 'Medium', 'Large'],
  'banana': ['Small', 'Medium', 'Large'],
  'orange': ['Small', 'Medium', 'Large']
};

// Create the Express app
const app = express();

// Define the GET endpoint
app.get('/foods', (req: Request, res: Response) => {
  console.log("in here")
  // Return the food items with their serving sizes
  res.json(foodItems);
});

// Start the server
const port = 3005;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
