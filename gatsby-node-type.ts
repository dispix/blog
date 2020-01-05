type AllMarkdownRemarkData = {
  edges: Array<{
    node: {
      fields: {
        slug: string
      }
      frontmatter: {
        title: string
      }
    }
  }>
}

export type PageContext = {
  slug: string
  previous: AllMarkdownRemarkData["edges"][0]["node"] | null
  next: AllMarkdownRemarkData["edges"][0]["node"] | null
}
