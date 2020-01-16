import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../../utils/typography'
import * as markdownUtils from '../../utils/markdownUtils'
import Layout from '../../components/layoutWithGraphQL'

// pull in data from a markdown post
export default ({ data }) => {
    const post = data.markdownRemark
    return (
        <Layout>
            <div>
                <h1
                    css={css`
                        margin-bottom: ${rhythm(1/4)};
                    `}>
                    {post.frontmatter.title}
                </h1>
                <h5
                    css={css`
                        color: #bbb;
                        margin-left: ${rhythm(1/3)};
                        margin-bottom: ${rhythm(1/4)};
                    `}
                >
                    {markdownUtils.showOriginalAuthor(post.frontmatter.originalAuthor)}
                </h5>
                <h5
                    css={css`
                        color: #bbb;
                        margin-left: ${rhythm(1/3)};
                        margin-bottom: ${rhythm(1/2)};
                    `}>
                    {markdownUtils.showDate(post.frontmatter.startTime, post.frontmatter.endTime)}
                </h5>
                <hr/>
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