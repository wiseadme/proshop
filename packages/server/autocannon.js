const autocannon = require('autocannon')

// autocannon({
//     url: 'http://localhost/v1/order',
//     connections: 10, //default
//     pipelining: 1, // default
//     duration: 10 // default
// }, console.log)

// async/await
async function foo () {
    const result = await autocannon({
        url: 'http://localhost:5001/v1/order',
        connections: 100, //default
        pipelining: 1, // default
        duration: 10, // default,
        // workers: 8,
        method: 'POST',
        body: JSON.stringify({
            "amount": 44000,
            "items": [
                {
                    "product": {
                        "_id": "645ea6d83ee1f2565855fe97",
                        "name": "Лагман",
                        "description": "<p><span style=\"color: rgb(0, 0, 0);\">Лагман – изысканное и безумно вкусное блюдо, пользующееся популярностью в странах Центральной Азии (преимущественно Узбекистан, Таджикистан, Казахстан, Киргизия, Китай). Яство представлено в большом количестве разновидностей, которые различны по особенностям приготовления и составу. Он включает в себя специальную лапшу, мясо и овощи.</span></p>",
                        "price": 32000,
                        "quantity": 0,
                        "unit": {
                            "value": "Порция",
                            "meta": "",
                            "_id": "64398d88fe85837d1727a7c1"
                        },
                        "url": "lagman",
                        "categories": [
                            {
                                "_id": "6436683ba6ed430c196da23b",
                                "title": "Первые блюда",
                                "url": "pervye-blyuda",
                                "order": 0
                            }
                        ],
                        "image": "/uploads/fe97/645fe08b20333101e0d2b030|Frame 33.png",
                        "seo": {
                            "title": "Лагман",
                            "description": "Лагман",
                            "keywords": "Лагман",
                            "metatags": [],
                            "schema": []
                        },
                        "attributes": [
                            {
                                "meta": "",
                                "key": "Кухня",
                                "value": "узбекская",
                                "order": 0
                            },
                            {
                                "meta": "",
                                "key": "Мясо",
                                "value": "говядина",
                                "order": 0
                            },
                            {
                                "meta": "",
                                "key": "Вес",
                                "value": "250",
                                "order": 0
                            }
                        ],
                        "assets": [
                            {
                                "_id": "645fe08b20333101e0d2b030",
                                "url": "/uploads/fe97/645fe08b20333101e0d2b030|Frame 33.png",
                                "fileName": "Frame 33.png",
                                "ownerId": "645ea6d83ee1f2565855fe97",
                                "main": true,
                                "createdAt": "2023-05-13T19:10:03.287Z",
                                "updatedAt": "2023-05-13T19:10:03.309Z",
                                "__v": 0
                            }
                        ],
                        "variants": [],
                        "conditions": {
                            "visible": true,
                            "countable": false,
                            "exists": true,
                            "hasDiscounts": false,
                            "hasActions": false,
                            "_id": "645ea6d83ee1f2565855fe99"
                        },
                        "related": [],
                        "createdAt": "2023-05-12T20:51:36.402Z",
                        "updatedAt": "2023-05-13T19:12:24.301Z",
                        "__v": 0
                    },
                    "quantity": 1,
                    "variant": null
                },
                {
                    "product": {
                        "_id": "6443d12f62af3ef06f9e9fbb",
                        "name": "Ачичук",
                        "description": "<p>Ачичук</p>",
                        "price": 12000,
                        "quantity": 0,
                        "unit": {
                            "value": "Порция",
                            "meta": "",
                            "_id": "64398d88fe85837d1727a7c1"
                        },
                        "url": "achichuk",
                        "categories": [
                            {
                                "_id": "6443d1022b86d52379203a92",
                                "title": "Салаты",
                                "url": "salaty",
                                "order": 0
                            }
                        ],
                        "image": "/uploads/9fbb/645fdc75191b0073489a5a30|Frame 31.png",
                        "seo": {
                            "title": "Ачичук",
                            "description": "Ачичук",
                            "keywords": "Ачичук",
                            "metatags": [
                                {
                                    "_id": "64403b7f591d03194b3203b2",
                                    "props": {
                                        "property": "og:image",
                                        "content": "https://pbs.twimg.com/media/DyKId6hW0AEQgQq.jpg"
                                    },
                                    "order": 0,
                                    "__v": 0
                                },
                                {
                                    "_id": "64403a2308e151474401f130",
                                    "props": {
                                        "property": "og:title",
                                        "content": "online internet shop for programmers"
                                    },
                                    "order": 0,
                                    "__v": 0
                                },
                                {
                                    "_id": "6443cf4bb6a32e3f17e1b62a",
                                    "props": {
                                        "property": "og:content",
                                        "content": "moy sait"
                                    },
                                    "order": 0,
                                    "__v": 0
                                }
                            ],
                            "schema": []
                        },
                        "attributes": [
                            {
                                "meta": "",
                                "key": "Кухня",
                                "value": "азербайджанская",
                                "order": 0
                            }
                        ],
                        "assets": [
                            {
                                "_id": "645fdc75191b0073489a5a30",
                                "url": "/uploads/9fbb/645fdc75191b0073489a5a30|Frame 31.png",
                                "fileName": "Frame 31.png",
                                "ownerId": "6443d12f62af3ef06f9e9fbb",
                                "main": true,
                                "createdAt": "2023-05-13T18:52:37.997Z",
                                "updatedAt": "2023-05-13T18:52:38.017Z",
                                "__v": 0
                            }
                        ],
                        "variants": [],
                        "conditions": {
                            "visible": true,
                            "countable": false,
                            "exists": true,
                            "hasDiscounts": false,
                            "hasActions": false,
                            "_id": "6443d12f62af3ef06f9e9fbd"
                        },
                        "related": [
                            {
                                "_id": "64366865fa599c06a5f72f89",
                                "name": "Куриный суп",
                                "price": 22000,
                                "url": "kurinyy-sup",
                                "categories": [
                                    {
                                        "_id": "6436683ba6ed430c196da23b",
                                        "title": "Первые блюда",
                                        "url": "pervye-blyuda",
                                        "image": "/uploads/a23b/6439c632bd4aa4bf0cd20d52|Frame 41.png",
                                        "seo": {
                                            "title": "Первые блюда",
                                            "description": "Первые блюда",
                                            "keywords": "Первые блюда",
                                            "metatags": [],
                                            "schema": []
                                        },
                                        "parent": null,
                                        "order": 0,
                                        "children": [],
                                        "conditions": {
                                            "visible": true,
                                            "special": false
                                        },
                                        "length": 2,
                                        "createdAt": "2023-04-12T08:13:47.618Z",
                                        "updatedAt": "2023-05-13T19:57:09.889Z",
                                        "__v": 0
                                    }
                                ],
                                "image": "/uploads/2f89/645fdc1e20333101e0d2afe3|Frame 34.png"
                            },
                            {
                                "_id": "6438b56dc3a3af9ef0cd309b",
                                "name": "Люля кебаб",
                                "price": 12000,
                                "url": "lyulya-kebab",
                                "categories": [
                                    {
                                        "_id": "6438b57ccf7d8acdb148c2b8",
                                        "title": "Мангал",
                                        "url": "mangal",
                                        "image": null,
                                        "seo": {
                                            "title": "Мангал",
                                            "description": "Мангал",
                                            "keywords": "Мангал",
                                            "metatags": [],
                                            "schema": []
                                        },
                                        "parent": null,
                                        "order": 0,
                                        "children": [],
                                        "conditions": {
                                            "visible": true,
                                            "special": false
                                        },
                                        "length": 2,
                                        "createdAt": "2023-04-14T02:07:56.206Z",
                                        "updatedAt": "2023-05-13T19:57:09.895Z",
                                        "__v": 0
                                    }
                                ],
                                "image": "/uploads/309b/645fdc56dc050c3951b0e83b|Frame 45.png"
                            }
                        ],
                        "createdAt": "2023-04-22T12:21:03.800Z",
                        "updatedAt": "2023-05-13T18:52:39.752Z",
                        "__v": 0
                    },
                    "quantity": 1
                }
            ],
            "customer": "6438b31927f30cde361fa298",
            "delivery": {
                "address": "Ташкент, Юнусабадский район, массив Минор, 87",
                "coords": [
                    41.32884675768372,
                    69.27910180526285
                ],
                "entrance": null,
                "floor": null,
                "apartment": null,
                "doorphone": null,
                "message": null,
                "_id": "646671700ada8ef5965368ee"
            },
            "payment": 1,
            "cart": "64667874e20e9a24e230b6d9"
        })
    })
    console.log(result)
}

foo()
