<script setup>
const calcStyle = (i) => {
  const color = i % 4 ? "white" : "red"

  return {
    background: color
    // height: `${height}px`
  }
}
</script>

<template>
  <div class="grid">
    <div v-for="i of 10" :key="i" :style="calcStyle(i)" class="grid__item">
      <div class="card">Item content</div>
    </div>
  </div>
</template>

<style lang="scss">
.grid {
  --feed-width: 660px;
  --masonry-feed-horizontal-gap: 0px;
  --masonry-feed-vertical-gap: 0px;

  --masonry-feed-columns-count: 3;
  --total-gaps-width: calc((var(--masonry-feed-columns-count) - 1) * var(--masonry-feed-horizontal-gap));
  --masonry-column-width: calc((var(--feed-width) - var(--total-gaps-width)) / var(--masonry-feed-columns-count));
  --masonry-feed-vertical-part: calc((var(--masonry-column-width) - 8 * var(--masonry-feed-vertical-gap)) / 9);
  --masonry-feed-vertical-space: 0;

  display: grid;
  grid-template-columns: repeat(var(--masonry-feed-columns-count), 1fr);
  gap: var(--masonry-feed-vertical-gap) var(--masonry-feed-horizontal-gap);
  padding: 0;
  margin: 0;

  &__item {
    margin-bottom: var(--masonry-feed-vertical-space);
    height: calc(19 * var(--masonry-feed-vertical-part));
    grid-row: span 19;
    overflow: hidden;
    will-change: transform;
  }
}

.card {
  padding: 20px;
  height: 100%;
  border: 2px solid coral;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 20px;
}
</style>
