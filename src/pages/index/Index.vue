<template>
  <div class="wrapper">
    <div id="banner">
      <div class="container">
        <el-row style="margin-top: 105px">
          <el-col :md="12" :xs="24" class="left">
            <div class="info">
              <h1 class="title">
                {{ site?.title }}<br />
                影响力中心
              </h1>
              <h3 class="subtitle">
                {{ $t('index.subtitle.banner') }}
              </h3>
              <div class="operations">
                <el-button
                  type="primary"
                  round
                  class="btn-apply"
                  @click="
                    $router.push({
                      path: '/chat'
                    })
                  "
                >
                  {{ $t('common.button.startForFree') }}
                </el-button>
              </div>
            </div>
          </el-col>
          <el-col :md="12" :xs="24" class="right">
            <video-player
              class="brand"
              :options="playerOptions"
              style="width: 580px; height: 328px"
              :playsinline="true"
            />
            <!-- <el-image src="https://cdn.acedata.cloud/illustration1.png" class="brand" /> -->
          </el-col>
        </el-row>
        <div class="introduction">
          <el-row class="mb-6" style="margin-top: 20px">
            <el-col :span="24">
              <h2 class="title">
                {{ $t('index.title.introduction') }}
              </h2>
            </el-col>
          </el-row>
          <div class="carousel-container">
            <button class="scroll-button left-button" @click="scrollLeft">‹</button>
            <div class="carousel-wrapper">
              <el-row :gutter="15" class="carousel">
                <el-col
                  v-for="(capability, capabilityIndex) in visibleCapabilities"
                  :key="capabilityIndex"
                  :md="6"
                  :xs="24"
                  class="mb-4"
                >
                  <div class="info text-center scale-up" shadow="hover" @click="handleCardClick(capabilityIndex)">
                    <img :src="capability.background_image" class="image-full" />
                  </div>
                </el-col>
              </el-row>
            </div>
            <button class="scroll-button right-button" @click="scrollRight">›</button>
          </div>
        </div>
        <div class="comments">
          <el-row class="mb-6">
            <el-col :span="24">
              <h2 class="title">
                {{ $t('index.title.comments') }}
              </h2>
              <!-- <h5 class="subtitle">
                {{ $t('index.subtitle.comments') }}
              </h5> -->
            </el-col>
          </el-row>
          <el-row :gutter="20" class="main">
            <el-col v-for="(comment, commentIndex) in comments" :key="commentIndex" :md="8" :xs="24">
              <el-card shadow="hover" class="service" :body-style="{ padding: 0 }">
                <p class="content">
                  {{ comment.content }}
                </p>
                <div class="info">
                  <div class="left">
                    <el-image class="avatar" :src="comment.avatar" />
                  </div>
                  <div class="right">
                    <div class="name">{{ comment.name }}</div>
                    <div class="job">
                      {{ comment.job }}
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ElButton, ElImage, ElRow, ElCol, ElCard } from 'element-plus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'video.js/dist/video-js.css';
import { VideoPlayer } from 'vue-video-player';
interface IData {
  comments: any[];
  playerOptions: any;
  currentIndex: number;
  itemsPerPage: number;
}

export default defineComponent({
  name: 'Index',
  components: {
    ElButton,
    ElRow,
    ElCol,
    ElCard,
    ElImage,
    VideoPlayer
  },
  data(): IData {
    return {
      comments: [
        {
          avatar: 'https://cdn.acedata.cloud/avatar1.png',
          name: this.$t('index.customers.name1'),
          job: this.$t('index.customers.job1'),
          content: this.$t('index.customers.comment1')
        },
        {
          avatar: 'https://cdn.acedata.cloud/avatar2.png',
          name: this.$t('index.customers.name2'),
          job: this.$t('index.customers.job2'),
          content: this.$t('index.customers.comment2')
        },
        {
          avatar: 'https://cdn.acedata.cloud/avatar3.png',
          name: this.$t('index.customers.name3'),
          job: this.$t('index.customers.job3'),
          content: this.$t('index.customers.comment3')
        }
      ],
      currentIndex: 0,
      itemsPerPage: 4,
      playerOptions: {
        sources: [
          {
            type: 'video/mp4',
            src: 'https://cdn.acedata.cloud/r3l9lq.mp4'
          }
        ],
        controls: true,
        autoplay: false,
        preload: 'auto',
        poster: 'https://cdn.acedata.cloud/q23t75.png'
      }
    };
  },
  computed: {
    site() {
      return this.$store.state.site;
    },
    capabilities() {
      return [
        ...(this.site?.features?.chat?.enabled
          ? [
              {
                title: this.$t('index.title.chat'),
                subtitle: this.$t('index.subtitle.chat'),
                background_image: 'https://cdn.acedata.cloud/vsbb7g.png'
              }
            ]
          : []),
        ...(this.site?.features?.midjourney?.enabled
          ? [
              {
                title: this.$t('index.title.midjourney'),
                subtitle: this.$t('index.subtitle.midjourney'),
                background_image: 'https://cdn.acedata.cloud/t3vukc.png'
              }
            ]
          : []),
        ...[
          {
            title: this.$t('index.title.digital_man'),
            subtitle: this.$t('index.subtitle.digital_man'),
            background_image: 'https://cdn.acedata.cloud/7oic0c.png'
          }
        ],
        ...(this.site?.features?.suno?.enabled
          ? [
              {
                title: this.$t('index.title.suno'),
                subtitle: this.$t('index.subtitle.suno'),
                background_image: 'https://cdn.acedata.cloud/tlvyn2.jpg'
              }
            ]
          : []),
        ...(this.site?.features?.luma?.enabled
          ? [
              {
                title: this.$t('index.title.luma'),
                subtitle: this.$t('index.subtitle.luma'),
                background_image: 'https://cdn.acedata.cloud/avdogu.png'
              }
            ]
          : [])
      ];
    },
    visibleCapabilities() {
      return this.capabilities.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
    }
  },
  mounted() {},
  methods: {
    scrollLeft() {
      if (this.currentIndex > 0) {
        this.currentIndex -= this.itemsPerPage;
      }
    },
    scrollRight() {
      if (this.currentIndex + this.itemsPerPage < this.capabilities.length) {
        this.currentIndex += this.itemsPerPage;
      }
    },
    handleCardClick(index: any) {
      console.log('Card clicked:', index);
      // 处理点击事件的逻辑
    }
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  background-color: var(--el-bg-color);
  .title {
    font-size: 30px;
    text-align: center;
    font-weight: bold;
    color: var(--el-text-color-primary);
  }
  .subtitle {
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    color: var(--el-text-color-secondary);
  }
}
.container {
  margin: auto;
  max-width: 1200px;
}

.block {
  padding: 150px 0;
  .preview {
    position: relative;
    .image {
      border-radius: 10px;
      padding: 5px;
      background-color: white;
      box-shadow: var(--el-box-shadow-light);
      &.desktop {
        max-width: 100%;
        max-height: 100%;
      }
      &.mobile {
        width: 30%;
        position: absolute;
        right: -5%;
        top: 10%;
      }
    }
  }
  .info {
    padding: 20px 60px;
    text-align: center;
    .title {
      font-size: 40px;
      color: var(--el-text-color-primary);
    }
    .subtitle {
      font-size: 20px;
      padding: 0 20px;
      color: var(--el-text-color-secondary);
    }
    .btn-try {
      padding: 25px 62px;
      font-size: 20px;
      line-height: 20px;
      font-weight: 700;
      border-radius: 50px;
    }
  }
}

#banner {
  padding: 50px 0;
  background-image: url('https://cdn.acedata.cloud/j56ab5.jpg');
  background-size: cover;
  background-position: center;

  .left {
    .info {
      @media (max-width: 767px) {
        padding: 0 50px 0 50px;
      }
      h1.title {
        font-size: 60px;
        font-weight: bold;
        margin-bottom: 50px;
        text-align: left;
        // -webkit-text-fill-color: transparent;
        // background-clip: text;
        // background-image: linear-gradient(90deg, #277186, #7752ff 40%, #5f98fa 60%, #44beff);
      }
      h3.subtitle {
        font-size: 30px;
        line-height: 40px;
        margin-bottom: 70px;
        text-align: left;
        color: var(--el-text-color-primary);
      }
      .operations {
        .btn-apply {
          padding: 25px 62px; /* Adjust padding as needed */
          font-size: 18px; /* Adjust font size as needed */
          line-height: 1.5;
          font-weight: 700;
          border-radius: 25px; /* Adjust border radius as needed */
          background-color: #5f98fa; /* Set background color */
          color: white; /* Set text color */
          transition: transform 0.3s ease;
          // padding: 25px 62px;
          // font-size: 20px;
          // line-height: 20px;
          // font-weight: 700;
          // border-radius: 50px;
        }
        .btn-apply:hover {
          transform: scale(1.1);
        }
      }
    }
  }

  .right {
    @media (max-width: 767px) {
      padding: 50px 20px 0 20px;
    }
    .brand {
      max-width: 100%;
      height: auto;
      margin-top: 60px;
    }
  }

  .introduction {
    padding: 100px 0;
    @media (max-width: 767px) {
      padding: 100px 20px;
    }
    .carousel-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .carousel-wrapper {
      overflow: hidden;
      width: 100%;
      transition: transform 0.5s ease;
    }

    .carousel {
      display: flex;
      transition: transform 0.5s ease;
    }

    .scroll-button {
      background: none;
      border: none;
      font-size: 4rem; /* 调大字体大小 */
      cursor: pointer;
      z-index: 10;
      padding: 15px; /* 增加按钮的内边距 */
      transition: transform 0.2s ease;
    }

    .scroll-button:active {
      transform: scale(1.2);
    }

    .left-button {
      margin-right: 10px;
    }

    .right-button {
      margin-left: 10px;
    }

    .info {
      position: relative;
      overflow: hidden;
    }

    .image-full {
      width: 100%;
      height: auto;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .image-full:hover {
      transform: scale(1.1);
    }
  }

  .comments {
    .main {
      @media (max-width: 767px) {
        padding: 0 50px 0 50px;
      }
    }
    .el-card {
      padding: 50px 40px;
      @media (max-width: 767px) {
        margin-bottom: 15px;
      }
      .content {
        font-size: 16px;
        line-height: 28px;
        color: var(--el-text-color-secondary);
        margin-bottom: 20px;
      }

      .info {
        overflow: hidden;
        .left,
        .right {
          float: left;
        }
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 15px;
          display: block;
        }
        .name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
          color: var(--el-text-color-regular);
        }
        .job {
          font-size: 16px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
}

.dark {
  #introduction,
  #midjourney,
  #suno {
    background: #1e1e1e;
  }
}
</style>
