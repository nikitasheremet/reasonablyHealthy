import React from 'react';

function FoodList({ foodItems }) {
  return (
    <ul>
      {foodItems.map((item) => (
        <li key={item.name}>{item.name}</li>
      ))}
    </ul>
  );
}

export default FoodList;