import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import { rhythm } from "../utils/typography"

export default function Blog({ data }) {
  return (
    <Layout>
      <div>
        <h1
          style={{
            display: `inline-block`,
            borderBottom: `1px solid`,
          }}
        >
          Blog
        </h1>
        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h3
              style={{
                marginBottom: `${rhythm(1 / 4)}`,
              }}
            >
              {node.frontmatter.title}{" "}
              <span style={{ color: "#bbb" }}>- {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`
