// actually layout.js is non-page component -> meaning does not be shown as pages in the site
import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../../utils/typography'

// for non-page component, use 'useStaticQuery' instead of standard qeury
export default ({ children }) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `
    )
    return (
        <div
            css={css`
                margin: 0 auto;
                max-width: 700px;
                padding: ${rhythm(2)};
                padding-top: ${rhythm(1.5)};
            `}
        >
            <Link to={`/`}>
                <h3
                    css={css`
                        margin-bottom: ${rhythm(2)};
                        display: inline-block;
                        font-style: normal;
                    `}
                >
                    {data.site.siteMetadata.title}    
                </h3>
            </Link>
            <Link to={`/about`}>
                <h3
                    css={css`
                        float: right;
                    `}
                >
                    About    
                </h3>
            </Link>
            {children}
        </div>
    )
}
