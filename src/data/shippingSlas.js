export default {
  items: [
    {
        name: 'Cheapest',
        channel: 'delivery',
        sla: '5 - 9',
        timeType: 'businessDays',
        price: 12.99,
        lowPrice: 7.99,
        availableItems: [ 0, 1, 2 ],
        shipments: [
          {
            sla: '5 - 6',
            timeType: 'businessDays',
            items: [ 0 ]
          },
          {
            sla: '7 - 9',
            timeType: 'businessDays',
            items: [ 1, 2 ]
          },
        ]
    },
    {
        name: 'Fastest',
        channel: 'delivery',
        sla: '1 - 3',
        timeType: 'businessDays',
        price: 46,
        lowPrice: 27,
        availableItems: [ 0, 1, 2 ],
        shipments: [
          {
            sla: '1 - 3',
            timeType: 'businessDays',
            items: [ 0, 1, 2 ]
          },
        ]
    }
  ],
}