import React, { useState } from "react";
import foodItemsJSON from "../../foodItems.json";
import FoodInput from "./FoodInput";
import FoodItemServingSize from "./FoodItemServingSize";

type FoodItems = Record<string, string[]>;

function FoodForm(): JSX.Element {
  const foodItems: FoodItems = foodItemsJSON;

  const [selectedItem, setSelectedItem] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");

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
      <div>
        <h3>{selectedItem}</h3>
        <FoodItemServingSize
          servingSizes={foodItems[selectedItem] || []}
          onSelectSize={handleSelectSize}
        />
      </div>
      <br />
      {selectedSize !== "" && (
        <div>
          <h4>Selected Serving Size: {selectedSize}</h4>
        </div>
      )}
    </div>
  );
}

export default FoodForm;
