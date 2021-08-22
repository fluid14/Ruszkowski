const autoprefixer = require('autoprefixer');

module.exports = {
    siteMetadata: {
        siteUrl: "https://ruszkowski.biz",
        title: "Ruszkowski",
    },
    plugins: [
        {
            resolve: "gatsby-plugin-prettier-eslint",
            options: {
                prettier: {
                    patterns: [
                        "**/*.{css,scss,less}",
                        "**/*.{json,json5}",
                        "**/*.{graphql}",
                        "**/*.{md,mdx}",
                        "**/*.{html}",
                        "**/*.{yaml,yml}",
                    ],
                },
                eslint: {
                    patterns: "**/*.{js,jsx,ts,tsx}",
                    customOptions: {
                        fix: true,
                        cache: true,
                    },
                },
            },
        },
        {
            resolve: "gatsby-plugin-sass",
            options: {
                postCssPlugins: [
                    autoprefixer({
                        browsers: ['last 2 versions', 'not ie 10'],
                        grid: true,
                    })
                ],
                useResolveUrlLoader: {
                    options: {
                        sourceMap: true,
                    },
                },
            },
        }, "gatsby-plugin-image",
        // {
        //   resolve: "gatsby-plugin-google-analytics",
        //   options: {
        //     trackingId: "",
        //   },
        // },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                icon: "src/images/icon.png",
            },
        },
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "images",
                path: "./src/images/",
            },
            __key: "images",
        },
    ],
};
