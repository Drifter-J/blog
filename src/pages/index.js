import React from "react"
import { Link, graphql } from "gatsby"
import { css } from "@emotion/core"
import { rhythm } from "../utils/typography"
import Layout from './components/layoutWithGraphQL'

//import Contact from './contact'

export default ({ data }) => {
    console.log(data)
    return (
        <Layout>
            <div>
                <h1
                    css={css`
                        display: inline-block;
                        border-bottom: 1px solid;
                    `}
                >
                    {data.site.siteMetadata.listOfPost}
                </h1>
                <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
                {data.allMarkdownRemark.edges.map(({ node }) => (
                    <div key={node.id}>
                        <Link 
                            to={node.fields.slug}
                            css={css`
                                text-decoration: none;
                                color: inherit;
                            `}
                            >
                            <h3
                                css={css`
                                    margin-bottom: ${rhythm(1/4)};
                                `}
                                >
                                {node.frontmatter.title} {" "}
                                <span
                                    css={css`
                                        color: #bbb;
                                    `}
                                >
                                    — {node.frontmatter.startTime} {"~"} {node.frontmatter.endTime}
                                </span>
                            </h3>
                            <p>{node.excerpt}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export const query = (
    graphql `
        query {   
            allMarkdownRemark(sort: {order: DESC, fields: frontmatter___startTime}) {
              totalCount
              edges {
                node {
                  frontmatter {
                    title
                    startTime
                    endTime
                    originalAuthor
                    tag
                  }
                  fields {
                      slug
                  }
                }
              }
            }
            site {
              siteMetadata {
                title
                listOfPost
              }
            }
          }
    `
)