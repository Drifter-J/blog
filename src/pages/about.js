import React from 'react'
import { graphql } from 'gatsby'
import Header from './components/header'
import Layout from './components/layoutWithGraphQL'

export default ({ data }) => (
    <Layout>
        <Header headerText={"About " + data.site.siteMetadata.title}/>
        <p>Started {data.site.siteMetadata.title}</p>
    </Layout>
)

// query that retrieves the title in about.js
export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`