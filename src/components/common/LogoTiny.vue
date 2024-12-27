<template>
  <img :src="url" class="logo tiny" @click="$emit('click')" />
</template>

<script lang="ts">
import { getCookie } from 'typescript-cookie';
import { defineComponent } from 'vue';

export default defineComponent({
  emits: ['click'],
  computed: {
    dark() {
      return true;
    },
    url() {
      return this.$store.state.site?.favicon;
    }
  }
});
</script>
