import { describe, expect, it, afterEach, beforeEach } from "vitest";
import FoodItemInput from "../FoodItemInput.vue";

import { render, screen, fireEvent, cleanup } from "@testing-library/vue";

describe("FoodItemInput", () => {
  beforeEach(() => {
    render(FoodItemInput);
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

    const fakeInput = "fake input";

    await fireEvent.update(inputBar, fakeInput);

    expect(inputBar.value).toBe(fakeInput);
  });

  it("should show a dropdown of possible items as you type", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInputC = "c";

    await fireEvent.update(inputBar, fakeInputC);

    screen.getByText("cucumber");
    screen.getByText("carrot");

    const fakeInputCa = "ca";

    await fireEvent.update(inputBar, fakeInputCa);

    screen.getByText("carrot");
    const cucumberOption = screen.queryByText("cucumber");

    expect(cucumberOption).toBeNull();
  });
  it("should show the suggested food item in the input bar if dropdown option is clicked on", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInputC = "c";

    await fireEvent.update(inputBar, fakeInputC);

    const cucumberSuggestion = "cucumber";

    const cucumberOption = screen.getByText(cucumberSuggestion);

    await fireEvent.click(cucumberOption);

    expect(inputBar.value).toBe(cucumberSuggestion);
  });
  it("should hide suggested options if input bar is empty", async () => {
    const inputBar: HTMLInputElement = screen.getByPlaceholderText(
      "Please enter your food item"
    );

    const fakeInputC = "c";

    await fireEvent.update(inputBar, fakeInputC);

    const cucumberSuggestion = "cucumber";

    screen.getByText(cucumberSuggestion);
    screen.getByText("carrot");

    await fireEvent.update(inputBar, "");

    const cucumberOption = screen.queryByText(cucumberSuggestion);
    const carrotOption = screen.queryByText("carrot");

    expect(cucumberOption).toBeNull();
    expect(carrotOption).toBeNull();
  });
});
