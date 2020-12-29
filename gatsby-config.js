module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: `gatsby-source-filesystem`,

      options: {
        name: `src`,
        path: `${__dirname}/posts/`,
      },
    },
    {
      resolve: `gatsby-source-sanity`,
      options: {
        projectId: `xmbcece9`,
        dataset: `production`,
        // If the Sanity GraphQL API was deployed using `--tag <name>`,
        // use `graphqlTag` to specify the tag name. Defaults to `default`.
        graphqlTag: "default",
      },
    },
  ],
}
