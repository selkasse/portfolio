const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { isFuture } = require("date-fns")
const { format } = require("date-fns")

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `posts` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

async function createBlogPostPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/blog${node.fields.slug}`,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
  })
}

async function createProjectPages(graphql, actions) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityProject(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) throw result.errors

  const projectEdges = (result.data.allSanityProject || {}).edges || []
  // console.log(projectEdges)
  projectEdges
    .filter(edge => !isFuture(edge.node.publishedAt))
    .forEach(edge => {
      // console.log(edge.node)
      const id = edge.node.id
      const slug = edge.node.slug.current
      const path = `projects/${slug}`

      createPage({
        path,
        component: require.resolve("./src/templates/project.js"),
        context: { id },
      })
    })
}

exports.createPages = async ({ graphql, actions }) => {
  await createBlogPostPages(graphql, actions)
  await createProjectPages(graphql, actions)
}
