import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export default class ProductsPage extends BasePage{

    constructor(protected page: Page){
        super(page);
    }

}