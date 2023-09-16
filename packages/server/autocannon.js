const autocannon = require('autocannon')

async function foo() {
    const result = await autocannon({
        url: 'http://localhost:5001',
        connections: 10, //default
        pipelining: 1, // default
        duration: 1, // default,
        workers: 8,
        requests: [
            {
                path: '/api/v1/order',
                method: 'GET',
            },
            {
                path: '/api/v1/order',
                method: 'POST',
                header: {
                  "Content-type": "application/json"
                },
                body: JSON.stringify({
                    amount: 44000,
                    items: [
                        {
                            product: {
                                _id: "645ea6d83ee1f2565855fe97",
                                name: "Лагман",
                                price: 32000,
                                quantity: 0,
                                variants: [],
                            },
                            quantity: 1,
                            variant: null
                        },
                    ],
                    customer: "6438b31927f30cde361fa298",
                    delivery: {
                        address: "Ташкент, Юнусабадский район, массив Минор, 87",
                        coords: [
                            41.32884675768372,
                            69.27910180526285
                        ],
                        entrance: null,
                        floor: null,
                        apartment: null,
                        doorphone: null,
                        message: null,
                    },
                    payment: 1,
                    cart: "64667874e20e9a24e230b6d9"
                })
            }
        ]

    },  console.log)
}

foo()
