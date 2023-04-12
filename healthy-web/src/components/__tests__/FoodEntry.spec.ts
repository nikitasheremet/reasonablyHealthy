import { afterEach, describe, expect, it, vitest } from "vitest";
import { cleanup, render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import FoodEntry from "../FoodEntry/FoodEntry.vue";
import fakeFoodItems from "./fixtures/fakeFoodItems";

vitest.mock("../../assests/foods", () => fakeFoodItems);
describe("FoodInput", () => {
  afterEach(() => {
    cleanup();
  });
  it("should render an input bar and dropdown", () => {
    render(FoodEntry);
    screen.getByPlaceholderText("Please enter your food item");
    screen.getByRole("combobox");
  });
  it("should suggest the correct foods based on the json data imported", () => {
    render(FoodEntry);
    const inputBar = screen.getByPlaceholderText("Please enter your food item");

    const fakeFoodItem = Object.keys(fakeFoodItems)[1];

    const partialFoodItemName = fakeFoodItem.substring(0, 2);

    userEvent.type(inputBar, partialFoodItemName);

    screen.getByText(fakeFoodItem);
    const fakeFoodSuggestion = screen.queryByText("foodItem");
    expect(fakeFoodSuggestion).toBeFalsy();
  });
});
