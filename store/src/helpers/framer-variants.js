export const basicVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};
export const overlayVariants = {
  hide: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const backdropVariants = {
  hide: {
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  show: {
    opacity: 0.7,
    transition: {
      duration: 0.4,
    },
  },
};
export const loadingContainerVariants = {
  hide: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export const loadingDotVariants = {
  hide: {
    y: "0%", //move out of the site
  },
  show: {
    y: "-100%", // bring it back to nrmal

    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.5,
    },
  },
};
export const loadingErrorVariants = {
  hide: {
    y: "0%", //move out of the site
  },
  show: {
    y: "-10%", // bring it back to nrmal

    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 0.5,
    },
  },
};
