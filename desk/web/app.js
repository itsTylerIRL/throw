// Throw — an unresponsive yo-yo trick guide and trainer. Data lives in the %throw agent on your ship.
const API = '/apps/throw/api';
const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const LEVELS = window.THROW_LEVELS, CATS = window.THROW_CATS, TRICKS = window.THROW_TRICKS;
const T = Object.fromEntries(TRICKS.map((t) => [t.id, t]));
const STATUSES = ['new', 'learning', 'landed', 'solid'];
const RANK = Object.fromEntries(STATUSES.map((s, i) => [s, i]));
const DAYMS = 86400000;
// ladder slot n → trick id (or a placeholder id for slots with no trick entry)
const LADDER = window.THROW_LADDER.map((name, i) => {
  const t = TRICKS.find((x) => x.ladder === i + 1);
  return { n: i + 1, name, id: t ? t.id : `ladder-${i + 1}` };
});
const nameOf = (id) => (T[id] ? T[id].name : (LADDER.find((l) => l.id === id) || {}).name || id);

async function api(path, opts = {}) {
  const r = await fetch(API + path, { credentials: 'include', headers: { 'content-type': 'application/json' }, ...opts });
  if (r.status === 403) { location.href = '/~/login?redirect=' + encodeURIComponent(location.pathname); throw new Error('login'); }
  if (!r.ok) throw new Error(`${r.status}`);
  return r.status === 204 ? null : r.json();
}
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

let progress = {}, sessions = [], settings = {};
const statusOf = (id) => (progress[id] ? progress[id].status : 'new');
const noteOf = (id) => (progress[id] ? progress[id].note : '');
const fmtDate = (t) => new Date(t).toLocaleDateString([], { month: 'short', day: 'numeric' });
const fmtMin = (secs) => { const m = Math.round(secs / 60); return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m}m`; };
const clock = (secs) => `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;
const dayKey = (t) => { const d = new Date(t); return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; };

// per-trick totals over every saved session
function statsFor(id) {
  let lands = 0, misses = 0, best = 0, last = 0;
  for (const s of sessions) for (const r of s.reps) if (r.trick === id) {
    lands += r.lands; misses += r.misses; best = Math.max(best, r.streak); last = Math.max(last, s.at);
  }
  return { lands, misses, best, last };
}
const unlocked = (t) => t.pre.every((p) => RANK[statusOf(p)] >= RANK.landed);

// what to learn next: tricks in progress first, then unlocked new ones, lowest level first
function upNext(n = 4) {
  const out = [];
  for (const t of TRICKS) if (statusOf(t.id) === 'learning') out.push({ t, why: 'in progress' });
  for (const t of TRICKS) {
    if (out.length >= n) break;
    if (statusOf(t.id) === 'new' && unlocked(t)) out.push({ t, why: t.pre.length ? 'unlocked by ' + t.pre.map(nameOf).join(' + ') : 'start here' });
  }
  return out.slice(0, n);
}
// landed tricks you haven't drilled in a week
function reviewDue(n = 2) {
  const now = Date.now();
  return TRICKS.filter((t) => RANK[statusOf(t.id)] >= RANK.landed)
    .map((t) => ({ t, last: statsFor(t.id).last }))
    .filter((x) => now - x.last > 7 * DAYMS)
    .sort((a, b) => a.last - b.last).slice(0, n).map((x) => x.t);
}

async function setStatus(id, status, note = noteOf(id)) {
  progress[id] = { status, note, at: Date.now() };
  if (status === 'new' && !note) delete progress[id];
  try { await api('/trick/' + id, { method: 'POST', body: JSON.stringify({ status, note }) }); } catch { alert('Could not save — is your ship running?'); }
}
async function saveSettings() { try { await api('/settings', { method: 'POST', body: JSON.stringify(settings) }); } catch {} }

// ---------------------------------------------------------------- tabs

let tab = store.get('throw-tab', 'path');
function show(t) {
  tab = t; store.set('throw-tab', t);
  document.querySelectorAll('.tabs [data-tab]').forEach((b) => b.classList.toggle('on', b.dataset.tab === t));
  document.querySelectorAll('[data-pane]').forEach((p) => (p.hidden = p.dataset.pane !== t));
  render();
}
document.querySelectorAll('.tabs [data-tab]').forEach((b) => (b.onclick = () => show(b.dataset.tab)));
function render() { ({ path: renderPath, train: renderTrain, ladder: renderLadder, guide: renderGuide, log: renderLog })[tab](); }

// ---------------------------------------------------------------- path

let filter = store.get('throw-filter', 'all');
function renderPath() {
  const counts = { new: 0, learning: 0, landed: 0, solid: 0 };
  TRICKS.forEach((t) => counts[statusOf(t.id)]++);
  const pct = (k) => (100 * counts[k]) / TRICKS.length;
  const nx = upNext();
  const tip = window.THROW_TIPS[Math.floor(Date.now() / DAYMS) % window.THROW_TIPS.length];
  const rows = (lvl) => TRICKS.filter((t) => t.lvl === lvl.n)
    .filter((t) => filter === 'all' || statusOf(t.id) === filter || (filter === 'ladder' && t.ladder))
    .map((t) => {
      const st = statusOf(t.id), s = statsFor(t.id), lock = !unlocked(t) && st === 'new';
      return `<button class="trow ${lock ? 'locked' : ''}" data-trick="${t.id}">
        <span class="dot ${st}"></span>
        <span class="nm">${esc(t.name)} <small>${CATS[t.cat]}${lock ? ' · needs ' + esc(t.pre.filter((p) => RANK[statusOf(p)] < 2).map(nameOf).join(', ')) : ''}</small></span>
        ${t.ladder ? `<span class="badge lad">L${t.ladder}</span>` : ''}
        <span class="st">${s.lands + s.misses ? `${s.lands}/${s.lands + s.misses}<br>best ${s.best}` : ''}</span>
      </button>`;
    }).join('');
  $('path').innerHTML = `
    <div class="stack">
      <div class="spread"><div><div class="kicker">1A unresponsive</div><h1>Your trick path</h1></div>
        <span class="muted small">Tip: ${esc(tip)}</span></div>
      <div class="summary">
        <div class="tile"><b>${counts.solid}</b><span>solid (goal streak hit)</span></div>
        <div class="tile"><b>${counts.landed}</b><span>landed</span></div>
        <div class="tile"><b>${counts.learning}</b><span>learning</span></div>
        <div class="tile"><b>${TRICKS.length}</b><span>tricks on the path</span></div>
      </div>
      <div class="bar"><i class="s" style="width:${pct('solid')}%"></i><i class="l" style="width:${pct('landed')}%"></i><i class="g" style="width:${pct('learning')}%"></i></div>
      ${nx.length ? `<div><h2>Up next</h2><div class="next">${nx.map(({ t, why }) => `
        <div class="card" data-trick="${t.id}">
          <div class="row"><span class="dot ${statusOf(t.id)}"></span><h3>${esc(t.name)}</h3></div>
          <div class="why">${esc(why)} · level ${t.lvl} · goal ${t.goal} in a row</div>
          <div><button class="primary small" data-drill="${t.id}">Drill</button></div>
        </div>`).join('')}</div></div>` : ''}
      <div class="filters">${['all', 'learning', 'new', 'landed', 'solid', 'ladder'].map((f) =>
        `<button data-filter="${f}" class="${filter === f ? 'on' : ''}">${f === 'ladder' ? 'Sport Ladder' : f[0].toUpperCase() + f.slice(1)}</button>`).join('')}</div>
      ${LEVELS.map((l) => { const r = rows(l); return r ? `<div class="level"><h2>${l.n}. ${esc(l.name)}</h2><p class="blurb">${esc(l.blurb)}</p><div class="tlist">${r}</div></div>` : ''; }).join('')}
    </div>`;
  $('path').querySelectorAll('[data-filter]').forEach((b) => (b.onclick = () => { filter = b.dataset.filter; store.set('throw-filter', filter); renderPath(); }));
  wireTricks($('path'));
}
function wireTricks(root) {
  root.querySelectorAll('[data-drill]').forEach((b) => (b.onclick = (e) => { e.stopPropagation(); drillNow([b.dataset.drill]); }));
  root.querySelectorAll('[data-trick]').forEach((b) => (b.onclick = () => openTrick(b.dataset.trick)));
}

// ---------------------------------------------------------------- trick sheet

function openTrick(id) {
  const t = T[id]; if (!t) return;
  const st = statusOf(id), s = statsFor(id);
  const leads = TRICKS.filter((x) => x.pre.includes(id));
  const list = (cls, items) => (items && items.length ? `<ul class="${cls}">${items.map((x) => `<li>${linkify(x)}</li>`).join('')}</ul>` : '<p class="muted small">Nothing listed yet. Check the tutorial.</p>');
  const sh = $('sheet');
  sh.innerHTML = `<div class="panel stack">
    <div class="spread"><div class="kicker">Level ${t.lvl} · ${CATS[t.cat]}${t.ladder ? ' · Sport Ladder #' + t.ladder : ''}</div><button class="ghost" id="shx">✕</button></div>
    <h1>${esc(t.name)}</h1>
    <p class="what">${esc(t.what)}</p>
    <div class="seg">${STATUSES.map((x) => `<button data-st="${x}" class="${x} ${x === st ? 'on' : ''}">${x}</button>`).join('')}</div>
    <div class="row small muted">${s.lands + s.misses ? `${s.lands} landed of ${s.lands + s.misses} tries · best streak ${s.best} / goal ${t.goal} · last ${fmtDate(s.last)}` : `Not drilled yet · goal: ${t.goal} in a row`}</div>
    <div class="row"><button class="primary" id="shdrill">Drill this</button>
      <a href="${esc(t.url)}" target="_blank" rel="noopener">Video tutorial ↗</a>
      <a href="${esc('https://www.youtube.com/results?search_query=' + encodeURIComponent(t.name + ' yoyo trick tutorial'))}" target="_blank" rel="noopener">More videos ↗</a></div>
    ${t.alt ? `<div class="row small">${t.alt.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener">${esc(n)} ↗</a>`).join(' · ')}</div>` : ''}
    ${t.pre.length ? `<div><div class="kicker">Learn first</div><div class="chips">${t.pre.map((p) => `<button class="chip" data-go="${p}"><span class="dot ${statusOf(p)}"></span>${esc(nameOf(p))}</button>`).join('')}</div></div>` : ''}
    <div><h2>Steps</h2><ol>${t.steps.map((x) => `<li>${linkify(x)}</li>`).join('')}</ol></div>
    <div><h2>Tips</h2>${list('tips', t.tips)}</div>
    <div><h2>Common mistakes</h2>${list('mist', t.mistakes)}</div>
    <div><h2>Your notes</h2><textarea id="shnote" placeholder="What clicked, what keeps going wrong…">${esc(noteOf(id))}</textarea></div>
    ${leads.length ? `<div><div class="kicker">Leads to</div><div class="chips">${leads.map((p) => `<button class="chip" data-go="${p.id}"><span class="dot ${statusOf(p.id)}"></span>${esc(p.name)}</button>`).join('')}</div></div>` : ''}
  </div>`;
  sh.hidden = false;
  const close = () => { sh.hidden = true; render(); };
  $('shx').onclick = close;
  sh.onclick = (e) => { if (e.target === sh) close(); };
  sh.querySelectorAll('[data-st]').forEach((b) => (b.onclick = async () => { await setStatus(id, b.dataset.st); openTrick(id); }));
  sh.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => openTrick(b.dataset.go)));
  $('shdrill').onclick = () => { sh.hidden = true; drillNow([id]); };
  $('shnote').onchange = (e) => setStatus(id, statusOf(id) === 'new' && e.target.value ? 'new' : statusOf(id), e.target.value.slice(0, 4000));
}
const linkify = (s) => esc(s).replace(/(https:\/\/[^\s)]+)/g, (u) => `<a href="${u}" target="_blank" rel="noopener">tutorial ↗</a>`);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('sheet').hidden) { $('sheet').hidden = true; render(); } });

// ---------------------------------------------------------------- train
// draft: {start, cur, items: [{trick, lands, misses, streak, best, dry}], log: [[i, item before the tap]]}

let draft = store.get('throw-draft', null);
let cue = 0, tick = null;
const saveDraft = () => store.set('throw-draft', draft);
function drillNow(ids) {
  if (!draft) draft = { start: Date.now(), cur: 0, items: [], log: [] };
  for (const id of ids) {
    let i = draft.items.findIndex((x) => x.trick === id);
    if (i < 0) { draft.items.push({ trick: id, lands: 0, misses: 0, streak: 0, best: 0, dry: 0 }); i = draft.items.length - 1; }
    draft.cur = i;
  }
  saveDraft(); show('train');
}
function suggested() {
  const ids = upNext(3).map((x) => x.t.id);
  for (const t of reviewDue(2)) if (!ids.includes(t.id)) ids.push(t.id);
  if (!ids.includes('bind') && RANK[statusOf('bind')] < RANK.solid) ids.unshift('bind');
  return ids.slice(0, 5);
}
function renderTrain() {
  clearInterval(tick);
  if (!draft) {
    const sug = suggested();
    $('train').innerHTML = `<div class="stack">
      <div><div class="kicker">Train</div><h1>Start a session</h1></div>
      <div class="card stack">
        <p class="muted" style="margin:0">Throw a few tricks in rotation. Tap <b>Land</b> or <b>Miss</b> after each try, or use <b>Space</b>/<b>L</b> to land, <b>X</b>/<b>M</b> to miss, <b>N</b> for next and <b>U</b> to undo. Land a trick's goal streak and it's marked <b>solid</b>.</p>
        <div><div class="kicker">Suggested: next up and due for review</div>
          <div class="chips" id="sugg">${sug.map((id) => `<label class="chip badge" style="padding:5px 10px"><input type="checkbox" value="${id}" checked> ${esc(nameOf(id))}</label>`).join('')}</div></div>
        <div class="row"><select id="addtrick"><option value="">+ add a trick…</option>${LEVELS.map((l) => `<optgroup label="${l.n}. ${esc(l.name)}">${TRICKS.filter((t) => t.lvl === l.n).map((t) => `<option value="${t.id}">${esc(t.name)}</option>`).join('')}</optgroup>`).join('')}</select>
          <button class="primary" id="go">Start</button></div>
      </div>
    </div>`;
    $('addtrick').onchange = (e) => {
      if (!e.target.value) return;
      $('sugg').insertAdjacentHTML('beforeend', `<label class="chip badge" style="padding:5px 10px"><input type="checkbox" value="${e.target.value}" checked> ${esc(nameOf(e.target.value))}</label>`);
      e.target.value = '';
    };
    $('go').onclick = () => {
      const ids = [...$('sugg').querySelectorAll('input:checked')].map((x) => x.value);
      if (!ids.length) return;
      draft = { start: Date.now(), cur: 0, items: [], log: [] };
      drillNow(ids); draft.cur = 0; saveDraft(); renderTrain();
    };
    return;
  }
  const it = draft.items[draft.cur], t = T[it.trick] || { name: nameOf(it.trick), goal: 5, tips: [], pre: [] };
  const tips = [...(t.tips || []), ...(t.mistakes || []).map((m) => 'Watch for: ' + m)];
  const elapsed = () => (Date.now() - draft.start) / 1000;
  const goal = t.goal || 5;
  const nudge = it.dry >= 15
    ? `${it.dry} misses since your last land. ${t.pre.length ? 'Go back to ' + t.pre.map(nameOf).join(' or ') + ' for a few reps, or ' : ''}switch to another trick and come back. Check the Fix guide too.` : '';
  $('train').innerHTML = `<div class="stack">
    <div class="spread"><div><div class="kicker">Session</div><span class="timer" id="clock">${clock(elapsed())}</span></div>
      <div class="row"><button class="ghost" id="discard">Discard</button><button class="primary" id="finish">Finish &amp; save</button></div></div>
    <div id="breakmsg" class="card nudge small" hidden>25 minutes in. Rest your hands for a few minutes. Short sessions with breaks build muscle memory faster.</div>
    <div class="card drill" id="drillcard">
      <div class="kicker">${draft.cur + 1} of ${draft.items.length}${T[it.trick] ? ' · level ' + t.lvl : ''}</div>
      <div class="tname"><button class="ghost" style="font:inherit;color:inherit;padding:0" id="info">${esc(t.name)}</button></div>
      <div class="cue" id="cue">${tips.length ? esc(tips[cue % tips.length]) : ''}</div>
      <div class="counts">
        <div><b>${it.lands}</b><span>landed</span></div>
        <div><b>${it.misses}</b><span>missed</span></div>
        <div class="streak"><b>${it.streak}</b><span>streak</span></div>
        <div><b>${it.best}</b><span>best / ${goal}</span></div>
      </div>
      <div class="bigbtns"><button class="miss" id="miss">Miss</button><button class="land" id="land">Land</button></div>
      <div class="goalbar"><div class="bar"><i class="s" style="width:${Math.min(100, (100 * it.best) / goal)}%"></i></div>
        <div class="small muted" style="margin-top:6px">${it.best >= goal ? 'Goal streak hit. This trick will be marked solid.' : `Land ${goal} in a row to mark it solid.`}</div></div>
      <div class="row" style="justify-content:center;margin-top:14px">
        <button class="ghost" id="undo" ${draft.log.length ? '' : 'disabled'}>Undo</button>
        <button class="ghost" id="nextcue">Another tip</button>
        <button id="next">Next trick →</button></div>
    </div>
    ${nudge ? `<div class="card nudge small">${esc(nudge)}</div>` : ''}
    <div><h2>This session</h2><div class="queue">${draft.items.map((x, i) => `
      <button class="qitem ${i === draft.cur ? 'on' : ''}" data-q="${i}"><span class="dot ${statusOf(x.trick)}"></span>
      <span class="nm">${esc(nameOf(x.trick))}</span><span class="small muted">${x.lands}/${x.lands + x.misses} · best ${x.best}</span></button>`).join('')}
      <select id="addq"><option value="">+ add a trick…</option>${TRICKS.map((x) => `<option value="${x.id}">${esc(x.name)}</option>`).join('')}</select></div></div>
  </div>`;
  const hit = (land) => {
    draft.log.push([draft.cur, { ...it }]);
    if (land) { it.lands++; it.streak++; it.best = Math.max(it.best, it.streak); it.dry = 0; }
    else { it.misses++; it.streak = 0; it.dry++; }
    if (draft.log.length > 500) draft.log.shift();
    if (land && it.streak === goal && navigator.vibrate) navigator.vibrate([40, 60, 40]);
    saveDraft(); renderTrain();
    if (land) $('drillcard').classList.add('flash');
  };
  $('land').onclick = () => hit(true);
  $('miss').onclick = () => hit(false);
  $('undo').onclick = undo;
  $('next').onclick = () => { draft.cur = (draft.cur + 1) % draft.items.length; cue = 0; saveDraft(); renderTrain(); };
  $('nextcue').onclick = () => { cue++; $('cue').textContent = tips.length ? tips[cue % tips.length] : ''; };
  $('info').onclick = () => T[it.trick] && openTrick(it.trick);
  $('discard').onclick = () => { if (confirm('Discard this session?')) { draft = null; saveDraft(); renderTrain(); } };
  $('finish').onclick = finishTrain;
  $('train').querySelectorAll('[data-q]').forEach((b) => (b.onclick = () => { draft.cur = +b.dataset.q; cue = 0; saveDraft(); renderTrain(); }));
  $('addq').onchange = (e) => e.target.value && drillNow([e.target.value]);
  tick = setInterval(() => {
    if (!$('clock')) return clearInterval(tick);
    const s = elapsed(); $('clock').textContent = clock(s);
    $('breakmsg').hidden = !(s > 25 * 60 && s < 30 * 60);
  }, 1000);
}
function undo() {
  const e = draft && draft.log.pop(); if (!e) return;
  draft.items[e[0]] = e[1]; draft.cur = e[0]; saveDraft(); renderTrain();
}
async function finishTrain() {
  const reps = draft.items.filter((x) => x.lands + x.misses).map((x) => ({ trick: x.trick, lands: x.lands, misses: x.misses, streak: x.best }));
  if (!reps.length) { draft = null; saveDraft(); return renderTrain(); }
  const secs = Math.round((Date.now() - draft.start) / 1000);
  try {
    const s = await api('/session', { method: 'POST', body: JSON.stringify({ kind: 'train', at: draft.start, secs, reps }) });
    sessions.unshift(s); sessions.sort((a, b) => b.at - a.at);
  } catch { return alert('Could not save — is your ship running? Your session is kept on this device.'); }
  const promos = [];
  for (const r of reps) {
    if (!T[r.trick]) continue;
    const cur = statusOf(r.trick);
    let next = cur;
    if (r.streak >= T[r.trick].goal) next = 'solid';
    else if (r.lands > 0 && RANK[cur] < RANK.landed) next = 'landed';
    else if (cur === 'new') next = 'learning';
    if (next !== cur) { await setStatus(r.trick, next); if (RANK[next] >= RANK.landed) promos.push(`${T[r.trick].name}: ${next}`); }
  }
  draft = null; saveDraft();
  renderTrain();
  const lands = reps.reduce((a, r) => a + r.lands, 0), tries = reps.reduce((a, r) => a + r.lands + r.misses, 0);
  $('train').insertAdjacentHTML('afterbegin', `<div class="card" style="margin-bottom:14px"><h2>Saved: ${fmtMin(secs)}, ${lands}/${tries} landed</h2>${promos.length ? `<p style="margin:0">${promos.map(esc).join(' · ')} 🎉</p>` : ''}</div>`);
}
document.addEventListener('keydown', (e) => {
  if (tab !== 'train' || !draft || !$('sheet').hidden || /INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) return;
  const k = e.key.toLowerCase();
  if (k === ' ' || k === 'l') { e.preventDefault(); $('land').click(); }
  else if (k === 'x' || k === 'm') $('miss').click();
  else if (k === 'n') $('next').click();
  else if (k === 'u') undo();
});

// ---------------------------------------------------------------- sport ladder

let run = store.get('throw-ladder', null);   // {start, i, res: [bool]}
function renderLadder() {
  const past = sessions.filter((s) => s.kind === 'ladder');
  const best = Math.max(0, ...past.map((s) => s.reps.reduce((a, r) => a + r.lands, 0)));
  const misses = run ? run.res.filter((x) => !x).length : 0;
  const over = run && (misses >= 2 || run.i >= LADDER.length);
  $('ladder').innerHTML = `<div class="stack">
    <div class="spread"><div><div class="kicker">yoyotricks.com 1A Sport Ladder</div><h1>Sport Ladder</h1></div>
      <div class="tile" style="min-width:120px"><b>${best}/25</b><span>best score</span></div></div>
    ${run ? `<div class="card drill">
        ${over ? `<div class="tname">${run.res.filter(Boolean).length} / 25</div><p class="cue">${misses >= 2 ? 'Two misses: run over.' : 'You cleared the whole ladder!'}</p>
          <div class="row" style="justify-content:center"><button class="ghost" id="ldis">Discard</button><button class="primary" id="lsave">Save run</button></div>`
        : `<div class="kicker">Trick ${run.i + 1} of 25 · misses ${misses}/2</div><div class="tname">${esc(LADDER[run.i].name)}</div>
          <p class="cue">One attempt. ${T[LADDER[run.i].id] ? `<a href="#" id="lhow">How does it go?</a>` : ''}</p>
          <div class="bigbtns"><button class="miss" id="lmiss">Miss</button><button class="land" id="lland">Land</button></div>
          <div class="row" style="justify-content:center;margin-top:12px"><button class="ghost" id="lquit">Quit run</button></div>`}
      </div>` : `<div class="card stack"><div class="kicker">Rules</div><ul style="margin:0;padding-left:20px">${window.THROW_LADDER_RULES.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
        <div><button class="primary" id="lstart">Start a run</button></div></div>`}
    <div class="card" style="padding:0">${LADDER.map((l, i) => {
      const r = run ? run.res[i] : undefined;
      return `<div class="ladrow ${run && !over && i === run.i ? 'cur' : ''}"><span class="n">${l.n}</span>
        <span>${T[l.id] ? `<a href="#" data-lt="${l.id}">${esc(l.name)}</a>` : esc(l.name)} ${T[l.id] ? `<span class="dot ${statusOf(l.id)}" style="display:inline-block;vertical-align:middle;margin-left:4px"></span>` : ''}</span>
        <span>${r === true ? '<span class="ok">✓</span>' : r === false ? '<span class="bad">✗</span>' : ''}</span></div>`;
    }).join('')}</div>
    ${past.length ? `<div class="card"><h2>Past runs</h2>${past.slice(0, 12).map((s) => `<div class="spread small" style="padding:4px 0"><span>${fmtDate(s.at)}</span><b>${s.reps.reduce((a, r) => a + r.lands, 0)}/25</b></div>`).join('')}</div>` : ''}
  </div>`;
  const step = (ok) => { run.res[run.i] = ok; run.i++; store.set('throw-ladder', run); renderLadder(); };
  if ($('lstart')) $('lstart').onclick = () => { run = { start: Date.now(), i: 0, res: [] }; store.set('throw-ladder', run); renderLadder(); };
  if ($('lland')) { $('lland').onclick = () => step(true); $('lmiss').onclick = () => step(false); }
  if ($('lquit')) $('lquit').onclick = () => { run.i = LADDER.length; store.set('throw-ladder', run); renderLadder(); };
  if ($('lhow')) $('lhow').onclick = (e) => { e.preventDefault(); openTrick(LADDER[run.i].id); };
  if ($('ldis')) $('ldis').onclick = () => { run = null; store.set('throw-ladder', null); renderLadder(); };
  if ($('lsave')) $('lsave').onclick = async () => {
    const reps = run.res.map((ok, i) => ({ trick: LADDER[i].id, lands: ok ? 1 : 0, misses: ok ? 0 : 1, streak: ok ? 1 : 0 }));
    if (!reps.length) { run = null; store.set('throw-ladder', null); return renderLadder(); }
    try {
      const s = await api('/session', { method: 'POST', body: JSON.stringify({ kind: 'ladder', at: run.start, secs: Math.round((Date.now() - run.start) / 1000), reps }) });
      sessions.unshift(s); sessions.sort((a, b) => b.at - a.at);
    } catch { return alert('Could not save — is your ship running?'); }
    for (const r of reps) if (r.lands && T[r.trick] && RANK[statusOf(r.trick)] < RANK.landed) await setStatus(r.trick, 'landed');
    run = null; store.set('throw-ladder', null); renderLadder();
  };
  $('ladder').querySelectorAll('[data-lt]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); openTrick(a.dataset.lt); }));
}

// ---------------------------------------------------------------- guide

let article = store.get('throw-article', 'fixes');
function renderBlock([kind, v]) {
  if (kind === 'p') return `<p>${esc(v)}</p>`;
  if (kind === 'h') return `<h3>${esc(v)}</h3>`;
  if (kind === 'ol' || kind === 'ul') return `<${kind}>${v.map((x) => `<li>${esc(x)}</li>`).join('')}</${kind}>`;
  if (kind === 'dl') return `<dl>${v.map(([a, b]) => `<dt>${esc(a)}</dt><dd>${esc(b)}</dd>`).join('')}</dl>`;
  return '';
}
function renderGuide() {
  const G = window.THROW_GUIDES, g = G.find((x) => x.id === article);
  $('guide').innerHTML = `<div class="stack">
    <div><div class="kicker">Guide</div><h1>${g ? esc(g.title) : 'Fix it: troubleshooting'}</h1></div>
    <div class="guide-nav filters"><button data-a="fixes" class="${article === 'fixes' ? 'on' : ''}">Fix it</button>${G.map((x) => `<button data-a="${x.id}" class="${x.id === article ? 'on' : ''}">${esc(x.title.split(':')[0])}</button>`).join('')}</div>
    ${g ? `<div class="card article">${g.body.map(renderBlock).join('')}</div>`
      : `<div class="stack">${window.THROW_FIXES.map((f) => `<details class="fix"><summary>${esc(f.q)}</summary><ul>${f.a.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></details>`).join('')}</div>`}
    <p class="small muted">Sources: <a href="https://yoyotricks.com/yoyo-tricks/" target="_blank" rel="noopener">yoyotricks.com</a>,
      <a href="https://yoyoexpert.com/pages/learn-yoyo-tricks" target="_blank" rel="noopener">YoYoExpert</a> and its forums,
      <a href="https://skilladdicts.com/best-yoyo-tricks/" target="_blank" rel="noopener">Skill Addicts</a>.</p>
  </div>`;
  $('guide').querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => { article = b.dataset.a; store.set('throw-article', article); renderGuide(); }));
}

// ---------------------------------------------------------------- log

function renderLog() {
  const total = sessions.reduce((a, s) => a + s.secs, 0);
  const lands = sessions.reduce((a, s) => a + s.reps.reduce((b, r) => b + r.lands, 0), 0);
  const tries = sessions.reduce((a, s) => a + s.reps.reduce((b, r) => b + r.lands + r.misses, 0), 0);
  // day streak: consecutive days with a session, counting back from today (or yesterday)
  const days = new Set(sessions.map((s) => dayKey(s.at)));
  let streak = 0, d = Date.now();
  if (!days.has(dayKey(d))) d -= DAYMS;
  while (days.has(dayKey(d))) { streak++; d -= DAYMS; }
  // string: minutes played since the last change
  const since = settings.stringAt || 0;
  const strSecs = sessions.filter((s) => s.at >= since).reduce((a, s) => a + s.secs, 0);
  const strMin = Math.round(strSecs / 60);
  const strCls = strMin > 120 ? 'bad' : strMin > 60 ? 'warn' : '';
  // heatmap: last 20 weeks of minutes per day
  const mins = {};
  for (const s of sessions) mins[dayKey(s.at)] = (mins[dayKey(s.at)] || 0) + s.secs / 60;
  const today = new Date(); today.setHours(12, 0, 0, 0);
  const startHeat = today.getTime() - (139 + today.getDay()) * DAYMS;
  let cells = '';
  for (let t = startHeat; t <= today.getTime(); t += DAYMS) {
    const m = mins[dayKey(t)] || 0;
    cells += `<i class="${m === 0 ? '' : m < 10 ? 'h1' : m < 20 ? 'h2' : m < 40 ? 'h3' : 'h4'}" title="${fmtDate(t)}: ${Math.round(m)} min"></i>`;
  }
  const most = TRICKS.map((t) => ({ t, s: statsFor(t.id) })).filter((x) => x.s.lands + x.s.misses).sort((a, b) => (b.s.lands + b.s.misses) - (a.s.lands + a.s.misses)).slice(0, 8);
  $('log').innerHTML = `<div class="stack">
    <div><div class="kicker">Log</div><h1>Practice</h1></div>
    <div class="summary">
      <div class="tile"><b>${fmtMin(total)}</b><span>total practice</span></div>
      <div class="tile"><b>${sessions.length}</b><span>sessions</span></div>
      <div class="tile"><b>${tries ? Math.round((100 * lands) / tries) : 0}%</b><span>${lands} of ${tries} tries landed</span></div>
      <div class="tile"><b>${streak}</b><span>day streak</span></div>
    </div>
    <div class="card stack">
      <div class="spread"><h2 style="margin:0">String</h2><button id="newstring">I put on a new string</button></div>
      <div class="stringbar"><i class="${strCls}" style="width:${Math.min(100, (100 * strMin) / 120)}%"></i></div>
      <div class="small muted">${strMin} min played on this string${since ? ` (changed ${fmtDate(since)})` : ''}. Change it every 30–120 minutes of play, sooner if it's fuzzy or binds feel off.</div>
    </div>
    <div class="card"><h2>Last 20 weeks</h2><div class="heat">${cells}</div></div>
    ${most.length ? `<div class="card"><h2>Most drilled</h2>${most.map(({ t, s }) => `<div class="spread small" style="padding:4px 0"><a href="#" data-lt="${t.id}">${esc(t.name)}</a><span class="muted">${s.lands}/${s.lands + s.misses} · best ${s.best}</span></div>`).join('')}</div>` : ''}
    <div class="card"><h2>Sessions</h2>${sessions.length ? sessions.slice(0, 40).map((s) => `
      <div class="sess"><div class="body"><b>${fmtDate(s.at)}</b> <span class="badge">${s.kind}</span> <span class="muted small">${fmtMin(s.secs)}</span>
        <div class="small muted">${s.kind === 'ladder' ? `score ${s.reps.reduce((a, r) => a + r.lands, 0)}/25` : s.reps.map((r) => `${esc(nameOf(r.trick))} ${r.lands}/${r.lands + r.misses}`).join(' · ')}</div></div>
        <button class="ghost small" data-del="${s.id}">delete</button></div>`).join('') : '<p class="muted">No sessions yet. Start one in Train.</p>'}</div>
  </div>`;
  $('newstring').onclick = async () => { settings.stringAt = Date.now(); await saveSettings(); renderLog(); };
  $('log').querySelectorAll('[data-lt]').forEach((a) => (a.onclick = (e) => { e.preventDefault(); openTrick(a.dataset.lt); }));
  $('log').querySelectorAll('[data-del]').forEach((b) => (b.onclick = async () => {
    if (!confirm('Delete this session? Trick statuses stay as they are.')) return;
    try { await api('/session/' + b.dataset.del, { method: 'DELETE' }); } catch { return alert('Could not delete.'); }
    sessions = sessions.filter((s) => String(s.id) !== b.dataset.del); renderLog();
  }));
}

// ---------------------------------------------------------------- boot

(async () => {
  try {
    const st = await api('/state');
    progress = st.progress || {}; sessions = st.sessions || []; settings = st.settings || {};
  } catch (e) { if (e.message !== 'login') $('path').innerHTML = '<p class="muted">Could not reach your ship.</p>'; }
  show(tab);
})();
