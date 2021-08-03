<template>
  <!-- Pending section will be displayed when loan is applied but waiting for admin approval -->
  <q-card v-if="isPending" class="q-mt-md q-pa-md">
    <q-card-section>
      <div class="text-h6">
        Your loan needs to be approved by the Admin. We will notify you once it
        is done!!
      </div>
    </q-card-section>
  </q-card>

  <q-card class="q-pa-md" v-else>
    <q-banner class="bg-grey-3 q-mx-lg q-mt-lg">
      <div class="text-h6">{{ loanDetails.type }}</div>
      <div>Name: {{ loanDetails.name }}</div>
      <div>Total Amount: {{ loanDetails.amount }}</div>
      <div>Term: {{ loanDetails.term }} years</div>
    </q-banner>

    <q-card-section>
      <div class="q-pa-md">
        <q-table
          title="Transaction Details"
          :rows="loanDetails.transactionDetails"
          :columns="columns"
          row-key="name"
        ></q-table>
      </div>
      <q-badge
        v-if="loanDetails.isDue"
        rounded
        color="warning q-ml-md"
        label="Your payment is due for this week"
      ></q-badge>
      <div class="row q-pa-md">
        <q-input
          class="col"
          type="number"
          outlined
          v-model.number="amountRepay"
          label="Set Amount to repay"
          placeholder="Default amount would be 10000"
        ></q-input>
        <div class="col q-ma-md">
          Amount Left after paying: {{ amountLeft }}
        </div>
      </div>
      <q-btn class="primary q-ma-md" color="primary" @click="repay"
        >Repay</q-btn
      >
      <q-btn class="primary q-ma-md" color="primary" :to="{ name: 'design' }"
        >Manage Cards</q-btn
      >
    </q-card-section>
  </q-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Notify } from "quasar";
export default {
  name: "ManageLoan",
  data() {
    return {
      totalAmount: 500000,
      amountRepay: 1000,
      columns: [
        {
          name: "amountPaid",
          align: "center",
          label: "Amount Paid",
          field: "amountPaid",
        },
        {
          name: "paidOn",
          label: "Paid On",
          field: "paidOn",
          sortable: true,
          align: "center",
        },
      ],
    };
  },
  computed: {
    ...mapState("loan", ["loanDetails"]),
    // will fetch data from some api
    isPending() {
      return false;
    },
    amountLeft() {
      if (!this.amountRepay) {
        return this.totalAmount - 10000;
      }
      return this.totalAmount > this.amountRepay
        ? this.totalAmount - this.amountRepay
        : 0;
    },
  },
  created() {
    this.getLoanDetails(this.$route.params.id);
  },
  methods: {
    ...mapActions("loan", ["getLoanDetails"]),
    repay() {
      // show error if repay amount is more than remaining amount
      if (this.amountRepay > this.totalAmount) {
        Notify.create({
          type: "negative",
          position: "top-right",
          message: "Repay amount cannot be greater than total amount",
          timeout: 500,
        });
        return;
      }
      Notify.create({
        type: "positive",
        position: "top-right",
        message: `Repaid ${this.amountRepay}`,
        timeout: 500,
      });
    },
  },
};
</script>
