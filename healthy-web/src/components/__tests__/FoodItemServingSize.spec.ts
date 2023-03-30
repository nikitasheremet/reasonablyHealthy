import { describe, it, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/vue";
import FoodItemServingSize from "../FoodItemServingSize.vue";

describe("FoodItemServingSize", () => {
  beforeEach(() => {
    render(FoodItemServingSize);
  });
  afterEach(() => {
    cleanup();
  });
  it("should display dropdown which can be clicked and should show items populated from food json", () => {
    const dropdown = screen.getByRole("combobox")

    console.log(dropdown)

    const smallOption = screen.queryByDisplayValue("Small") as HTMLOptionElement

    
    console.log(smallOption.selected)
  })
});
