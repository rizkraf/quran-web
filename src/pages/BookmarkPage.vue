<script setup>
import { ref, onMounted } from "vue";

const bookmarks = ref([]);

const addRemoveBookmark = (data, number, index) => {
  if (
    bookmarks.value.find(
      (bookmark) => bookmark.number === number && bookmark.index === index
    )
  ) {
    bookmarks.value = bookmarks.value.filter(
      (bookmark) => bookmark.number !== number || bookmark.index !== index
    );
  } else {
    bookmarks.value.push({
      data,
      number,
      index,
    });
  }
  console.log(bookmarks.value);
  saveToLocalStorage();
};

const saveToLocalStorage = () => {
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks.value));
};

onMounted(() => {
  const items = localStorage.getItem("bookmarks");
  bookmarks.value = items ? JSON.parse(items) : [];
});
</script>

<template>
  <header class="flex items-center mb-5">
    <RouterLink to="/" class="inline-block">
      <svg
        class="text-emerald-700 h-7 w-7"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          fill="currentColor"
          d="M7.828 11H20v2H7.828l5.364 5.364-1.414 1.414L4 12l7.778-7.778 1.414 1.414z"
        />
      </svg>
    </RouterLink>
    <h3 class="text-emerald-700 text-xl font-bold ml-auto">Bookmark</h3>
  </header>
  <div class="flex flex-col gap-5">
    <div
      v-for="(bookmark, index) in bookmarks"
      :key="bookmark.number"
      class="box-border w-full bg-white p-4 shadow-md rounded-lg shadow-gray-200/50"
    >
      <div class="flex justify-between w-full items-center mb-5">
        <div class="flex items-center gap-2">
          <svg
            class="text-emerald-600"
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
              {{ bookmark.data.numberOfVerses }}
            </text>
          </svg>
          <p class="font-semibold text-emerald-600">
            {{ bookmark.data.name.transliteration.id }}
          </p>
        </div>

        <div class="flex items-center gap-4">
          <button>
            <svg
              class="text-emerald-600 h-7 w-7"
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
              addRemoveBookmark(bookmark.data, bookmark.data.number, `${index}`)
            "
          >
            <svg
              v-if="
                bookmarks.find(
                  (bookmark) =>
                    bookmark.number === bookmark.number &&
                    bookmark.index === bookmark.index
                )
              "
              class="text-emerald-600 h-7 w-7"
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
            <svg
              v-else
              class="text-emerald-600 h-7 w-7"
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
          <RouterLink :to="{ name: 'surah', params: { id: bookmark.number } }">
            <svg
              class="text-emerald-600 h-7 w-7"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1H5zm13-6v-3h-7v-2h7V8l5 4-5 4z"
              />
            </svg>
          </RouterLink>
        </div>
      </div>
      <h3
        class="font-arabic text-2xl leading-[2.5] text-slate-900 text-right mb-5 transition duration-300"
      >
        {{ bookmark.data.verses[bookmark.number - 1].text.arab }}
      </h3>
      <p class="text-lg text-slate-900">
        {{ bookmark.data.verses[bookmark.number - 1].translation.id }}
      </p>
    </div>
  </div>
</template>
