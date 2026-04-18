/*  Session Builder — app.js
    RTN Communication & Literacy
    Pure vanilla JS, zero dependencies
    © 2026 Rachel Terra Norton | MIT (code) + CC BY-NC 4.0 (content) */

// ─── Component Data ───
var COMPONENTS = [
  {id:"pa",label:"Phonemic Awareness",desc:"Blending & segmenting warm-up",icon:"\uD83D\uDD0A",min:2,cat:"sound",mode:"decoding",color:"#E8D5F5",targets:["Phoneme blending (3-4 phonemes)","Phoneme segmentation","Phoneme deletion (initial)","Phoneme deletion (final)","Phoneme substitution","Syllable segmentation","Onset-rime blending"]},
  {id:"visual",label:"Phonogram Review: Reading",desc:"Visual drill / deck work (see grapheme, say sound)",icon:"\uD83D\uDC41\uFE0F",min:3,cat:"sound",mode:"decoding",color:"#D5E8F5",targets:["Short vowels","Consonant digraphs (sh, ch, th, wh)","Blends","Long vowel teams","R-controlled vowels","VCe patterns","Diphthongs","Vowel teams review","Level 1 phonograms","Level 2 phonograms","Level 3 phonograms","Level 4 phonograms"]},
  {id:"auditory",label:"Phonogram Review: Spelling",desc:"Auditory drill (hear sound, write grapheme)",icon:"\u270D\uFE0F",min:3,cat:"sound",mode:"encoding",color:"#D5F5E8",targets:["Short vowels","Consonant digraphs","Long vowel spellings","R-controlled spellings","Spelling alternatives review"]},
  {id:"blend",label:"Blending & Word Building",desc:"Blending board, word chains, letter tiles",icon:"\uD83E\uDDF1",min:5,cat:"word",mode:"decoding",color:"#F5F0D5",targets:["CVC blending","CCVC / CVCC blending","CVCe word building","Multisyllabic word building","Word chains (swap one sound)","Syllable-by-syllable blending"]},
  {id:"wordread",label:"Word-Level Reading",desc:"Word cards, lists, sorts, flash",icon:"\uD83D\uDD24",min:5,cat:"word",mode:"decoding",color:"#F5E0D5",targets:["CVC words","CVCe words","Vowel team words","R-controlled words","Multisyllabic: VC/CV","Multisyllabic: V/CV","Multisyllabic: C-le","Mixed review","Word sorts by pattern"]},
  {id:"sentread",label:"Sentence-Level Reading",desc:"Read controlled sentences with target patterns",icon:"\uD83D\uDCDD",min:3,cat:"text",mode:"decoding",color:"#F5D5D8",targets:["Sentences with target pattern","Phrase-scoop reading","Controlled text sentences","Mixed decodable sentences"]},
  {id:"fluency",label:"Reading Fluency",desc:"Timed reads, repeated reading, prosody",icon:"\u26A1",min:5,cat:"text",mode:"decoding",color:"#E0E8F5",targets:["Word-level fluency (flash)","Phrase-level fluency","Passage: cold read + hot read","Repeated reading (timed)","Prosody practice","WCPM progress monitoring"]},
  {id:"newconcept",label:"New Concept / Skill Introduction",desc:"Explicitly teach a new pattern, rule, or concept",icon:"\uD83D\uDCA1",min:10,cat:"word",mode:"both",color:"#F5F5D5",targets:["New phonogram introduction","New syllable type","Spelling rule (doubling, e-drop, y-change)","New vowel team","New prefix/suffix","New Latin root","Syllable division pattern","Soft c / soft g"]},
  {id:"wordspell",label:"Word-Level Spelling",desc:"SOS, dictation, encoding with tiles or writing",icon:"\u270F\uFE0F",min:5,cat:"word",mode:"encoding",color:"#D5F5F0",targets:["CVC dictation","CVCe dictation","Vowel team dictation","SOS (simultaneous oral spelling)","Spelling with letter tiles","Syllable-by-syllable encoding","Spelling rule application","Arm-tap spelling"]},
  {id:"sentspell",label:"Sentence-Level Spelling",desc:"Sentence dictation with proofreading",icon:"\uD83D\uDCCB",min:5,cat:"text",mode:"encoding",color:"#E8F5D5",targets:["Sentence dictation (1-2 sentences)","Proofreading practice","Capitals & punctuation check","Dictation with target words","Paragraph dictation"]},
  {id:"irregular",label:"Irregular / Heart Words",desc:"High-frequency words with irregular spellings",icon:"\u2764\uFE0F",min:5,cat:"word",mode:"both",color:"#F5D5E8",targets:["Heart word introduction (new)","Heart word review (previously taught)","Heart word reading flash","Heart word spelling practice","Mapping regular vs. irregular parts","Dolch words (by level)","Fry First 100","Fry Second 100","UFLI heart words","Scope Level 1 learned words","Scope Level 2 learned words","Scope Level 3-4 learned words","Functional sight words (exit, danger, open...)"]},
  {id:"connected",label:"Connected Text / Decodable",desc:"Apply skills in decodable passages or books",icon:"\uD83D\uDCDA",min:10,cat:"text",mode:"decoding",color:"#D5D8F5",targets:["Decodable passage (new)","Decodable passage (reread for fluency)","Decodable book","Controlled text with target pattern","Comprehension check after reading"]},
  {id:"morphology",label:"Morphology & Word Study",desc:"Prefixes, suffixes, roots, word analysis",icon:"\uD83E\uDDE9",min:5,cat:"word",mode:"both",color:"#F0D5F5",targets:["Prefix meaning & identification","Suffix meaning & identification","Base word + suffix practice","Latin root analysis","Greek combining forms","Affix peel-off reading","Word building with morphemes","Spelling rule with suffixes"]},
  {id:"vocab",label:"Vocabulary",desc:"Word meaning, context clues, semantic mapping",icon:"\uD83D\uDDC2\uFE0F",min:5,cat:"word",mode:"both",color:"#D5F0E8",targets:["Morpheme-based word meaning","Context clue strategy","Semantic mapping","Multiple meaning words","Tier 2 vocabulary","Synonyms & antonyms"]},
  {id:"comp",label:"Comprehension",desc:"Sentence or passage-level understanding",icon:"\uD83E\uDDE0",min:5,cat:"text",mode:"decoding",color:"#F5E8D5",targets:["Visualize & verbalize","Who-what-where sentence check","Main idea identification","Retell / summarize","Inferencing","Text structure ID","Question generation"]}
];

var CUES = ["Independent","Monitoring","Verbal Cue","Visual Cue","Model","Physical Prompt"];
var MNAMES = {decoding:"Decoding",encoding:"Encoding",both:"Both"};

// ─── State ───
var S = {
  view: "plan",
  dark: false,
  name: "",
  date: new Date().toISOString().split("T")[0],
  num: "",
  sel: [],
  data: {},
  showSug: null,
  expanded: null,
  copyFb: false
};

// ─── Helpers ───
function findComp(id) {
  for (var i = 0; i < COMPONENTS.length; i++) {
    if (COMPONENTS[i].id === id) return COMPONENTS[i];
  }
  return null;
}

function ensureData() {
  S.sel.forEach(function(id) {
    if (!S.data[id]) {
      var c = findComp(id);
      S.data[id] = {target:"",materials:"",minutes:c?c.min:5,mode:c?c.mode:"both",correct:0,incorrect:0,cue:"",notes:""};
    }
  });
}

function totalMin() {
  var t = 0;
  S.sel.forEach(function(id) { t += (S.data[id] && S.data[id].minutes) || 0; });
  return t;
}

function pctCls(p) { return p >= 80 ? "pb-h" : p >= 50 ? "pb-m" : "pb-l"; }
function pctCol(p) { return p >= 80 ? "var(--gn)" : p >= 50 ? "#C4A020" : "var(--rd)"; }
function esc(s) { var d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

// ─── Actions (global so onclick can call them) ───
function go(v) {
  S.view = v;
  if (v === "collect" && !S.expanded) S.expanded = S.sel[0] || null;
  render();
  window.scrollTo(0, 0);
}

function toggleDark() {
  S.dark = !S.dark;
  document.body.classList.toggle("dark", S.dark);
  render();
}

function togSel(id) {
  var i = S.sel.indexOf(id);
  if (i >= 0) S.sel.splice(i, 1);
  else S.sel.push(id);
  ensureData();
  render();
}

function moveComp(id, dir) {
  var i = S.sel.indexOf(id);
  var n = i + dir;
  if (i < 0 || n < 0 || n >= S.sel.length) return;
  var tmp = S.sel[i];
  S.sel[i] = S.sel[n];
  S.sel[n] = tmp;
  render();
}

function upd(id, f, v) {
  if (!S.data[id]) ensureData();
  S.data[id][f] = v;
  // No re-render for typing — only for tapper/selects
}

function updR(id, f, v) {
  upd(id, f, v);
  render();
}

function togSug(id) {
  S.showSug = S.showSug === id ? null : id;
  render();
}

function pickTarget(id, t) {
  upd(id, "target", t);
  S.showSug = null;
  render();
}

function togExp(id) {
  S.expanded = S.expanded === id ? null : id;
  render();
}

function tap(id, correct) {
  if (!S.data[id]) ensureData();
  if (correct) S.data[id].correct = (S.data[id].correct || 0) + 1;
  else S.data[id].incorrect = (S.data[id].incorrect || 0) + 1;
  render();
}

function resetData(id) {
  if (S.data[id]) {
    S.data[id].correct = 0;
    S.data[id].incorrect = 0;
  }
  render();
}

function doCopy() {
  var lines = ["SESSION PLAN \u2014 STRUCTURED LITERACY"];
  lines.push((S.name ? "Student: " + S.name + " | " : "") + "Date: " + S.date + (S.num ? " | #" + S.num : "") + " | ~" + totalMin() + " min");
  lines.push("");
  S.sel.forEach(function(id, i) {
    var c = findComp(id);
    if (!c) return;
    var d = S.data[id] || {};
    var total = (d.correct || 0) + (d.incorrect || 0);
    var pct = total > 0 ? Math.round((d.correct / total) * 100) + "%" : "\u2014";
    lines.push((i + 1) + ". " + c.label + " [" + (MNAMES[d.mode] || "Both") + "] ~" + d.minutes + " min");
    if (d.target) lines.push("   Target: " + d.target);
    if (d.materials) lines.push("   Materials: " + d.materials);
    lines.push("   Data: " + (d.correct || 0) + "/" + total + " (" + pct + ") | Cue: " + (d.cue || "\u2014"));
    if (d.notes) lines.push("   Notes: " + d.notes);
    lines.push("");
  });
  lines.push("\u00A9 2026 RTN Communication & Literacy | CC BY-NC 4.0");
  navigator.clipboard.writeText(lines.join("\n"));
  S.copyFb = true;
  render();
  setTimeout(function() { S.copyFb = false; render(); }, 2000);
}

function doPrint() {
  var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Session Plan</title>';
  h += '<link rel="preconnect" href="https://fonts.googleapis.com">';
  h += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  h += '<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">';
  h += '<style>';
  h += '*{margin:0;padding:0;box-sizing:border-box}';
  h += 'body{font-family:"DM Sans",Helvetica,Arial,sans-serif;font-size:11px;color:#28283A;padding:22px 24px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}';
  h += '.title{font-family:"Fraunces",Georgia,serif;font-size:23px;font-weight:700;letter-spacing:-.01em;color:#28283A;line-height:1.1}';
  h += '.sub{font-family:"Fraunces",Georgia,serif;font-style:italic;font-size:12px;color:#7A7A8E;margin-top:2px}';
  h += '.meta{font-size:10.5px;margin:12px 0 14px;padding:9px 14px;background:linear-gradient(135deg,#F3ECFC,#ECF5F2);border-radius:10px;display:flex;flex-wrap:wrap;gap:4px 18px}';
  h += '.meta strong{color:#28283A;font-weight:600;margin-right:3px}.meta span{color:#555}';
  h += '.cmp{border:1px solid #E8E4DF;border-radius:10px;margin-bottom:8px;page-break-inside:avoid;overflow:hidden;position:relative;padding-left:6px}';
  h += '.cmp::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px}';
  h += '.cmp.s::before{background:#8B6FBF}';
  h += '.cmp.w::before{background:#C28460}';
  h += '.cmp.t::before{background:#4E7FB8}';
  h += '.ch{padding:7px 12px;display:flex;justify-content:space-between;align-items:center;gap:8px}';
  h += '.ch h3{font-family:"Fraunces",Georgia,serif;font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:6px;color:#28283A}';
  h += '.ch .n{font-family:"Fraunces",Georgia,serif;font-weight:700;font-size:10.5px;background:#fff;border:1px solid rgba(0,0,0,.1);width:20px;height:20px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center}';
  h += '.bdg{display:inline-block;padding:2px 8px;border-radius:10px;font-size:8.5px;font-weight:600;background:rgba(255,255,255,.8);color:#28283A;margin-left:3px;letter-spacing:.2px}';
  h += '.bdg-h{background:#C8EDCF;color:#1A5A2A}.bdg-m{background:#F5EECC;color:#5A4A1A}.bdg-l{background:#F5D0D0;color:#5A1A1A}';
  h += '.cb{padding:9px 12px 10px;background:#fff}';
  h += '.tgt{font-weight:600;font-size:11px;color:#28283A;margin-bottom:2px}';
  h += '.tgt .k{color:#7A7A8E;font-weight:600;font-size:8.5px;text-transform:uppercase;letter-spacing:.4px;margin-right:6px}';
  h += '.info{font-size:9.5px;color:#444;margin-top:3px}';
  h += '.info .k{color:#7A7A8E;font-weight:600;text-transform:uppercase;letter-spacing:.4px;margin-right:5px;font-size:8.5px}';
  h += '.info em{font-style:italic;color:#28283A}';
  h += '.gr{display:flex;flex-wrap:wrap;gap:2px;margin-top:6px}.gc{width:15px;height:15px;border:1px solid #C4BFB8;border-radius:3px;background:#FAFAF8}';
  h += '.nl{border-bottom:1px solid #DDD;height:15px;margin-top:3px}';
  h += '.ft{margin-top:14px;font-size:8.5px;color:#A0A0B0;text-align:center;border-top:1px solid #E8E4DF;padding-top:7px;font-family:"Fraunces",Georgia,serif;font-style:italic}';
  h += '@media print{body{padding:14px 16px}}';
  h += '</style></head><body>';
  h += '<div class="title">Structured Literacy Session Plan</div>';
  h += '<div class="sub">Session Builder &middot; RTN Communication &amp; Literacy</div>';
  h += '<div class="meta">';
  if (S.name) h += '<span><strong>Student:</strong>' + esc(S.name) + '</span>';
  h += '<span><strong>Date:</strong>' + S.date + '</span>';
  if (S.num) h += '<span><strong>Session #</strong>' + esc(S.num) + '</span>';
  h += '<span><strong>' + S.sel.length + '</strong> components</span>';
  h += '<span><strong>~' + totalMin() + '</strong> min</span>';
  h += '</div>';
  S.sel.forEach(function(id, i) {
    var c = findComp(id);
    if (!c) return;
    var d = S.data[id] || {};
    var total = (d.correct || 0) + (d.incorrect || 0);
    var pct = total > 0 ? Math.round((d.correct / total) * 100) : null;
    h += '<div class="cmp ' + c.cat.charAt(0) + '">';
    h += '<div class="ch" style="background:' + c.color + '">';
    h += '<h3><span class="n">' + (i + 1) + '</span>' + c.icon + ' ' + esc(c.label) + '</h3>';
    h += '<div><span class="bdg">' + (MNAMES[d.mode] || "Both") + '</span><span class="bdg">~' + d.minutes + ' min</span>';
    if (pct !== null) h += '<span class="bdg ' + (pct >= 80 ? 'bdg-h' : pct >= 50 ? 'bdg-m' : 'bdg-l') + '">' + pct + '% (' + d.correct + '/' + total + ')</span>';
    h += '</div></div><div class="cb">';
    h += d.target
      ? '<div class="tgt"><span class="k">Target</span>' + esc(d.target) + '</div>'
      : '<div class="tgt"><span class="k">Target</span>___________________________________</div>';
    if (d.materials) h += '<div class="info"><span class="k">Materials</span>' + esc(d.materials) + '</div>';
    if (d.cue) h += '<div class="info"><span class="k">Cue</span>' + esc(d.cue) + '</div>';
    if (d.notes) h += '<div class="info"><span class="k">Notes</span><em>' + esc(d.notes) + '</em></div>';
    if (total === 0) {
      h += '<div class="gr">';
      for (var g = 0; g < 20; g++) h += '<div class="gc"></div>';
      h += '</div><div class="nl"></div><div class="nl"></div>';
    }
    h += '</div></div>';
  });
  h += '<div class="ft">&copy; 2026 RTN Communication &amp; Literacy &middot; CC BY-NC 4.0</div></body></html>';
  var w = window.open(URL.createObjectURL(new Blob([h], {type: "text/html"})), "_blank");
  if (w) setTimeout(function() { w.print(); }, 500);
}


// ─── RENDER ───
function render() {
  ensureData();
  var el = document.getElementById("app");
  var h = '';

  // ── Header ──
  h += '<header class="header no-print">';
  h += '<div style="display:flex;align-items:center;gap:10px"><div class="logo-mark">SB</div><div><div class="logo-text">Session Builder</div><div class="logo-sub">RTN Communication &amp; Literacy</div></div></div>';
  h += '<div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">';
  h += '<button class="btn-tab' + (S.view === "plan" ? " on" : "") + '" onclick="go(\'plan\')">📝 Plan</button>';
  h += '<button class="btn-tab' + (S.view === "collect" ? " on" : "") + '" onclick="go(\'collect\')">📊 Collect</button>';
  h += '<button class="btn-tab' + (S.view === "summary" ? " on" : "") + '" onclick="go(\'summary\')">📄 Summary</button>';
  h += '<div style="width:1px;height:18px;background:var(--bd);margin:0 2px"></div>';
  h += '<button class="btn btn-s btn-sm" onclick="toggleDark()" aria-label="Toggle dark mode">' + (S.dark ? "☀️" : "🌙") + '</button>';
  h += '</div></header>';

  h += '<main class="main">';

  // ═══ PLAN ═══
  if (S.view === "plan") {
    h += '<section class="card" style="padding:18px;margin-bottom:14px"><h2>Session Info</h2>';
    h += '<div class="g3" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;margin-top:12px">';
    h += '<div><label class="lbl">STUDENT NAME / INITIALS</label><input class="inp" value="' + esc(S.name) + '" oninput="S.name=this.value" placeholder="Optional"></div>';
    h += '<div><label class="lbl">DATE</label><input type="date" class="inp" value="' + S.date + '" oninput="S.date=this.value"></div>';
    h += '<div><label class="lbl">SESSION #</label><input class="inp" value="' + esc(S.num) + '" oninput="S.num=this.value" placeholder="e.g. 12"></div>';
    h += '</div></section>';
    h += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px"><h2>Session Components</h2><span style="font-size:12px;color:var(--mu);font-weight:600">' + S.sel.length + ' selected · ~' + totalMin() + ' min</span></div>';
    h += '<p style="font-size:12px;color:var(--mu);margin:0 0 12px">Check components to include. Set targets and reorder. Tap a suggested target or type your own.</p>';
    h += '<div style="display:flex;flex-direction:column;gap:8px">';

    COMPONENTS.forEach(function(comp) {
      var isSel = S.sel.indexOf(comp.id) >= 0;
      var oi = S.sel.indexOf(comp.id);
      var d = S.data[comp.id] || {};
      h += '<div class="card' + (isSel ? " sel" : " dim") + '">';
      h += '<div style="padding:12px 14px;display:flex;align-items:flex-start;gap:10px">';
      h += '<input type="checkbox" ' + (isSel ? "checked" : "") + ' onchange="togSel(\'' + comp.id + '\')" style="width:19px;height:19px;accent-color:var(--ac);margin-top:2px;cursor:pointer" aria-label="Include ' + esc(comp.label) + '">';
      h += '<div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">';
      if (isSel) h += '<span class="num">' + (oi + 1) + '</span>';
      h += '<span style="font-size:17px">' + comp.icon + '</span>';
      h += '<span class="fh" style="font-weight:600;font-size:14px">' + comp.label + '</span>';
      h += '<span style="font-size:9px;padding:2px 7px;border-radius:7px;font-weight:600;background:' + comp.color + ';color:#4a4a5a">' + comp.cat + '</span>';
      h += '</div><div style="font-size:11px;color:var(--mu);margin-top:1px">' + comp.desc + '</div></div>';
      if (isSel) {
        h += '<div style="display:flex;flex-direction:column;gap:1px;flex-shrink:0">';
        h += '<button class="btn-i" onclick="moveComp(\'' + comp.id + '\',-1)"' + (oi === 0 ? ' style="opacity:.25"' : '') + '>&#9650;</button>';
        h += '<button class="btn-i" onclick="moveComp(\'' + comp.id + '\',1)"' + (oi === S.sel.length - 1 ? ' style="opacity:.25"' : '') + '>&#9660;</button></div>';
      }
      h += '</div>';
      if (isSel) {
        h += '<div style="padding:0 14px 12px;border-top:1px solid var(--bd);padding-top:10px">';
        h += '<div class="gt" style="display:grid;grid-template-columns:1fr auto auto;gap:8px;margin-bottom:6px">';
        h += '<div><label class="lbl">TARGET / CONCEPT</label><input class="inp" value="' + esc(d.target || "") + '" oninput="upd(\'' + comp.id + '\',\'target\',this.value)" placeholder="What are you targeting?"></div>';
        h += '<div><label class="lbl">MODE</label><select class="sl" style="width:105px" onchange="updR(\'' + comp.id + '\',\'mode\',this.value)"><option value="decoding"' + (d.mode === "decoding" ? " selected" : "") + '>Decoding</option><option value="encoding"' + (d.mode === "encoding" ? " selected" : "") + '>Encoding</option><option value="both"' + (d.mode === "both" ? " selected" : "") + '>Both</option></select></div>';
        h += '<div><label class="lbl">MIN</label><input type="number" class="inp" style="width:55px;text-align:center" min="1" max="30" value="' + (d.minutes || comp.min) + '" onchange="updR(\'' + comp.id + '\',\'minutes\',+this.value)"></div>';
        h += '</div>';
        h += '<button style="background:none;border:none;font-size:11px;color:var(--ac);cursor:pointer;font-weight:600;padding:0;font-family:var(--ff)" onclick="togSug(\'' + comp.id + '\')">' + (S.showSug === comp.id ? '&#9662; Hide suggestions' : '&#9656; Suggested targets') + '</button>';
        if (S.showSug === comp.id) {
          h += '<div style="margin-top:5px;display:flex;flex-wrap:wrap">';
          comp.targets.forEach(function(t) {
            h += '<button class="chip" onclick="pickTarget(\'' + comp.id + '\',\'' + esc(t).replace(/'/g, "\\'") + '\')">' + esc(t) + '</button>';
          });
          h += '</div>';
        }
        h += '<div style="margin-top:6px"><label class="lbl">MATERIALS (optional)</label><input class="inp" value="' + esc(d.materials || "") + '" oninput="upd(\'' + comp.id + '\',\'materials\',this.value)" placeholder="e.g., phonogram cards, whiteboard, letter tiles..."></div>';
        h += '</div>';
      }
      h += '</div>';
    });

    h += '</div>';
    h += '<div style="display:flex;gap:8px;margin-top:18px;justify-content:center">';
    h += '<button class="btn btn-s" style="font-size:13px" onclick="doPrint()">🖨️ Print Blank</button>';
    h += '<button class="btn btn-p" style="font-size:15px;padding:13px 30px" onclick="go(\'collect\')">Start Session →</button></div>';
  }

  // ═══ COLLECT ═══
  if (S.view === "collect") {
    h += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px"><h2>Live Session' + (S.name ? ' <span style="font-weight:400;font-size:15px"> — ' + esc(S.name) + '</span>' : '') + '</h2><span style="font-size:11px;color:var(--mu)">' + S.date + '</span></div>';
    h += '<p style="font-size:11px;color:var(--mu);margin:0 0 14px">Tap the green check for correct, red X for incorrect. Percentage updates live.</p>';
    h += '<div style="display:flex;flex-direction:column;gap:8px">';

    S.sel.forEach(function(id, i) {
      var comp = findComp(id);
      if (!comp) return;
      var d = S.data[id] || {};
      var total = (d.correct || 0) + (d.incorrect || 0);
      var pct = total > 0 ? Math.round(((d.correct || 0) / total) * 100) : null;
      var isExp = S.expanded === id;

      h += '<div class="card" style="overflow:hidden">';
      h += '<button onclick="togExp(\'' + id + '\')" aria-expanded="' + isExp + '" style="width:100%;background:none;border:none;cursor:pointer;color:var(--tx);padding:12px 14px;display:flex;align-items:center;gap:8px;text-align:left;font-family:var(--ff);outline:none">';
      h += '<span class="num" style="width:24px;height:24px;border-radius:7px">' + (i + 1) + '</span>';
      h += '<span style="font-size:15px">' + comp.icon + '</span>';
      h += '<div style="flex:1;min-width:0"><div class="fh" style="font-weight:600;font-size:13px">' + comp.label + '</div>';
      if (d.target) h += '<div style="font-size:10px;color:var(--mu);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(d.target) + '</div>';
      h += '</div>';
      if (pct !== null) h += '<span class="pb ' + pctCls(pct) + '">' + pct + '% <span style="font-size:10px;font-weight:500;opacity:.7">(' + (d.correct || 0) + '/' + total + ')</span></span>';
      h += '<span style="font-size:11px;color:var(--mu)">' + (isExp ? '&#9662;' : '&#9656;') + '</span></button>';

      if (isExp) {
        h += '<div style="padding:0 14px 16px;border-top:1px solid var(--bd);padding-top:14px">';
        // Tapper
        h += '<div style="display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:14px">';
        h += '<button class="tapper tp-n" onclick="tap(\'' + id + '\',0)" aria-label="Incorrect">&#10007;</button>';
        h += '<div style="text-align:center;min-width:80px"><div class="fh" style="font-size:36px;font-weight:700;line-height:1;color:' + (pct === null ? 'var(--mu)' : pctCol(pct || 0)) + '">' + (pct !== null ? pct : 0) + '%</div>';
        h += '<div style="font-size:11px;color:var(--mu);margin-top:2px">' + (d.correct || 0) + ' / ' + total + ' trials</div></div>';
        h += '<button class="tapper tp-y" onclick="tap(\'' + id + '\',1)" aria-label="Correct">&#10003;</button></div>';

        // Dots
        if (total > 0 && total <= 50) {
          h += '<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:12px" aria-hidden="true">';
          for (var dc = 0; dc < (d.correct || 0); dc++) h += '<span class="dot" style="background:var(--gn)"></span>';
          for (var di = 0; di < (d.incorrect || 0); di++) h += '<span class="dot" style="background:var(--rd)"></span>';
          h += '</div>';
        }
        if (total > 0) h += '<div style="text-align:center;margin-bottom:12px"><button class="btn-i" style="text-decoration:underline;font-size:10px" onclick="resetData(\'' + id + '\')">Reset</button></div>';

        // Cue + mode
        h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
        h += '<div><label class="lbl">CUE LEVEL</label><select class="sl" onchange="updR(\'' + id + '\',\'cue\',this.value)"><option value="">Select...</option>';
        CUES.forEach(function(c) { h += '<option value="' + c + '"' + (d.cue === c ? ' selected' : '') + '>' + c + '</option>'; });
        h += '</select></div>';
        h += '<div style="display:flex;align-items:flex-end;font-size:12px;color:var(--mu);padding-bottom:10px">' + (MNAMES[d.mode] || "Both") + ' · ~' + d.minutes + ' min</div></div>';

        // Notes
        h += '<div style="margin-top:8px"><label class="lbl">SESSION NOTES</label><textarea class="ta" rows="2" oninput="upd(\'' + id + '\',\'notes\',this.value)" placeholder="Error patterns, observations, next steps...">' + esc(d.notes || '') + '</textarea></div>';

        // Next button
        if (i < S.sel.length - 1) {
          var nextC = findComp(S.sel[i + 1]);
          if (nextC) h += '<div style="text-align:center;margin-top:12px"><button class="btn btn-p" style="font-size:12px;padding:8px 20px" onclick="togExp(\'' + S.sel[i + 1] + '\')">Next: ' + nextC.label + ' →</button></div>';
        }
        h += '</div>';
      }
      h += '</div>';
    });

    h += '</div>';
    h += '<div style="display:flex;gap:8px;margin-top:18px;justify-content:center"><button class="btn btn-s" onclick="go(\'plan\')">← Edit Plan</button>';
    h += '<button class="btn btn-p" style="padding:13px 28px" onclick="go(\'summary\')">View Summary →</button></div>';
  }

  // ═══ SUMMARY ═══
  if (S.view === "summary") {
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:14px">';
    h += '<div><h2>Session Summary</h2><p style="font-size:11px;color:var(--mu);margin:0">' + (S.name ? esc(S.name) + ' · ' : '') + S.date + (S.num ? ' · #' + esc(S.num) : '') + ' · ~' + totalMin() + ' min</p></div>';
    h += '<div class="no-print" style="display:flex;gap:6px"><button class="btn btn-s" onclick="doCopy()">' + (S.copyFb ? '✓ Copied' : '📋 Copy') + '</button><button class="btn btn-p" onclick="doPrint()">🖨️ Print / PDF</button></div></div>';

    // Overall stats
    var allC = 0, allI = 0;
    S.sel.forEach(function(id) { allC += (S.data[id] && S.data[id].correct) || 0; allI += (S.data[id] && S.data[id].incorrect) || 0; });
    var allT = allC + allI;
    if (allT > 0) {
      h += '<div class="card" style="padding:18px;margin-bottom:14px;background:linear-gradient(135deg,#f8f6ff,#f0f8f6)">';
      h += '<div style="display:flex;align-items:center;justify-content:center;gap:20px;flex-wrap:wrap">';
      h += '<div style="text-align:center"><div class="fh" style="font-size:34px;font-weight:700;line-height:1">' + Math.round((allC / allT) * 100) + '%</div><div style="font-size:10px;color:var(--mu);margin-top:1px">Overall</div></div>';
      h += '<div style="width:1px;height:36px;background:var(--bd)"></div>';
      h += '<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:var(--gn)">' + allC + '</div><div style="font-size:10px;color:var(--mu)">Correct</div></div>';
      h += '<div style="text-align:center"><div style="font-size:18px;font-weight:700;color:var(--rd)">' + allI + '</div><div style="font-size:10px;color:var(--mu)">Incorrect</div></div>';
      h += '<div style="text-align:center"><div style="font-size:18px;font-weight:700">' + allT + '</div><div style="font-size:10px;color:var(--mu)">Total</div></div>';
      h += '</div></div>';
    }

    // Per-component
    h += '<div style="display:flex;flex-direction:column;gap:8px">';
    S.sel.forEach(function(id, i) {
      var comp = findComp(id);
      if (!comp) return;
      var d = S.data[id] || {};
      var total = (d.correct || 0) + (d.incorrect || 0);
      var pct = total > 0 ? Math.round(((d.correct || 0) / total) * 100) : null;

      h += '<div class="card" style="padding:12px 16px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div style="flex:1">';
      h += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">';
      h += '<span class="num">' + (i + 1) + '</span><span style="font-size:14px">' + comp.icon + '</span>';
      h += '<span class="fh" style="font-weight:600;font-size:13px">' + comp.label + '</span>';
      h += '<span style="font-size:9px;padding:2px 6px;border-radius:6px;background:var(--bd);color:var(--mu);font-weight:600">' + (MNAMES[d.mode] || "Both") + ' · ~' + d.minutes + 'm</span></div>';
      if (d.target) h += '<div style="font-size:12px;font-weight:600;margin-bottom:1px">Target: ' + esc(d.target) + '</div>';
      if (d.materials) h += '<div style="font-size:11px;color:var(--mu)">Materials: ' + esc(d.materials) + '</div>';
      if (d.cue) h += '<div style="font-size:11px;color:var(--mu)">Cue: ' + esc(d.cue) + '</div>';
      if (d.notes) h += '<div style="font-size:11px;color:var(--mu);font-style:italic;margin-top:2px">Notes: ' + esc(d.notes) + '</div>';
      h += '</div><div style="text-align:right;flex-shrink:0">';
      if (pct !== null) {
        h += '<div class="fh" style="font-size:20px;font-weight:700;color:' + pctCol(pct) + '">' + pct + '%</div>';
        h += '<div style="font-size:10px;color:var(--mu)">' + d.correct + '/' + total + '</div>';
      } else {
        h += '<div style="font-size:10px;color:var(--mu)">No data</div>';
      }
      h += '</div></div>';
      if (total > 0) h += '<div class="prog"><div class="prog-f" style="width:' + pct + '%;background:' + pctCol(pct) + '"></div></div>';
      h += '</div>';
    });
    h += '</div>';

    h += '<div class="no-print" style="display:flex;gap:8px;margin-top:18px;justify-content:center">';
    h += '<button class="btn btn-s" onclick="go(\'collect\')">← Collect</button>';
    h += '<button class="btn btn-s" onclick="doCopy()">' + (S.copyFb ? '✓ Copied' : '📋 Copy') + '</button>';
    h += '<button class="btn btn-p" onclick="doPrint()">🖨️ Print / PDF</button></div>';
  }

  h += '</main>';
  h += '<footer class="foot no-print">&copy; 2026 RTN Communication &amp; Literacy | CC BY-NC 4.0 | Built for clinicians, by a clinician.</footer>';

  el.innerHTML = h;
}

// ─── Init ───
ensureData();
render();
