const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

export async function authPaypal() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append(
    "Authorization",
    `Basic ${btoa(`${clientId}:${clientSecret}`)}`
  );

  console.log("env", process.env.PAYPAL_CLIENT_ID);
  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");
  urlencoded.append("ignoreCache", "true");
  urlencoded.append("return_authn_schemes", "true");
  urlencoded.append("return_client_metadata", "true");
  urlencoded.append("return_unconsented_scopes", "true");

  fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      return result;
    })
    .catch((error) => console.error(error));
}

export async function getBalance() {
  try {
    authPaypal();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    );

    const response = await fetch(
      "https://api-m.sandbox.paypal.com/v1/reporting/balances",
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    );

    console.log("aa", response);

    if (response.status !== 200) {
      throw new Error("Failed to fetch balance: " + response.status);
    }

    const responseData = await response.json();
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
