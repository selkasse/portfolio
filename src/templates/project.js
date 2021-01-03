import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Project from "../components/project"

export default function ProjectPage({ data }) {
  const project = data.project
  // console.log(project.)
  return <Layout>{project && <Project {...project} />}</Layout>
}

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
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
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
      publishedAt
      title
      github
      demo
      slug {
        current
      }
      _rawBody
      _rawExcerpt
      body {
        _rawChildren
      }
    }
  }
`
