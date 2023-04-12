import { describe, expect, it, afterEach, beforeEach } from "vitest";
import {FoodItemInput} from "../FoodEntry";

import { render, screen, fireEvent, cleanup } from "@testing-library/vue";
import fakeFoodItemDetails from "./fixtures/fakeFoodItems";

const fakeFoodItems = Object.keys(fakeFoodItemDetails);

describe("FoodItemInput", () => {
  beforeEach(() => {
    render(FoodItemInput, {
      props: { foodItems: fakeFoodItemDetails },
    });
  });
  afterEach(() => {
    cleanup();
  });
  it("should render with an input bar", () => {
    screen.getByPlaceholderText("Please enter your food item");
  });
  it("should accept user input", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInput = fakeFoodItems[1];

    await fireEvent.update(inputBar, fakeInput);

    expect(inputBar.value).toBe(fakeInput);
  });

  it("should show a dropdown of possible items as you type", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeFoodItem = fakeFoodItems[1];
    const fakeInputOneLetter = "t";

    await fireEvent.update(inputBar, fakeInputOneLetter);

    screen.getByText(fakeFoodItems[0]);
    screen.getByText(fakeFoodItem);

    const fakeInputFourLetters = "tato";

    await fireEvent.update(inputBar, fakeInputFourLetters);

    screen.getByText(fakeFoodItem);
    const addtionalFoodOption = screen.queryByText(fakeFoodItems[0]);

    expect(addtionalFoodOption).toBeNull();
  });
  it("should show the suggested food item in the input bar if dropdown option is clicked on", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInputOneLetter = "c";

    await fireEvent.update(inputBar, fakeInputOneLetter);

    const cricketSuggestion = fakeFoodItems[2];

    const cucumberOption = screen.getByText(cricketSuggestion);

    await fireEvent.click(cucumberOption);

    expect(inputBar.value).toBe(cricketSuggestion);
  });
  it("should hide suggested options if input bar is empty", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInputOneLetter = "t";

    await fireEvent.update(inputBar, fakeInputOneLetter);

    screen.getByText(fakeFoodItems[0]);
    screen.getByText(fakeFoodItems[1]);

    await fireEvent.update(inputBar, "");

    const firstOption = screen.queryByText(fakeFoodItems[0]);
    const secondOption = screen.queryByText(fakeFoodItems[1]);

    expect(firstOption).toBeNull();
    expect(secondOption).toBeNull();
  });
});
