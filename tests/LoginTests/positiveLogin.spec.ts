import { test } from "@playwright/test";
import LoginPage from "../../pages/LoginPage";
import UserCredentials from "../../helpers/UserCredentials";
import ApplicationURL from "../../helpers/ApplicationURL";

test.describe("Positive login scenarios", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test("Login with standart user", async ({ page }) => {
    await loginPage.loginToApplication(
      UserCredentials.STANDARD_USER,
      UserCredentials.CORRECT_PASSWORD
    );
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test("Login with problem user", async ({ page }) => {
    await loginPage.loginToApplication(
      UserCredentials.PROBLEM_USER,
      UserCredentials.CORRECT_PASSWORD
    );
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });

  test("Login with performance glitch usr", async ({ page }) => {
    await loginPage.loginToApplication(
      UserCredentials.PERFORMANCE_GLITCH_USER,
      UserCredentials.CORRECT_PASSWORD
    );
    await loginPage.validatePageUrl(ApplicationURL.INVENTORY_PAGE_URL);
  });
});
