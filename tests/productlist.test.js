import { test, expect, request } from '@playwright/test'
import { addtocart } from './payload/addtocart.payload.js'
import { orderplace } from './payload/orderplace.payload.js'



// FORMAT FOR URL SETUP FOR THE HEADER AND BASEURL

let api;
test.beforeAll(async () => {
    api = await request.newContext({
        baseURL: 'https://cannabis.demo-7.com/user/highsociety/',
        extraHTTPHeaders: {
            Isorigin: 'https://demo-7.com',
            authkey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoidGVzdGVyemVyb0BtYWlsaW5hdG9yLmNvbSIsImZpcnN0TmFtZSI6InRlc3Rlcnplcm8iLCJsYXN0TmFtZSI6IiIsInVzZXJJZCI6IjY5N2FlMmFjNjUzMGM0Y2M0OWU4MDJkMyIsInVzZXJUeXBlIjoicmVhbCIsImlhdCI6MTc2OTY2MTU3MywiZXhwIjoxODAxMjE5MTczfQ.N2DEwd_Hl7krTVNVhzjZ797GgOjKepzx4QTg7LCCgDo'
        },
    });
});

test('Check the product list', async () => {
    const response = await api.get('products/homeproductlist')
    console.log('FINAL URL:', response.url());
    console.log('STATUS:', response.status());
    // console.log('BODY:', await response.text());
})


// ADD TO CART API CHECKING

test("to test add to cart api is working", async () => {
    const start = Date.now()
    const response = await api.post('carts/addtocart', {
        data: addtocart
    })
    const data2 = await response.json()
    console.log("Response: ", data2);
    const responseTime = Date.now() - start;
    console.log("Time to add to cart: ", responseTime);
    expect(responseTime).toBeLessThan(1000)
    expect(response.status()).toBe(200)
    // expect(data2.quantity).toBeLessThanOrEqual(20)
    if (data2.meta.status == false) {
        console.log('STATUS FOR ADD TO CART: ', response.status());

        console.log("Can't add the more products");
        expect(data2.status()).toBe(200)
    }
    else {
        console.log("Done");

    }


})


// ORDER PLACE CHECKING THE API

// test("order place api", async ({ request }) => {
//     const start = Date.now()
//     const response = await request.post(`orders/orderplace`, {
//         data: orderplace

//     })
//     const responseTime = Date.now() - start
//     console.log('response time for order placing: ', responseTime);
//     expect(responseTime).toBeLessThan(1000)
//     expect(response.status()).toBe(200)
// })