<script setup lang="ts">
import type { Example, ExamplesData } from "@examples/shared";
import examples from "@examples/shared";
import Row from "./Row.vue";

const DEFAULTS: ExamplesData["defaults"] = examples["defaults"];
const displayTexts: ExamplesData["display-texts"] = examples["display-texts"];
const displayTextsKeys = Object.keys(displayTexts);

defineProps<{
  example: Example;
}>();
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
          v-for="(rowKey, index) in Object.keys(example).filter((key) =>
            displayTextsKeys.includes(key)
          )"
          :key="`${example.rule}-row-${index}`"
          :property="displayTexts[rowKey]"
          :value="example[rowKey].toString()"
          :isDefault="DEFAULTS[rowKey] == example[rowKey].toString()"
        />
      </tbody>
    </table>
  </div>
</template>
