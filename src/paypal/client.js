import checkoutNodeJssdk from '@paypal/checkout-server-sdk'

const configureEnvironment = function () {
  const clientId = "ATZPkrWhjDCVN3X3zbNAM7ax-N4klfkNpoOEVqMR_QbY_RsUMdJ9D0WxSFCv1HzSKriKxJH9ynLsHQpp"
  const clientSecret = "EOpj4QVMuO_VCLKjSNwL0YZuR2eiHnSu4rZF4VJ-mxJlkZv0ty3sTKqzBYYyXipiZAIkZ4tDr51AmmrI"

  return process.env.NODE_ENV === 'production'
    ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
    : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
}

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment())
}

export default client