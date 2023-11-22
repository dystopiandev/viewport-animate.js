<script setup lang="ts">
import { onMounted } from 'vue';
import { ViewportAnimate } from "viewport-animate";

onMounted(() => {
  new ViewportAnimate({
    attribute: "data-va",
    observerThreshold: 0.01,
  }).init();
})
</script>

<template>
  <section>
    <div class="table-container">
      <table>
        <th colspan="2">
          <p>data-va="slideInDown +1.65s"</p>
        </th>
        <tr>
          <th class="property">Animation name:</th>
          <td class="value">slideInDown</td>
        </tr>
        <tr>
          <th class="property">Duration:</th>
          <td class="value">1.65s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Delay:</th>
          <td class="value">0s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Iteration count:</th>
          <td class="value">0s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Repeat:</th>
          <td class="value">false <span>(default)</span></td>
        </tr>
      </table>
    </div>
    <div data-va="slideInDown +1.65s" class="circle"></div>
  </section>

  <section>
    <div class="table-container">
      <table>
        <th colspan="2">
          <p>data-va="! jello +1s"</p>
        </th>
        <tr>
          <th class="property">Animation name:</th>
          <td class="value">jello</td>
        </tr>
        <tr>
          <th class="property">Duration:</th>
          <td class="value">1s</td>
        </tr>
        <tr>
          <th class="property">Delay:</th>
          <td class="value">0s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Iteration count:</th>
          <td class="value">infinite</td>
        </tr>
        <tr>
          <th class="property">Repeat:</th>
          <td class="value">N/A</td>
        </tr>
      </table>
    </div>
    <div data-va="! jello +1s" class="square"></div>
  </section>

  <section>
    <div class="table-container">
      <table>
        <th colspan="2">
          <p>data-va="*0.01 fadeInLeft 1x"</p>
        </th>
        <tr>
          <th class="property">Animation name:</th>
          <td class="value">fadeInLeft</td>
        </tr>
        <tr>
          <th class="property">Duration:</th>
          <td class="value">1s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Delay:</th>
          <td class="value">0s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Iteration count:</th>
          <td class="value">1</td>
        </tr>
        <tr>
          <th class="property">Repeat:</th>
          <td class="value">true</td>
        </tr>
      </table>
    </div>
    <div data-va="*0.01 fadeInLeft 1x" class="square"></div>
  </section>

  <section>
    <div class="table-container">
      <table>
        <th colspan="2">
          <p>data-va="@0.1 rotateIn +2500ms 0.7x"</p>
        </th>
        <tr>
          <th class="property">Animation name:</th>
          <td class="value">rotateIn</td>
        </tr>
        <tr>
          <th class="property">Duration:</th>
          <td class="value">2.5s</td>
        </tr>
        <tr>
          <th class="property">Delay:</th>
          <td class="value">0s <span>(default)</span></td>
        </tr>
        <tr>
          <th class="property">Iteration count:</th>
          <td class="value">0.7</td>
        </tr>
        <tr>
          <th class="property">Repeat:</th>
          <td class="value">false <span>(default)</span></td>
        </tr>
      </table>
    </div>
    <div data-va="@0.1 rotateIn +2500ms 0.7x" class="square"></div>
  </section>

  <section>
    <div class="table-container">
      <table>
        <th colspan="2">
          <p>data-va="*0.1 fadeIn +5s -0.7s 0.235x"</p>
        </th>
        <tr>
          <th class="property">Animation name:</th>
          <td class="value">fadeIn</td>
        </tr>
        <tr>
          <th class="property">Duration:</th>
          <td class="value">5s</td>
        </tr>
        <tr>
          <th class="property">Delay:</th>
          <td class="value">0.7s</td>
        </tr>
        <tr>
          <th class="property">Iteration count:</th>
          <td class="value">0.234</td>
        </tr>
        <tr>
          <th class="property">Repeat:</th>
          <td class="value">true</td>
        </tr>
      </table>
    </div>
    <div data-va="*0.1 fadeIn +5s -0.7s 0.235x" class="square"></div>
  </section>
</template>