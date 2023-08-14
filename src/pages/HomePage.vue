<script setup lang="ts">
import axios from "axios";
import { onMounted, ref, computed, reactive, type Ref } from "vue";
import { useHead } from "@vueuse/head";
import { useDark, useToggle } from "@vueuse/core";
import { type Surahs } from "../globals";
import SurahListsCard from "../components/SurahListsCard.vue";
import SurahListsSkeleton from "../components/SurahListsSkeleton.vue";

const surahs: Ref<Array<Surahs>> = ref([]);
const search: Ref<string> = ref("");
const loading: Ref<boolean> = ref(true);
const lastRead: Ref<string> = ref(localStorage.getItem("lastReadSurah") || "");
const opacity: Ref<number> = ref(0);
const siteHead = reactive({
  title: "Beranda - Quran Web",
  author: "Rizky Rafi Azhara",
  description: "Website untuk membaca Al-Quran",
});
const isDark = useDark();
const toggleDark = useToggle(isDark);

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
    return surah.name?.transliteration?.id
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
    <h1 class="text-xl font-bold text-emerald-800 dark:text-emerald-600">
      Quran Web
    </h1>
    <div class="flex items-center gap-4">
      <RouterLink to="/bookmark">
        <svg
          class="text-emerald-800 dark:text-emerald-600 h-7 w-7"
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
      <button @click="toggleDark()">
        <svg
          v-if="isDark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="text-emerald-800 dark:text-emerald-600 h-7 w-7"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"
            fill="currentColor"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="text-emerald-800 dark:text-emerald-600 h-7 w-7"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </header>
  <main>
    <div
      class="bg-gradient-to-br from-green-800 to-emerald-600 text-white p-4 w-full mb-6 rounded-lg shadow-lg shadow-emerald-200/50 dark:shadow-none"
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
        Terakhir Dibaca
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
          surahs[Number(lastRead) - 1]
            ? surahs[Number(lastRead) - 1].name?.transliteration.id
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
        class="mb-6 w-full rounded-lg shadow-md shadow-gray-200/50 dark:shadow-none dark:bg-[#05291d] border-none text-emerald-800 dark:text-white placeholder-gray-400 dark:placeholder-white focus:outline-none focus:ring focus:ring-emerald-200 dark:focus:ring-emerald-600"
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
