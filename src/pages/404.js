import React from "react";
import Helmet from "react-helmet";
import Layout from "../layouts";

const NotFoundPage = props => (
  <Layout>
    <Helmet>
      <title>404 | Not Found</title>
    </Helmet>
  </Layout>
);

export default NotFoundPage;
