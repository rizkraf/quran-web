<script setup>
import axios from "axios";
import { ref, reactive, computed, onMounted, shallowRef } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import { useDark } from "@vueuse/core";
import VersesListCard from "../components/VersesListCard.vue";
import TafsirListCard from "../components/TafsirListCard.vue";
import VersesListSkeleton from "../components/VersesListSkeleton.vue";

const route = useRoute();
const surahs = ref([]);
const loading = ref(true);
const opacity = ref(0);
const siteHead = reactive({
  title: "Beranda - Quran Web",
  author: "Rizky Rafi Azhara",
  description: "Website untuk membaca Al-Quran",
});
const tabs = shallowRef([VersesListCard, TafsirListCard]);
const currentTab = shallowRef(VersesListCard);
const isDark = useDark();

useHead({
  title: computed(() => siteHead.title),
  meta: [
    {
      name: "author",
      content: computed(() => siteHead.author),
    },
    {
      name: "description",
      content: computed(() => siteHead.description),
    },
  ],
});

const fetchSurah = async () => {
  const response = await axios.get(
    `https://quran-api-clone.vercel.app/surah/${route.params.id}`
  );
  try {
    setTimeout(() => {
      let { data } = response.data;
      surahs.value = data;
      loading.value = false;
      siteHead.title = `${surahs.value.name.transliteration.id} - Quran Web`;
    }, 1000);
  } catch (error) {
    console.log(error);
  }
};

const fadeIn = () => {
  setTimeout(() => {
    opacity.value = 1;
  }, 2000);
};

onMounted(() => {
  fetchSurah();
  fadeIn();
  isDark.value;
});
</script>

<template>
  <header class="flex items-center gap-5 mb-5">
    <RouterLink to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        class="text-emerald-700 h-7 w-7"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
        />
      </svg>
    </RouterLink>
    <div
      v-if="loading"
      class="h-7 w-28 bg-slate-300 dark:bg-[#05291d] animate-pulse rounded-sm"
    ></div>
    <h1
      v-else
      class="text-xl font-bold text-emerald-700 transition duration-[500ms]"
      :style="{ opacity: opacity }"
    >
      {{ surahs.name.transliteration.id }}
    </h1>
  </header>
  <main>
    <div
      class="box-border bg-gradient-to-br from-green-800 to-emerald-600 text-white p-6 w-full mb-6 rounded-lg shadow-lg shadow-emerald-200/50 dark:shadow-none"
    >
      <div
        v-if="loading"
        class="bg-green-900 h-7 w-32 animate-pulse mb-3 rounded-sm"
      ></div>
      <h2
        v-else
        class="text-2xl font-semibold mb-1 transition duration-[500ms]"
        :style="{ opacity: opacity }"
      >
        {{ surahs.name.transliteration.id }}
      </h2>
      <div
        v-if="loading"
        class="bg-green-900 h-3.5 w-24 animate-pulse mb-2.5 rounded-sm"
      ></div>
      <p
        v-else
        class="text-sm mb-2 transition duration-[500ms]"
        :style="{ opacity: opacity }"
      >
        {{ surahs.name.translation.id }}
      </p>
      <hr class="mb-2" />
      <div
        v-if="loading"
        class="bg-green-900 h-3.5 w-14 animate-pulse mt-3 mb-0.5 rounded-sm"
      ></div>
      <p
        v-else
        class="text-sm transition duration-[500ms]"
        :style="{ opacity: opacity }"
      >
        {{ surahs.numberOfVerses }} Ayat
      </p>
    </div>
    <div
      class="bg-white dark:bg-[#05291d] dark:shadow-none flex items-center w-full shadow-md rounded-lg shadow-gray-200/50 mb-6"
    >
      <button
        @click="currentTab = tab"
        v-for="tab in tabs"
        :key="tab"
        class="inline-block rounded-lg basis-1/2 py-2.5"
        :class="{
          'bg-gradient-to-br from-green-800 to-emerald-600 text-white':
            currentTab === tab,
        }"
      >
        {{ tab.__name === "VersesListCard" ? "Surah" : "Tafsir" }}
      </button>
    </div>
    <div class="flex flex-col gap-5">
      <div v-if="loading" class="flex flex-col gap-5">
        <VersesListSkeleton v-for="n in 5" :key="n" />
      </div>
      <keep-alive>
        <component :is="currentTab" :surahs="surahs" :opacity="opacity" />
      </keep-alive>
    </div>
  </main>
</template>
