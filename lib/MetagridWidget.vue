<script lang="ts">
let instances = 0;
</script>

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

// screen readers must be told that a link opens a new tab (WCAG 3.2.5)
const newTabTexts: Record<string, string> = {
  de: "öffnet in neuem Tab",
  fr: "s’ouvre dans un nouvel onglet",
  it: "si apre in una nuova scheda",
  nl: "opent in een nieuw tabblad",
};
const newTab = ` (${newTabTexts[realLanguage] ?? "opens in a new tab"})`;
// visually hidden, but read by screen readers
const srOnly =
  "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap";
// unique id prefix so several widgets on one page don't collide
const uid = `metagrid-${++instances}`;

const creditString: ComputedRef<string> = computed((): string =>
  credit(realLanguage).innerHTML.replace(
    "</a>",
    `<span style="${srOnly}">${newTab}</span></a>`
  )
);
</script>

<template>
  <ul v-if="links.length" class="metagrid-list" :lang="language">
    <li v-for="(link, index) of links" :key="index" class="metagrid-item">
      <a
        :href="link.url"
        class="metagrid-link"
        target="_blank"
        :title="link.longDescription"
        :aria-describedby="
          link.longDescription ? `${uid}-desc-${index}` : undefined
        "
        >{{ link.provider }}<span :style="srOnly">{{ newTab }}</span></a
      >
      <!-- hidden elements still work as aria-describedby targets -->
      <span
        v-if="link.longDescription"
        :id="`${uid}-desc-${index}`"
        hidden
        >{{ link.longDescription }}</span
      >
    </li>
  </ul>
  <!-- eslint-disable vue/no-v-html -->
  <div class="metagrid-credit" :lang="language" v-html="creditString"></div>
  <!--eslint-enable-->
</template>
