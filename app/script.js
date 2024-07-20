// scripts.js

// Create script elements
const script1 = document.createElement('script');
script1.src = 'https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/esm/ionicons.min.js';
script1.stratergy = 'beforeInteractive'

const script2 = document.createElement('script');
script2.src = 'https://cdn.jsdelivr.net/npm/ionicons@7.4.0/dist/collection/components/icon/icon.min.css';
script2.stratergy = 'beforeInteractive'

// Append them to the document head
document.head.appendChild(script1);
document.head.appendChild(script2);
