module.exports = {
  source: './src',
  destination: './docs',
  plugins: [
    {
      name: 'esdoc-standard-plugin',
    },
    {
      name: 'esdoc-ecmascript-proposal-plugin',
      option: {
        all: true,
      },
    },
    {
      name: 'esdoc-jsx-plugin',
      option: {
        enable: true,
      },
    },
  ],
}
