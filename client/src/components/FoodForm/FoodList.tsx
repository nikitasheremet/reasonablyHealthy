import React from 'react';
import { SavedFoodItem } from './FoodForm';
function FoodList({ foodItems }) {
  return (
    <ul>
      {foodItems.map((item: SavedFoodItem) => (
        <li key={item.date}>{item.name}</li>
      ))}
    </ul>
  );
}

export default FoodList;