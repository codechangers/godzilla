const functions = require("firebase-functions");

/**
 * Get stripe credentials for the env that is being used.
 */
exports.envCreds = ({params: {env}}) => {
  // eslint-disable-next-line camelcase
  const {admin_id, secret, client_id} = functions.config().stripe;
  return env === "PRODUCTION" ?
    {
      // Production Credentials
      adminId: admin_id.prod,
      clientId: client_id.prod,
      secret: secret.prod,
    } :
    {
      // Development Credentials
      adminId: admin_id.test,
      clientId: client_id.test,
      secret: secret.test,
    };
};
