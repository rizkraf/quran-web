<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import VersesListCard from "../components/VersesListCard.vue";

const route = useRoute();
const surahs = ref([]);
const loading = ref(true);

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

onMounted(() => {
  fetchSurah();
});
</script>

<template>
  <header class="flex items-center gap-5 mb-5">
    <RouterLink to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-arrow-left text-emerald-700"
      >
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
      </svg>
    </RouterLink>
    <div
      v-if="loading"
      class="h-7 w-28 bg-slate-300 animate-pulse rounded-sm"
    ></div>
    <h1 v-else class="text-xl font-bold text-emerald-700">
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
      <h2 v-else class="text-2xl font-semibold mb-1">
        {{ surahs.name.transliteration.id }}
      </h2>
      <div
        v-if="loading"
        class="bg-green-900 h-3.5 w-24 animate-pulse mb-2.5 rounded-sm"
      ></div>
      <p v-else class="text-sm mb-2">{{ surahs.name.translation.id }}</p>
      <hr class="mb-2" />
      <div
        v-if="loading"
        class="bg-green-900 h-3.5 w-14 animate-pulse mt-3 mb-0.5 rounded-sm"
      ></div>
      <p v-else class="text-sm">{{ surahs.numberOfVerses }} Ayat</p>
    </div>
    <div class="flex flex-col gap-5">
      <VersesListCard :surahs="surahs" />
    </div>
  </main>
</template>
