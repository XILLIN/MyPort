<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '../../composables/useI18n'
import GithubCommitHistory from '../GithubCommitHistory.vue'

const { t, isTh } = useI18n()

const visible = ref(false)
const activeCategory = ref('ALL')
let observer

onMounted(() => {
  const el = document.getElementById('projects')
  if (!el) return

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true
        observer?.disconnect()
      }
    },
    { threshold: 0.03 }
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})

const projects = computed(() => [
  {
    index: '01',
    year: '2026',
    category: 'SYN',
    title: 'RERUN COMMU2',
    subtitle: isTh.value
      ? 'โครงสร้างเซิร์ฟเวอร์ FiveM ESX Legacy แบบโมดูลาร์ (19 syn_* Resources)'
      : 'Modular FiveM ESX Legacy Server Ecosystem (19 syn_* Resources)',
    status: isTh.value ? 'กำลังพัฒนา' : 'In Development',
    visibility: 'private',
    desc: isTh.value
      ? 'โครงสร้าง Resource ครบวงจรสำหรับเซิร์ฟเวอร์ RERUN COMMU2 พัฒนาร่วมกันโดย PZ × XL (Syn DEV) บน ESX Legacy (Game Build 3095) ขับเคลื่อนด้วยระบบฝั่งเซิร์ฟเวอร์ ความปลอดภัย คอมแบต และ UI ตระกูล syn_* กว่า 19 สคริปต์'
      : 'Complete modular ESX Legacy (Game Build 3095) server architecture powering RERUN COMMU2, co-developed by PZ × XL (Syn DEV) and driven by 19 custom syn_* security, combat, world, phone, and UI resources.',
    stack: ['Lua 5.4', 'Svelte 5', 'Vue', 'TypeScript', 'ESX Legacy', 'oxmysql', 'ox_lib'],
    highlights: isTh.value
      ? [
          'แยกหมวดหมู่โมดูลชัดเจน ([RRC_StartUp], [Syntex_System], [Syntax_Combat], [Syntax_Phone])',
          'ระบบความปลอดภัยฝั่งเซิร์ฟเวอร์ครบชุดผ่าน syn_guard, syn_watcher และ syn_damage v3',
          'รองรับหลายโลกผ่าน Routing Buckets (syn_world_core) พร้อมระบบแยกค่าเลือด/เกราะในโซนต่อสู้',
          'เชื่อมต่อระบบเสียง 3D mumble-voip, คิว syn_queue และฐานข้อมูล MySQL 8 / oxmysql',
        ]
      : [
          'Isolated bracket architecture ([RRC_StartUp], [Syntex_System], [Syntax_Combat], [Syntax_Phone])',
          'Full server-authoritative security stack via syn_guard, syn_watcher, and syn_damage v3',
          'Multi-world Routing Bucket orchestration (syn_world_core) with isolated arena health states',
          'Integrated 3D mumble-voip audio, syn_queue Discord pipeline, and MySQL 8 / oxmysql pooling',
        ],
    github: '',
    live: 'https://discord.gg/HPsAY3ZsYj',
    liveLabel: 'Discord',
  },
  {
    index: '02',
    year: '2026',
    category: 'SYN',
    title: 'syn_guard & syn_watcher',
    subtitle: isTh.value
      ? 'ระบบ Anti-Cheat ฝั่งเซิร์ฟเวอร์, Ban Store และ Client Auditor (0.00–0.01ms)'
      : 'Server-Authoritative Anti-Cheat, Gatekeeper & Anti-Stop Companion',
    status: isTh.value ? 'กำลังพัฒนา' : 'Active Core',
    visibility: 'private',
    desc: isTh.value
      ? 'ระบบป้องกันการโกงสไตล์ FiveGuard / Electron ที่ทำงานแบบ Server-Authoritative พร้อมระบบจัดเก็บแบน หลักฐาน และ SAC Gatekeeper ทำงานคู่กับ syn_watcher ที่ตรวจสอบฝั่งไคลเอนต์ด้วย Web Worker แบบกินทรัพยากรต่ำสุด'
      : 'FiveGuard & Electron-style server-authoritative anti-cheat, ban store, evidence logger, and SAC backend gatekeeper paired with syn_watcher — an ultra-thin (0.00–0.01ms) companion client auditor and anti-stop heartbeat.',
    stack: ['Lua 5.4', 'OneSync', 'JavaScript', 'Web Worker', 'FiveM NUI'],
    highlights: isTh.value
      ? [
          'syn_guard ทำหน้าที่เป็น syn-gatekeeper จัดการระบบแบน หลักฐาน และตรวจสอบสิทธิ์ฝั่งเซิร์ฟเวอร์',
          'syn_watcher ใช้ Web Worker แยกเธรดเพื่อตรวจสอบ Heartbeat ป้องกันการหยุดสคริปต์ฝั่งไคลเอนต์',
          'เชื่อมต่อ Whitelist โดยตรงกับ syn_teleport เพื่อป้องกันการตรวจจับผิดพลาดเวลาวาปในระบบ',
          'ออกแบบให้ใช้ Resmon ฝั่งไคลเอนต์ต่ำมาก (0.00–0.01ms) ไม่กระทบเฟรมเรตผู้เล่น',
        ]
      : [
          'syn_guard provides syn-gatekeeper with server-side ban persistence, evidence capture, and core enforcement',
          'syn_watcher runs an isolated NUI Web Worker anti-stop heartbeat and client auditor',
          'Native whitelist handshake with syn_teleport to eliminate false positives on authorized warps',
          'Engineered for ultra-low client overhead (0.00–0.01ms resmon)',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '03',
    year: '2026',
    category: 'SYN',
    title: 'syn_damage v3.0',
    subtitle: isTh.value
      ? 'ระบบคำนวณดาเมจอาวุธแบบ Flat Damage และป้องกัน Exploit ฝั่งเซิร์ฟเวอร์'
      : 'Authoritative Flat Weapon Damage, Headshot Criticals & Security Hardening',
    status: 'v3.0.0',
    visibility: 'private',
    desc: isTh.value
      ? 'ระบบจัดการดาเมจอาวุธสำหรับ FiveM OneSync ที่แทนที่ตัวคูณดั้งเดิมของ GTA V ด้วยค่าดาเมจคงที่ฝั่งเซิร์ฟเวอร์ พร้อมระบบเกราะรับดาเมจก่อนเลือด คริติคอลยิงหัว และระบบตรวจจับความผิดปกติที่ Resmon 0.00ms'
      : 'OneSync weapon damage engine replacing GTA V native multipliers with server-authoritative flat hit values, armor-first absorption, configurable headshot criticals, rapid-fire anti-leak, and anomaly logging at 0.00ms resmon.',
    stack: ['Lua 5.4', 'OneSync', 'Anomaly Detection', 'FiveM'],
    highlights: isTh.value
      ? [
          'Authoritative Flat Damage กำหนดเลือดที่ลดต่อฮิตชัดเจน ไม่ขึ้นกับตัวคูณเดิมของเกม',
          'Armor-First Absorption ให้เกราะดูดซับดาเมจก่อนลดเลือด พร้อมระบบสุ่ม Headshot Critical Instant Kill',
          'ป้องกัน Native Damage รั่วไหลเวลายิงรัว (Rapid-Fire Anti-Leak) และตรวจ Sanity Check ฝั่งเซิร์ฟเวอร์',
          'แยกโมดูล World, Logger, Anomaly และ Web Hook ชัดเจน พร้อม Resmon 0.00ms',
        ]
      : [
          'Server-authoritative flat damage per hit removing unpredictable native GTA V multipliers',
          'Armor-first absorption pipeline paired with configurable headshot critical instant-kill odds',
          'Rapid-fire anti-leak protection and multi-layer anti-exploit server sanity checks',
          'Modular server architecture (world, logger, anomaly detector, web reporting) at 0.00ms resmon',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '04',
    year: '2026',
    category: 'SYN',
    title: 'syn_phone',
    subtitle: isTh.value
      ? 'สมาร์ทโฟนในเกม FiveM เขียนใหม่ด้วย Svelte 5 รองรับ ESX / QBCore / Qbox'
      : 'Enhanced Gaming Smartphone Rewritten in Svelte 5 for FiveM',
    status: 'v1.2.0',
    visibility: 'private',
    desc: isTh.value
      ? 'นำต้นฉบับ oph3z-phone มาเขียนใหม่ทั้งหมดด้วย Svelte 5 พร้อมออกแบบ UI/UX ใหม่ในสไตล์ Dark Premium Neumorphic รองรับทั้ง Dark และ Matte Platinum Light Mode ระบบเสียง กล้อง แอป และภาษาไทยสมบูรณ์'
      : 'Full Svelte 5 rewrite of oph3z-phone supporting ESX, QBCore, and Qbox — featuring monochromatic Dark & Matte Platinum design tokens, camera, messaging, calling, widgets, spatial audio (xsound), and complete Thai localization.',
    stack: ['Svelte 5', 'Lua 5.4', 'TypeScript', 'CSS', 'xsound', 'mumble-voip'],
    highlights: isTh.value
      ? [
          'เขียน Frontend ใหม่ทั้งหมดด้วย Svelte 5 เพื่อความลื่นไหลและลดการใช้หน่วยความจำใน NUI',
          'ระบบ Design Tokens แบบ Monochromatic Charcoal สลับโหมด Dark / Matte Platinum Light ได้ทันที',
          'รองรับหลายเฟรมเวิร์ก (ESX / QBCore / Qbox) ผ่านตัวเชื่อมต่อ GetCore และระบบ Locale ภาษาไทย',
          'เชื่อมต่อเสียงเรียกเข้าและเพลงผ่าน xsound พร้อมระบบโทรด้วยเสียง 3D mumble-voip',
        ]
      : [
          'Complete NUI frontend rewrite in Svelte 5 for responsive animations and low memory footprint',
          'Monochromatic Charcoal & Matte Platinum dual-theme design token system',
          'Cross-framework bridge (ESX / QBCore / Qbox) with complete Thai & English locales',
          'Integrated camera, apps, widgets, xsound spatial audio, and 3D mumble-voip calling',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '05',
    year: '2026',
    category: 'SYN',
    title: 'syn_world · syn_healthstate · syn_pz_warzone',
    subtitle: isTh.value
      ? 'ชุดระบบสลับโลก Routing Bucket, แยกสถานะเลือด/เกราะ และโซน Warzone v2'
      : 'Multi-World Routing, Health State Isolation & Instanced Warzone Suite',
    status: 'v2.0.0',
    visibility: 'private',
    desc: isTh.value
      ? 'ชุดโครงสร้างพื้นฐานที่ทำงานประสานกันสำหรับโหมดการเล่นแยกโลกใน RERUN: สลับ 13 โลกด้วย Routing Buckets (syn_world_core), แยกสถานะเลือด/เกราะไม่ให้ข้อมูลเมืองหลักเสียหาย (syn_healthstate), วาปปลอดภัย (syn_teleport) และระบบโซนต่อสู้ syn_pz_warzone'
      : 'Interconnected infrastructure powering instanced gameplay in RERUN: 13-world Routing Bucket manager (syn_world_core), isolated arena Health/Armor persistence (syn_healthstate), anti-cheat whitelisted safe warps (syn_teleport), and PZ × Syn Warzone v2.0.',
    stack: ['Lua 5.4', 'ox_lib', 'Routing Buckets', 'FiveM NUI'],
    highlights: isTh.value
      ? [
          'syn_world_core: จัดการ 13 โลก (default, farmworld0–5, warzone0–5) พร้อม Fade, Ghost-Freeze ตอนโหลดแมพ และคำสั่ง ACE',
          'syn_healthstate: แยกและคืนค่าเลือด/เกราะของผู้เล่นอย่างปลอดภัยเมื่อเข้า–ออก Warzone หรือมินิเกม',
          'syn_teleport: วาปพร้อมโหลด Collision, Fade จอ, Whitelist กับ syn_guard และสลับโลกอัตโนมัติ',
          'syn_pz_warzone & syn_combatguard: โซนสงครามเต็มรูปแบบร่วมกับตัวจับสแปม Dodge ระยะประชิด',
        ]
      : [
          'syn_world_core: 13 configured worlds (default, farmworld0–5, warzone0–5) with 400ms fades, Ghost spawn freeze, and ACE commands',
          'syn_healthstate: Isolates temporary arena/warzone Health & Armor without corrupting city persistence',
          'syn_teleport: Safe warp utility with fade transitions, collision streaming, syn_guard whitelist, and world switching',
          'syn_pz_warzone & syn_combatguard: Instanced battlezone core (PZ × Syn) plus native melee dodge-spam guard',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '06',
    year: '2026',
    category: 'FIVEM',
    title: 'Syntax Queue (syn_queue)',
    subtitle: isTh.value
      ? 'ระบบจัดการคิวและการเชื่อมต่อ 11 ขั้นตอนสำหรับเซิร์ฟเวอร์ FiveM'
      : 'Event-Driven 11-Stage Queue & Connection Management System',
    status: isTh.value ? 'กำลังพัฒนา' : 'In Development',
    visibility: 'private',
    desc: isTh.value
      ? 'ระบบจัดการคิวและการเชื่อมต่อแบบ Event-driven สำหรับ FiveM ออกแบบรอบวงจรการเชื่อมต่อ 11 ขั้นตอน พร้อมระบบปล่อยผู้เล่นแบบปรับตัว คะแนนลำดับความสำคัญ และการป้องกันภาระโหลดของ FXServer'
      : 'Next-generation event-driven queue and connection manager for high-concurrency FiveM servers, built around an 11-stage session lifecycle with adaptive staged player release and pressure protection.',
    stack: ['Lua 5.4', 'FiveM', 'oxmysql', 'Vue', 'Tailwind CSS'],
    highlights: isTh.value
      ? [
          'วงจรการเชื่อมต่อ 11 ขั้นตอนตั้งแต่ WAITING จนถึง CHARACTER_LOAD และ READY',
          'ระบบคะแนน Priority แบบถาวรและชั่วคราว พร้อมแคชยศ Discord ที่รองรับช่วงระบบล่ม',
          'กู้คืนการเชื่อมต่อเมื่อหลุด ควบคุมการดาวน์โหลด Resource และตอบสนองต่อ FXServer hitch',
          'Export ข้อมูล Telemetry สำหรับแดชบอร์ด และหน้าโหลดคิว Vue + Tailwind CSS',
        ]
      : [
          '11-stage session lifecycle from WAITING through PRIORITY_SCORING to READY',
          'Dynamic priority scoring (permanent & expiring points) with outage-tolerant Discord role cache',
          'Reconnect recovery, download concurrency throttling, and FXServer hitch/pressure response',
          'Cached oxmysql storage, dashboard telemetry exports, and Vue/Tailwind loading UI',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '07',
    year: '2026',
    category: 'FIVEM',
    title: 'Syn Rhythm Game',
    subtitle: isTh.value
      ? 'มินิเกมดนตรี 4 เลนสไตล์ Guitar Hero / osu! สำหรับ FiveM'
      : 'Guitar Hero-Style 4-Lane Rhythm Minigame for FiveM',
    status: isTh.value ? 'เสร็จสมบูรณ์' : 'Built',
    visibility: 'private',
    desc: isTh.value
      ? 'มินิเกมจังหวะดนตรี 4 เลนบน FiveM NUI ที่ใช้เอนจิน HTML5 Canvas ระดับ 60+ FPS แยกการทำงานอิสระจาก Lua พร้อมระบบเสียง Multi-track Stem และระบบตรวจสอบคะแนนฝั่งเซิร์ฟเวอร์'
      : 'High-performance 4-lane rhythm minigame for FiveM powered by a standalone 60+ FPS HTML5 Canvas engine, Web Audio API dynamic stem playback, and server-side score verification.',
    stack: ['JavaScript', 'Lua', 'HTML5 Canvas', 'Web Audio API', 'FiveM NUI'],
    highlights: isTh.value
      ? [
          'ลูปการเล่นรันใน CEF Canvas เต็มรูปแบบที่ 60+ FPS โดยไม่มีภาระสื่อสารกับ Lua ทุกเฟรม',
          'Web Audio API เล่นเสียงแยกแทร็กแบบซิงก์ ตัดเสียงเครื่องดนตรีนำทันทีเมื่อกดพลาด',
          'ตรวจสอบฝั่งเซิร์ฟเวอร์: เช็กเวลาเล่นจริง, รีเพลย์ล็อกคะแนน, เพดานคะแนนสูงสุด และตรวจจังหวะผิดปกติ',
          'ดึงไฟล์เพลง (.ogg) และ Beatmap (.json) ผ่าน HTTP CDN พร้อมชุดทดสอบอัตโนมัติ Node.js',
        ]
      : [
          'Zero per-frame Lua↔NUI bridge — standalone 60+ FPS HTML5 Canvas rendering loop',
          'Synchronized Web Audio API multi-track stems that drop the lead track dynamically on missed notes',
          'Server-side verification: duration checks, event-log score replay, ceiling validation, and timing flags',
          'External HTTP CDN delivery for .ogg stems & .json beatmaps plus automated Node.js test suite',
        ],
    github: '',
    live: '',
    liveLabel: '',
  },
  {
    index: '08',
    year: '2026',
    category: 'WEB',
    title: 'Maison Ember',
    subtitle: isTh.value
      ? 'เว็บแอปพลิเคชันจองโต๊ะร้านอาหารและแดชบอร์ดแอดมิน (2 ภาษา)'
      : 'Full-Stack Restaurant Reservation Platform & Admin Dashboard',
    status: isTh.value ? 'ออนไลน์' : 'Live',
    visibility: 'public',
    desc: isTh.value
      ? 'ระบบเว็บไซต์และจองโต๊ะร้านอาหารแบบ Full-Stack รองรับภาษาไทยและอังกฤษ พัฒนาส่วนยืนยันตัวตนด้วย Better Auth, โฟลว์จองโต๊ะ 4 ขั้นตอน, API และหน้าแดชบอร์ดวิเคราะห์ข้อมูลสำหรับแอดมิน'
      : 'Bilingual (TH/EN) restaurant website and reservation system built with Next.js App Router, TypeScript, MongoDB/Mongoose, Better Auth, and next-intl — featuring member booking flows and admin analytics.',
    stack: ['Next.js', 'TypeScript', 'React', 'MongoDB', 'Mongoose', 'Better Auth', 'Tailwind CSS'],
    highlights: isTh.value
      ? [
          'ระบบยืนยันตัวตนด้วย Better Auth + MongoDB เก็บ Session ผ่าน HttpOnly cookie พร้อมตรวจสิทธิ์ฝั่งเซิร์ฟเวอร์',
          'โฟลว์จองโต๊ะ 4 ขั้นตอนที่จำข้อมูลการเลือกข้ามขั้นตอนเข้าสู่ระบบ และรองรับหลายภาษา (/th, /en)',
          'แดชบอร์ดแอดมินสำหรับจัดการโต๊ะ การจอง ลูกค้า และวิเคราะห์สถิติร้าน',
          'จำกัดอัตราการเรียกใช้งาน (Rate Limit), ตรวจสอบข้อมูลด้วย Zod พร้อมเทสต์ Vitest และ Playwright E2E',
        ]
      : [
          'Better Auth + MongoDB HttpOnly session cookies with server-validated role guards & rate limiting',
          'Four-step reservation flow preserving booking state across auth with full TH/EN next-intl routing',
          'Admin analytics dashboard with reservation, table, customer, and metrics APIs',
          'Zod payload validation backed by Vitest unit tests and Playwright end-to-end tests',
        ],
    github: 'https://github.com/XILLIN/reservation-restaurant',
    live: 'https://reservation-restaurant-three.vercel.app',
    liveLabel: isTh.value ? 'ดูเว็บไซต์' : 'Live Demo',
  },
  {
    index: '09',
    year: '2026',
    category: 'WEB',
    title: 'Heartopia BotMidi',
    subtitle: isTh.value
      ? 'โปรแกรมเดสก์ท็อปเล่นไฟล์ MIDI อัตโนมัติผ่านคีย์บอร์ด (Windows)'
      : 'Windows Desktop MIDI-to-Keyboard Auto-Player GUI',
    status: isTh.value ? 'พร้อมใช้งาน' : 'Released',
    visibility: 'private',
    desc: isTh.value
      ? 'แอปพลิเคชันเดสก์ท็อป Python (CustomTkinter) สำหรับอ่านไฟล์ .mid และจำลองการกดคีย์บอร์ดเล่นเปียโนในเกมแบบเรียลไทม์ พร้อมตัวแสดงข้อมูลเพลง ปรับคีย์ ปรับความเร็ว และปุ่มหยุดฉุกเฉิน'
      : 'Python desktop application (CustomTkinter) that parses .mid files and automates real-time keyboard playback for 22-key + half-key in-game pianos with live tempo, transpose, and failsafe controls.',
    stack: ['Python', 'CustomTkinter', 'mido', 'pydirectinput'],
    highlights: isTh.value
      ? [
          'อ่านและแสดงข้อมูล MIDI อัตโนมัติ: ช่วงคีย์, ค่า BPM จริง, Time Signature และจำนวนโน้ตทั้งหมด',
          'ปรับ Transpose (Shift) และความเร็ว Tempo ได้ทันทีจากหน้าจอ GUI',
          'ควบคุมผ่านคีย์ลัดทั่วระบบ (HOME เพื่อเริ่มเล่น, DELETE เพื่อหยุดทันที)',
          'ระบบ Failsafe ปล่อยปุ่มคีย์บอร์ดทั้งหมดอัตโนมัติเมื่อหยุดการทำงาน',
        ]
      : [
          'Automatic MIDI metadata inspector: note key range, BPM tempo, time signature, and total note count',
          'Real-time pitch transpose (shift) and playback tempo adjustments directly from the GUI',
          'Global playback hotkeys (HOME to start, DELETE for immediate stop)',
          'Failsafe key-release routine ensuring no stuck keys on stop or abort',
        ],
    github: '',
    live: 'https://youtu.be/pxXGbV-Qmos',
    liveLabel: isTh.value ? 'ดูวิดีโอตัวอย่าง' : 'Video Preview',
  },
])

const categories = computed(() => [
  { key: 'ALL', label: isTh.value ? 'ทั้งหมด' : 'All', count: projects.value.length },
  {
    key: 'SYN',
    label: 'Syn Suite (RERUN)',
    count: projects.value.filter((p) => p.category === 'SYN').length,
  },
  {
    key: 'FIVEM',
    label: 'FiveM Standalone',
    count: projects.value.filter((p) => p.category === 'FIVEM').length,
  },
  {
    key: 'WEB',
    label: isTh.value ? 'เว็บและเดสก์ท็อป' : 'Web & Desktop',
    count: projects.value.filter((p) => p.category === 'WEB').length,
  },
])

const filteredProjects = computed(() => {
  if (activeCategory.value === 'ALL') return projects.value
  return projects.value.filter((p) => p.category === activeCategory.value)
})

const synScripts = computed(() => [
  {
    name: 'syn_queue',
    group: '[RRC_StartUp]',
    role: isTh.value ? 'ระบบคิว 11 ขั้นตอน, Priority Points และ Discord Role Cache' : '11-stage queue, priority scoring & Discord role cache',
  },
  {
    name: 'syn_guard',
    group: '[Syntex_System]',
    role: isTh.value ? 'Anti-Cheat ฝั่งเซิร์ฟเวอร์, Ban Store และ SAC Gatekeeper' : 'Server-authoritative anti-cheat, ban store & SAC gatekeeper',
  },
  {
    name: 'syn_watcher',
    group: '[Syntex_System]',
    role: isTh.value ? 'Client Auditor และ Web Worker Anti-Stop Heartbeat (0.00–0.01ms)' : 'Companion client auditor & Web Worker anti-stop heartbeat (0.00–0.01ms)',
  },
  {
    name: 'syn_world_core',
    group: '[Syntex_System]',
    role: isTh.value ? 'ระบบสลับ 13 โลกด้วย Routing Buckets พร้อม Ghost Spawn Freeze' : '13-world Routing Bucket switcher with Ghost spawn freeze & ACE commands',
  },
  {
    name: 'syn_damage',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'ระบบ Flat Damage v3 ฝั่งเซิร์ฟเวอร์, เกราะก่อนเลือด และ Headshot Crits' : 'v3.0 authoritative flat weapon damage, armor-first & headshot crits',
  },
  {
    name: 'syn_healthstate',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'แยกสถานะเลือดและเกราะในโหมด Warzone / Arena ไม่กระทบเมืองหลัก' : 'Standalone Health/Armor isolation manager for warzones & arenas',
  },
  {
    name: 'syn_pz_warzone',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'ระบบโซนสงคราม Warzone v2.0 (ร่วมพัฒนากับ PZ)' : 'Instanced battlezone system v2.0 (PZ × Syn)',
  },
  {
    name: 'syn_teleport',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'ระบบวาปปลอดภัยพร้อม Fade, โหลด Collision และ Whitelist กับ syn_guard' : 'Safe teleport utility with fade, collision load & syn_guard whitelist',
  },
  {
    name: 'syn_combatguard',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'ตรวจจับสแปมกด Dodge ระยะประชิดและล็อกการโจมตีชั่วคราว' : 'Native melee dodge-spam detector (INPUT_MELEE_BLOCK) & attack lock',
  },
  {
    name: 'syn_hole',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'ระบบอุ้ม/แบกผู้เล่น (F9) พร้อมแอนิเมชัน .ycd แบบกำหนดเอง' : 'Interactive player carry/hold action system (F9, custom .ycd animations)',
  },
  {
    name: 'syn_progbar',
    group: '[Syntax_Combat]',
    role: isTh.value ? 'แถบสถานะ Progress Bar แบบ NUI น้ำหนักเบา' : 'Lightweight custom NUI progress bar component',
  },
  {
    name: 'syn_phone',
    group: '[Syntax_Phone]',
    role: isTh.value ? 'สมาร์ทโฟนเขียนใหม่ด้วย Svelte 5 รองรับ Dark/Platinum และภาษาไทย' : 'Svelte 5 smartphone rewrite with Dark/Platinum tokens & Thai locales',
  },
  {
    name: 'syn_carhud',
    group: '[Syntex_System]',
    role: isTh.value ? 'หน้าปัดความเร็วรถ น้ำมัน ไฟเลี้ยว และเข็มขัดนิรภัย' : 'Vehicle speedometer, fuel, indicator & seatbelt NUI HUD',
  },
  {
    name: 'syn_fpsboost',
    group: '[Syntex_System]',
    role: isTh.value ? 'คำสั่งปรับแต่งการเรนเดอร์เพิ่ม FPS ฝั่งไคลเอนต์' : 'Client-side render optimization & FPS boost command',
  },
  {
    name: 'syn_loading',
    group: '[Syntex_System]',
    role: isTh.value ? 'หน้าจอโหลดเซิร์ฟเวอร์แบบวิดีโอ MP4 และเสียงบรรยากาศ' : 'Custom MP4 video & audio loading screen with manual shutdown',
  },
  {
    name: 'syn_minimap',
    group: '[Syntex_System]',
    role: isTh.value ? 'มาสก์แผนที่ย่อและ Frontend Overlay แบบกำหนดเอง' : 'Custom minimap mask & frontend overlay',
  },
  {
    name: 'syn_hideradar',
    group: '[Syntex_System]',
    role: isTh.value ? 'ควบคุมการซ่อนเรดาร์, HUD Reticle และไฟล์ minimap.gfx' : 'Off-radar controller with custom HUD reticle & minimap.gfx stream',
  },
  {
    name: 'syn_marker',
    group: '[Syntex_System]',
    role: isTh.value ? 'ยูทิลิตี้วาดและจัดการจุด Marker ในโลกเกม' : 'Lightweight world marker rendering utility',
  },
  {
    name: 'syn_wcc',
    group: '[Syntex_System]',
    role: isTh.value ? 'Syntax WeatherControlCenter ควบคุมสภาพอากาศซิงก์ทั้งเซิร์ฟเวอร์' : 'Syntax WeatherControlCenter server-synced weather controller',
  },
])

function jumpTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <section id="projects" class="py-20 sm:py-28 lg:py-28 font-hn text-cream">
    <div class="editorial-shell">
      <div :class="['editorial-rule h-0.5 w-full bg-cream mb-12 lg:mb-14', visible && 'is-visible']" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
        <!-- Left Index Column -->
        <div class="lg:col-span-3 2xl:col-span-2">
          <div class="sticky top-24 space-y-6">
            <p class="text-xs uppercase tracking-[0.2em] text-cream/55">
              {{ t.projects.index }}
            </p>

            <div class="hidden lg:flex flex-col gap-2.5 pt-5 border-t border-cream/15 text-xs">
              <button
                type="button"
                @click="jumpTo('projects-list')"
                class="text-left cursor-pointer font-mono text-cream/55 hover:text-cream transition-colors"
              >
                01 · {{ isTh ? 'ผลงานหลัก' : 'Flagship Systems' }} ({{ projects.length }})
              </button>
              <button
                type="button"
                @click="jumpTo('syn-index')"
                class="text-left cursor-pointer font-mono text-cream/55 hover:text-cream transition-colors"
              >
                02 · syn_* Index ({{ synScripts.length }})
              </button>
              <button
                type="button"
                @click="jumpTo('github-commits')"
                class="text-left cursor-pointer font-mono text-cream/55 hover:text-cream transition-colors"
              >
                03 · {{ isTh ? 'ประวัติ GitHub Commits' : 'GitHub Commit Log' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Content Column -->
        <div class="lg:col-span-9 2xl:col-span-10 space-y-14 lg:space-y-16">
          <div :class="['editorial-reveal space-y-7', visible && 'is-visible']">
            <h2 class="text-3xl sm:text-5xl xl:text-[3.4rem] font-normal leading-[1.1] tracking-[-0.02em] text-cream max-w-5xl">
              {{ t.projects.headline }}
            </h2>

            <!-- Editorial Category Filter -->
            <div class="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div class="flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.18em]">
                <button
                  v-for="cat in categories"
                  :key="cat.key"
                  type="button"
                  @click="activeCategory = cat.key"
                  class="cursor-pointer pb-1.5 transition-all duration-300 border-b inline-flex items-baseline gap-2"
                  :class="
                    activeCategory === cat.key
                      ? 'text-cream border-cream'
                      : 'text-cream/45 border-transparent hover:text-cream/80'
                  "
                >
                  <span>{{ cat.label }}</span>
                  <span class="font-mono text-[10px] text-cream/40">{{ cat.count }}</span>
                </button>
              </div>

              <button
                type="button"
                @click="jumpTo('github-commits')"
                class="hidden sm:inline-flex items-center gap-1.5 cursor-pointer font-mono text-[11px] uppercase tracking-[0.16em] text-cream/55 hover:text-cream transition-colors"
              >
                <span>{{ isTh ? 'ข้ามไปดู GitHub Commits' : 'Jump to GitHub Commits' }}</span>
                <ArrowUpRight :size="13" :stroke-width="1.5" />
              </button>
            </div>
          </div>

          <!-- Flagship Projects List -->
          <div id="projects-list" class="border-t border-cream/15">
            <article
              v-for="(project, i) in filteredProjects"
              :key="project.title"
              :class="[
                'editorial-reveal py-9 lg:py-11 border-b border-cream/15 transition-colors duration-200 hover:bg-cream/[0.02] lg:px-4 lg:-mx-4',
                visible && 'is-visible',
              ]"
              :style="{ transitionDelay: `${Math.min(i, 4) * 60}ms` }"
            >
              <!-- Top Row: Number, Large Title, Year/Status -->
              <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
                <div class="flex items-baseline gap-4 lg:gap-5">
                  <span class="font-mono text-xs text-cream/40 shrink-0">{{ project.index }}</span>
                  <div>
                    <h3 class="text-2xl sm:text-3xl lg:text-[2.35rem] font-normal tracking-[-0.02em] text-cream leading-tight">
                      {{ project.title }}
                    </h3>
                    <p class="mt-1.5 text-sm text-cream/60">
                      {{ project.subtitle }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-cream/50 sm:text-right shrink-0">
                  <span>{{ project.year }}</span>
                  <span class="text-cream/25">/</span>
                  <span class="text-cream/85 border border-cream/20 px-2 py-0.5">{{ project.status }}</span>
                </div>
              </div>

              <!-- Body Grid -->
              <div class="grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-8 pl-0 sm:pl-9">
                <div class="md:col-span-5 space-y-5">
                  <p class="text-sm sm:text-[15px] leading-relaxed text-cream/75">
                    {{ project.desc }}
                  </p>

                  <div class="pt-4 border-t border-cream/15 space-y-2.5">
                    <p class="text-[11px] uppercase tracking-[0.2em] text-cream/45">
                      {{ t.projects.stackLabel }}
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                      <span
                        v-for="tech in project.stack"
                        :key="tech"
                        class="font-mono text-[11px] text-cream/70 border border-cream/15 px-2 py-0.5"
                      >
                        {{ tech }}
                      </span>
                    </div>
                  </div>

                  <!-- Links or Clean Visibility Status -->
                  <div class="pt-1 flex flex-wrap items-center gap-5 text-sm">
                    <a
                      v-if="project.github"
                      :href="project.github"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 text-cream border-b border-cream/40 pb-0.5 transition-opacity duration-300 hover:opacity-60"
                    >
                      <span>{{ t.projects.sourceCode }}</span>
                      <ArrowUpRight :size="15" :stroke-width="1.5" />
                    </a>
                    <a
                      v-if="project.live"
                      :href="project.live"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center gap-1.5 text-cream border-b border-cream/40 pb-0.5 transition-opacity duration-300 hover:opacity-60"
                    >
                      <span>{{ project.liveLabel || t.projects.liveDemo }}</span>
                      <ArrowUpRight :size="15" :stroke-width="1.5" />
                    </a>
                    <span
                      v-if="project.visibility === 'private'"
                      class="font-mono text-[11px] uppercase tracking-[0.16em] text-cream/45"
                    >
                      &mdash; {{ t.projects.privateRepo }}
                    </span>
                  </div>
                </div>

                <div class="md:col-span-7 md:border-l md:border-cream/10 md:pl-8">
                  <p class="text-[11px] uppercase tracking-[0.2em] text-cream/45 mb-3.5">
                    {{ t.projects.highlightsLabel }}
                  </p>
                  <ul class="grid grid-cols-1 xl:grid-cols-2 gap-x-6 gap-y-2.5 text-sm leading-relaxed text-cream/70">
                    <li
                      v-for="item in project.highlights"
                      :key="item"
                      class="flex items-baseline gap-2.5"
                    >
                      <span class="text-cream/35 select-none shrink-0">&mdash;</span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </article>
          </div>

          <!-- Complete syn_* Script Index inside RERUN COMMU2 (2-Column Grid on Desktop) -->
          <div
            v-if="activeCategory === 'ALL' || activeCategory === 'SYN'"
            id="syn-index"
            :class="['editorial-reveal pt-4 space-y-6', visible && 'is-visible']"
          >
            <div class="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <p class="text-xs uppercase tracking-[0.2em] text-cream/50">
                  {{ isTh ? 'สารบัญสคริปต์ภายใน RERUN COMMU2' : 'RERUN COMMU2 — Complete syn_* Resource Index' }}
                </p>
                <p class="text-sm text-cream/65 mt-1.5">
                  {{ isTh
                    ? 'สคริปต์ตระกูล syn_* ทั้งหมด 19 โมดูลที่พัฒนาและดูแลภายใน reruncommu-resources'
                    : 'All 19 custom syn_* modules authored and maintained inside reruncommu-resources.'
                  }}
                </p>
              </div>
              <span class="font-mono text-xs text-cream/45 shrink-0">
                {{ synScripts.length }} modules
              </span>
            </div>

            <div class="grid grid-cols-1 xl:grid-cols-2 border-t border-l border-cream/15">
              <div
                v-for="(script, idx) in synScripts"
                :key="script.name"
                class="p-4 sm:px-5 border-r border-b border-cream/15 space-y-1.5 transition-colors duration-200 hover:bg-cream/[0.025]"
              >
                <div class="flex items-baseline justify-between gap-3">
                  <div class="flex items-baseline gap-2.5 min-w-0">
                    <span class="font-mono text-[11px] text-cream/35 shrink-0">{{ String(idx + 1).padStart(2, '0') }}</span>
                    <span class="font-mono text-sm text-cream truncate">{{ script.name }}</span>
                  </div>
                  <span class="font-mono text-[11px] text-cream/45 shrink-0">
                    {{ script.group }}
                  </span>
                </div>

                <p class="text-xs sm:text-[13px] text-cream/70 leading-relaxed pl-6">
                  {{ script.role }}
                </p>
              </div>
            </div>
          </div>

          <!-- GitHub Commit History Across Repositories -->
          <div :class="['editorial-reveal', visible && 'is-visible']" style="transition-delay: 140ms">
            <GithubCommitHistory />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
