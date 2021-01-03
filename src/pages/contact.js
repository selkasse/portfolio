import React from "react"
import Layout from "../components/layout"

export default function Contact() {
  return (
    <Layout>
      <h1
        style={{
          display: `inline-block`,
        }}
      >
        Contact
      </h1>
      <br />
      <br />
      <p>
        Want to work together? Have a question? Drop me a line at{" "}
        <a href="mailto:sharif@sharifelkassed.com">sharif@sharifelkassed.com</a>
      </p>
    </Layout>
  )
}
