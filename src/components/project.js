import React from "react"
import BlockContent from "./block-content"

import Img from "gatsby-image"
import styles from "./project.module.css"

function Project(props) {
  const { _rawBody, _rawExcerpt, title, github, demo, mainImage } = props
  return (
    <article className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.mainContent}>
          <h1>{title} </h1>
          <br /> <br />
          {_rawExcerpt && <BlockContent blocks={_rawExcerpt || []} />}
          <Img fluid={mainImage.asset.fluid} />
          <br />
          <div className={styles.flex}>
            <a className={styles.flexitem} href={github}>
              CODE
            </a>
            <a className={styles.flexitem} href={demo}>
              DEMO
            </a>
          </div>
          <br />
          {_rawBody && <BlockContent blocks={_rawBody || []} />}
        </div>
      </div>
    </article>
  )
}

export default Project
