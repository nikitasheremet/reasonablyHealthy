import { describe, it, beforeEach, afterEach } from "vitest";
import { render, cleanup } from "@testing-library/vue";
import FoodItemServingSize from "../FoodItemServingSize.vue";

describe("FoodItemServingSize", () => {
  beforeEach(() => {
    render(FoodItemServingSize);
  });
  afterEach(() => {
    cleanup();
  });
});
