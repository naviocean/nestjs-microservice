export default () => ({
  port: parseInt(process.env.GATEWAY_PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET || 'abc123',
    exp: process.env.JWT_EXP || '1m',
  },
});
