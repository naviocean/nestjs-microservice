export default () => ({
  port: parseInt(process.env.USERS_PORT, 10) || 3000,
});
