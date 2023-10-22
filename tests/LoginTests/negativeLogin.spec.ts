import {test} from "@playwright/test"
import LoginPage from "../../pages/loginPage";
import UserCredentials from "../../helpers/UserCredentials";
import { ErrorMessages } from "../../helpers/ErrorMessage";
import ApplicationURL from "../../helpers/ApplicationURL";

test.describe("Navigation login scenarios", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
    })

    test("Login with loked out user",async ({page}) => {
        await loginPage.loginToApplication(
            UserCredentials.LOCKED_OUT_USER,
            UserCredentials.CORRECT_PASSWORD
          );
          await loginPage.validateErrorMessage(ErrorMessages.LOCKED_OUT_MESSAGE);
          await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    })

    test("Login with incorrect username",async ({page}) => {
        await loginPage.loginToApplication(
            UserCredentials.STANDARD_USER,
            UserCredentials.INCORRECT_USER
          );
          await loginPage.validateErrorMessage(ErrorMessages.INCORRECT_USERNAME_MESSAGE);
          await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    })

    test("Login with incorrect password",async ({page}) => {
        await loginPage.loginToApplication(
            UserCredentials.STANDARD_USER,
            UserCredentials.INCORRECT_PASSWORD
          );
          await loginPage.validateErrorMessage(ErrorMessages.INCORRECT_USERNAME_MESSAGE);
          await loginPage.validatePageUrl(ApplicationURL.BASE_URL);
    })

})