import { test } from "@playwright/test";
import { ErrorMessages } from "../../helpers/ErrorMessage";
import ApplicationURL from "../../helpers/ApplicationURL";
import LoginPage from "../../pages/LoginPage";

test.describe("Navigation login scenarios", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Login with loked out user", async ({ page }) => {
    await loginPage.loginToApplication(
      process.env.LOCKED_OUT_USER,
      process.env.CORRECT_PASSWORD
    );
    await loginPage.validateErrorMessage(ErrorMessages.LOCKED_OUT_MESSAGE);
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test("Login with incorrect username", async ({ page }) => {
    await loginPage.loginToApplication(
      process.env.STANDARD_USER,
      process.env.INCORRECT_PASSWORD
    );
    await loginPage.validateErrorMessage(
      ErrorMessages.INCORRECT_USERNAME_MESSAGE
    );
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });

  test("Login with incorrect password", async ({ page }) => {
    await loginPage.loginToApplication(
      process.env.STANDARD_USER,
      process.env.INCORRECT_PASSWORD
    );
    await loginPage.validateErrorMessage(
      ErrorMessages.INCORRECT_USERNAME_MESSAGE
    );
    await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
  });
});
