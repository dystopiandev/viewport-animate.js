<script setup lang="ts">
import type { Example, ExamplesData } from "@examples/shared";
import examples from "@examples/shared";
import Row from "./Row.vue";
import { computed } from "vue";

const DEFAULTS: ExamplesData["defaults"] = examples["defaults"];
const displayTexts: ExamplesData["display-texts"] = examples["display-texts"];
const displayTextsKeys = Object.keys(displayTexts);

const props = defineProps<{
  example: Example;
}>();

const rowData = computed(() => {
  return Object.keys(props.example)
    .filter((key) => displayTextsKeys.includes(key))
    .map((key) => {
      const value = props.example[key];
      const property = displayTexts[key];
      if (!value || !property) return null;
      return {
        key, property,
        value: value.toString(),
        isDefault: DEFAULTS[key] == value.toString(),
      }
    })
    .filter(t => t !== null);
})
</script>

<template>
  <div className="table-container">
    <table>
      <tbody>
        <tr>
          <th colspan="2">
            <p>
              {{ `${examples["data-attr"]}="${example.rule}"` }}
            </p>
          </th>
        </tr>
        <Row
          v-for="example, index in rowData"
          :key="example.key"
          :property="example.property"
          :value="example.value"
          :isDefault="example.isDefault"
        />
      </tbody>
    </table>
  </div>
</template>
