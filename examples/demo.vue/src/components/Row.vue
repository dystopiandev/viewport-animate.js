<script lang="ts" setup>
defineProps<{
  property: string;
  value: string;
  isDefault: boolean;
}>();
</script>

<template>
  <tr>
    <td class="property">{{ property }}</td>
    <td class="value">
      {{ value }}
      <span v-if="isDefault">&nbsp;(default)</span>
    </td>
  </tr>
</template>
