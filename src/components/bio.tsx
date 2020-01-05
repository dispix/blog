/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"
import { BioQueryQuery } from "../graphqlTypes"

const Bio: React.FC = () => {
  const data: BioQueryQuery = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(2.5),
      }}
    >
      {data.avatar?.childImageSharp?.fixed && (
        <Image
          // @ts-ignore
          fixed={data.avatar.childImageSharp.fixed}
          alt={data?.site?.siteMetadata?.author ?? "author"}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            minWidth: 50,
            borderRadius: `100%`,
          }}
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )}
      {!!data?.site?.siteMetadata?.author && (
        <p>
          Written by <strong>{data.site.siteMetadata.author}</strong> who lives
          and works in San Francisco building useful things.
          {` `}
          {!!data?.site?.siteMetadata?.social?.twitter && (
            <a
              href={`https://twitter.com/${data.site.siteMetadata.social.twitter}`}
            >
              You should follow him on Twitter
            </a>
          )}
        </p>
      )}
    </div>
  )
}

export default Bio
