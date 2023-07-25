export const EnvConfiguration = () => ({
  environment: process.env.NODE_DEV || 'dev',
  mongodb:
    process.env.MONGO_DB ||
    'mongodb+srv://lesterarte:Us6u2pVVEM7ZMnXq@fulltimeforce.rztxln0.mongodb.net/fulltimeforce',
  port: process.env.PORT || 4000,
  defaultLimitPagination: process.env.DEFAULT_LIMIT_PAGINATION || 10,
});
