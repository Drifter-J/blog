import React from "react"
import { Link } from "gatsby"
import Header from './components/header'

//import Contact from './contact'

export default () => (
    <div style={{ color:'purple', fontSize:'72px'}}>
        <Link to="/contact/">Contact</Link>
        <Header headerText="Hello Jaye" />
        <p>Let's Start</p>
        <img src="https://source.unsplash.com/random/400x200" alt="" />
    </div>
)