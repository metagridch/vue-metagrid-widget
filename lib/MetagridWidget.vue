<script setup lang="ts">
import { computed, ComputedRef, onMounted, ref, toRefs } from "vue";
import {
  MetagridLink,
  MetagridApi,
  MetagridLanguages,
  credit,
} from "@metagrid/modern-metagrid-widget";

/**
 * Define the props of the component
 */
const props = defineProps({
  identifier: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: false,
    default: "de",
  },
  includeDescription: {
    type: Boolean,
    required: false,
    default: false,
  },
});

// make props reactive
const { provider, identifier, includeDescription, language } = toRefs(props);
// cast language string to enum
const realLanguage = language?.value as MetagridLanguages;
// reactive links
let rawLinks: MetagridLink[] = [];
let links = ref(rawLinks);

onMounted(async () => {
  // init metagrid api
  const api: MetagridApi = MetagridApi.create(provider?.value);
  // fetch links from metagrid server
  links.value = (
    await api.fetch(identifier?.value, realLanguage, includeDescription?.value)
  ).data;
});

const creditString: ComputedRef<string> = computed(
  (): string => credit(realLanguage).innerHTML
);
</script>

<template>
  <ul class="metagrid-list">
    <li v-for="(link, index) of links" :key="index" class="metagrid-item">
      <a
        :href="link.url"
        class="metagrid-link"
        target="_blank"
        :title="link?.longDescription"
        >{{ link.provider }}</a
      >
    </li>
  </ul>
  <!-- eslint-disable vue/no-v-html -->
  <div class="metagrid-credit" v-html="creditString"></div>
  <!--eslint-enable-->
</template>
