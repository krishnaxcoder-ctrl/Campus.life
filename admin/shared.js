// Shared by the admin pages: Supabase login, escaping, icons, toasts and the confirm dialog.

// From config.js (gitignored) when it exists.
const CONFIG = window.ADMIN_CONFIG ?? {};
const SUPABASE_URL = CONFIG.supabaseUrl || 'https://jtcfcdqyzmixrsopyjgw.supabase.co';

// Event titles from My Events in the app (src/data/cl.ts).
const EVENT_TITLES = [
  'Swach Bharat_Panambur_26/09/26',
  'Swach Bharat_Panambur_29/06/26',
  'Swach Bharat_Aids 2Nd Year_Beach Cleaning _Nitk',
  'Beach Cleaning_Aids',
  'Swach Bharat_Aids',
];

// Lucide icons (ISC license), the icon set shadcn/ui uses.
const ICONS = {
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  chevronsUpDown: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><path d="M10 11v6"/><path d="M14 11v6"/>',
  clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  listChecks: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
  logOut: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
};

function icon(name, size = 16) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

/** Fills every `<span data-icon="name">` in the static markup. */
function renderIcons(root = document) {
  root.querySelectorAll('[data-icon]').forEach((el) => { el.innerHTML = icon(el.dataset.icon); });
}

// Values go into attributes too, so quotes are escaped as well.
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

/**
 * A 10-digit mobile number from whatever was typed or pasted: digits only, keeping the last 10,
 * so "+91 99671 80937", "091-9967180937" and "09967180937" all become "9967180937".
 */
const normalizePhone = (value) => value.replace(/\D/g, '').slice(-10);

// ─── Login ───

// With the app's read-only key, edits silently change nothing, so reject it up front.
function keyProblem(key) {
  if (key.startsWith('sb_publishable_')) return 'That is the publishable key. Use the service role (secret) key.';
  if (key.startsWith('eyJ')) {
    try {
      const role = JSON.parse(atob(key.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))).role;
      if (role !== 'service_role') return `That key has the "${role}" role. Use the service role key.`;
    } catch { return 'That key could not be read.'; }
  }
  return null;
}

/**
 * Connects with the key from config.js, or shows the login card until a working
 * service role key is entered. Then calls `onReady(client)`.
 */
function setupLogin(onReady) {
  renderIcons();
  const input = document.getElementById('keyInput');
  const login = document.getElementById('login');

  async function connect(key) {
    const problem = keyProblem(key);
    if (problem) { login.hidden = false; toast(problem, 'error'); return; }
    const client = supabase.createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
    const { error } = await client.from('profiles').select('id').limit(1);
    if (error) { login.hidden = false; toast('Invalid key or connection failed', 'error'); return; }
    if (key !== CONFIG.serviceRoleKey) sessionStorage.setItem('sb_key', key);
    login.hidden = true;
    document.getElementById('app').hidden = false;
    onReady(client);
  }

  document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const key = input.value.trim();
    if (key) connect(key);
  });
  document.getElementById('disconnect').addEventListener('click', () => {
    sessionStorage.removeItem('sb_key');
    location.reload();
  });

  // Key in config.js: no login card while connecting, and nothing to disconnect from.
  if (CONFIG.serviceRoleKey) {
    login.hidden = true;
    document.getElementById('disconnect').hidden = true;
    connect(CONFIG.serviceRoleKey);
    return;
  }
  const saved = sessionStorage.getItem('sb_key');
  if (saved) { input.value = saved; connect(saved); }
}

// ─── Toast (Sonner style) ───

function toast(message, type = 'success') {
  let host = document.querySelector('.toaster');
  if (!host) {
    host = document.createElement('div');
    host.className = 'toaster';
    host.setAttribute('aria-live', 'polite');
    document.body.append(host);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  el.dataset.type = type;
  el.innerHTML = `${icon(type === 'error' ? 'alert' : 'circleCheck')}<span>${esc(message)}</span>`;
  host.append(el);
  setTimeout(() => el.remove(), 3000);
}

// ─── Alert dialog ───

/** Resolves true when the action is confirmed; Escape, Cancel or a click outside resolve false. */
function confirmDialog({ title, description, action = 'Delete' }) {
  return new Promise((resolve) => {
    const d = document.createElement('dialog');
    d.className = 'dialog';
    d.innerHTML = `
      <h2 class="dialog-title">${esc(title)}</h2>
      <p class="dialog-description">${esc(description)}</p>
      <div class="dialog-footer">
        <button type="button" class="btn btn-outline" value="cancel">Cancel</button>
        <button type="button" class="btn btn-destructive" value="ok">${esc(action)}</button>
      </div>`;
    d.addEventListener('click', (e) => {
      const value = e.target.closest('button')?.value;
      if (value) { d.close(value); return; }
      const r = d.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close('cancel');
    });
    d.addEventListener('close', () => { resolve(d.returnValue === 'ok'); d.remove(); });
    document.body.append(d);
    d.showModal();
  });
}

// ─── Time ───

const pad = (n) => String(n).padStart(2, '0');
const minutes = (ms) => Math.floor(ms / 60000);
/** `0h 01m`, as in the app. */
const fmtDuration = (ms) => `${Math.floor(minutes(ms) / 60)}h ${pad(minutes(ms) % 60)}m`;
/** `0:30`, as in the app's TOTAL HOURS. */
const fmtHours = (ms) => `${Math.floor(minutes(ms) / 60)}:${pad(minutes(ms) % 60)}`;
const hhmm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;

// ─── Popover (one open at a time, portalled to <body>) ───

let popover = null;

function showPopover(anchor, content, { matchWidth = false } = {}) {
  closePopover();
  const el = document.createElement('div');
  el.className = 'popover-content';
  el.append(content);
  document.body.append(el);
  popover = { el, anchor, matchWidth };
  anchor.setAttribute('aria-expanded', 'true');
  placePopover();
}

/** Below the anchor, or above it when there's no room below. */
function placePopover() {
  if (!popover) return;
  const { el, anchor, matchWidth } = popover;
  const r = anchor.getBoundingClientRect();
  if (matchWidth) el.style.minWidth = `${r.width}px`;
  const below = r.bottom + 4 + el.offsetHeight <= innerHeight || r.top - 4 - el.offsetHeight < 0;
  el.style.top = `${below ? r.bottom + 4 : r.top - 4 - el.offsetHeight}px`;
  el.style.left = `${Math.max(8, Math.min(r.left, innerWidth - el.offsetWidth - 8))}px`;
}

function closePopover() {
  if (!popover) return;
  popover.anchor.setAttribute('aria-expanded', 'false');
  popover.el.remove();
  popover = null;
}

document.addEventListener('pointerdown', (e) => {
  if (popover && !popover.el.contains(e.target) && !popover.anchor.contains(e.target)) closePopover();
}, true);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || !popover) return;
  const { anchor } = popover;
  closePopover();
  anchor.focus();
});
addEventListener('resize', closePopover);
addEventListener('scroll', (e) => { if (popover && !popover.el.contains(e.target)) closePopover(); }, true);

// ─── Select ───

/**
 * shadcn Select: an outline trigger that opens a list of options.
 * Options are strings, or { value, label } when the value isn't what should be shown.
 * `onChange(value)` runs when a different option is picked. `.value` and `.options` can be read and set.
 */
function createSelect({ options: list = [], value = '', placeholder = 'Select', label, small = false, onChange }) {
  const norm = (items) => items.map((o) => (typeof o === 'string' ? { value: o, label: o } : { value: String(o.value), label: o.label }));
  let options = norm(list);
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `btn btn-outline select-trigger${small ? ' btn-sm' : ''}`;
  btn.setAttribute('role', 'combobox');
  btn.setAttribute('aria-haspopup', 'listbox');
  btn.setAttribute('aria-expanded', 'false');
  if (label) btn.setAttribute('aria-label', label);

  let current = String(value);
  let items = [];
  let active = -1;
  const isOpen = () => popover?.anchor === btn;

  const paint = () => {
    const shown = options.find((o) => o.value === current)?.label ?? '';
    btn.title = shown;
    btn.innerHTML = `<span class="value${shown ? '' : ' placeholder'}">${esc(shown || placeholder)}</span>${icon('chevronDown')}`;
  };
  const setActive = (i) => {
    active = i;
    items.forEach((el, j) => { el.dataset.active = j === i; });
    items[i]?.scrollIntoView({ block: 'nearest' });
  };
  const pick = (v) => {
    closePopover();
    btn.focus();
    if (v === current) return;
    current = v;
    paint();
    onChange?.(v);
  };
  const open = () => {
    const list = document.createElement('div');
    list.className = 'select-content';
    list.setAttribute('role', 'listbox');
    list.innerHTML = options.length
      ? options.map((o) => `
        <div class="select-item" role="option" data-value="${esc(o.value)}" aria-selected="${o.value === current}">
          ${esc(o.label)}${o.value === current ? `<span class="check">${icon('check')}</span>` : ''}
        </div>`).join('')
      : '<div class="command-empty">Nothing to pick yet.</div>';
    items = [...list.children];
    list.addEventListener('pointermove', (e) => {
      const i = items.indexOf(e.target.closest('.select-item'));
      if (i >= 0 && i !== active) setActive(i);
    });
    list.addEventListener('click', (e) => {
      const item = e.target.closest('.select-item');
      if (item) pick(item.dataset.value);
    });
    showPopover(btn, list, { matchWidth: true });
    setActive(Math.max(0, options.findIndex((o) => o.value === current)));
  };

  btn.addEventListener('click', () => (isOpen() ? closePopover() : open()));
  btn.addEventListener('keydown', (e) => {
    if (!isOpen()) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); }
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((active + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (items[active]) pick(items[active].dataset.value);
    } else if (e.key === 'Tab') {
      closePopover();
    }
  });

  paint();
  return {
    el: btn,
    get value() { return current; },
    set value(v) { current = String(v); paint(); },
    /** Replaces the options; keeps the value if it's still there, else picks the first. */
    set options(next) {
      options = norm(next);
      if (!options.some((o) => o.value === current)) current = options[0]?.value ?? '';
      paint();
    },
  };
}

// ─── Date picker and time field ───

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
/** `ms` moved to `days` later, at the time 'HH:MM'. */
function atTime(ms, time, days = 0) {
  const d = new Date(ms);
  const [h, m] = time.split(':').map(Number);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + days, h, m).getTime();
}
/** Whole calendar days from `a` to `b`. */
const dayDiff = (a, b) => Math.round((atTime(b, '12:00') - atTime(a, '12:00')) / 86400000);

/**
 * shadcn Date picker: an outline button that opens a Calendar in a Popover.
 * `.value` is a ms timestamp (only its day matters). `onChange(ms)` runs when another day is picked.
 */
function createDatePicker({ value = Date.now(), label = 'Date', small = false, onChange }) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = `btn btn-outline date-trigger${small ? ' btn-sm' : ''}`;
  btn.setAttribute('aria-haspopup', 'dialog');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', label);

  let current = value;
  const paint = () => {
    btn.innerHTML = `<span class="value">${new Date(current).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>${icon('chevronDown')}`;
  };

  const openCalendar = () => {
    const view = new Date(current);
    view.setDate(1);
    const cal = document.createElement('div');
    cal.className = 'calendar';
    const draw = () => {
      const y = view.getFullYear();
      const m = view.getMonth();
      const first = new Date(y, m, 1 - new Date(y, m, 1).getDay()); // Sunday on or before the 1st
      const selected = new Date(current);
      const today = new Date();
      let days = '';
      for (let i = 0; i < 42; i++) {
        const d = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i);
        const cls = `calendar-day${d.getMonth() !== m ? ' outside' : ''}${sameDay(d, today) ? ' today' : ''}`;
        days += `<button type="button" class="${cls}" data-date="${d.getFullYear()}-${d.getMonth()}-${d.getDate()}"
          aria-selected="${sameDay(d, selected)}">${d.getDate()}</button>`;
      }
      cal.innerHTML = `
        <div class="calendar-head">
          <button type="button" class="btn btn-outline btn-sm btn-icon" data-nav="-1" aria-label="Previous month">${icon('chevronLeft')}</button>
          <div class="calendar-title">${view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</div>
          <button type="button" class="btn btn-outline btn-sm btn-icon" data-nav="1" aria-label="Next month">${icon('chevronRight')}</button>
        </div>
        <div class="calendar-grid">${WEEKDAYS.map((w) => `<div class="calendar-weekday">${w}</div>`).join('')}${days}</div>`;
      placePopover();
    };
    cal.addEventListener('click', (e) => {
      const nav = e.target.closest('[data-nav]');
      if (nav) { view.setMonth(view.getMonth() + Number(nav.dataset.nav)); draw(); return; }
      const day = e.target.closest('[data-date]');
      if (!day) return;
      const [y, m, d] = day.dataset.date.split('-').map(Number);
      const picked = atTime(new Date(y, m, d).getTime(), hhmm(new Date(current)));
      closePopover();
      btn.focus();
      if (sameDay(new Date(picked), new Date(current))) return;
      current = picked;
      paint();
      onChange?.(picked);
    });
    showPopover(btn, cal);
    draw();
    cal.querySelector('[aria-selected=true]')?.focus();
  };

  btn.addEventListener('click', () => (popover?.anchor === btn ? closePopover() : openCalendar()));
  paint();
  return {
    el: btn,
    get value() { return current; },
    set value(ms) { current = ms; paint(); },
  };
}

/**
 * shadcn time Input. `.value` is 'HH:MM', or '' when empty (allowed with `optional`).
 * `onChange(value)` runs when the field is left (or Enter) with a new value, not on every keystroke.
 */
function createTimeInput({ value = '', optional = false, label = 'Time', small = false, onChange }) {
  const input = document.createElement('input');
  input.type = 'time';
  input.className = `input time-input${small ? ' input-sm' : ''}`;
  input.setAttribute('aria-label', label);
  input.value = value;

  let current = value;
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); input.blur(); } });
  input.addEventListener('blur', () => {
    if (input.value === current) return;
    if (!input.value && !optional) { input.value = current; return; }
    current = input.value;
    onChange?.(current);
  });

  return {
    el: input,
    get value() { return input.value; },
    set value(v) { current = v; input.value = v; },
  };
}
