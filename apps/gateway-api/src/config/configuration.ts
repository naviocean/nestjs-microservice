export default () => ({
  port: parseInt(process.env.GATEWAY_PORT, 10) || 3000,
  jwt: {
    at_secret: process.env.JWT_AT_SECRET || 'abc123',
    at_exp: process.env.JWT_AT_EXP || '1m',
    rt_secret: process.env.JWT_RT_SECRET || 'abc1234',
    rt_exp: process.env.JWT_RT_EXP || '1d',
  },
});
