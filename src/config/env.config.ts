export const EnvConfiguration = () => ({
  environment: process.env.NODE_DEV || 'dev',
  mongodb: process.env.MONGO_DB,
  port: process.env.PORT || 4000,
  defaultLimitPagination: process.env.DEFAULT_LIMIT_PAGINATION || 10,
});
