import React from "react"
import BlockContent from "./block-content"

import styles from "./project.module.css"

function Project(props) {
  const { _rawBody, title, publishedAt } = props
  return (
    <article className={styles.root}>
      <div className={styles.grid}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>{title}</h1>
          {_rawBody && <BlockContent blocks={_rawBody || []} />}
        </div>
      </div>
    </article>
  )
}

export default Project
