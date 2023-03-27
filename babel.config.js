module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: [
                    '.js',
                    '.jsx',
                    '.ts',
                    '.tsx',
                    '.android.js',
                    '.android.tsx',
                    '.ios.js',
                    '.ios.tsx',
                    '.svg',
                    '.png',
                ],
                root: ['.'],
            },
        ],
        [
            'module:react-native-dotenv',
            {
                moduleName: '@dotenv',
                safe: false,
                allowUndefined: false,
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
