<template>
  <div class="star-rating" @mouseleave="hover = 0">
    <svg
      v-for="i in 5"
      :key="i"
      class="star"
      width="28" height="28"
      :fill="i <= (hover || current) ? '#000' : 'none'"
      stroke="#000"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      @mouseenter="hover = i"
      @click="setRating(i)"
      :style="{ transition: 'fill 0.2s, transform 0.2s', transform: i <= (hover || current) ? 'scale(1.15)' : 'scale(1)' }"
      tabindex="0"
      @keydown.enter="setRating(i)"
      aria-label="Calificar con {{i}} estrellas"
    >
      <polygon points="12,2 15,9 22,9.5 17,14.5 18.5,22 12,18 5.5,22 7,14.5 2,9.5 9,9" />
    </svg>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({ calificacion: Number, onRateFnName: String, productoId: String });
const current = ref(props.calificacion || 0);
const hover = ref(0);
const setRating = (val) => {
  console.debug('[DEBUG][StarRatingVue] setRating llamado con', val, 'onRateFnName:', props.onRateFnName, 'productoId:', props.productoId);
  current.value = val;
  if (
    props.onRateFnName === 'ratingUtils.rateProduct' &&
    typeof window.ratingUtils?.rateProduct === 'function' &&
    props.productoId
  ) {
    window.ratingUtils.rateProduct(props.productoId, val)
      .then(() => window.location.reload())
      .catch((err) => {
        // No recargar si hubo error (ej: usuario no autenticado)
        console.warn('[DEBUG][StarRatingVue] rateProduct error:', err);
      });
  } else {
    console.warn('[DEBUG][StarRatingVue] ratingUtils.rateProduct no es función o productoId no existe', props);
  }
};
watch(() => props.calificacion, (val) => { current.value = val; });
</script>

<style scoped>
.star-rating {
  display: flex;
  gap: 0.2rem;
  cursor: pointer;
  user-select: none;
  align-items: center;
  transition: box-shadow 0.2s;
}
.star {
  transition: fill 0.2s, transform 0.2s;
  filter: drop-shadow(0 1px 2px #0002);
}
.star:hover, .star:focus {
  outline: none;
  filter: drop-shadow(0 2px 6px #0004);
}
</style>
