const products = [
    {
        id: 1,
        name: 'Supreme T-Shirt',
        brand: 'Supreme',
        price: 99.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
     },
     {
        id: 2,
        name: 'Supreme jeans',
        brand: 'Supreme',
        price: 199.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
     },
     {
        id: 3,
        name: 'Supreme cap',
        brand: 'Supreme',
        price: 399.99,
        options: [
            { color: 'blue' },
            { size: 'XL' }
        ]
     }
]

const reviews = [
    {
        id: 1,
        productId: 1,
        authorId: 1,
        text: 'Ochen horoshaya futbolka'
    },
    {
        id: 2,
        productId: 2,
        authorId: 2,
        text: 'Ochen horoshaya shtna'
    },
    {
        id: 3,
        productId: 3,
        authorId: 3,
        text: 'Ochen horoshaya kepka'
    },
    {
        id: 4,
        productId: 1,
        authorId: 4,
        text: 'Ochen plohaya muzika'
    }
];

const users = [
    {
        id: 1,
        name: 'Vasya'
    },
    {
        id: 2,
        name: 'Petya'
    },
    {
        id: 3,
        name: 'Ivan'
    },
    {
        id: 4,
        name: 'Gorge'
    }
];

export default {
    products, reviews, users
}