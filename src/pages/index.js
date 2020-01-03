import React from "react"
import { graphql } from "gatsby"
import Header from './components/header'
import Layout from './components/layoutWithGraphQL'

//import Contact from './contact'

export default ({data}) => (
    <Layout>
        <Header headerText={"Hello " +  data.site.siteMetadata.title} />
        <p>Let's Start</p>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
)

export const query = (
    graphql `
        query {
            site {
                siteMetadata {
                    title
                }
            }   
        }
    `
)