const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

export async function authPaypal() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(`${clientId}:${clientSecret}`)}`
  );

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("ignoreCache", "true");
  urlencoded.append("return_authn_schemes", "true");
  urlencoded.append("return_client_metadata", "true");
  urlencoded.append("return_unconsented_scopes", "true");

  const response = await fetch("https://api-m.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  });


  if (response.status !== 200) {
    throw new Error("Failed to fetch auth: " + response.status);
  }

  const responseData = await response.json()
  console.log("aae", responseData);
  return responseData ;
}

export async function getBalance() {
  try {
    const auth = await authPaypal();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${auth.access_token}`
    );

    const response = await fetch(
      "https://api.paypal.com/v2/wallet/balance-accounts",
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    console.log("r", response)

    if (response.status !== 200) {
      throw new Error("Failed to fetch balance: " + response.status);
    }

    const responseData = await response.json();
    console.log(responseData.balances)
    const balanceData = responseData.balances[0];
    const totalBalance = balanceData.total_balance.value;
    const currency = balanceData.total_balance.currency_code;
    return { totalBalance, currency };
  } catch (error) {
    // Maneja cualquier error que ocurra durante la solicitud
    console.error("Error fetching balance:", error);
    throw new Error("Failed to fetch balance data.");
  }
}
