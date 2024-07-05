export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  jwt: {
    secret: process.env.JWT_SECRET || 'abc123',
    exp: process.env.JWT_EXP || '1m',
  },
});
