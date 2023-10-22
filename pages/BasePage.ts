import { Locator, Page, expect, test } from "@playwright/test";

export abstract class BasePage {

  private pageTitleElement: Locator;

  constructor(protected page: Page) {
    this.pageTitleElement = this.page.locator('[class="title"]');
  }

  public async validatePageTitle(title: string) {
    await this.validateElementText(this.pageTitleElement, title);
  }

  public async validatePageUrl(url: string) {
    await test.step(`Validate that a correct value of URL is ${url}`,async () => {});
    await expect(this.page).toHaveURL(url);
  }

  public async validateElementText(element: Locator, expectedText: string){
    await test.step(`Validate that a correct element text is ${expectedText}`,async () => {});
    await expect(element).toContainText(expectedText);
  }

  protected async clickElement(element: Locator) {
    await test.step(`Clicking the '${element}' element`, async() => {
        await element.click();
    })
}

}
