import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faReact } from "@fortawesome/free-brands-svg-icons"
import { faHtml5 } from "@fortawesome/free-brands-svg-icons"
import { faCss3Alt } from "@fortawesome/free-brands-svg-icons"
import { faJs } from "@fortawesome/free-brands-svg-icons"
import { faNpm } from "@fortawesome/free-brands-svg-icons"
import { faNodeJs } from "@fortawesome/free-brands-svg-icons"
import { faGit } from "@fortawesome/free-brands-svg-icons"
import { faSalesforce } from "@fortawesome/free-brands-svg-icons"
import { faPython } from "@fortawesome/free-brands-svg-icons"
import { faJava } from "@fortawesome/free-brands-svg-icons"
import styles from "./index.module.css"

export default function Home() {
  return (
    <Layout>
      <h1
        style={{
          display: `inline-block`,
        }}
      >
        Hey! I'm Sharif 👋
      </h1>
      <br />
      <br />
      <p>I love building things and experimenting with tech.</p>
      <p>
        Ever since I was a kid, I've been interested in learning how technology
        works. I remember taking the TV remote apart when I was seven, and
        deleting the System32 folder from my parent's computer when I was 12.
      </p>
      <p>
        I've since moved on to <Link to={"/projects"}>breaking things</Link> on
        the web :)
      </p>
      <p>
        I've been coding since college, but about a year ago, I started feeling
        like I needed to explore other areas of my craft.
      </p>
      <p>
        I became interested in web development. I started learning JavaScript,
        realized I loved it, and never looked back.
      </p>
      <p>Some skills I've picked up along the way:</p>
      <div className={styles.skills}>
        <FontAwesomeIcon icon={faHtml5} size="3x" />
        <FontAwesomeIcon icon={faReact} size="3x" />
        <FontAwesomeIcon icon={faJava} size="3x" />
        <FontAwesomeIcon icon={faJs} size="3x" />
        <FontAwesomeIcon icon={faNpm} size="3x" />
      </div>
      {/* <div className={styles.skills}>
      </div> */}
      <br />
      <div className={styles.skills}>
        <FontAwesomeIcon icon={faNodeJs} size="3x" />
        <FontAwesomeIcon icon={faGit} size="3x" />
        <FontAwesomeIcon icon={faCss3Alt} size="3x" />
        <FontAwesomeIcon icon={faSalesforce} size="3x" />
        <FontAwesomeIcon icon={faPython} size="3x" />
      </div>
      <br />
      <p>
        To see my skills in action, have a look at my{" "}
        <Link to={"/projects"}>projects page</Link>
      </p>
    </Layout>
  )
}
