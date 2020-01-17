import React from 'react'
import { graphql } from 'gatsby'
import OriginalReference from '../../utils/markdownUtils'
import Layout from '../../components/layoutWithGraphQL'

// pull in data from a markdown post
export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <OriginalReference
                title={post.frontmatter.title}
                startTime={post.frontmatter.startTime}
                endTime={post.frontmatter.endTime}
                tag={post.frontmatter.tag}
                url={post.frontmatter.url}
                author={post.frontmatter.author}
                html={post.html}
            />
        </Layout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug} }) {
            html
            frontmatter {
                title
                startTime
                endTime
                author
                tag
                url
            }
        }
    }
`