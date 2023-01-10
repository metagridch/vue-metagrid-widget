# Vue metagrid widget

A simple vue3 component to display metagrid links in your vue project.

## Install

```bash
npm install @metagrid/vue-metagrid-widget
// or
yarn add @metagrid/vue-metagrid-widget
```

## Usage

Simply import the component into your project and use it. The component has no styles. So you have to add some css.

```vue
<script setup lang="ts">
import MetagridWidget from "@metagrid/vue-metagrid-widget";
</script>

<template>
  <MetagridWidget
    provider="dodis"
    identifier="5"
    :include-description="true"
    language="fr"
  ></MetagridWidget>
</template>

<style>
.metagrid-list {
  padding: 0;
}
.metagrid-item {
  list-style: none;
  display: inline-block;
  margin-right: 1em;
}
.metagrid-credit {
  font-size: 75%;
}
</style>
```

## Props

### provider

The slug of your provider f.e. dodis

Type: String

Required: true

### identifier

The identifier of the person you want to fetch data for.

Type: String

Required: true

### langauge

The language of the widget

Type: string

Required: false

Default: de

### include-description

Get additional information for the provider like a description

Typ: Boolean

Required: false

Default: false

## Styling

The component has no styling. You have to theme it to your need. The following css-classes are available for theming:

```css
/* The root element of the list with the links */
ul.metagrid-list {
}
/* The li element of the link list */
li.metagrid-item {
}
/* The link itself */
a.metagrid-link {
}
/* The credit section of metagrid. Please don't remove that */
div.metagrid-credit {
}
```

## Development

If you find bugs you an open an issue or send us a pull request. We welcome contributions!

This is a vite project with a customized rollup config. To develop you can run `yarn dev`. To build the project run `yarn build`.
