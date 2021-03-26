export default {
  items: [
    {
        name: 'Normal',
        availableItems: [ 0, 1, 2 ],
        shipments: [
            {
                sla: null,
                items: [ 0, 1, 2 ]
            },
        ],
        date: [
            { day: '1' },
            '',
            { day: '3' },
            { day: '4' },
            { day: '5' },
            { day: '6' },
            { day: '7' },
            { day: '8' },
            { day: '9' },
        ],
        timeprice: [
            {
                id: 0,
                time: '2019/05/05 13:00:00',
                timeTo: '2019/05/05 17:00:00',
                price: 14.99,
                lowPrice: 11.99,
            },
            {
                id: 1,
                time: '2019/05/05 17:00:00',
                timeTo: '2019/05/05 21:00:00',
                price: 12.99,
                lowPrice: 7.99,
            },
            {
                id: 2,
                time: '2019/05/05 21:00:00',
                timeTo: '2019/05/05 23:00:00',
                price: 12.99,
                lowPrice: 6.99,
            },
        ]
    },
  ],
}