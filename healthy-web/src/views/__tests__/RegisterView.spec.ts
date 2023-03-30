import { render, screen, fireEvent } from "@testing-library/vue";
import RegisterView from "../RegisterView.vue";
import { describe, it, expect } from "vitest";

describe("Register component is rendered with input fields of: email, password, and re-enter password and register button", () => {
  render(RegisterView);
  const emailInput: HTMLInputElement = screen.getByLabelText("Email:");
  const passwordInput: HTMLInputElement = screen.getByLabelText("Password:");
  const reEnterPasswordInput: HTMLInputElement =
    screen.getByLabelText("Re-Enter Password:");
  const submitRegisterButton: HTMLButtonElement = screen.getByRole("button", {
    name: "Register",
  });

  it("should have no error with valid inputs", async () => {
    const fakeEmail = "fakeemail@fakeemail.com";
    const fakePassword = "fakepassword!111";

    await fireEvent.update(emailInput, fakeEmail);
    await fireEvent.update(passwordInput, fakePassword);
    await fireEvent.update(reEnterPasswordInput, fakePassword);

    expect(emailInput.value).toBe(fakeEmail);
    expect(emailInput.validity.valid).toBe(true);

    expect(passwordInput.value).toBe(fakePassword);
    expect(reEnterPasswordInput.value).toBe(fakePassword);
  });
  it("should only be valid for password and re-enter password field to have 5+ characters and contain lowercase, capital, number and symbol", async () => {
    const fakeInvalidPasswordArray = [
      "onlylowercase",
      "ONLYUPPERCASE",
      "111111", //only number
      "!!!!!!!", //only symbol
      "a", //<5 character
      "aA!aa", //no number
      "A!1111", //no lowercase
      "a!11111", //no upercase
      "aA11111", //no symbol
    ];

    for (const [_, invalidPassword] of fakeInvalidPasswordArray) {
      await fireEvent.update(passwordInput, invalidPassword);
      await fireEvent.update(reEnterPasswordInput, invalidPassword);

      expect(passwordInput.validity.valid).toBe(false);
      expect(reEnterPasswordInput.validity.valid).toBe(false);
    }
  });
  it("should have clickable register button", async () => {
    //Arrange

    //Act
    await fireEvent.click(submitRegisterButton);

    //Assert
  });
});
