<template>
  <div class="home">
    <div >
      <Casette />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Casette from "@/components/Casette.vue";

export default {
  name: "Home",
  components: {
    Casette,
  },
};
</script>
