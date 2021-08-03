<template>
  <q-page class="page-layout">
    <q-card-section class="available-balance">Available Balance</q-card-section>
    <q-card-section>
      <div class="flex">
        <q-badge
          color="positive q-mr-sm"
          label="s$"
          style="height: 2em"
        ></q-badge>
        <span class="bold">3,000</span>

        <q-btn
          class="new-card-btn"
          color="primary"
          icon="add_circle_outline"
          label="New Card"
        ></q-btn>
      </div>
    </q-card-section>

    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="info"
      align="justify-left"
      narrow-indicator
    >
      <q-tab name="debit" label="My debit cards" style="text-transform: none">
      </q-tab>
      <q-tab
        name="all cards"
        label="All Company cards"
        style="text-transform: none"
      >
      </q-tab>
    </q-tabs>

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="debit" class="tab-panel" style="overflow: hidden">
        <div class="row">
          <div class="col-md-7 col-xs-12">
            <q-carousel
              v-model="slide"
              swipeable
              animated
              navigation
              padding
              class="rounded-borders"
            >
              <template v-slot:navigation-icon="{ active, onClick }">
                <div class="column no-wrap flex-center">
                  <span v-if="active" class="slid1" @click="onClick"></span>
                  <span v-else class="slid2" @click="onClick"></span>
                </div>
              </template>
              <q-carousel-slide
                name="style"
                class="column no-wrap flex-center slide"
              >
                <div class="show-card-no q-mb-sm">
                  <img class="q-mr-sm" alt="Logo" src="~assets/eye.svg" />
                  Show card number
                </div>
                <q-card class="my-card text-white no-gutter">
                  <q-card-section class="flex">
                    <div class="center" style="margin-left: auto">
                      <img alt="Logo" src="~assets/logo2.png" />
                      <span>aspire</span>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-md card-content">
                    <div class="name">Mark Henry</div>
                    <div class="number"></div>
                    <div class="q-pt-lg other-details">
                      <span class="q-mr-lg">Thru: 12/20</span>
                      <span class="q-ml-lg">CVV: ***</span>
                    </div>
                    <div class="flex">
                      <img class="visa" alt="Logo" src="~assets/visaLogo.svg" />
                    </div>
                  </q-card-section>
                </q-card>
              </q-carousel-slide>
              <q-carousel-slide name="tv" class="column no-wrap flex-center">
              </q-carousel-slide>
              <q-carousel-slide
                name="layers"
                class="column no-wrap flex-center"
              >
              </q-carousel-slide>
            </q-carousel>

            <q-card class="my-card-2 text-white" flat>
              <q-card-section class="flex flex-center">
                <div class="caption">
                  <img src="~assets/freeze-card.svg" alt="missing" />
                  <p class="caption-text">Freeze card</p>
                </div>
                <div class="caption">
                  <img src="~assets/set-spesd-limit.svg" alt="missing" />
                  <p class="caption-text">Set Spend Limit</p>
                </div>
                <div class="caption">
                  <img src="~assets/GPay.svg" alt="missing" />
                  <p class="caption-text">Add to GPay</p>
                </div>
                <div class="caption">
                  <img src="~assets/replace-card.svg" alt="missing" />
                  <p class="caption-text">Replace card</p>
                </div>
                <div class="caption">
                  <img src="~assets/deactivate-card.svg" alt="missing" />
                  <p class="caption-text">Cancel card</p>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-md-4 col-xs-12" style="margin-left: auto">
            <q-list class="side-list">
              <q-expansion-item
                label="Card Details"
                header-class="bg-blue-grey-1 text-primary"
              >
                <template v-slot:header>
                  <q-item-section avatar style="min-width: 30px">
                    <q-avatar style="font-size: 1.5em">
                      <img src="~assets/card-details.svg" alt="card-det" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section> Card Details </q-item-section>
                </template>
                <q-card>
                  <q-card-section> card details </q-card-section>
                </q-card>
              </q-expansion-item>

              <q-expansion-item
                style="q-mt-md"
                label="Card Details"
                default-opened
                header-class="bg-blue-grey-1 text-primary q-mt-md"
              >
                <template v-slot:header>
                  <q-item-section avatar style="min-width: 30px">
                    <q-avatar style="font-size: 1.5em">
                      <img src="~assets/recent-trans.svg" alt="card-det" />
                    </q-avatar>
                  </q-item-section>

                  <q-item-section> Recent transactions </q-item-section>
                </template>
                <q-card>
                  <q-card-section class="no-padding">
                    <q-list
                      bordered
                      separator
                      v-for="transaction in recentTransactions"
                      :key="transaction.id"
                    >
                      <q-item>
                        <q-item-section avatar>
                          <q-avatar>
                            <q-icon
                              class="list-icon"
                              :name="transaction.icon"
                              :class="transaction.iconColor"
                            />
                          </q-avatar>
                        </q-item-section>
                        <q-item-section>
                          <div class="flex">
                            {{ transaction.name }}
                            <span
                              style="margin-left: auto"
                              :class="{
                                'text-positive': transaction.type === 'refund',
                              }"
                              >{{ transaction.type === "refund" ? "+" : "-" }}
                              {{ transaction.amount }}</span
                            >
                          </div>
                          <div class="trans-date">{{ transaction.date }}</div>
                          <div class="trans-action q-mt-sm text-primary">
                            <q-icon class="q-mr-sm" name="credit_card" />
                            {{ transaction.action }}
                          </div>
                        </q-item-section>
                      </q-item>
                      <q-item
                        class="bg-blue-grey-1 text-positive"
                        v-if="transaction.id === recentTransactions.length"
                      >
                        <q-item-section style="align-items: center">
                          View all card transactions
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </q-expansion-item>
            </q-list>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="all cards"> </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
export default {
  name: "design",
  data() {
    return {
      tab: "debit",
      slide: "style",
      recentTransactions: [
        {
          id: 1,
          name: "Hamleys",
          icon: "inventory_2",
          iconColor: "text-secondary",
          date: "20 May 2020",
          amount: "$ 120",
          action: "Refund on debit card",
          type: "refund",
        },
        {
          id: 2,
          name: "Hamleys",
          icon: "flight",
          iconColor: "text-positive",
          date: "20 May 2020",
          amount: "$ 120",
          action: "Charged to debit card",
          type: "charged",
        },
        {
          id: 3,
          name: "Hamleys",
          icon: "inventory_2",
          iconColor: "text-secondary",
          date: "20 May 2020",
          amount: "$ 120",
          action: "Charged to debit card",
          type: "charged",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import "/src/css/design.scss";
</style>
