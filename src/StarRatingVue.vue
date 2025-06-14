<template>
  <div style="display: flex; gap: 0.1rem; cursor: pointer;">
    <svg v-for="i in 5" :key="i" width="20" height="20" :fill="i <= current ? '#000' : 'none'" stroke="#000" stroke-width="1.5" viewBox="0 0 24 24" @click="setRating(i)">
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ calificacion: Number });
const current = ref(props.calificacion || 0);
const setRating = (val) => { current.value = val; };
watch(() => props.calificacion, (val) => { current.value = val; });
</script>
