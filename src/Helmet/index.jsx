import React from "react";
import { Helmet } from "react-helmet";

function index({ title, page, desc }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : "Psychiatry Rounds"}</title>
      <link
        rel="canonical"
        href={"https://psychiatryrounds.in/" + (page ? page : "")}
      />
      {/* Primary Meta Tags */}
      <title>{title ? title : "Psychiatry Rounds"}</title>
      <meta name="title" content={title ? title : "Psychiatry Rounds"} />
      <meta
        name="description"
        content={
          desc
            ? desc
            : "Build your connections with psychiatrists worldwide. Post or Discuss Cases & Doubts. "
        }
      />
      <meta
        name="keywords"
        content="psychiatry rounds, psychiatryrounds, psychiatryround, psychiatry, rounds, psychtests, psychotherapy, psychotherapist, psychiatrists, psychiatrist"
      ></meta>
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={"https://psychiatryrounds.in/" + (page ? page : "")}
      />
      <meta property="og:title" content={title ? title : "Psychiatry Rounds"} />
      <meta
        property="og:description"
        content={
          desc
            ? desc
            : "Build your connections with psychiatrists worldwide. Post or Discuss Cases & Doubts. "
        }
      />
      <meta
        property="og:image"
        content="https://psychiatryrounds.in/logo-head.png"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={"https://psychiatryrounds.in/" + (page ? page : "")}
      />
      <meta
        property="twitter:title"
        content={title ? title : "Psychiatry Rounds"}
      />
      <meta
        property="twitter:description"
        content={
          desc
            ? desc
            : "Build your connections with psychiatrists worldwide. Post or Discuss Cases & Doubts. "
        }
      />
      <meta
        property="twitter:image"
        content="https://psychiatryrounds.in/logo-head.png"
      />
    </Helmet>
  );
}

export default React.memo(index);
