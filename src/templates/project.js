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
  query ProjectTemplateQuery($id: String!) {
    project: sanityProject(id: { eq: $id }) {
      id
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
