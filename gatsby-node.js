// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const _ = require("lodash");
const Promise = require("bluebird");
const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const prefix = ~slug.indexOf("--") ? slug.indexOf("--") : 0;
    const shortSlugStart = prefix ? prefix + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${prefix ? "/" : ""}${slug.substring(shortSlugStart)}`
    });
    createNodeField({
      node,
      name: `prefix`,
      value: prefix ? slug.substring(0, prefix) : ""
    });
    createNodeField({
      node,
      name: `group`,
      value: parent.sourceInstanceName
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve("src/templates/PostTemplate.js");
  const pageTemplate = path.resolve("src/templates/PageTemplate.js");

  const { data, errors } = await graphql(
    `
      {
        allMarkdownRemark(filter: { fields: { group: { in: ["posts", "pages"] } } }, limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
                prefix
                group
              }
            }
          }
        }
      }
    `
  );

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create posts and pages.
  _.each(data.allMarkdownRemark.edges, edge => {
    const slug = edge.node.fields.slug;
    const isPost = /posts/.test(edge.node.fields.group);

    createPage({
      path: slug,
      component: isPost ? postTemplate : pageTemplate,
      context: {
        slug: slug
      }
    });
  });
};

// exports.onCreateWebpackConfig = ({ stage, actions }) => {
//   if (stage === "build-javascript") {
//     {
//       let components = store.getState().pages.map(page => page.componentChunkName);
//       components = _.uniq(components);
//       actions.setWebpackConfig({
//         plugins: [
//           new webpack.optimize.CommonsChunkPlugin({
//             name: `commons`,
//             chunks: [`app`, ...components],
//             minChunks: (module, count) => {
//               const vendorModuleList = []; // [`material-ui`, `lodash`];
//               const isFramework = _.some(
//                 vendorModuleList.map(vendor => {
//                   const regex = new RegExp(`[\\\\/]node_modules[\\\\/]${vendor}[\\\\/].*`, `i`);
//                   return regex.test(module.resource);
//                 })
//               );
//               return isFramework || count > 1;
//             }
//           })
//         ]
//       });
//       // config.plugin("BundleAnalyzerPlugin", BundleAnalyzerPlugin, [
//       //   {
//       //     analyzerMode: "static",
//       //     reportFilename: "./report/treemap.html",
//       //     openAnalyzer: true,
//       //     logLevel: "error",
//       //     defaultSizes: "gzip"
//       //   }
//       // ]);
//     }
//   }
// };

// exports.onCreateBabelConfig = ({ actions }) => {
//   actions.setBabelPlugin({
//     name: `syntax-dynamic-import`
//   });
//   actions.setBabelPlugin({
//     name: `dynamic-import-webpack`
//   });
// };
