// ============================================================================
//  collect.console.js — 브라우저 콘솔 붙여넣기용 재고 수집 스크립트
//
//  ⚠ casper.hyundai.com 은 Cloudflare 봇 차단이 강해 Playwright 등 외부 자동화는
//    차단됩니다. 그래서 "내가 로그인한 진짜 Chrome" 안에서 직접 돌립니다.
//
//  [사용법]  ※ 로그인 불필요 (익명으로도 재고 조회됨)
//   1) Chrome 에서 기획전 페이지 접속:
//        https://casper.hyundai.com/vehicles/car-list/promotion?exhbNo=E20260666
//   2) F12 → Console 탭 → 이 파일 내용 전체 복사해 붙여넣고 Enter
//      (또는 casper_bookmarklet.txt 북마클릿을 한 번 클릭)
//   3) 17개 시/도를 자동 순회(약 3~4분). 끝나면 casper_inventory.json 자동 다운로드
//   4) 터미널에서:  ./deploy_report.sh   (다운로드본 → 보고서 → 배포)
//      또는 ./watch_and_deploy.sh 를 켜두면 다운로드 즉시 자동 배포
// ============================================================================
(async () => {
  const EXHB = new URLSearchParams(location.search).get('exhbNo') || 'E20260666';
  const SIDOS = ['서울','인천','경기','강원','세종','충남','대전','충북','대구','경북','부산','경남','울산','전북','전남','광주','제주'];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const log = (...a) => console.log('%c[캐스퍼수집]', 'color:#3b82f6;font-weight:bold', ...a);

  if (!location.href.includes('/promotion')) { alert('기획전(promotion) 페이지에서 실행하세요.'); return; }
  // 로그인은 불필요 — 익명 상태로도 재고가 조회됩니다.

  // ── cars API 응답 누적 훅 ──────────────────────────────────────────────
  const hook = { acc: new Map(), last: null, total: null, waiters: [] };
  const OSend = XMLHttpRequest.prototype.send, OOpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (m, u) { this.__u = u; return OOpen.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function (b) {
    const x = this;
    if (x.__u && x.__u.includes('/exhibition/cars/')) x.addEventListener('load', () => {
      try {
        const d = (JSON.parse(x.responseText).data) || {};
        hook.total = d.totalCount;
        (d.discountsearchcars || []).forEach(c => hook.acc.set(c.saleCtyNo, c));
        const ws = hook.waiters; hook.waiters = []; ws.forEach(r => r(d));
      } catch (e) {}
    });
    return OSend.apply(this, arguments);
  };

  // ── Element UI 드롭다운 조작 헬퍼 ──────────────────────────────────────
  const fire = (el, t) => el.dispatchEvent(new MouseEvent(t, { bubbles: true, cancelable: true, view: window }));
  const click = el => { fire(el, 'mousedown'); fire(el, 'mouseup'); el.click(); };
  const Q = s => [...document.querySelectorAll(s)];
  const selBy = ph => Q('.el-select').find(s => { const i = s.querySelector('input'); return i && i.getAttribute('placeholder') === ph && s.getBoundingClientRect().width > 0; });
  const valOf = ph => selBy(ph)?.querySelector('input')?.value || '';
  const dropFor = sel => { const r = sel.getBoundingClientRect(); const ds = Q('.el-select-dropdown').filter(d => d.style.display !== 'none' && d.getBoundingClientRect().height > 0); return ds.sort((a, b) => Math.abs(a.getBoundingClientRect().left - r.left) - Math.abs(b.getBoundingClientRect().left - r.left))[0]; };
  const itemsOf = sel => { const d = dropFor(sel); return d ? [...d.querySelectorAll('.el-select-dropdown__item')].filter(it => it.getBoundingClientRect().height > 0) : []; };

  // 배송지역을 sido 로 변경 (시/군/구는 첫 항목). 변경 후 cars 응답을 기다림.
  async function selectRegion(sido) {
    if (!selBy('시/도')) { const ob = Q('button').find(b => b.textContent.trim() === '배송지역 변경'); if (!ob) throw new Error('배송지역 변경 버튼 없음'); click(ob); await sleep(750); }
    const s = selBy('시/도'); click(s); await sleep(550);
    const it = itemsOf(s).find(x => x.textContent.trim() === sido); if (!it) throw new Error('시/도 없음:' + sido); click(it);
    await sleep(1600);
    let picked = '';
    for (let a = 0; a < 3 && !picked; a++) { const sg = selBy('시/군/구'); click(sg); await sleep(700); const items = itemsOf(sg); if (items.length) { picked = items[0].textContent.trim(); click(items[0]); await sleep(500); } else { document.body.click(); await sleep(300); } }
    const sigun = valOf('시/군/구');
    const wait = new Promise(res => { hook.waiters.push(res); setTimeout(() => res(hook.last), 11000); });
    const ab = Q('button').filter(b => b.offsetParent !== null).find(b => b.textContent.trim() === '변경'); if (!ab) throw new Error('변경 버튼 없음'); click(ab);
    await wait;
    return sigun;
  }

  // 한 지역 수집 (페이지네이션 포함)
  async function collect(sido) {
    hook.acc = new Map(); hook.total = null; hook.last = null;
    const sigun = await selectRegion(sido);
    await sleep(700);
    for (const p of [...document.querySelectorAll('.el-pager li')].map(li => li.textContent.trim()).filter(t => /^\d+$/.test(t))) {
      if (p === '1') continue;
      const li = [...document.querySelectorAll('.el-pager li')].find(x => x.textContent.trim() === p);
      if (li) { click(li); await sleep(2000); }
    }
    const cars = [...hook.acc.values()].map(c => ({
      saleCtyNo: c.saleCtyNo, trim: c.carTrimName, ext: c.exteriorColorName, int: c.interiorColorName,
      price: Number(c.saleCtyPce || c.carPrice || 0), center: c.deliveryCenterName, prdnDt: c.prdnDt,
      colorPkg: c.colorPackageName || '',
      opt: (c.carChoiceOption || []).map(o => o.choiceOptionName + ':' + (Number(o.choiceOptionPrice) || 0)).join(';'),
    }));
    return { sido, sigun, totalCount: hook.total, cars };
  }

  // ── 전 지역 순회 ───────────────────────────────────────────────────────
  const sweep = [];
  for (let i = 0; i < SIDOS.length; i++) {
    try { const r = await collect(SIDOS[i]); sweep.push(r); log(`(${i + 1}/${SIDOS.length}) ${r.sido} ${r.sigun} → ${r.cars.length}대 (총 ${r.totalCount})`); }
    catch (e) { sweep.push({ sido: SIDOS[i], error: String(e) }); log(`(${i + 1}/${SIDOS.length}) ${SIDOS[i]} 실패: ${e.message}`); }
    await sleep(600);
  }

  // ── 중복제거 + JSON 빌드 ───────────────────────────────────────────────
  const byStock = new Map(), summary = [];
  for (const r of sweep) {
    const tag = r.sido + (r.sigun && r.sigun !== r.sido ? ' ' + r.sigun : '');
    summary.push({ sido: r.sido, sigun: r.sigun, totalCount: r.totalCount, collected: (r.cars || []).length });
    for (const c of (r.cars || [])) {
      if (byStock.has(c.saleCtyNo)) { const f = byStock.get(c.saleCtyNo).foundIn; if (!f.includes(tag)) f.push(tag); }
      else byStock.set(c.saleCtyNo, { ...c, foundIn: [tag] });
    }
  }
  const inventory = [...byStock.values()].sort((a, b) => a.price - b.price);
  const json = {
    collectedAt: new Date().toISOString(), exhbNo: EXHB, carCode: 'AX05 (2026 캐스퍼 일렉트릭)',
    scanDepth: 'sido (시/도별 대표 시/군/구 1곳; 페이지네이션 포함)',
    note: '옵션 opt="이름:가격;..." (원). saleCtyNo 기준 중복제거. totalCount=지역 전체 재고수.',
    optionFormat: 'opt 필드: "옵션명:가격;옵션명:가격" (단위 원)',
    regionSummary: summary, totalUniqueCars: inventory.length, inventory,
  };

  // ── 자동 다운로드 ──────────────────────────────────────────────────────
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'casper_inventory.json';
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 2000);
  log(`✅ 완료! 고유차량 ${inventory.length}대 → casper_inventory.json 다운로드됨`);
  log('다음: 터미널에서  ./build_report.sh  실행');
})();
