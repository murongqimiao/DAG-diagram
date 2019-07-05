let level = {
  bf37cd8a88a2cb91: 1,
  bf37cd8a88a2cb9c: 3,
  bf37cd8a88a2cb9b: 3,
  bf37cd8a88a2cb9w: 3,
  d0e294906a6a076f: 2,
  d0e294906a6a0766: 3,
  bb7b4d9341ffe881: 3,
  b5e0f0e3b6b24081: 3,
  '7e1135653e4ceb48': 3,
  '46ffab08872440d5': 3,
  f3bb46e711e89a28: 3,
  '078d93b64d47125m': 2,
  c82d433ad78a588b: 3,
  '078d93b64d47125b': 3,
  '0aba4979011e0cc8': 3,
  '4f9c15cdc02a35cs': 3,
  aead66f6681c705a: 4,
  '4f9c15cdc02a35cb': 4
}

let levelTrans = {
  1: ['bf37cd8a88a2cb91'],
  2: ['d0e294906a6a076f', '078d93b64d47125m'],
  3: [
    'bf37cd8a88a2cb9c',
    'bf37cd8a88a2cb9b',
    'bf37cd8a88a2cb9w',
    'd0e294906a6a0766',
    'bb7b4d9341ffe881',
    '4f9c15cdc02a35cs',
    'b5e0f0e3b6b24081',
    'f3bb46e711e89a28',
    'c82d433ad78a588b',
    '078d93b64d47125b',
    '0aba4979011e0cc8'
  ],
  4: ['aead66f6681c705a', '4f9c15cdc02a35cb']
}

let historyList = [
  {
    time: 0.0,
    action: [
      { node_id: 'bf37cd8a88a2cb91', node_name: 'Data', type: 'running' }
    ]
  },
  {
    time: 0.5,
    action: [
      { node_id: 'bf37cd8a88a2cb9b', node_name: 'business', type: 'running' },
      { node_id: 'bf37cd8a88a2cb9b', node_name: 'business', type: 'finished' },
      { node_id: 'bf37cd8a88a2cb9c', node_name: 'crawler', type: 'running' }
    ]
  },
  {
    time: 2.9,
    action: [
      { node_id: 'bf37cd8a88a2cb9c', node_name: 'crawler', type: 'finished' },
      { node_id: 'bf37cd8a88a2cb9w', node_name: 'we', type: 'running' }
    ]
  },
  {
    time: 3.7,
    action: [
      { node_id: 'bf37cd8a88a2cb91', node_name: 'Data', type: 'finished' },
      { node_id: 'bf37cd8a88a2cb9w', node_name: 'we', type: 'finished' }
    ]
  },
  {
    time: 3.99,
    action: [
      { node_id: 'd0e294906a6a076f', node_name: 'Features', type: 'running' }
    ]
  },
  {
    time: 4.0,
    action: [
      { node_id: 'd0e294906a6a0766', node_name: 'shallow_op', type: 'running' }
    ]
  },
  {
    time: 4.022147,
    action: [
      {
        node_id: 'd0e294906a6a0766',
        node_name: 'Generage 674 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 4.070223,
    action: [
      { node_id: 'bb7b4d9341ffe881', node_name: 'shallow_tb', type: 'running' }
    ]
  },
  {
    time: 4.079401,
    action: [
      {
        node_id: 'bb7b4d9341ffe881',
        node_name: 'Generage 0 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 4.109985,
    action: [
      { node_id: '7e1135653e4ceb48', node_name: 'shallow_edu', type: 'running' }
    ]
  },
  {
    time: 4.121786,
    action: [
      {
        node_id: '7e1135653e4ceb48',
        node_name: 'Generage 0 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 4.230074,
    action: [
      {
        node_id: 'b5e0f0e3b6b24081',
        node_name: 'shallow_bank',
        type: 'running'
      }
    ]
  },
  {
    time: 4.244237,
    action: [
      {
        node_id: 'b5e0f0e3b6b24081',
        node_name: 'Generage 0 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 4.895238,
    action: [
      {
        node_id: 'f3bb46e711e89a28',
        node_name: 'shallow_black',
        type: 'running'
      }
    ]
  },
  {
    time: 5.180696,
    action: [
      {
        node_id: 'f3bb46e711e89a28',
        node_name: 'Generage 8 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 8.343367,
    action: [
      {
        node_id: '46ffab08872440d5',
        node_name: 'shallow_work',
        type: 'running'
      }
    ]
  },
  {
    time: 8.569715,
    action: [
      { node_id: 'd0e294906a6a076f', node_name: 'Features', type: 'finished' },
      {
        node_id: '46ffab08872440d5',
        node_name: 'Generage 45 Features',
        type: 'finished'
      }
    ]
  },
  {
    time: 8.859715,
    action: [
      { node_id: '078d93b64d47125m', node_name: 'Models', type: 'running' }
    ]
  },
  {
    time: 8.869715,
    action: [
      {
        node_id: '078d93b64d47125b',
        node_name: 'advanced_income',
        type: 'running'
      }
    ]
  },
  {
    time: 8.975148,
    action: [
      {
        node_id: '078d93b64d47125b',
        node_name: 'advanced_income',
        type: 'finished'
      }
    ]
  },
  {
    time: 8.97659,
    action: [
      {
        node_id: '0aba4979011e0cc8',
        node_name: 'advanced_debt',
        type: 'running'
      }
    ]
  },
  {
    time: 9.103898,
    action: [
      {
        node_id: '0aba4979011e0cc8',
        node_name: 'advanced_debt',
        type: 'finished'
      }
    ]
  },
  {
    time: 9.105366,
    action: [
      {
        node_id: 'c82d433ad78a588b',
        node_name: 'advanced_before_loan',
        type: 'running'
      }
    ]
  },
  {
    time: 9.788222,
    action: [
      { node_id: '078d93b64d47125m', node_name: 'Models', type: 'finished' },
      {
        node_id: 'c82d433ad78a588b',
        node_name: 'advanced_before_loan',
        type: 'finished'
      }
    ]
  },
  {
    time: 10.078222,
    action: [
      { node_id: '4f9c15cdc02a35cs', node_name: 'ScoreCards', type: 'running' }
    ]
  },
  {
    time: 10.088222,
    action: [
      { node_id: '4f9c15cdc02a35cb', node_name: 'score_card', type: 'running' }
    ]
  },
  {
    time: 10.719785,
    action: [
      { node_id: '4f9c15cdc02a35cb', node_name: 'score_card', type: 'finished' }
    ]
  },
  {
    time: 12.367431,
    action: [
      { node_id: 'aead66f6681c705a', node_name: 'anti_fraud', type: 'running' }
    ]
  },
  {
    time: 12.618698,
    action: [
      {
        node_id: '4f9c15cdc02a35cs',
        node_name: 'Get Approved Amount 3258, PASS',
        type: 'finished'
      },
      { node_id: 'aead66f6681c705a', node_name: 'anti_fraud', type: 'finished' }
    ]
  }
]

export { level, levelTrans, historyList }
