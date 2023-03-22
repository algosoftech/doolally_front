import React from 'react';

const ShareButton = ({ title, text, url, image }) => {
  const handleClick = async () => {
    try {
      const imageBlob = await fetch(image).then(r => r.blob());
      await navigator.share({
        title,
        text,
        url,
        files: [new File([imageBlob], 'image.jpg', { type: imageBlob.type })],
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button onClick={handleClick}>
      Share
    </button>
  );
};

export default ShareButton;
