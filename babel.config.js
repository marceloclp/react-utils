const TEST_CONFIG = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    ['@babel/preset-react'],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    ['@babel/plugin-transform-runtime', { regenerator: true }],
    ['@babel/plugin-transform-react-jsx']
  ]
}

module.exports = process.env.NODE_ENV === "test" ? TEST_CONFIG : {}