<script setup>
import { ref, computed } from 'vue'
import { ArrowUpRight, GitCommitHorizontal, GitBranch, RefreshCw, Search } from 'lucide-vue-next'
import { useI18n } from '../composables/useI18n'
import { useGithubCommits, parseCommitType } from '../composables/useGithubCommits'

const { t, isTh } = useI18n()
const {
  username,
  repos,
  allCommits,
  totalCommits,
  loading,
  source,
  refresh,
} = useGithubCommits()

const selectedRepo = ref('ALL')
const searchQuery = ref('')
const expanded = ref(false)
const INITIAL_VISIBLE = 8

const currentRepoObj = computed(() => {
  if (selectedRepo.value === 'ALL') return null
  return repos.value.find((r) => r.name === selectedRepo.value) || null
})

const filteredCommits = computed(() => {
  const base =
    selectedRepo.value === 'ALL'
      ? allCommits.value
      : currentRepoObj.value?.commits || []

  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return base

  return base.filter(
    (c) =>
      c.message.toLowerCase().includes(q) ||
      c.repo.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.shortSha.toLowerCase().includes(q)
  )
})

const visibleCommits = computed(() => {
  if (expanded.value) return filteredCommits.value
  return filteredCommits.value.slice(0, INITIAL_VISIBLE)
})

const hasMore = computed(() => filteredCommits.value.length > INITIAL_VISIBLE)

function selectRepo(name) {
  selectedRepo.value = name
  expanded.value = false
}

function formatDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString(isTh.value ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })
}

function formatRelative(iso) {
  if (!iso) return ''
  const diffMs = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diffMs / 60000)
  const hours = Math.floor(diffMs / 3600000)
  const days = Math.floor(diffMs / 86400000)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (isTh.value) {
    if (mins < 60) return `${Math.max(1, mins)} นาทีที่แล้ว`
    if (hours < 24) return `${hours} ชม. ที่แล้ว`
    if (days < 30) return `${days} วันที่แล้ว`
    if (months < 12) return `${months} เดือนที่แล้ว`
    return `${years} ปีที่แล้ว`
  }

  if (mins < 60) return `${Math.max(1, mins)}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  if (months < 12) return `${months}mo ago`
  return `${years}y ago`
}

const sourceBadge = computed(() => {
  if (loading.value) return t.value.github.syncing
  if (source.value === 'live') return t.value.github.live
  if (source.value === 'cached') return t.value.github.cached
  return t.value.github.snapshot
})

function badgeClass(type) {
  switch (type) {
    case 'feat':
      return 'border-cream/40 text-cream bg-cream/[0.06]'
    case 'fix':
      return 'border-cream/30 text-cream/90 bg-cream/[0.04]'
    case 'build':
    case 'chore':
    case 'docs':
    case 'test':
      return 'border-cream/20 text-cream/65'
    case 'merge':
      return 'border-cream/15 text-cream/45'
    default:
      return 'border-cream/15 text-cream/55'
  }
}
</script>

<template>
  <div id="github-commits" class="pt-10 lg:pt-14 border-t border-cream/25 space-y-8">
    <!-- Top Header & Sync Status -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div class="space-y-2.5 max-w-2xl">
        <div class="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-cream/50">
          <span>{{ t.github.eyebrow }}</span>
          <span class="text-cream/25">/</span>
          <span class="font-mono text-cream/80">@{{ username }}</span>
          <span
            class="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] px-2 py-0.5 border border-cream/20 text-cream/70"
          >
            <span
              class="inline-block h-1.5 w-1.5 rounded-full"
              :class="source === 'live' ? 'bg-cream' : 'bg-cream/50'"
            />
            {{ sourceBadge }}
          </span>
        </div>

        <h3 class="text-2xl sm:text-3xl font-normal tracking-[-0.015em] text-cream">
          {{ t.github.heading }}
        </h3>
        <p class="text-sm text-cream/60 leading-relaxed">
          {{ t.github.subtitle }}
        </p>
      </div>

      <!-- Actions & Summary Stats -->
      <div class="flex flex-wrap items-center gap-5 lg:gap-6 shrink-0">
        <div class="flex items-center gap-5 font-mono text-xs text-cream/60 border-r border-cream/15 pr-5">
          <div>
            <span class="text-cream text-sm">{{ repos.length }}</span>
            <span class="ml-1.5 uppercase text-[10px] tracking-[0.16em] text-cream/45">{{ t.github.reposLabel }}</span>
          </div>
          <div>
            <span class="text-cream text-sm">{{ totalCommits }}</span>
            <span class="ml-1.5 uppercase text-[10px] tracking-[0.16em] text-cream/45">{{ t.github.commitsLabel }}</span>
          </div>
        </div>

        <button
          type="button"
          @click="refresh"
          :disabled="loading"
          class="inline-flex items-center gap-2 cursor-pointer text-xs uppercase tracking-[0.16em] text-cream/70 hover:text-cream transition-colors duration-200 disabled:opacity-40"
        >
          <RefreshCw :size="13" :stroke-width="1.5" :class="loading && 'animate-spin'" />
          <span>{{ t.github.refresh }}</span>
        </button>

        <a
          :href="`https://github.com/${username}`"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-cream border-b border-cream/40 pb-0.5 hover:opacity-65 transition-opacity duration-200"
        >
          <span>GitHub</span>
          <ArrowUpRight :size="13" :stroke-width="1.5" />
        </a>
      </div>
    </div>

    <!-- Desktop Split Explorer: Left Repository Rail (4 cols) + Right Commit Feed (8 cols) -->
    <div class="grid grid-cols-1 xl:grid-cols-12 border border-cream/15 bg-[#0e0e0d]">
      <!-- Left Rail: Repository Directory -->
      <aside class="xl:col-span-4 border-b xl:border-b-0 xl:border-r border-cream/15 flex flex-col">
        <div class="px-5 py-3.5 border-b border-cream/15 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-cream/45">
          <span>{{ t.github.repositoriesTitle }}</span>
          <span class="font-mono">{{ repos.length }}</span>
        </div>

        <div class="divide-y divide-cream/10">
          <!-- All Repositories Row -->
          <button
            type="button"
            @click="selectRepo('ALL')"
            class="w-full text-left px-5 py-3.5 cursor-pointer transition-colors duration-200 flex items-center justify-between gap-3"
            :class="
              selectedRepo === 'ALL'
                ? 'bg-cream/[0.08] text-cream'
                : 'text-cream/65 hover:bg-cream/[0.03] hover:text-cream'
            "
          >
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span
                  class="inline-block h-1.5 w-1.5 transition-opacity"
                  :class="selectedRepo === 'ALL' ? 'bg-cream opacity-100' : 'bg-cream/30 opacity-0'"
                />
                <span class="text-sm font-normal truncate">{{ t.github.allRepos }}</span>
              </div>
              <p class="text-[11px] text-cream/45 pl-3.5 mt-0.5">
                {{ t.github.allReposDesc }}
              </p>
            </div>
            <span class="font-mono text-xs text-cream/55 shrink-0">{{ totalCommits }}</span>
          </button>

          <!-- Individual Repositories -->
          <button
            v-for="repo in repos"
            :key="repo.name"
            type="button"
            @click="selectRepo(repo.name)"
            class="w-full text-left px-5 py-3.5 cursor-pointer transition-colors duration-200 group"
            :class="
              selectedRepo === repo.name
                ? 'bg-cream/[0.08] text-cream'
                : 'text-cream/70 hover:bg-cream/[0.03] hover:text-cream'
            "
          >
            <div class="flex items-baseline justify-between gap-3">
              <div class="flex items-center gap-2 min-w-0">
                <span
                  class="inline-block h-1.5 w-1.5 shrink-0 transition-opacity"
                  :class="selectedRepo === repo.name ? 'bg-cream opacity-100' : 'bg-cream/30 opacity-0 group-hover:opacity-60'"
                />
                <span class="font-mono text-xs sm:text-[13px] truncate">{{ repo.name }}</span>
              </div>
              <span class="font-mono text-[11px] text-cream/45 shrink-0">
                {{ repo.commits.length }}
              </span>
            </div>

            <div class="mt-1.5 pl-3.5 flex items-center justify-between gap-2 text-[11px] text-cream/45">
              <div class="flex items-center gap-2 font-mono truncate">
                <span v-if="repo.language">{{ repo.language }}</span>
                <span v-if="repo.language && repo.fork" class="text-cream/25">·</span>
                <span v-if="repo.fork" class="uppercase text-[10px] tracking-wider text-cream/40">fork</span>
                <span v-else class="uppercase text-[10px] tracking-wider text-cream/65">source</span>
              </div>
              <span class="font-mono text-[10px] shrink-0">{{ formatDate(repo.pushedAt) }}</span>
            </div>
          </button>
        </div>
      </aside>

      <!-- Right Panel: Commit History Timeline -->
      <div class="xl:col-span-8 flex flex-col min-w-0">
        <!-- Toolbar: Selected Repo Info + Filter Input -->
        <div class="px-5 py-3.5 border-b border-cream/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111110]">
          <div class="flex items-center gap-3 min-w-0">
            <GitCommitHorizontal :size="15" :stroke-width="1.5" class="text-cream/60 shrink-0" />
            <div class="min-w-0 flex items-center gap-2.5 flex-wrap">
              <span class="font-mono text-xs sm:text-sm text-cream truncate">
                {{ currentRepoObj ? currentRepoObj.fullName : `${username} / *` }}
              </span>
              <span
                v-if="currentRepoObj"
                class="inline-flex items-center gap-1 font-mono text-[10px] text-cream/50 border border-cream/15 px-1.5 py-0.5"
              >
                <GitBranch :size="10" :stroke-width="1.5" />
                {{ currentRepoObj.defaultBranch }}
              </span>
              <a
                v-if="currentRepoObj"
                :href="currentRepoObj.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-cream/55 hover:text-cream transition-colors"
              >
                <span>{{ t.github.openRepo }}</span>
                <ArrowUpRight :size="12" :stroke-width="1.5" />
              </a>
            </div>
          </div>

          <!-- Compact Filter Input -->
          <div class="relative w-full sm:w-56 shrink-0">
            <Search :size="13" :stroke-width="1.5" class="absolute left-2.5 top-1/2 -translate-y-1/2 text-cream/35 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="t.github.searchPlaceholder"
              class="w-full bg-[#0a0a0a] border border-cream/15 pl-8 pr-3 py-1.5 text-xs font-mono text-cream placeholder-cream/35 focus:outline-none focus:border-cream/50 transition-colors"
            />
          </div>
        </div>

        <!-- Repo Description Strip (when single repo selected) -->
        <div
          v-if="currentRepoObj && currentRepoObj.description"
          class="px-5 py-2.5 border-b border-cream/10 text-xs text-cream/55 bg-[#0c0c0b]"
        >
          {{ currentRepoObj.description }}
        </div>

        <!-- Commit Rows -->
        <div v-if="visibleCommits.length > 0" class="divide-y divide-cream/10">
          <a
            v-for="commit in visibleCommits"
            :key="`${commit.repo}-${commit.sha}`"
            :href="commit.url"
            target="_blank"
            rel="noopener noreferrer"
            class="group grid grid-cols-1 sm:grid-cols-12 gap-y-2 sm:gap-x-4 px-5 py-3.5 items-baseline transition-colors duration-200 hover:bg-cream/[0.035]"
          >
            <!-- SHA + Commit Type -->
            <div class="sm:col-span-3 flex items-center gap-2.5 shrink-0">
              <span class="font-mono text-xs text-cream/80 group-hover:text-cream underline-offset-4 group-hover:underline">
                {{ commit.shortSha }}
              </span>
              <span
                class="font-mono text-[10px] uppercase tracking-[0.12em] px-1.5 py-0.5 border leading-none"
                :class="badgeClass(parseCommitType(commit.message).type)"
              >
                {{ parseCommitType(commit.message).type }}
              </span>
            </div>

            <!-- Message + Repo pill (when All) -->
            <div class="sm:col-span-6 min-w-0 space-y-1">
              <p class="text-sm text-cream/90 group-hover:text-cream leading-snug break-words">
                {{ parseCommitType(commit.message).text }}
              </p>
              <div class="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-mono text-cream/45">
                <span v-if="selectedRepo === 'ALL'" class="text-cream/65">{{ commit.repo }}</span>
                <span v-if="selectedRepo === 'ALL'" class="text-cream/20">·</span>
                <span>{{ commit.author }}</span>
              </div>
            </div>

            <!-- Date & External Icon -->
            <div class="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3 text-right shrink-0">
              <div class="font-mono">
                <p class="text-xs text-cream/65">{{ formatDate(commit.date) }}</p>
                <p class="text-[10px] text-cream/40">{{ formatRelative(commit.date) }}</p>
              </div>
              <ArrowUpRight
                :size="14"
                :stroke-width="1.5"
                class="text-cream/30 group-hover:text-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0"
              />
            </div>
          </a>
        </div>

        <!-- Empty Search Result -->
        <div v-else class="px-5 py-12 text-center text-xs font-mono text-cream/45">
          {{ t.github.noMatches }}
        </div>

        <!-- Footer: Show More / Less -->
        <div
          v-if="hasMore"
          class="px-5 py-3 border-t border-cream/15 flex items-center justify-between text-xs bg-[#111110]"
        >
          <span class="font-mono text-[11px] text-cream/45">
            {{ visibleCommits.length }} / {{ filteredCommits.length }} {{ t.github.commitsLabel }}
          </span>

          <button
            type="button"
            @click="expanded = !expanded"
            class="cursor-pointer uppercase tracking-[0.18em] text-[11px] text-cream border-b border-cream/35 pb-0.5 hover:opacity-65 transition-opacity"
          >
            {{ expanded ? t.github.showLess : `${t.github.showAll} (${filteredCommits.length})` }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

