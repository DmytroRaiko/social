// import { useEffect } from 'react';

const postViewScroll = (ref) => {
  // useEffect(() => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };

  const arr = document.querySelectorAll('.post-body');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      // console.log(entry.isEnteredErlear);
      if (entry.isIntersecting) {
        // console.log('view');
        // console.log(entry.target.dataset.id);
        // console.log(entry);
      }
      // console.log('view');
      // console.log(entry.isIntersecting);
    });
  }, options);

  // if (ref.current) {
  //   observer.observe(ref.current);
  // }
  arr.forEach((i) => {
    observer.observe(i);
  });
  // eslint-disable-next-line func-names
  return function () {
    observer.current.unobserve(ref.current);
  };
  // }, [ref]);
};

export default postViewScroll;
