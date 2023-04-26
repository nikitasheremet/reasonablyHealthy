import React, { useState } from "react";

type FoodInputProps = {
  foodItems: Record<string, string[]>;
  onSelect: (selectedItem: string) => void;
};

function FoodInput({ foodItems, onSelect }: FoodInputProps) {
  const [inputValue, setInputValue] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setInputValue(newValue);
  }

  function handleItemClick(item: string) {
    onSelect(item);
    setInputValue("");
  }

  const matchingItems = Object.keys(foodItems).filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleChange} />
      {matchingItems.length === 0 && inputValue !== "" && (
        <p>No food items with that name found</p>
      )}
      {matchingItems.map((item) => (
        <p key={item} onClick={() => handleItemClick(item)}>
          {item}
        </p>
      ))}
    </div>
  );
}

export default FoodInput;
