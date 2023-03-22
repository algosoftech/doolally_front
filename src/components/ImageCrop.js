import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { FacebookShareButton, TwitterShareButton } from "react-share";

const ImageCrop = () => {
  const [url, setUrl] = useState("");
  const location = useLocation();

  useEffect(() => {
    setUrl(window.location.href);
  }, [location]);

  const title = "My Website Title";
  const description = "My Website Description";
  const imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVRZcRfDgdUoJcWAigFOzXzrkMWemYFkDOw&usqp=CAU";

  return (
    <>
      <Helmet>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
      </Helmet>
      <FacebookShareButton url={url}>
        <img src="/facebook.png" alt="Share on Facebook" />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <img src="/twitter.png" alt="Share on Twitter" />
      </TwitterShareButton>
    </>
  );
};

export default ImageCrop;
