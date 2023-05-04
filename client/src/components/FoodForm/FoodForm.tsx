import React, { useEffect, useState } from "react";
import foodItemsJSON from "../../foodItems.json";
import FoodInput from "./FoodInput";
import FoodItemServingSize from "./FoodItemServingSize";
import FoodList from "./FoodList";

type FoodItems = Record<string, string[]>;
export interface SavedFoodItem {
  date: number;
  name: string;
  size: string;
}
type SavedFoodItems = Array<SavedFoodItem>

function FoodForm(): JSX.Element {
  const foodItems: FoodItems = foodItemsJSON;

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [savedFoodItems, setFoodItems] = useState<SavedFoodItems>(() => {
    // Try to get the food items from local storage, or use a default array
    const savedItems = localStorage.getItem('savedFoodItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save the current array of food items to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('savedFoodItems', JSON.stringify(savedFoodItems));
  }, [savedFoodItems]);

  const addFoodItem = () => {
    // Create a new item with a unique ID and add it to the array
    const newItem = { date: Date.now(), name: selectedItem, size: selectedSize };
    setFoodItems([...savedFoodItems, newItem]);
  };

  function handleSelectItem(item: string): void {
    setSelectedItem(item);
    setSelectedSize("");
  }

  function handleSelectSize(size: string): void {
    setSelectedSize(size);
  }

  return (
    <div>
      <h2>Food Form</h2>
      <FoodInput foodItems={foodItems} onSelect={handleSelectItem} />
      <br />
      <p>Selected size is: {selectedSize}. Selected Item is: {selectedItem}</p>
      <FoodItemServingSize
        servingSizes={foodItems[selectedItem] || []}
        onSelectSize={handleSelectSize}
      />
      <br />
      <button onClick={addFoodItem} disabled={!(selectedItem && selectedSize)} >Add Item</button>
      
      <FoodList foodItems={savedFoodItems} />

      <button onClick={() => localStorage.clear()} >Clear local storage food items</button>
    </div>
  );
}

export default FoodForm;
