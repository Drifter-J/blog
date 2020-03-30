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
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 800,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            }
          },
          {
            resolve:`gatsby-remark-images`,
            options: {
              maxWidth: 1040,
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
    {
      resolve:`gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Open Sans`,
            variants: [`400`, `700`]
          },
        ],
      },
    },
  ],
}
