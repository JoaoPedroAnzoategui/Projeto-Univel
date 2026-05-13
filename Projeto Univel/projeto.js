/* ============================================
   HELOISA TACCA DESIGNER — AGENDA FÁCIL
   projeto.js — Versão 2.0
   ============================================ */

/* ══════════════════════════════════════
   LOGO — troque pelo nome da sua imagem
   ══════════════════════════════════════ */
const LOGO = "Helo.png";

/* ══════════════════════════════════════
   DADOS — edite aqui!
   ══════════════════════════════════════ */

/* SERVIÇOS */
const procs = [
  { n: "Limpeza de pele",        e: "🧖", d: "Procedimento facial",             p: "R$ 170,00", t: "60 min"  },
  { n: "Brow Lamination",        e: "✨",  d: "Sobrancelhas alinhadas",          p: "R$ 130,00", t: "50 min"  },
  { n: "Lash Lifting",           e: "👁️", d: "Curvatura natural dos cílios",    p: "R$ 130,00", t: "60 min"  },
  { n: "Design + Henna",         e: "🌿", d: "Design de sobrancelhas c/ henna", p: "R$ 55,00",  t: "40 min"  },
  { n: "Design de sobrancelhas", e: "✏️", d: "Somente design",                  p: "R$ 40,00",  t: "30 min"  },
  { n: "Depilação do buço",      e: "🍃", d: "Depilação facial",                p: "R$ 5,00",   t: "15 min"  },
  { n: "Dermaplaning",           e: "💎", d: "Esfoliação facial",               p: "R$ 130,00", t: "50 min"  },
  { n: "Extensão de cílios",     e: "👁",  d: "Primeira aplicação",              p: "R$ 180,00", t: "120 min" },
];

/* DIAS DISPONÍVEIS */
const dias = [
  { d: "Seg", n: "12" },
  { d: "Ter", n: "13" },
  { d: "Qua", n: "14" },
  { d: "Qui", n: "15" },
  { d: "Sex", n: "16" },
];

/* HORÁRIOS */
const horas = ["08:00","09:00","10:00","11:00","13:00","14:00","15:00","16:00","17:00"];

/* HORÁRIOS OCUPADOS */
const busy = ["10:00","14:00","16:00"];

/* HISTÓRICO DA CLIENTE */
const hist = [
  { p: "Lash Lifting",       v: "R$ 130,00", d: "28/04" },
  { p: "Design + Henna",     v: "R$ 55,00",  d: "10/04" },
  { p: "Extensão de cílios", v: "R$ 180,00", d: "18/03" },
];

/* AGENDAMENTOS DO DIA */
const apmts = [
  { h: "08:00", c: "Ana Lima",      p: "Lash Lifting",       ok: true  },
  { h: "09:00", c: "Beatriz Costa", p: "Brow Lamination",    ok: true  },
  { h: "11:00", c: "Carla Mendes",  p: "Extensão de cílios", ok: false },
  { h: "13:00", c: "Débora Souza",  p: "Limpeza de pele",    ok: true  },
];

/* LISTA DE CLIENTES */
const clientes = [
  { n: "Ana Lima",      t: "(49) 99999-9999", u: "28/04", total: 3  },
  { n: "Beatriz Costa", t: "(49) 98888-8888", u: "13/05", total: 7  },
  { n: "Carla Mendes",  t: "(49) 97777-7777", u: "11/05", total: 2  },
  { n: "Débora Souza",  t: "(49) 96666-6666", u: "08/05", total: 5  },
  { n: "Eduarda Reis",  t: "(49) 95555-5555", u: "02/05", total: 1  },
  { n: "Fernanda Lima", t: "(49) 94444-4444", u: "29/04", total: 4  },
];

/* RANKING DE SERVIÇOS */
const ranking = [
  { n: "Extensão de cílios",  qtd: 12, cor: "var(--gold)"  },
  { n: "Lash Lifting",        qtd: 8,  cor: "var(--gold2)" },
  { n: "Brow Lamination",     qtd: 6,  cor: "var(--gold4)" },
  { n: "Limpeza de pele",     qtd: 5,  cor: "var(--gold4)" },
  { n: "Design + Henna",      qtd: 3,  cor: "var(--gold4)" },
];

/* NOTIFICAÇÕES */
const notifs = [
  { ico: "ti-calendar-check", msg: "Lash Lifting confirmado para amanhã às 14:00", tempo: "Agora" },
  { ico: "ti-bell",           msg: "Lembrete: Brow Lamination amanhã às 09:00",    tempo: "1h atrás" },
  { ico: "ti-star",           msg: "Obrigada pelo atendimento! Como foi?",          tempo: "3 dias" },
];

/* ══════════════════════════════════════
   ESTADO DO APP
   ══════════════════════════════════════ */
let selProc = null;
let selDia  = null;
let selHora = null;

/* ══════════════════════════════════════
   INICIALIZAÇÃO
   ══════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  setLogos();
  buildProcs();
  buildPrecos();
  buildDias();
  buildHoras();
  buildHist();
  buildEst();
  buildClientes();
  buildRanking();
  buildNotifs();
});

/* ══════════════════════════════════════
   LOGO
   ══════════════════════════════════════ */
function setLogos() {
  const ids = [
    'logo-splash','logo-topbar','logo-hero',
    'logo-conf','logo-cad','logo-perfil','logo-dash'
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = LOGO;
  });
}

/* ══════════════════════════════════════
   NAVEGAÇÃO CLIENTE
   ══════════════════════════════════════ */
function go(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function setNav(btn, id) {
  go(id);
  const nav = btn.closest('.bottom-nav');
  if (nav) nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}

/* NAVEGAÇÃO ESTETICISTA */
function setNavEst(btn, id) {
  go(id);
  const nav = btn.closest('.bottom-nav');
  if (nav) nav.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
}

/* ══════════════════════════════════════
   AGENDAMENTO
   ══════════════════════════════════════ */
function checkOk() {
  const btn = document.getElementById('btn-confirm');
  const ok  = selDia && selHora;
  btn.disabled = !ok;
  ok ? btn.removeAttribute('aria-disabled') : btn.setAttribute('aria-disabled', 'true');
}

function confirmar() {
  document.getElementById('c-proc').textContent = selProc ? selProc.n : '—';
  document.getElementById('c-data').textContent = selDia  ? `${selDia.d}, ${selDia.n}/05` : '—';
  document.getElementById('c-hora').textContent = selHora || '—';
  go('s-conf');
}

/* ══════════════════════════════════════
   CONSTRUTORES
   ══════════════════════════════════════ */

/* Agendar — com seleção */
function buildProcs() {
  const el = document.getElementById('proc-list');
  if (!el) return;
  el.innerHTML = '';
  procs.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'proc-card';
    card.id = 'pc' + i;
    card.innerHTML = `
      <div class="proc-icon">${p.e}</div>
      <div class="proc-body"><h3>${p.n}</h3><p>${p.d}</p></div>
      <div style="text-align:right">
        <div class="proc-price">${p.p}</div>
        <div class="proc-dur">${p.t}</div>
      </div>`;
    card.onclick = () => {
      document.querySelectorAll('.proc-card').forEach(x => x.classList.remove('sel'));
      card.classList.add('sel');
      selProc = p;
      const btn = document.getElementById('btn-next');
      btn.disabled = false;
      btn.removeAttribute('aria-disabled');
      document.getElementById('proc-chip').textContent  = p.n;
      document.getElementById('price-chip').textContent = p.p;
    };
    el.appendChild(card);
  });
}

/* Tabela de preços — só visualização */
function buildPrecos() {
  const el = document.getElementById('precos-list');
  if (!el) return;
  el.innerHTML = '';
  procs.forEach(p => {
    const card = document.createElement('div');
    card.className = 'proc-card';
    card.style.cursor = 'default';
    card.innerHTML = `
      <div class="proc-icon">${p.e}</div>
      <div class="proc-body"><h3>${p.n}</h3><p>${p.d}</p></div>
      <div style="text-align:right">
        <div class="proc-price">${p.p}</div>
        <div class="proc-dur">${p.t}</div>
      </div>`;
    el.appendChild(card);
  });
}

/* Dias */
function buildDias() {
  const el = document.getElementById('days-row');
  if (!el) return;
  el.innerHTML = '';
  dias.forEach((d, i) => {
    const btn = document.createElement('div');
    btn.className = 'day-btn';
    btn.id = 'db' + i;
    btn.innerHTML = `
      <span class="dn">mai</span>
      <span class="dm">${d.n}</span>
      <span class="dn">${d.d}</span>`;
    btn.onclick = () => {
      document.querySelectorAll('.day-btn').forEach(x => x.classList.remove('sel'));
      btn.classList.add('sel');
      selDia = d;
      checkOk();
    };
    el.appendChild(btn);
  });
}

/* Horários */
function buildHoras() {
  const el = document.getElementById('times-grid');
  if (!el) return;
  el.innerHTML = '';
  horas.forEach((h, i) => {
    const btn = document.createElement('div');
    btn.className = 'time-btn' + (busy.includes(h) ? ' busy' : '');
    btn.id = 'tb' + i;
    btn.textContent = h;
    if (!busy.includes(h)) {
      btn.onclick = () => {
        document.querySelectorAll('.time-btn:not(.busy)').forEach(x => x.classList.remove('sel'));
        btn.classList.add('sel');
        selHora = h;
        checkOk();
      };
    }
    el.appendChild(btn);
  });
}

/* Histórico */
function buildHist() {
  const el = document.getElementById('hist-list');
  if (!el) return;
  el.innerHTML = '';
  hist.forEach(h => {
    const item = document.createElement('div');
    item.className = 'apmt-item';
    item.innerHTML = `
      <div class="time-block">
        <div class="tb-h">${h.v}</div>
        <div class="tb-d">${h.d}</div>
      </div>
      <div class="apmt-info" style="flex:1">
        <h3>${h.p}</h3>
        <p>Realizado</p>
      </div>
      <span class="status ok">Concluído</span>`;
    el.appendChild(item);
  });
}

/* Agenda da esteticista */
function buildEst() {
  const el = document.getElementById('est-list');
  if (!el) return;
  el.innerHTML = '';
  apmts.forEach(a => {
    const item = document.createElement('div');
    item.className = 'apmt-item';
    item.innerHTML = `
      <div class="time-block">
        <div class="tb-h">${a.h}</div>
        <div class="tb-d">Hoje</div>
      </div>
      <div class="apmt-info" style="flex:1">
        <h3>${a.c}</h3>
        <p>${a.p}</p>
      </div>
      <span class="status ${a.ok ? 'ok' : 'pend'}">
        ${a.ok ? 'Confirmado' : 'Pendente'}
      </span>`;
    el.appendChild(item);
  });
}

/* Lista de clientes */
function buildClientes() {
  const el = document.getElementById('clientes-list');
  if (!el) return;
  el.innerHTML = '';
  clientes.forEach(c => {
    const item = document.createElement('div');
    item.className = 'apmt-item';
    const inicial = c.n.charAt(0).toUpperCase();
    item.innerHTML = `
      <div style="width:42px;height:42px;border-radius:50%;background:var(--gold4);border:0.5px solid var(--border2);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:var(--gold);flex-shrink:0;">
        ${inicial}
      </div>
      <div class="apmt-info" style="flex:1">
        <h3>${c.n}</h3>
        <p>${c.t} · Último: ${c.u}</p>
      </div>
      <span class="status ok">${c.total} visitas</span>`;
    el.appendChild(item);
  });
}

/* Ranking de serviços */
function buildRanking() {
  const el = document.getElementById('rank-list');
  if (!el) return;
  el.innerHTML = '';
  const max = ranking[0].qtd;
  ranking.forEach((r, i) => {
    const pct = Math.round((r.qtd / max) * 100);
    const item = document.createElement('div');
    item.style.cssText = 'background:var(--dark2);border:0.5px solid var(--border);border-radius:8px;padding:12px 14px;';
    item.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-size:12px;font-weight:500;color:var(--text);">${i + 1}. ${r.n}</span>
        <span style="font-size:12px;font-weight:700;color:var(--gold);">${r.qtd}x</span>
      </div>
      <div style="background:var(--black);border-radius:3px;height:4px;overflow:hidden;">
        <div style="background:var(--gold);height:100%;width:${pct}%;border-radius:3px;transition:width 0.5s;"></div>
      </div>`;
    el.appendChild(item);
  });
}

/* Notificações */
function buildNotifs() {
  const el = document.getElementById('notif-list');
  if (!el) return;
  el.innerHTML = '';
  notifs.forEach(n => {
    const item = document.createElement('div');
    item.className = 'apmt-item';
    item.innerHTML = `
      <div style="width:36px;height:36px;border-radius:50%;background:var(--gold4);border:0.5px solid var(--border2);display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:16px;flex-shrink:0;">
        <i class="ti ${n.ico}" aria-hidden="true"></i>
      </div>
      <div class="apmt-info" style="flex:1">
        <h3 style="font-size:12px;line-height:1.4;">${n.msg}</h3>
        <p>${n.tempo}</p>
      </div>`;
    el.appendChild(item);
  });
}