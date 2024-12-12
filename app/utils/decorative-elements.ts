export const getRandomRotation = () => {
  return Math.floor(Math.random() * 361) - 180;
};

export const getRandomPosition = () => {
  return {
    top: `${Math.floor(Math.random() * 101)}%`,
    left: `${Math.floor(Math.random() * 101)}%`,
  };
};
