<template>
  <div
    class="ui-upload"
    @change="change"
    @dragover="dragover"
    @drop="drop"
  >
    <div class="ui-upload__ic"><svg class="ic" width="100" height="101" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.125 63.125C3.9538 63.125 4.74866 63.4575 5.33471 64.0494C5.92076 64.6414 6.25 65.4442 6.25 66.2812V82.0625C6.25 83.7367 6.90848 85.3423 8.08058 86.5261C9.25268 87.7099 10.8424 88.375 12.5 88.375H87.5C89.1576 88.375 90.7473 87.7099 91.9194 86.5261C93.0915 85.3423 93.75 83.7367 93.75 82.0625V66.2812C93.75 65.4442 94.0792 64.6414 94.6653 64.0494C95.2513 63.4575 96.0462 63.125 96.875 63.125C97.7038 63.125 98.4987 63.4575 99.0847 64.0494C99.6708 64.6414 100 65.4442 100 66.2812V82.0625C100 85.4109 98.683 88.6221 96.3388 90.9897C93.9946 93.3574 90.8152 94.6875 87.5 94.6875H12.5C9.18479 94.6875 6.00537 93.3574 3.66117 90.9897C1.31696 88.6221 0 85.4109 0 82.0625V66.2812C0 65.4442 0.32924 64.6414 0.915291 64.0494C1.50134 63.4575 2.2962 63.125 3.125 63.125Z" fill="#DADDE1"/><path d="M48.8344 9.34389C49.1247 9.04996 49.4696 8.81676 49.8492 8.65765C50.2289 8.49853 50.6359 8.41663 51.0469 8.41663C51.458 8.41663 51.865 8.49853 52.2446 8.65765C52.6243 8.81676 52.9691 9.04996 53.2594 9.34389L72.0094 28.2814C72.5962 28.8741 72.9259 29.6779 72.9259 30.516C72.9259 31.3542 72.5962 32.158 72.0094 32.7506C71.4226 33.3433 70.6268 33.6763 69.7969 33.6763C68.9671 33.6763 68.1712 33.3433 67.5844 32.7506L54.1719 19.1977V74.7035C54.1719 75.5406 53.8427 76.3434 53.2566 76.9353C52.6706 77.5272 51.8757 77.8598 51.0469 77.8598C50.2181 77.8598 49.4233 77.5272 48.8372 76.9353C48.2512 76.3434 47.9219 75.5406 47.9219 74.7035V19.1977L34.5094 32.7506C34.2189 33.0441 33.8739 33.2769 33.4943 33.4357C33.1147 33.5945 32.7078 33.6763 32.2969 33.6763C31.886 33.6763 31.4791 33.5945 31.0995 33.4357C30.7199 33.2769 30.375 33.0441 30.0844 32.7506C29.7939 32.4572 29.5634 32.1088 29.4061 31.7254C29.2489 31.342 29.168 30.931 29.168 30.516C29.168 30.101 29.2489 29.6901 29.4061 29.3066C29.5634 28.9232 29.7939 28.5749 30.0844 28.2814L48.8344 9.34389Z" fill="#DADDE1"/></svg></div>
    <span class="ui-upload__info">Перетягніть зображення для завантаження або</span>
      <label class="ui-upload__btn">Виберіть файл
        <input
          id="file"
          class="sr-only"
          type="file"
          accept="image/*"
        >
      </label>
    </p>
  </div>
</template>

<script>
const URL = window.URL || window.webkitURL;
const REGEXP_MIME_TYPE_IMAGES = /^image\/\w+$/;
const REGEXP_URLS = /^(?:https?|data):/;

export default {
  name: 'Loader',

  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },

  mounted() {
    this.$el.ownerDocument.addEventListener('paste', (this.onPaste = this.paste.bind(this)));
  },

  beforeDestroy() {
    this.$el.ownerDocument.removeEventListener('paste', this.onPaste);
  },

  methods: {
    read(file, event) {
      return new Promise((resolve, reject) => {
        if (!file) {
          resolve();
          return;
        }

        if (REGEXP_MIME_TYPE_IMAGES.test(file.type)) {
          if (URL) {
            resolve({
              loaded: true,
              name: file.name,
              type: file.type,
              url: URL.createObjectURL(file),
            });
          } else {
            reject(new Error('Your browser is not supported.'));
          }
        } else {
          reject(new Error(`Please ${event ? event.type : 'choose'} an image file.`));
        }
      });
    },

    change({ target }) {
      const { files } = target;

      if (files && files.length > 0) {
        this.read(files[0]).then((data) => {
          target.value = '';
          this.update(data);
        }).catch((e) => {
          target.value = '';
          this.alert(e);
        });
      }
    },

    dragover(e) {
      e.preventDefault();
    },

    drop(e) {
      const { files } = e.dataTransfer;

      e.preventDefault();

      if (files && files.length > 0) {
        this.read(files[0], e)
          .then((data) => {
            this.update(data);
          })
          .catch(this.alert);
      }
    },

    paste(e) {
      const { items } = e.clipboardData || window.clipboardData;

      e.preventDefault();

      if (items && items.length > 0) {
        new Promise((resolve, reject) => {
          const item = Array.from(items).pop();
          const error = new Error('Please paste an image file or URL.');

          if (item.kind === 'file') {
            resolve(item.getAsFile());
          } else if (item.kind === 'string') {
            item.getAsString((url) => {
              if (REGEXP_URLS.test(url)) {
                const xhr = new XMLHttpRequest();
                const alert = () => {
                  reject(error);
                };

                xhr.onabort = alert;
                xhr.onerror = alert;
                xhr.ontimeout = alert;

                xhr.onprogress = () => {
                  if (!REGEXP_MIME_TYPE_IMAGES.test(xhr.getResponseHeader('content-type'))) {
                    xhr.abort();
                  }
                };

                xhr.onload = () => {
                  resolve(xhr.response);
                };

                xhr.open('GET', url, true);
                xhr.responseType = 'blob';
                xhr.send();
              } else {
                reject(error);
              }
            });
          } else {
            reject(error);
          }
        })
          .then((blob) => this.read(blob, e).then((data) => {
            this.update(data);
          }))
          .catch(this.alert);
      }
    },

    alert(e) {
      window.alert(e && e.message ? e.message : e);
    },

    update(data) {
      Object.assign(this.data, data);
    },
  },
};
</script>
