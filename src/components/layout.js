import React from "react"
import { Link } from "gatsby"
import styles from "./layout.module.css"
const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

// style={{
//   textShadow: `none`,
//   backgroundImage: `none`,
// }}
export default function Layout({ children }) {
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <header
        style={{
          marginBottom: `1.5rem`,
          display: `flex`,
          justifyContent: `space-between`,
          alignItems: `flex-start`,
        }}
      >
        <Link to="/">
          <h3 style={{ display: `inline block` }}>Sharif Elkassed</h3>
        </Link>
        {/* <ul style={{ listStyle: `none`, float: `right` }}> */}
        <ul
          style={{
            listStyle: `none`,
            display: `flex`,
            marginTop: `2.175rem`,
          }}
        >
          {/* <ListLink to="/">Home</ListLink> */}
          <ListLink to="/projects/">Projects</ListLink>
          <ListLink to="/contact/">Contact</ListLink>
          <ListLink to="/blog/">Blog</ListLink>
        </ul>
      </header>
      {children}
    </div>
  )
}
