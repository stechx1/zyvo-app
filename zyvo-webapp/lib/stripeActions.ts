"use server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createConnectedAccount = async (email: string) => {
  // Set your secret key. Remember to switch to your live secret key in production.
  // See your keys here: https://dashboard.stripe.com/apikeys
  try {
    const account = await stripe.accounts.create({
      email,
      type: "express",
    });
    return account;
  } catch (error) {
    console.log(error);
  }
};
export const getAccountLink = async (accountId: string) => {
  try {
    return await stripe.accountLinks.create({
      account: accountId,
      refresh_url: process.env.NEXT_PUBLIC_HOST + "/payments",
      return_url: process.env.NEXT_PUBLIC_HOST + "/payments",
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
export const createPaymentIntent = async (price: number, bookingId: string) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: (price + 2) * 100,
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
    metadata: { bookingId },
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
};
export const updatePaymentIntent = async (intentId: string, price: number) => {
  const paymentIntent = await stripe.paymentIntents.update(intentId, {
    amount: (price + 2) * 100,
    currency: "usd",
  });
  return {
    clientSecret: paymentIntent.client_secret,
  };
};
export const refundPaymentIntent = async (intentId: string) => {
  const refund = await stripe.refunds.create({ payment_intent: intentId });
  return {
    refund,
  };
};
export const retreivePaymentIntent = async (intentId: string) => {
  const paymentIntent = await stripe.paymentIntents.retrieve(intentId);
  return {
    paymentIntent,
  };
};
export const transferFunds = async (accountId: string) => {
  const transfer = await stripe.transfers.create({
    currency: "usd",
    amount: 100,
    destination: accountId,
    transfer_group: "ORDER_95",
  });
  return {
    transfer,
  };
};
export const retreiveBalance = async () => {
  const balance = await stripe.balance.retrieve();
  return {
    balance,
  };
};
