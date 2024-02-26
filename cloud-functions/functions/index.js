const stripe = require("stripe")(
  "sk_test_51OJYBTBtvbMCJV4HJlMdbe3EtzeAAvMM9BParN8pIb0Lwi90NnMfPAy6zJezZFNpKCsgCw3fzh25nIf9E3VY8iZo00h5kQ4K9P"
);
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// This is your Stripe CLI webhook secret for testing your endpoint locally.
// const endpointSecret =
//   "whsec_7f7862c66a7fd914634e73045013b9feaa89db93c9aae4bdeb6c4f2ea8983c83";
const endpointSecret = "whsec_KLbzyh2XpDmJLnLiKLWu7TpoaN8zUkAt";

exports.webhook = functions.https.onRequest(async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  const paymentIntent = event.data.object;
  console.log("Payment Intent: ", paymentIntent.id);
  const bookingId = paymentIntent?.metadata?.bookingId;
  console.log(event.type);

  switch (event.type) {
    case "payment_intent.succeeded":
      if (bookingId) {
        const bookingRef = admin
          .firestore()
          .collection("bookings")
          .doc(bookingId);
        const booking = (await bookingRef.get()).data();
        bookingRef.set(
          {
            paymentIntentId: paymentIntent.id,
            status: booking.instantBook ? "CONFIRMED" : "REQUESTED",
          },
          { merge: true }
        );
      }
      break;
    case "payment_intent.created":
      if (bookingId) {
        const bookingRef = admin
          .firestore()
          .collection("bookings")
          .doc(bookingId);
        bookingRef.set(
          {
            paymentIntentId: paymentIntent.id,
          },
          { merge: true }
        );
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  response.status(200).end();
});

exports.scheduledFunction = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async (context) => {
    const querySnapshot = await admin
      .firestore()
      .collection("bookings")
      .where("status", "==", "CONFIRMED")
      .get();
    for (let index = 0; index < querySnapshot.docs.length; index++) {
      const element = querySnapshot.docs[index];
      if (new Date() >= element.data().to.toDate()) {
        console.log("COMPLETED BOOKING ID: ", element.id);
        const bookingRef = admin
          .firestore()
          .collection("bookings")
          .doc(element.id);
        bookingRef.set(
          {
            status: "FINISHED",
          },
          { merge: true }
        );
      }
    }
  });
