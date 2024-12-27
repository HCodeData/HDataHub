<template>
  <vue-markdown v-highlight :source="content" class="markdown-body" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueMarkdown from './VueMarkdown.vue';
import { highlight } from '@/utils';
import 'highlight.js/styles/night-owl.css';

export default defineComponent({
  name: 'ApiCode',
  directives: {
    highlight
  },
  components: {
    VueMarkdown
  },
  props: {
    content: {
      type: String,
      required: false,
      default: ''
    }
  }
});
</script>

<style lang="scss">
@import 'github-markdown-css/github-markdown.css';
</style>

<style lang="scss" scoped>
.markdown-body {
  background: none;
  color: var(--el-text-color-primary);
  ol {
    list-style: initial;
  }
}
</style>
