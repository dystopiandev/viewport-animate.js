<script setup lang="ts">
import type { Example } from "../../../common/examples.ts";
import examplesData from "../../../common/examples.ts";
import Row from "./Row.vue";

const DEFAULTS = examplesData["defaults"];
const displayTexts = examplesData["display-texts"];
const displayTextsKeys = Object.keys(examplesData['display-texts']);

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