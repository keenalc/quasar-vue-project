<template>
  <q-page class="q-pa-md loan">
    <q-card class="q-pa-md">
      <div class="text-h6 text-primary">Please Fill the Loan Application</div>
      <q-form @submit="onSubmit" class="q-sm-gutter q-mt-md">
        <q-input
          outlined
          v-model="loanData.name"
          label="Name"
          :rules="requiredRule"
        ></q-input>
        <q-select
          class="q-mb-md"
          outlined
          v-model="loanData.type"
          :options="loanTypes"
          label="Loan Type"
        ></q-select>
        <q-input
          type="number"
          outlined
          v-model.number="loanData.amount"
          label="Amount Required"
          :rules="[...requiredRule, ...maxAmountRule]"
        ></q-input>

        <q-input
          outlined
          type="number"
          v-model.number="loanData.term"
          label="Loan term"
          :rules="requiredRule"
          placeholder="Please enter in years"
        ></q-input>
        <q-btn color="primary" type="submit"> Apply for Loan</q-btn>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
import * as loanService from "pages/loan-app/api/loanApi.service";
export default {
  data() {
    return {
      isFormValid: false,
      loanTypes: ["Home Loan", "Education Loan", "Vehicle Loan"],
      loanData: { name: "", amount: "", term: "", type: "Home Loan" },
      requiredRule: [(v) => !!v || "Field is required."],
      maxAmountRule: [
        (v) => v <= 500000 || "Loan amount can't exceeds than 50 Lakhs",
      ],
    };
  },
  methods: {
    /**
     * Submit the loan details if all fields are valid
     */
    async onSubmit() {
      let createdId = await loanService.addLoan({ ...this.loanData });
      if (createdId) {
        //navigate to loan manage section
        this.$router.push({
          name: `manage-loan`,
          params: { id: createdId },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.loan {
  top: 10em;
}
</style>
>
