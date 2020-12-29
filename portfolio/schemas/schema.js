// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator"

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type"

// Document types
import project from "./documents/project"

// Object types
import figure from "./objects/figure"
import projectPortableText from "./objects/projectPortableText"
import simplePortableText from "./objects/simplePortableText"
import mainImage from "./objects/mainImage"
import excerptPortableText from "./objects/excerptPortableText"

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "portfolio",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    project,
    figure,
    projectPortableText,
    simplePortableText,
    mainImage,
    excerptPortableText,
  ]),
})
