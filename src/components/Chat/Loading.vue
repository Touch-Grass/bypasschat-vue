<template>
  <div class="loading_page">
    <div class="lds-dual-ring"></div>
  </div>
</template>
<script lang="ts">
export default {};
</script>
<style>
.loading_page {
  height: 100vh !important;
  width: 100vh !important;
  z-index: 10;
  background-color: red;

  display: flex;
  place-items: center;
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading_spinner {
  width: 100px;
  height: 100px;
  background-color: yellow;
}
</style>
