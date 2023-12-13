<script setup lang="ts">
import examples from "@examples/shared";
import { ViewportAnimate } from "viewport-animate";
import { onMounted } from "vue";
import Table from "./components/Table.vue";

onMounted(() => {
  new ViewportAnimate({
    attribute: "data-va",
    observerThreshold: 0.01,
  }).init();
});
</script>

<template>
  <section
    v-for="(example, index) in examples.examples"
    :id="`example-${index + 1}`"
    :key="`example-${index + 1}`"
  >
    <Table :example="example" />
    <div
      class="example-target"
      :class="example.shape"
      :data-va="example.rule"
    ></div>
    <a
      class="view-next-example"
      :class="[index + 1 >= examples.examples.length && 'last']"
      :href="`#example-${
        index + 1 < examples.examples.length ? index + 2 : '1'
      }`"
      :data-va="`slideInUp +0.3s -${example.duration}`"
    >
      {{
        index + 1 == examples.examples.length ? "Back to top" : "Next example"
      }}
    </a>
  </section>
</template>
