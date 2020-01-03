import React from "react"
import { Link } from "gatsby"
import Header from './components/header'
import Layout from './components/layout'

//import Contact from './contact'

export default () => (
    <Layout>
        <Header headerText="Hello Jaye" />
        <p>Let's Start</p>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
    </Layout>
)