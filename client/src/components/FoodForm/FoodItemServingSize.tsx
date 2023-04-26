import React from "react";

type FoodItemServingSizeProps = {
  servingSizes: string[];
  onSelectSize: (selectedSize: string) => void;
};

function FoodItemServingSize({ servingSizes, onSelectSize }: FoodItemServingSizeProps) {
  function handleSizeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedSize = event.target.value;
    onSelectSize(selectedSize);
  }

  return (
    <div>
      <select onChange={handleSizeChange}>
        <option value="">-- Select serving size --</option>
        {servingSizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FoodItemServingSize;
