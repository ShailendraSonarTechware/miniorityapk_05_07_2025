import { useCallback, useState } from "react";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";

export function useStripePayment() {
  const [ready, setReady] = useState(false);

  const prepare = useCallback(async (clientSecret: string) => {
    const { error } = await initPaymentSheet({
      paymentIntentClientSecret: clientSecret,
      merchantDisplayName: "Mosiac Biz Hub",
      appearance: { colors: { primary: "#E07B39" } }, // optional theming
      // Set default country to India if most users are in IN
      defaultBillingDetails: { address: { country: "IN" } },
      allowsDelayedPaymentMethods: true, // enable UPI
    });
    setReady(!error);
    return { error };
  }, []);

  const pay = useCallback(async () => {
    const { error } = await presentPaymentSheet();
    return { error };
  }, []);

  return { ready, prepare, pay };
}
