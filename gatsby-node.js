// # create pages programmatically
// 1. Query data with GraphQL
// 2. Map the query results to pages

// onCreateNode will be called by Gatsby whenever a node is created or updated
// use each md file name to create the page slug => 소프트웨어 장인.md => /소프트웨어 장인/
'use strict';

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        // const fileNode = getNode(node.parent)
        // console.log('\n', fileNode.relativePath) // => pages/소프트웨어 장인.md
        const slug = createFilePath({ node, getNode, basePath:`contents` });
        // console.log(slug) // => /소프트웨어 장인/
        createNodeField({
            node,
            name: `slug`,
            value: slug
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    // The graphql function call returns a Promise
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `);
    // console.log(JSON.stringify(result, null, 4))
    /* =>
    {
        "data": {
            "allMarkdownRemark": {
                "edges": [
                    {
                        "node": {
                            "fields": {
                                "slug": "/소프트웨어 장인/"
                            }
                        }
                    }
                ]
            }
        }
    }
    */
   result.data.allMarkdownRemark.edges.forEach(({ node }) => {
       createPage({
           path: node.fields.slug,
           component: path.resolve(`./src/templates/blog/blog-post.js`),
           context: {
               // Data passed to context is available
               // in page queries as GraphQL variables
               slug: node.fields.slug
           }
       })
   });
}
