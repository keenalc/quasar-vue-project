import { Notify } from "quasar";
import { api } from "boot/axios";

/**
 * Add the Loan
 * @param {Object} loan loan object
 */
export const addLoan = async (loan) => {
  try {
    let response = await api.post("/addLoan", loan);
    Notify.create({
      type: "positive",
      position: "top-right",
      message: "Your loan application is submitted successfully!",
      timeout: 500,
    });
    return response.data.id;
  } catch (e) {
    Notify.create({
      type: "negative",
      position: "top-right",
      message: "You have already applied for the loan",
      timeout: 500,
    });
    return null;
  }
};
