module.exports = {
  extends: [
    '../../.eslintrc.js',
    'eslint-config-ali/typescript/react',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'never',
        functions: 'ignore',
      },
    ],
    'react/jsx-indent': [2, 2, { checkAttributes: true, indentLogicalExpressions: true }],
    'react/prop-types': 0,
    'react/jsx-max-props-per-line': [
      2,
      {
        maximum: 1,
      },
    ],
    semi: [2, 'always'],
    'arrow-parens': ['error', 'always'],
    'no-console': [1, { allow: ['warn', 'error'] }],
    quotes: [2, 'single'],
    'jsx-quotes': ['error', 'prefer-double'],
  },
};
