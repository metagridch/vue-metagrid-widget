<script setup lang="ts">
import MetagridWidget from "../lib/MetagridWidget.vue";
</script>

<template>
  <div id="metagrid-widget-style">
    <MetagridWidget
      provider="dodis"
      identifier="5"
      :include-description="true"
      language="fr"
    ></MetagridWidget>
  </div>
</template>

<style>
#metagrid-widget-style .metagrid-list {
  padding: 0;
}

#metagrid-widget-style .metagrid-item {
  list-style: none;
  display: inline-block;
  margin-right: 1em;
}

#metagrid-widget-style .metagrid-credit {
  font-size: 75%;
}
</style>
