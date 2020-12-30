import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

export const query = graphql`
  fragment SanityImage on SanityMainImage {
    crop {
      _key
      _type
      top
      bottom
      left
      right
    }
    hotspot {
      _key
      _type
      x
      y
      height
      width
    }
    asset {
      _id
    }
  }
  query IndexPageQuery {
    projects: allSanityProject(
      limit: 6
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`

export default function Projects({ data }) {
  const projectNodes = (data || {}).projects
  projectNodes.edges.forEach(edge => {
    console.log(edge.node)
  })
  return (
    <Layout>
      <div>
        <h1
          style={{
            display: `inline-block`,
          }}
        >
          Projects
        </h1>
        <div>
          {projectNodes.edges.map(edge => (
            <div key={edge.node.id}>
              <Link to={`/projects/${edge.node.slug.current}`}>
                <h3>{edge.node.title}</h3>
                <Img fluid={edge.node.mainImage.asset.fluid} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
