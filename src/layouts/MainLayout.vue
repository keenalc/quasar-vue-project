<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer show-if-above bordered class="bg-primary">
      <div class="q-pa-lg">
        <img class="q-ml-md" alt="Logo" src="~assets/logo.png" />
        <div class="q-ma-md" style="color: grey">
          Trusted way of banking for 3,000+ SMEs and startups in Singapore
        </div>
        <q-list
          v-for="link in sideBarItems"
          :key="link.title"
          class="q-mb-md"
          :class="{
            'text-positive': routeName === link.routeName,
            'text-white': routeName !== link.routeName,
          }"
          @click="navigateTo(link)"
        >
          <q-item>
            <q-item-section v-if="link.icon" avatar>
              <q-icon :name="link.icon" />
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ link.title }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import sideBarItems from "src/layouts/SideBarItems.json";
export default {
  name: "Layout",

  data() {
    return {
      sideBarItems: sideBarItems,
    };
  },
  computed: {
    routeName() {
      return this.$route.name;
    },
  },
  methods: {
    navigateTo({ routeName }) {
      if (routeName === "design") {
        this.$router.push({
          name: "design",
        });
        return;
      }
      this.$router.push({
        name: "loan",
      });
    },
  },
};
</script>
