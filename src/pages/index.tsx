import React from "react"
import { Link, graphql, PageRendererProps } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"
import { IndexPageQueryQuery } from "../graphqlTypes"

export type BlogIndexProps = PageRendererProps & {
  data: IndexPageQueryQuery
}

const BlogIndex: React.FC<BlogIndexProps> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title
  const posts = data?.allMarkdownRemark?.edges

  return (
    <Layout location={location} title={siteTitle ?? ""}>
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        if (!node) {
          return
        }

        const slug = node.fields?.slug ?? ""
        const title = node.frontmatter?.title ?? slug

        return (
          <article key={slug}>
            <header>
              <h3 style={{ marginBottom: rhythm(1 / 4) }}>
                <Link style={{ boxShadow: `none` }} to={slug}>
                  {title}
                </Link>
              </h3>
              {node.frontmatter?.date && <small>{node.frontmatter.date}</small>}
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter?.description ?? node.excerpt ?? "",
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
