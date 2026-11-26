import { ref, computed } from 'vue'
import { GITHUB_USERNAME, FALLBACK_GITHUB_REPOS } from '../data/githubFallback'

const CACHE_KEY = `gh_commits_cache_v1_${GITHUB_USERNAME}`
const CACHE_TTL_MS = 15 * 60 * 1000 // 15 minutes

const repos = ref(FALLBACK_GITHUB_REPOS)
const loading = ref(false)
const source = ref('snapshot') // 'live' | 'cached' | 'snapshot'
const lastSyncedAt = ref(null)
const errorMessage = ref('')
let initialized = false

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.timestamp || !Array.isArray(parsed?.repos)) return null
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) return null
    return parsed
  } catch {
    return null
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
        repos: data,
      })
    )
  } catch {
    // Ignore storage quota errors
  }
}

async function fetchRepoCommits(repo) {
  const res = await fetch(
    `https://api.github.com/repos/${repo.full_name}/commits?per_page=10`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  )

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const rawCommits = await res.json()
  if (!Array.isArray(rawCommits)) return []

  return rawCommits.map((item) => {
    const fullMessage = item.commit?.message || ''
    const subject = fullMessage.split('\n')[0].trim()
    return {
      sha: item.sha,
      shortSha: item.sha.slice(0, 7),
      message: subject,
      author:
        item.author?.login ||
        item.commit?.author?.name ||
        GITHUB_USERNAME,
      date: item.commit?.author?.date || item.commit?.committer?.date || repo.pushed_at,
      url: item.html_url,
      repo: repo.name,
      repoUrl: repo.html_url,
    }
  })
}

async function loadGithubCommits({ force = false } = {}) {
  if (loading.value) return

  if (!force) {
    const cached = readCache()
    if (cached && cached.repos.length > 0) {
      repos.value = cached.repos
      source.value = 'cached'
      lastSyncedAt.value = new Date(cached.timestamp)
      initialized = true
      return
    }
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const repoRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=12`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
        },
      }
    )

    if (!repoRes.ok) {
      throw new Error(`GitHub API ${repoRes.status}`)
    }

    const rawRepos = await repoRes.json()
    if (!Array.isArray(rawRepos) || rawRepos.length === 0) {
      throw new Error('No repositories returned')
    }

    const fallbackByName = new Map(FALLBACK_GITHUB_REPOS.map((r) => [r.name, r]))

    const enriched = await Promise.all(
      rawRepos.slice(0, 10).map(async (r) => {
        const fb = fallbackByName.get(r.name)
        let commits = fb?.commits || []
        try {
          const liveCommits = await fetchRepoCommits(r)
          if (liveCommits.length > 0) {
            commits = liveCommits
          }
        } catch {
          // Keep fallback commits for this repo if single endpoint hits rate limit
        }

        return {
          name: r.name,
          fullName: r.full_name,
          description: r.description || fb?.description || '',
          language: r.language || fb?.language || null,
          url: r.html_url,
          fork: Boolean(r.fork),
          stars: r.stargazers_count || 0,
          pushedAt: r.pushed_at,
          defaultBranch: r.default_branch || 'main',
          commits,
        }
      })
    )

    const withCommits = enriched.filter((r) => r.commits.length > 0)
    if (withCommits.length > 0) {
      repos.value = withCommits
      source.value = 'live'
      lastSyncedAt.value = new Date()
      writeCache(withCommits)
    }
  } catch (err) {
    errorMessage.value = err?.message || 'Unable to sync live GitHub feed'
    if (repos.value.length === 0) {
      repos.value = FALLBACK_GITHUB_REPOS
    }
    if (source.value !== 'cached') {
      source.value = 'snapshot'
    }
  } finally {
    loading.value = false
    initialized = true
  }
}

export function parseCommitType(message = '') {
  const lower = message.toLowerCase()
  if (lower.startsWith('merge ')) {
    return { type: 'merge', text: message }
  }
  const match = message.match(/^([a-z]+)(\([^)]+\))?:\s*(.+)$/i)
  if (match) {
    return {
      type: match[1].toLowerCase(),
      scope: match[2] ? match[2].slice(1, -1) : '',
      text: match[3],
    }
  }
  if (lower.startsWith('fix')) {
    return { type: 'fix', text: message }
  }
  if (lower.startsWith('add ') || lower.startsWith('init ')) {
    return { type: 'feat', text: message }
  }
  return { type: 'commit', text: message }
}

export function useGithubCommits() {
  if (!initialized && typeof window !== 'undefined') {
    loadGithubCommits()
  }

  const allCommits = computed(() => {
    return repos.value
      .flatMap((repo) => repo.commits)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  })

  const totalCommits = computed(() => allCommits.value.length)

  return {
    username: GITHUB_USERNAME,
    repos,
    allCommits,
    totalCommits,
    loading,
    source,
    lastSyncedAt,
    errorMessage,
    refresh: () => loadGithubCommits({ force: true }),
  }
}

