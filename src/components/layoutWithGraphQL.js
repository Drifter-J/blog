// actually layout.js is non-page component -> meaning does not be shown as pages in the site
import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { css } from '@emotion/core'
import { rhythm } from '../utils/typography'

const ListLink = props => (
    <li style={{ display: 'inline-block', marginRight:'1rem'}}>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

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
            <ul style={{listStyle:'none', float:'right'}}>
                <ListLink to={`/about`}>
                    <h3>About</h3>
                </ListLink>
                <ListLink to={`/contact`}>
                    <h3>Contact</h3>
                </ListLink>
            </ul>
            {children}
        </div>
    )
}
