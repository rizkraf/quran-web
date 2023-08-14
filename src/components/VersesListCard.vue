<script setup lang="ts">
import { ref, onMounted, type Ref } from "vue";
import { type Bookmark } from "../globals";

const props = defineProps({
  surahs: {
    type: Object,
    required: true,
  },
  opacity: {
    type: Number,
    required: true,
  },
});

const bookmarks: Ref<Array<Bookmark>> = ref([]);
const audioPlayer: Ref<any> = ref(null);
const isPlayed: Ref<number | null> = ref(null);
const isPlaying: Ref<boolean> = ref(false);

const addRemoveBookmark = (data: any, number: number, index: string) => {
  if (
    bookmarks.value.find(
      (bookmark: Bookmark) =>
        bookmark.number === number && bookmark.index === index
    )
  ) {
    bookmarks.value = bookmarks.value.filter(
      (bookmark: Bookmark) =>
        bookmark.number !== number || bookmark.index !== index
    );
  } else {
    bookmarks.value.push({
      data,
      number,
      index,
    });
  }
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks.value));
};

const playAudio = (index: number) => {
  audioPlayer.value[index].addEventListener("ended", () => {
    isPlayed.value = null;
    isPlaying.value = false;
  });

  audioPlayer.value[index].play();
  isPlayed.value = index;
  isPlaying.value = true;
};

const pauseAudio = (index: number) => {
  audioPlayer.value[index].pause();
  isPlayed.value = null;
  isPlaying.value = false;
};

onMounted(() => {
  const items = localStorage.getItem("bookmarks");
  bookmarks.value = items ? JSON.parse(items) : [];
});
</script>

<template>
  <div
    class="box-border w-full bg-white dark:bg-[#05291d] dark:shadow-none p-4 shadow-md rounded-lg shadow-gray-200/50"
    v-for="(verse, index) in props.surahs.verses"
    :key="index"
    :id="`verse-${index + 1}`"
  >
    <div class="flex justify-between w-full items-center mb-5">
      <svg
        class="text-emerald-600 transition duration-300"
        :style="{ opacity: opacity }"
        width="37"
        height="36"
        viewBox="0 0 37 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M31.4531 12.6219V5.97656C31.4531 5.39409 30.9809 4.92188 30.3984 4.92188H23.7531L19.1192 0.307336C18.7076 -0.102445 18.0423 -0.102445 17.6307 0.307336L12.9969 4.92188H6.35156C5.76909 4.92188 5.29688 5.39409 5.29688 5.97656V12.6219L0.682336 17.2558C0.272555 17.6674 0.272555 18.3327 0.682336 18.7443L5.29688 23.3781V30.0234C5.29688 30.6059 5.76909 31.0781 6.35156 31.0781H12.9969L17.6307 35.6927C17.8365 35.8976 18.1058 36 18.375 36C18.6442 36 18.9135 35.8976 19.1192 35.6927L23.7531 31.0781H30.3984C30.9809 31.0781 31.4531 30.6059 31.4531 30.0234V23.3781L36.0677 18.7443C36.4774 18.3327 36.4774 17.6674 36.0677 17.2558L31.4531 12.6219ZM29.6511 22.1983C29.4543 22.396 29.3438 22.6635 29.3438 22.9425V28.9688H23.3175C23.0386 28.9688 22.771 29.0793 22.5734 29.2761L18.375 33.4569L14.1767 29.2761C13.979 29.0793 13.7115 28.9688 13.4325 28.9688H7.40625V22.9425C7.40625 22.6636 7.29572 22.396 7.09891 22.1984L2.91813 18L7.09891 13.8017C7.29572 13.604 7.40625 13.3365 7.40625 13.0575V7.03125H13.4325C13.7114 7.03125 13.979 6.92072 14.1766 6.72391L18.375 2.54313L22.5734 6.72391C22.7711 6.92072 23.0386 7.03125 23.3175 7.03125H29.3438V13.0575C29.3438 13.3364 29.4543 13.604 29.6511 13.8016L33.8319 18L29.6511 22.1983Z"
          fill="currentColor"
        />
        <path
          d="M29.6511 22.1983C29.4543 22.396 29.3438 22.6635 29.3438 22.9425V28.9688H23.3175C23.0386 28.9688 22.771 29.0793 22.5734 29.2761L18.375 33.4569L14.1767 29.2761C13.979 29.0793 13.7115 28.9688 13.4325 28.9688H7.40625V22.9425C7.40625 22.6636 7.29572 22.396 7.09891 22.1984L2.91813 18L7.09891 13.8017C7.29572 13.604 7.40625 13.3365 7.40625 13.0575V7.03125H13.4325C13.7114 7.03125 13.979 6.92072 14.1766 6.72391L18.375 2.54313L22.5734 6.72391C22.7711 6.92072 23.0386 7.03125 23.3175 7.03125H29.3438V13.0575C29.3438 13.3364 29.4543 13.604 29.6511 13.8016L33.8319 18L29.6511 22.1983Z"
          fill="currentColor"
        />
        <text
          class="text-sm"
          x="50%"
          y="64%"
          text-anchor="middle"
          fill="#ffffff"
        >
          {{ verse.number.inSurah }}
        </text>
      </svg>
      <div class="flex items-center gap-4">
        <audio :src="verse.audio.primary" ref="audioPlayer"></audio>
        <button
          @click.prevent="
            isPlayed == index && isPlaying
              ? pauseAudio(index)
              : playAudio(index)
          "
          class="transition duration-300"
          :style="{ opacity: opacity }"
        >
          <svg
            v-if="isPlayed == index && isPlaying"
            class="text-emerald-600 h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9 9h2v6H9V9zm4 0h2v6h-2V9z"
            />
          </svg>
          <svg
            v-else
            class="text-emerald-600 h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.622 8.415l4.879 3.252a.4.4 0 0 1 0 .666l-4.88 3.252a.4.4 0 0 1-.621-.332V8.747a.4.4 0 0 1 .622-.332z"
            />
          </svg>
        </button>
        <button
          @click="
            addRemoveBookmark(
              surahs,
              verse.number.inSurah,
              `${surahs.name.transliteration.id}-${index + 1}`
            )
          "
          class="transition duration-300"
          :style="{ opacity: opacity }"
        >
          <svg
            v-if="
              bookmarks.find(
                (bookmark) =>
                  bookmark.number === verse.number.inSurah &&
                  bookmark.index ===
                    `${surahs.name.transliteration.id}-${index + 1}`
              )
            "
            class="text-emerald-600 h-8 w-8"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z"
              fill="currentColor"
            />
          </svg>
          <svg
            class="text-emerald-600 h-8 w-8"
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1zm13 2H6v15.432l6-3.761 6 3.761V4z"
            />
          </svg>
        </button>
      </div>
    </div>
    <h3
      class="font-arabic text-2xl leading-[2.5] text-slate-900 dark:text-white text-right mb-5 transition duration-300"
      :style="{ opacity: opacity }"
    >
      {{ verse.text.arab }}
    </h3>
    <p
      class="text-lg text-slate-900 dark:text-white transition duration-300"
      :style="{ opacity: opacity }"
    >
      {{ verse.translation.id }}
    </p>
  </div>
</template>
