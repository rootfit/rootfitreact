import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop: Before scrolling to top');
    window.scrollTo(0, 0);
    console.log('ScrollToTop: After scrolling to top');
  }, [pathname]);
  

  return null;
};

export default ScrollToTop;