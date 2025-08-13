import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there is a hash, and we can find an element with that ID, scroll to it.
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return; // Stop here, we've handled the scroll
      }
    }
    
    // If no hash, scroll to the top of the page.
    window.scrollTo(0, 0);

  }, [pathname, hash]); // Rerun effect if pathname or hash changes

  return null;
}

export default ScrollToTop;