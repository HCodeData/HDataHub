<template>
  <div class="container">
    <el-skeleton v-if="loading" animated :rows="20" />
    <markdown-renderer v-else :content="text" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MarkdownRenderer from '@/components/common/support/MarkdownRenderer.vue';
import { documentOperator } from '@/operators';
import { IDocumentDetailResponse } from '@/models';
import { ElSkeleton } from 'element-plus';

interface IData {
  loading: boolean;
  text: string | undefined;
}

export default defineComponent({
  name: 'Page',
  components: {
    MarkdownRenderer,
    ElSkeleton
  },
  data(): IData {
    return {
      loading: false,
      text: ''
    };
  },
  mounted() {
    this.loading = true;
    documentOperator
      .get('2187db16-f4cc-436f-893e-77b0044e9199')
      .then(({ data: data }: { data: IDocumentDetailResponse }) => {
        this.loading = false;
        this.text = data.content;
      })
      .catch((error) => {
        this.loading = false;
        console.error(error);
      });
  }
});
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  padding: 50px;
}
</style>
