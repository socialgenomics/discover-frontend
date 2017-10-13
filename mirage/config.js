// eslint-disable use-ember-get-and-set

export default function() {
  this.get('/stats', () => {
    return {
      "datasets": 1000,
      "datasources": 50,
      "repositive_collections": 10
    };
  });

  this.post('/autocomplete', () => {
    // Example request
    // {
    //   limit: 3,
    //   query: [
    //     {
    //       type: 'predicate',
    //       target: {
    //         type: 'token',
    //         text: 'disease',
    //         position: {
    //           from: 1,
    //           to: 7
    //         }
    //       },
    //       value: {
    //         type: 'token',
    //         text: 'cancer',
    //         position: {
    //           from: 9,
    //           to: 14
    //         }
    //       },
    //       position: {
    //         from: 1,
    //         to: 14
    //       }
    //     },
    //     {
    //       type: 'phrase',
    //       tokens: [
    //         {
    //           type: 'token',
    //           text: 'programming',
    //           position: {
    //             from: 16,
    //             to: 26,
    //           },
    //         },
    //         {
    //           type: 'token',
    //           text: 'in',
    //           autocomplete: true,
    //           position: {
    //             from: 28,
    //             to: 29,
    //           },
    //         },
    //         {
    //           type: 'token',
    //           text: 'c',
    //           position: {
    //             from: 31,
    //             to: 31,
    //           },
    //         },
    //       ],
    //       position: {
    //         from: 16,
    //         to: 31
    //       }
    //     }
    //   ],
    // }
    return {
      suggestions: [
        {
          text: "Programming in C",
          position: {
            from: 16,
            to: 31
          }
        },
        {
          text: "in Croatia",
          position: {
            from: 28,
            to: 31
          }
        }
      ]
    }
  });


  this.passthrough();
}
