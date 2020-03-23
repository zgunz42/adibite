import React from "react";

// eslint-disable-next-line require-jsdoc
export default function asyncComponent(getComponent, loadingComponent) {
  const isSSR = typeof window === "undefined";
  const Loading = loadingComponent ? loadingComponent : <div>Loading...</div>;

  function Internal(props) {
    if (!isSSR) {
      const ClientSideOnlyLazy = React.lazy(getComponent);
      return (
        <React.Suspense fallback={Loading}>
          <ClientSideOnlyLazy {...props} />
        </React.Suspense>
      );
    }
    return Loading;
  }
  return Internal;
}
