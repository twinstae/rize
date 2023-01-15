import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

const draw = {
  hidden: { pathLength: 0, opacity: 0, fill: 'transparent' },
  visible: (n: number) => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: {
          delay: 0 + n * 0.1,
          type: 'spring',
          duration: 1,
          bounce: 0,
        },
        opacity: { delay: 0, duration: 0.01 },
        fill: '#ff0055',
      },
    };
  },
};

function RizeLogo({onAnimationEnd}: { onAnimationEnd?: () => void }) {
  const pathColor = '#ed64a6';

  const control = useAnimation();

  useEffect(() => {
    control.start('visible').then(onAnimationEnd);
  }, []);
  return (
    <motion.svg
      width='200'
      height='100'
      viewBox='0 0 200 100'
      initial='hidden'
      animate='visible'>
      <motion.path
        d='M 15.9 39.8 L 35.8 70.1 L 31.3 70.1 L 11.9 40.4 Q 8.2 40.9 3.7 41.1 L 3.7 70.1 L 0 70.1 L 0 0 Q 21.838 0.066 29.44 8.587 A 16.649 16.649 0 0 1 33.5 20.1 A 21.757 21.757 0 0 1 32.029 28.364 Q 29.599 34.328 23.154 37.441 A 30.898 30.898 0 0 1 15.9 39.8 Z M 3.7 3.8 L 3.7 37.1 L 4.7 37.2 A 57.025 57.025 0 0 0 13.547 36.434 Q 24.905 34.452 28.325 27.411 A 15.855 15.855 0 0 0 29.8 20.4 A 16.221 16.221 0 0 0 29.452 16.95 A 11.409 11.409 0 0 0 27.65 12.75 A 19.453 19.453 0 0 0 25.287 9.964 A 15.315 15.315 0 0 0 22.8 8 A 22.428 22.428 0 0 0 17.521 5.658 Q 11.935 3.93 3.7 3.8 Z'
        stroke={pathColor}
        variants={draw}
        custom={0}
      />
      <motion.path
        d='M 48.8 0.3 L 48.8 70.1 L 45.1 70.1 L 45.1 0.3 L 48.8 0.3 Z'
        stroke={pathColor}
        variants={draw}
        custom={1}
      />
      <motion.path
        d='M 86.5 3.8 L 60.7 3.8 L 60.7 0.1 L 92.1 0.1 L 63.1 66.4 L 93.2 66.4 L 93.2 70.1 L 57.4 70.1 L 86.5 3.8 Z'
        stroke={pathColor}
        variants={draw}
        custom={2}
      />
      <motion.path
        d='M 100.3 40.1 L 116.6 25.1 L 100.3 10 L 105.4 10 L 117.4 21.1 L 117.4 5.1 L 121.1 5.1 L 121.1 20.9 L 132.9 10 L 138 10 L 121.7 25.1 L 138 40.1 L 132.9 40.1 L 121.1 29.2 L 121.1 45.1 L 117.4 45.1 L 117.4 29 L 105.4 40.1 L 100.3 40.1 Z'
        stroke={pathColor}
        variants={draw}
        custom={2}
      />
      <motion.path
        d='M 186.8 70.1 L 151 70.1 L 151 0.1 L 186.8 0.1 L 186.8 3.8 L 154.7 3.8 L 154.7 29.4 L 186.8 29.4 L 186.8 33.1 L 154.7 33.1 L 154.7 66.4 L 186.8 66.4 L 186.8 70.1 Z'
        stroke={pathColor}
        variants={draw}
        custom={3}
        initial='hidden'
        animate={control}
      />
    </motion.svg>
  );
}

export default RizeLogo;
