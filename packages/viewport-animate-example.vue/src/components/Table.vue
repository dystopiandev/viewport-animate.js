<script setup lang="ts">
import type { Example, ExamplesData } from "../../../common/types";
import examplesData from "../../../common/examples.json";
import Row from "./Row.vue";

const DEFAULTS: ExamplesData["defaults"] = examplesData["defaults"];
const displayTexts: ExamplesData["display-texts"] = examplesData["display-texts"];
const displayTextsKeys = Object.keys(displayTexts);

defineProps<{
  example: Example;
}>()

</script>

<template>
  <div className="table-container">
    <table>
      <tbody>
        <tr>
          <th colspan="2">
            <p>
              {{ `${examplesData['data-attr']}="${example.rule}"` }}
            </p>
          </th>
        </tr>
        <Row v-for="(rowKey, index) in Object.keys(example).filter(key => displayTextsKeys.includes(key))"
          :key="`${example.rule}-row-${index}`" :property="displayTexts[rowKey]" :value="example[rowKey].toString()"
          :isDefault="DEFAULTS[rowKey] == example[rowKey].toString()" />
      </tbody>
    </table>
  </div>
</template>