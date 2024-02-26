import firebase_app from "@/config";
import { Payment } from "@/types/payment";
import {
  Unsubscribe,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
const db = getFirestore(firebase_app);
type errorType = { message: string; code: string };

export function getMyPaymentsSnapshot(
  userId: string,
  onSuccess: (data: Payment[]) => void,
  onError?: (error: string) => void
) {
  let unsubscribe: Unsubscribe = () => {};

  try {
    unsubscribe = onSnapshot(
      query(
        collection(db, "payments"),
        where("hostRef", "==", doc(db, "users", userId)),
        orderBy("date")
      ),
      async (payments) => {
        let result: Payment[] = [];
        for (let index = 0; index < payments.docs.length; index++) {
          const payment = payments.docs[index].data();
          result = [
            ...result,
            {
              ...payment,
              date: payment.date.toDate(),
            } as Payment,
          ];
        }
        onSuccess(result);
      }
    );
  } catch (e) {
    console.log(e);
    if (typeof e === "object" && onError) onError((e as errorType).code);
  }
  return unsubscribe;
}
