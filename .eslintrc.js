module.exports = {
  env: {
    browser: true,
    es2021: true,
    mocha: true,
    node: false,
  },
  plugins: [
    '@typescript-eslint',
    'react',
    // 'tailwindcss', // makes linting very slow
  ],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    // 'plugin:tailwindcss/recommended', // makes linting very slow
  ],
  ignorePatterns: ['.eslintrc.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    project: [
      './tsconfig.json', // extends tsconfig.paths.json
      './tsconfig.eslint.json',
    ],
    tsconfigRootDir: __dirname, // prevents 'Cannot read' error when using ESLint in other directories
    sourceType: 'module',
  },
  rules: {
    // 1 is 'warning', 2 is 'error' (error prevents compiling)
    semi: [1, 'never'],
    'comma-dangle': [1, 'always-multiline'],
    'consistent-return': 'warn',
    'import/extensions': 'off',
    'import/first': 'off',
    'import/no-extraneous-dependencies': [1, {
      devDependencies: false, optionalDependencies: false, peerDependencies: false,
    }],
    'max-classes-per-file': 'off',
    'max-len': [1, { code: 200 }],
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'warn',
    'no-param-reassign': 0,
    radix: 0,
    // funky react stuff
    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 1,
    'react-hooks/exhaustive-deps': 1,
    'react/jsx-no-useless-fragment': 1,
    'react/destructuring-assignment': 0,
    'react/display-name': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/no-array-index-key': 'warn',

    // jsx ally
    'jsx-a11y/label-has-associated-control': 'warn',

    // typescripts
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 0,

    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-unsafe-assignment': 1,
    '@typescript-eslint/no-unsafe-call': 1,
    '@typescript-eslint/no-misused-promises': 1,
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-unsafe-member-access': 1,

    // tailwindcss
    // 'tailwindcss/no-custom-classname': 0,
  },
}
