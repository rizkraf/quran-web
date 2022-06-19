<script setup>
import axios from "axios";
import { onMounted, ref, computed } from "vue";
import SurahListsCard from "../components/SurahListsCard.vue";
import SurahListsSkeleton from "../components/SurahListsSkeleton.vue";

const surahs = ref([]);
const search = ref("");
const loading = ref(true);
const lastRead = ref(localStorage.getItem("lastReadSurah") || "");
const opacity = ref(0);

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
  <header class="flex justify-between items-center mb-5">
    <h1 class="text-xl font-bold text-emerald-800">Quran Web</h1>
    <RouterLink to="/bookmark">
      <svg
        class="text-emerald-800 h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M5 2h14a1 1 0 0 1 1 1v19.143a.5.5 0 0 1-.766.424L12 18.03l-7.234 4.536A.5.5 0 0 1 4 22.143V3a1 1 0 0 1 1-1z"
        />
      </svg>
    </RouterLink>
  </header>
  <main>
    <div
      class="bg-gradient-to-br from-green-800 to-emerald-600 text-white p-4 w-full mb-6 rounded-lg shadow-lg shadow-emerald-200/50"
    >
      <p class="font-medium mb-16 flex items-center gap-2">
        <span
          ><svg
            class="text-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M13 21v2h-2v-2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a3.99 3.99 0 0 1 3 1.354A3.99 3.99 0 0 1 15 3h6a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-8zm7-2V5h-5a2 2 0 0 0-2 2v12h7zm-9 0V7a2 2 0 0 0-2-2H4v14h7z"
              fill="currentColor"
            />
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
        class="font-semibold inline-block transition duration-[500ms]"
        :style="{ opacity: opacity }"
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
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z"
        />
      </svg>
    </div>
    <div class="flex flex-col gap-5">
      <div v-if="loading" class="flex flex-col gap-5">
        <SurahListsSkeleton v-for="n in 5" :key="n" />
      </div>
      <SurahListsCard :surahs="searchedSurah" :opacity="opacity" v-else />
    </div>
  </main>
</template>
