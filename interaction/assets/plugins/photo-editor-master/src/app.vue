<template>
  <div class="app">
    <main class="ui-photo-editor">
      <editor
        v-if="data.loaded"
        ref="editor"
        :data="data"
      />
      <loader
        v-else
        ref="loader"
        :data="data"
      />
    </main>
      <navbar
        :data="data"
        @change="change"
      />
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        cropped: false,
        cropping: false,
        loaded: false,
        name: '',
        previousUrl: '',
        type: '',
        url: '',
      },
    };
  },

  methods: {
    change(action) {
      const { editor } = this.$refs;

      switch (action) {
        case 'crop':
          editor.crop();
          break;

        case 'clear':
          editor.clear();
          break;

        case 'restore':
          editor.restore();
          break;

        case 'remove':
          editor.reset();
          break;

        default:
      }
    },
  },
};
</script>

<style scoped>
</style>
