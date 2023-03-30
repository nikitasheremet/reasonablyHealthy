import { render, screen, fireEvent } from "@testing-library/vue";
import HomeView from "../HomeView.vue";
import { describe, it } from "vitest";

describe("HomeView component is rendered", () => {
  it("should contain 'Register' button", async () => {
    render(HomeView);

    const registerButton = screen.getByRole("button", {
      name: "Register",
    });

    await fireEvent.click(registerButton);
  });
});
