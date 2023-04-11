import { describe, it, beforeEach, afterEach, expect } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/vue";
import FoodItemServingSize from "../FoodItemServingSize.vue";
import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";

const fakeServingSizes = ["Small", "Handful", "1 cup"];

describe("FoodItemServingSize", () => {
  const { debug } = render(FoodItemServingSize, {
    props: { servingSizes: fakeServingSizes },
  });
  afterEach(() => {
    cleanup();
  });
  it("should display dropdown which can be clicked and should show items populated from serving sizes prop", async () => {
    const dropdown = screen.getByRole("combobox");

    for (const fakeServingSize of fakeServingSizes) {
      screen.getByText(fakeServingSize);
    }
    const firstOption: HTMLOptionElement = screen.getByText(
      fakeServingSizes[0]
    );

    await userEvent.selectOptions(dropdown, firstOption.text);

    expect(firstOption.selected).toBeTruthy();
  });
});
