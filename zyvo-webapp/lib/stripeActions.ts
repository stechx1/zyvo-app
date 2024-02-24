"use server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY!);

export const createConnectedAccount = async () => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  try {
    const account = await stripe.accounts.create({
      type: "express",
    });
    return account;
  } catch (error) {
    console.log(error);
  }
};
export const getAccountLink = async () => {
  try {
    return await stripe.accountLinks.create({
      account: "acct_1OlAEsPVzx67oaZP",
      refresh_url: "http://localhost:4000/checkout2",
      return_url: "http://localhost:4000/checkout2",
      type: "account_onboarding",
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getAccountInfo = async (accountId: string) => {
  try {
    return await stripe.accounts.retrieve(accountId);
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const createPaymentIntent = async (price: number) => {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price + 2,
    currency: "usd",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
};
