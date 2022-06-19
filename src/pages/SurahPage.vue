<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import VersesListCard from "../components/VersesListCard.vue";
import VersesListSkeleton from "../components/VersesListSkeleton.vue";

const route = useRoute();
const surahs = ref([]);
const loading = ref(true);
const opacity = ref(0);

const fetchSurah = async () => {
  const response = await axios.get(
    `https://quran-api-clone.vercel.app/surah/${route.params.id}`
  );
  try {
    setTimeout(() => {
      let { data } = response.data;
      surahs.value = data;
      loading.value = false;
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
      class="h-7 w-28 bg-slate-300 animate-pulse rounded-sm"
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
      class="box-border bg-gradient-to-br from-green-800 to-emerald-600 text-white p-6 w-full mb-6 rounded-lg shadow-lg shadow-emerald-200/50"
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
    <div class="flex flex-col gap-5">
      <div v-if="loading" class="flex flex-col gap-5">
        <VersesListSkeleton v-for="n in 5" :key="n" />
      </div>
      <VersesListCard :surahs="surahs" :opacity="opacity" />
    </div>
  </main>
</template>
