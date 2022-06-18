<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import SurahListsCard from "../components/SurahListsCard.vue";
import SurahListsSkeleton from "../components/SurahListsSkeleton.vue";

const surahs = ref([]);
const search = ref("");
const loading = ref(true);

const fetchSurah = async () => {
  const response = await axios.get("https://quran-api-clone.vercel.app/surah");
  surahs.value = response.data.data;
  loading.value = false;
};

const searchedSurah = computed(() => {
  return surahs.value.filter((surah) => {
    return surah.name.transliteration.id
      .toLowerCase()
      .includes(search.value.toLowerCase());
  });
});

onMounted(() => {
  fetchSurah();
});
</script>

<template>
  <header class="flex justify-between items-center mb-5">
    <h1 class="text-xl font-bold text-emerald-800">Quran Web</h1>
  </header>
  <main>
    <div
      class="bg-emerald-600 text-white p-4 w-full h-36 mb-6 rounded-lg flex flex-col justify-between shadow-lg shadow-emerald-200/50"
    >
      <p class="font-medium">Last Read</p>
      <h2 class="font-semibold">Al Fatihah</h2>
    </div>
    <div class="relative">
      <input
        class="mb-6 w-full rounded-lg shadow-md shadow-gray-200/50 border-none text-emerald-800 placeholder-gray-400 focus:outline-none focus:ring focus:ring-emerald-200"
        type="text"
        placeholder="Cari Surah"
        v-model.lazy="search"
      />
      <svg
        class="absolute top-0 right-0 mr-3 mt-2 text-emerald-600"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        style="fill: #undefined"
      >
        <path
          fill="currentColor"
          d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"
        ></path>
      </svg>
    </div>
    <div class="flex flex-col gap-5">
      <div v-if="loading" class="flex flex-col gap-5">
        <SurahListsSkeleton v-for="n in 5" :key="n" />
      </div>
      <SurahListsCard :surahs="searchedSurah" v-else />
    </div>
  </main>
</template>
