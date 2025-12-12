import { expect, test } from '@playwright/test'
import { SERVICE_URL } from '../../../config/env-data'
import { fakeJwt } from '../../utils/jwt-generator'

let fakeJwtValue: string

test.beforeAll(async () => {
    console.log('Init: getting jwt')
    fakeJwtValue = fakeJwt()
})

test.beforeEach(async ({ context }) => {
    // we set the jwt in localStorage before the page is created
    await context.addInitScript((token) => {
        localStorage.setItem('jwt', token)
    }, fakeJwtValue)

    // we mock on context level so all pages created in this context will have this mock
    await context.route('**/orders', async (route) => {
        await route.fulfill({
            json: '',
        })
    })
})

test('validate order creation page', async ({ context }) => {
    // create a new page in the context with the jwt already set in localStorage
    const page = await context.newPage()
    await page.goto(SERVICE_URL)
    await expect(page.getByTestId('openStatusPopup-button')).toBeVisible()
})
