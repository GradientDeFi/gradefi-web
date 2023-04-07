/**
 * Using Babel for tree-shaking support (better dev experience)
 * https://mui.com/material-ui/guides/minimizing-bundle-size/
 */
module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }]
  ],
  plugins: [
    '@emotion',
    [
      'babel-plugin-import',
        {
          libraryName: '@mui/material',
          libraryDirectory: '',
          camel2DashComponentName: false
        },
        'core'
      ],
    [
      'babel-plugin-import',
      {
        libraryName: '@mui/icons-material',
        libraryDirectory: '',
        camel2DashComponentName: false,
      },
      'icons',
    ],
  ]
}