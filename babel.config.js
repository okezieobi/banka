require('@babel/parser').parse('code', {
  // parse in strict mode and allow module declarations
  sourceType: 'unambiguous',

  plugins: [
    // enable jsx and flow syntax
    'jsx',
    'flow',
  ],
});

const presets = [
  [
    '@babel/env',
    {
      targets: {
        edge: '17',
        firefox: '60',
        chrome: '67',
        safari: '11.1',
      },
      useBuiltIns: 'usage',
      corejs: 3,
    },
  ],
];

module.exports = {
  presets,
};
