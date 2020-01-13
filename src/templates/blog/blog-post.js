import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layoutWithGraphQL'

// pull in data from a markdown post
export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <div>
                <h1>{post.frontmatter.title}</h1>
                <h4>{"지은이 - "}  {post.frontmatter.originalAuthor}</h4>
                <h4>{"읽은 기간 -"} {post.frontmatter.startTime} ~ {post.frontmatter.endTime}</h4>
                <div dangerouslySetInnerHTML={{__html: post.html}}></div>
            </div>
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
                originalAuthor
                tag
            }
        }
    }
`