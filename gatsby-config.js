/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

/*gatsby-remark-copy-linked-files*/

module.exports = {
  siteMetadata:{
    title: `J's Blog`,
    listOfPost: `List of Posts`
  },
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve:`gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: [`title`, `alt`],
              markdownCaptions: true,
              withWebp: true,
              tracedSVG: { 
                color: `#F00`, 
                turnPolicy: `TURNPOLICY_MAJORITY` 
              },
            }
          },
          {
            resolve:`gatsby-remark-prismjs`,
            options: {
              aliases: {sh:"bash", js:"javascript"},
              showLineNumbers: true,
            }
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    `gatsby-plugin-emotion`,
  ],
}
