import { useEffect } from 'react';

const Links = () => {
  useEffect(() => {
    const head = document.head;

    // Create and append the first <link rel="preconnect" href="https://fonts.googleapis.com">
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    head.appendChild(preconnect1);

    // Create and append the second <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'true'; // Set crossorigin attribute
    head.appendChild(preconnect2);

    // Create and append the <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap';
    fontLink.rel = 'stylesheet';
    head.appendChild(fontLink);

    
  }, []);

  return null; // Return null or any placeholder since this component doesn't render anything
};

export default Links;
