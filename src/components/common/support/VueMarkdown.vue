<script lang="ts">
import type { PropType } from 'vue';
import { defineComponent, computed, h } from 'vue';
import MarkdownIt, { Options as MarkdownItOptions } from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';

export default defineComponent({
  name: 'VueMarkdown',
  props: {
    source: {
      type: String,
      required: true
    },
    options: {
      type: Object as PropType<MarkdownItOptions>,
      default: () => ({
        html: true
      }),
      required: false
    },
    anchor: {
      type: Object as PropType<MarkdownItAnchor.AnchorOptions>,
      default: () => ({
        level: 2,
        permalink: true,
        slugify: (s: string) => decodeURI(s),
        permalinkClass: 'anchor',
        permalinkSymbol: '¶',
        permalinkBefore: true
      }),
      required: false
    }
  },
  setup(props, { attrs }) {
    const md = new MarkdownIt(props.options);
    md.use(MarkdownItAnchor, props.anchor as PropType<MarkdownItAnchor.AnchorOptions>);
    const content = computed(() => {
      const src = props.source;
      return md?.render(src);
    });
    setTimeout(() => {
      // scroll to anchor
      const hash = window.location.hash.substring(1);
      if (hash) {
        const decodedHash = decodeURI(hash);
        const anchor = document.querySelector('[id="' + decodedHash.replace(/\s/g, '\\$&') + '"]');
        if (anchor) {
          // @ts-ignore
          window.anchor = anchor;
          console.log('anchor', anchor);
          anchor.scrollIntoView();
        }
      }
    }, 1000);
    return () =>
      h('div', {
        ...attrs,
        innerHTML: content.value
      });
  }
});
</script>
