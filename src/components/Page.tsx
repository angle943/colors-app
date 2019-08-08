import React from "react";

import "./Page.scss";

const Page: React.FC = props => {
  const {children} = props;
  return <section className="page">{children}</section>;
};

export default Page;
