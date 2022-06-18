<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import SurahListsCard from "../components/SurahListsCard.vue";
import SurahListsSkeleton from "../components/SurahListsSkeleton.vue";

const surahs = ref([]);
const search = ref("");
const loading = ref(true);
const lastRead = ref(localStorage.getItem("lastReadSurah") || "");

const fetchSurah = async () => {
  const response = await axios.get("https://quran-api-clone.vercel.app/surah");
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
      class="bg-gradient-to-br from-green-800 to-emerald-600 text-white p-4 w-full mb-6 rounded-lg shadow-lg shadow-emerald-200/50"
    >
      <p class="font-medium mb-16 flex items-center gap-2">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-book-open h-5 w-5"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </span>
        Last Read
      </p>
      <div
        v-if="loading"
        class="h-6 w-24 bg-green-900 rounded-sm animate-pulse"
      ></div>
      <RouterLink
        :to="`/surah/${lastRead}`"
        v-else
        class="font-semibold inline-block"
        >{{
          surahs[lastRead - 1]
            ? surahs[lastRead - 1].name.transliteration.id
            : "Belum Membaca"
        }}
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-arrow-right inline h-5 w-5"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline></svg></span
      ></RouterLink>
    </div>
    <div class="relative">
      <input
        class="mb-6 w-full rounded-lg shadow-md shadow-gray-200/50 border-none text-emerald-800 placeholder-gray-400 focus:outline-none focus:ring focus:ring-emerald-200"
        type="text"
        placeholder="Cari Surah"
        v-model="search"
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
