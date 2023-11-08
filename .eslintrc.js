module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    plugins: ['@typescript-eslint'],
    parser: '@typescript-eslint/parser',
    root: true,
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        'no-duplicate-imports': 'off', // Note: you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/no-duplicate-imports': 'warn',
        'no-use-before-define': 'off', // Note: you must disable the base rule as it can report incorrect errors
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/no-require-imports': 'warn',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        'no-prototype-builtins': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unnecessary-type-constraint': 'off',
        '@typescript-eslint/no-namespace': 'off',
        'no-multiple-empty-lines': ['error', {max: 1, maxEOF: 0, maxBOF: 0}]
    },
    ignorePatterns: [
        '.eslintrc.js',
        'plopfile.js',
        'gulpfile.babel.js',
        'node_modules',
        'react-native.config.js'
    ]
}
