import React from "react"
import { graphql } from "gatsby"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import CodeBlock from "../components/code-block"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        {/* <div dangerouslySetInnerHTML={{ __html: post.html }} /> */}
        <ReactMarkdown
          source={post.rawMarkdownBody}
          renderers={{ code: CodeBlock }}
          plugins={[gfm]}
          allowDangerousHtml={true}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`
