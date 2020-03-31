const path = require('path');

module.exports = {
    stories: ['../**/*.stories.js'],
    webpackFinal: async (config, {configType}) => {
        config.module.rules.push({
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [
                            path.resolve(__dirname, '../assets/css/config/_variables.scss'),
                            path.resolve(__dirname, '../assets/css/helpers/_mixins.scss')
                        ]
                    }
                }
            ]
        });

        // Return the altered config
        return config;
    }
};
