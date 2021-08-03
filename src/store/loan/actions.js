import { Notify } from "quasar";
import { api } from "boot/axios";

/**
 * Get loan details from the backend
 * @param {String} id id of loan to be fetched
 */
export const getLoanDetails = async ({ commit }, id) => {
  try {
    commit("loanDetails", (await api.get(`/getLoanDetails/${id}`)).data);
  } catch (e) {
    console.log(e);
    Notify.create({
      type: "negative",
      position: "top-right",
      message: "not found",
      timeout: 500,
    });
  }
};
