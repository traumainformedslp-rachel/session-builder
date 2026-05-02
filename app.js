/*  Session Builder — app.js
    RTN Communication & Literacy
    Pure vanilla JS, zero dependencies
    © 2026 Rachel Terra Norton | MIT (code) + CC BY-NC 4.0 (content) */

// ─── Component Data ───
var COMPONENTS = [
  {id:"pa",label:"Phonemic Awareness",desc:"Blending & segmenting warm-up",icon:"\uD83D\uDD0A",min:2,cat:"sound",mode:"decoding",color:"#efe8f6",targets:["Phoneme blending (3-4 phonemes)","Phoneme segmentation","Phoneme deletion (initial)","Phoneme deletion (final)","Phoneme substitution","Syllable segmentation","Onset-rime blending"]},
  {id:"visual",label:"Phonogram Review: Reading",desc:"Visual drill / deck work (see grapheme, say sound)",icon:"\uD83D\uDC41\uFE0F",min:3,cat:"sound",mode:"decoding",color:"#efe8f6",targets:["Short vowels","Consonant digraphs (sh, ch, th, wh)","Blends","Long vowel teams","R-controlled vowels","VCe patterns","Diphthongs","Vowel teams review","Level 1 phonograms","Level 2 phonograms","Level 3 phonograms","Level 4 phonograms"]},
  {id:"auditory",label:"Phonogram Review: Spelling",desc:"Auditory drill (hear sound, write grapheme)",icon:"\u270D\uFE0F",min:3,cat:"sound",mode:"encoding",color:"#efe8f6",targets:["Short vowels","Consonant digraphs","Long vowel spellings","R-controlled spellings","Spelling alternatives review"]},
  {id:"blend",label:"Blending & Word Building",desc:"Blending board, word chains, letter tiles",icon:"\uD83E\uDDF1",min:5,cat:"word",mode:"decoding",color:"#e8f6ed",targets:["CVC blending","CCVC / CVCC blending","CVCe word building","Multisyllabic word building","Word chains (swap one sound)","Syllable-by-syllable blending"]},
  {id:"wordread",label:"Word-Level Reading",desc:"Word cards, lists, sorts, flash",icon:"\uD83D\uDD24",min:5,cat:"word",mode:"decoding",color:"#e8f6ed",targets:["CVC words","CVCe words","Vowel team words","R-controlled words","Multisyllabic: VC/CV","Multisyllabic: V/CV","Multisyllabic: C-le","Mixed review","Word sorts by pattern"]},
  {id:"sentread",label:"Sentence-Level Reading",desc:"Read controlled sentences with target patterns",icon:"\uD83D\uDCDD",min:3,cat:"text",mode:"decoding",color:"#faeaee",targets:["Sentences with target pattern","Phrase-scoop reading","Controlled text sentences","Mixed decodable sentences"]},
  {id:"fluency",label:"Reading Fluency",desc:"Timed reads, repeated reading, prosody",icon:"\u26A1",min:5,cat:"text",mode:"decoding",color:"#faeaee",targets:["Word-level fluency (flash)","Phrase-level fluency","Passage: cold read + hot read","Repeated reading (timed)","Prosody practice","WCPM progress monitoring"]},
  {id:"newconcept",label:"New Concept / Skill Introduction",desc:"Explicitly teach a new pattern, rule, or concept",icon:"\uD83D\uDCA1",min:10,cat:"word",mode:"both",color:"#e8f6ed",targets:["New phonogram introduction","New syllable type","Spelling rule (doubling, e-drop, y-change)","New vowel team","New prefix/suffix","New Latin root","Syllable division pattern","Soft c / soft g"]},
  {id:"wordspell",label:"Word-Level Spelling",desc:"SOS, dictation, encoding with tiles or writing",icon:"\u270F\uFE0F",min:5,cat:"word",mode:"encoding",color:"#e8f6ed",targets:["CVC dictation","CVCe dictation","Vowel team dictation","SOS (simultaneous oral spelling)","Spelling with letter tiles","Syllable-by-syllable encoding","Spelling rule application","Arm-tap spelling"]},
  {id:"sentspell",label:"Sentence-Level Spelling",desc:"Sentence dictation with proofreading",icon:"\uD83D\uDCCB",min:5,cat:"text",mode:"encoding",color:"#faeaee",targets:["Sentence dictation (1-2 sentences)","Proofreading practice","Capitals & punctuation check","Dictation with target words","Paragraph dictation"]},
  {id:"irregular",label:"Irregular / Heart Words",desc:"High-frequency words with irregular spellings",icon:"\u2764\uFE0F",min:5,cat:"word",mode:"both",color:"#e8f6ed",targets:["Heart word introduction (new)","Heart word review (previously taught)","Heart word reading flash","Heart word spelling practice","Mapping regular vs. irregular parts","Dolch words (by level)","Fry First 100","Fry Second 100","UFLI heart words","Scope Level 1 learned words","Scope Level 2 learned words","Scope Level 3-4 learned words","Functional sight words (exit, danger, open...)"]},
  {id:"connected",label:"Connected Text / Decodable",desc:"Apply skills in decodable passages or books",icon:"\uD83D\uDCDA",min:10,cat:"text",mode:"decoding",color:"#faeaee",targets:["Decodable passage (new)","Decodable passage (reread for fluency)","Decodable book","Controlled text with target pattern","Comprehension check after reading"]},
  {id:"morphology",label:"Morphology & Word Study",desc:"Prefixes, suffixes, roots, word analysis",icon:"\uD83E\uDDE9",min:5,cat:"word",mode:"both",color:"#e8f6ed",targets:["Prefix meaning & identification","Suffix meaning & identification","Base word + suffix practice","Latin root analysis","Greek combining forms","Affix peel-off reading","Word building with morphemes","Spelling rule with suffixes"]},
  {id:"vocab",label:"Vocabulary",desc:"Word meaning, context clues, semantic mapping",icon:"\uD83D\uDDC2\uFE0F",min:5,cat:"word",mode:"both",color:"#e8f6ed",targets:["Morpheme-based word meaning","Context clue strategy","Semantic mapping","Multiple meaning words","Tier 2 vocabulary","Synonyms & antonyms"]},
  {id:"comp",label:"Comprehension",desc:"Sentence or passage-level understanding",icon:"\uD83E\uDDE0",min:5,cat:"text",mode:"decoding",color:"#faeaee",targets:["Visualize & verbalize","Who-what-where sentence check","Main idea identification","Retell / summarize","Inferencing","Text structure ID","Question generation"]}
];

var CUES = ["Independent","Monitoring","Verbal Cue","Visual Cue","Model","Physical Prompt"];
var MNAMES = {decoding:"Decoding",encoding:"Encoding",both:"Both"};

// ─── State ───
var S = {
  view: "plan",
  mode: null, // null = chooser, "activity" = single-skill GRR, "session" = full structured literacy
  dark: false,
  name: "",
  date: new Date().toISOString().split("T")[0],
  num: "",
  sel: [],
  data: {},
  showSug: null,
  expanded: null,
  copyFb: false,
  showAbout: false,
  // Activity-mode state (separate from session mode)
  activity: {
    modeSel: null,   // "decoding" | "encoding"
    level: null,     // "sound" | "word" | "text"
    target: "",
    materials: "",
    minutes: 10,
    iDo: "",
    weDo: "",
    youDo: "",
    correct: 0,
    incorrect: 0,
    cue: "",
    notes: ""
  }
};

// ─── Activity-mode helpers ───
var LEVELS = [
  { id: "sound", label: "Sound Level", icon: "🔤", desc: "Phonemes, phonograms, syllable awareness" },
  { id: "word",  label: "Word Level",  icon: "📚", desc: "Decoding, spelling, morphology, heart words" },
  { id: "text",  label: "Text Level",  icon: "📖", desc: "Sentences, passages, fluency, comprehension" }
];
var ACT_MODES = [
  { id: "decoding", label: "Decoding", icon: "🔊", desc: "Read / say / blend", color: "#8a6cb8", soft: "rgba(138,108,184,0.10)" },
  { id: "encoding", label: "Encoding", icon: "✍️", desc: "Spell / write / segment", color: "#c28460", soft: "rgba(194,132,96,0.10)" }
];

function freshActivity() {
  return {
    modeSel: null, level: null, target: "",
    materials: "", minutes: 10,
    iDo: "", weDo: "", youDo: "",
    correct: 0, incorrect: 0, cue: "", notes: ""
  };
}

function actUpd(f, v) { S.activity[f] = v; }
function actUpdR(f, v) { S.activity[f] = v; render(); }
function actTap(correct) {
  if (correct) S.activity.correct = (S.activity.correct || 0) + 1;
  else S.activity.incorrect = (S.activity.incorrect || 0) + 1;
  render();
}
function actReset() { S.activity.correct = 0; S.activity.incorrect = 0; render(); }

function getSuggestedTargets(levelId, modeId) {
  var suggestions = [];
  COMPONENTS.forEach(function(c) {
    var modeMatch = !modeId || c.mode === modeId || c.mode === "both";
    var levelMatch = !levelId || c.cat === levelId;
    if (modeMatch && levelMatch) {
      c.targets.forEach(function(t) {
        if (suggestions.indexOf(t) < 0) suggestions.push(t);
      });
    }
  });
  return suggestions;
}

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
      S.data[id] = {target:"",materials:"",minutes:c?c.min:5,mode:c?c.mode:"both",correct:0,incorrect:0,cue:"",notes:"",iDo:"",weDo:"",youDo:""};
    } else {
      // Backfill GRR fields for any pre-existing component data
      if (S.data[id].iDo == null) S.data[id].iDo = "";
      if (S.data[id].weDo == null) S.data[id].weDo = "";
      if (S.data[id].youDo == null) S.data[id].youDo = "";
    }
  });
}

function totalMin() {
  if (S.mode === "activity") return S.activity.minutes || 0;
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
  if (S.mode === "activity") {
    // Activity mode = single skill focus
    if (S.sel.length === 1 && S.sel[0] === id) S.sel = [];
    else S.sel = [id];
  } else {
    var i = S.sel.indexOf(id);
    if (i >= 0) S.sel.splice(i, 1);
    else S.sel.push(id);
  }
  ensureData();
  render();
}

function setMode(m) {
  S.mode = m;
  S.view = "plan";
  S.sel = [];
  S.data = {};
  S.expanded = null;
  S.showSug = null;
  S.activity = freshActivity();
  render();
  window.scrollTo(0, 0);
}

function startOver() {
  if (window.confirm("Start over? This will clear the current plan and return to the chooser.")) {
    S.mode = null;
    S.view = "plan";
    S.sel = [];
    S.data = {};
    S.name = "";
    S.num = "";
    S.expanded = null;
    S.showSug = null;
    S.activity = freshActivity();
    render();
    window.scrollTo(0, 0);
  }
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
  var isAct = S.mode === "activity";
  var lines = [isAct ? "ACTIVITY PLAN \u2014 STRUCTURED LITERACY" : "SESSION PLAN \u2014 STRUCTURED LITERACY"];
  lines.push((S.name ? "Student: " + S.name + " | " : "") + "Date: " + S.date + (S.num ? " | #" + S.num : "") + " | ~" + totalMin() + " min");
  lines.push("");

  if (isAct) {
    var A = S.activity;
    var aTotal = (A.correct || 0) + (A.incorrect || 0);
    var aPct = aTotal > 0 ? Math.round((A.correct / aTotal) * 100) + "%" : "\u2014";
    var modeLabel = A.modeSel ? (A.modeSel.charAt(0).toUpperCase() + A.modeSel.slice(1)) : "\u2014";
    var levelLabel = A.level ? (A.level.charAt(0).toUpperCase() + A.level.slice(1) + " Level") : "\u2014";
    lines.push("Activity: " + (A.target || "(untitled)"));
    lines.push("Mode: " + modeLabel + " | Level: " + levelLabel + " | ~" + (A.minutes || 0) + " min");
    if (A.materials) lines.push("Materials: " + A.materials);
    lines.push("");
    lines.push("— Activity Structure (Gradual Release of Responsibility) —");
    if ((A.iDo || '').trim())   lines.push("I DO:  " + A.iDo);
    if ((A.weDo || '').trim())  lines.push("WE DO: " + A.weDo);
    if ((A.youDo || '').trim()) lines.push("YOU DO: " + A.youDo);
    lines.push("");
    lines.push("— Data —");
    lines.push("Correct: " + (A.correct || 0) + " | Incorrect: " + (A.incorrect || 0) + " | Total: " + aTotal + " | Accuracy: " + aPct);
    lines.push("Cue Level: " + (A.cue || "\u2014"));
    if (A.notes) lines.push("Notes: " + A.notes);
    lines.push("");
    lines.push("Framework: Gradual Release of Responsibility (Pearson & Gallagher, 1983; Fisher & Frey, 2013)");
  } else {
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
  }

  lines.push("\u00A9 2026 RTN Communication & Literacy | CC BY-NC 4.0");
  navigator.clipboard.writeText(lines.join("\n"));
  S.copyFb = true;
  render();
  setTimeout(function() { S.copyFb = false; render(); }, 2000);
}

function toggleAbout() {
  S.showAbout = !S.showAbout;
  render();
}

function doPrint() {
  var h = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>Session Plan</title>';
  h += '<link rel="preconnect" href="https://fonts.googleapis.com">';
  h += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>';
  h += '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">';
  h += '<style>';
  h += '*{margin:0;padding:0;box-sizing:border-box}';
  h += 'body{font-family:"DM Sans",Helvetica,Arial,sans-serif;font-size:11px;color:#28283A;padding:22px 24px;line-height:1.5;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}';
  h += '.title{font-family:"DM Sans",system-ui,sans-serif;font-size:23px;font-weight:700;letter-spacing:-.01em;color:#28283A;line-height:1.1}';
  h += '.sub{font-family:"DM Sans",system-ui,sans-serif;font-style:italic;font-size:12px;color:#7A7A8E;margin-top:2px}';
  h += '.meta{font-size:10.5px;margin:12px 0 14px;padding:9px 14px;background:linear-gradient(135deg,#efe8f6,#e8f6ed);border-radius:10px;display:flex;flex-wrap:wrap;gap:4px 18px}';
  h += '.meta strong{color:#28283A;font-weight:600;margin-right:3px}.meta span{color:#555}';
  h += '.cmp{border:1px solid #E8E4DF;border-radius:10px;margin-bottom:8px;page-break-inside:avoid;overflow:hidden;position:relative;padding-left:6px}';
  h += '.cmp::before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px}';
  h += '.cmp.s::before{background:#b8a0d8}';
  h += '.cmp.w::before{background:#8dd4b0}';
  h += '.cmp.t::before{background:#f4b5c5}';
  h += '.ch{padding:7px 12px;display:flex;justify-content:space-between;align-items:center;gap:8px}';
  h += '.ch h3{font-family:"DM Sans",system-ui,sans-serif;font-size:12.5px;font-weight:600;display:flex;align-items:center;gap:6px;color:#28283A}';
  h += '.ch .n{font-family:"DM Sans",system-ui,sans-serif;font-weight:700;font-size:10.5px;background:#fff;border:1px solid rgba(0,0,0,.1);width:20px;height:20px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center}';
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
  h += '.ft{margin-top:14px;font-size:8.5px;color:#A0A0B0;text-align:center;border-top:1px solid #E8E4DF;padding-top:7px;font-family:"DM Sans",system-ui,sans-serif;font-style:italic}';
  h += '@media print{body{padding:14px 16px}}';
  h += '</style></head><body>';
  var printIsAct = S.mode === "activity";
  h += '<div class="title">' + (printIsAct ? 'Structured Literacy Activity Plan' : 'Structured Literacy Session Plan') + '</div>';
  h += '<div class="sub">' + (printIsAct ? 'Activity Builder' : 'Session Builder') + ' &middot; RTN Communication &amp; Literacy</div>';
  h += '<div class="meta">';
  if (S.name) h += '<span><strong>Student:</strong>' + esc(S.name) + '</span>';
  h += '<span><strong>Date:</strong>' + S.date + '</span>';
  if (S.num) h += '<span><strong>' + (printIsAct ? 'Activity #' : 'Session #') + '</strong>' + esc(S.num) + '</span>';
  if (printIsAct) {
    var pA = S.activity;
    var pModeL = pA.modeSel ? (pA.modeSel.charAt(0).toUpperCase() + pA.modeSel.slice(1)) : '—';
    var pLevelL = pA.level ? (pA.level.charAt(0).toUpperCase() + pA.level.slice(1)) : '—';
    h += '<span><strong>Mode:</strong>' + pModeL + '</span>';
    h += '<span><strong>Level:</strong>' + pLevelL + '</span>';
    h += '<span><strong>~' + (pA.minutes || 0) + '</strong> min</span>';
  } else {
    h += '<span><strong>' + S.sel.length + '</strong> components</span>';
    h += '<span><strong>~' + totalMin() + '</strong> min</span>';
  }
  h += '</div>';

  if (printIsAct) {
    var A = S.activity;
    var total = (A.correct || 0) + (A.incorrect || 0);
    var pct = total > 0 ? Math.round((A.correct / total) * 100) : null;
    var catLetter = A.level ? A.level.charAt(0) : 'w';
    h += '<div class="cmp ' + catLetter + '">';
    h += '<div class="ch" style="background:#efe8f6">';
    h += '<h3>🎯 ' + esc(A.target || 'Activity') + '</h3>';
    h += '<div>';
    if (A.modeSel) h += '<span class="bdg">' + (A.modeSel.charAt(0).toUpperCase() + A.modeSel.slice(1)) + '</span>';
    if (A.level) h += '<span class="bdg">' + (A.level.charAt(0).toUpperCase() + A.level.slice(1)) + '</span>';
    h += '<span class="bdg">~' + (A.minutes || 0) + ' min</span>';
    if (pct !== null) h += '<span class="bdg ' + (pct >= 80 ? 'bdg-h' : pct >= 50 ? 'bdg-m' : 'bdg-l') + '">' + pct + '% (' + (A.correct || 0) + '/' + total + ')</span>';
    h += '</div></div><div class="cb">';
    if (!A.target) h += '<div class="tgt"><span class="k">Target</span>___________________________________</div>';
    if (A.materials) h += '<div class="info"><span class="k">Materials</span>' + esc(A.materials) + '</div>';

    // GRR blocks — always print them (blank if empty), since this is the whole point of Activity mode
    h += '<div class="info" style="margin-top:8px;padding:7px 10px;background:#efe8f6;border-left:4px solid #b8a0d8;border-radius:0 6px 6px 0"><span class="k" style="color:#7a5ea8">' + '🧑‍🏫' + ' I Do</span>' + ((A.iDo || '').trim() ? esc(A.iDo) : '___________________________________') + '</div>';
    h += '<div class="info" style="margin-top:5px;padding:7px 10px;background:#e8f6ed;border-left:4px solid #8dd4b0;border-radius:0 6px 6px 0"><span class="k" style="color:#3a8a60">🤝 We Do</span>' + ((A.weDo || '').trim() ? esc(A.weDo) : '___________________________________') + '</div>';
    h += '<div class="info" style="margin-top:5px;padding:7px 10px;background:#faeaee;border-left:4px solid #f4b5c5;border-radius:0 6px 6px 0"><span class="k" style="color:#a05068">🎓 You Do</span>' + ((A.youDo || '').trim() ? esc(A.youDo) : '___________________________________') + '</div>';

    if (A.cue) h += '<div class="info" style="margin-top:6px"><span class="k">Cue</span>' + esc(A.cue) + '</div>';
    if (A.notes) h += '<div class="info"><span class="k">Notes</span><em>' + esc(A.notes) + '</em></div>';
    if (total === 0) {
      h += '<div class="gr" style="margin-top:8px">';
      for (var gA = 0; gA < 30; gA++) h += '<div class="gc"></div>';
      h += '</div><div class="nl"></div><div class="nl"></div>';
    }
    h += '</div></div>';
    h += '<div class="info" style="margin-top:10px;font-size:8.5px;color:#7A7A8E;font-style:italic;text-align:center">Framework: Gradual Release of Responsibility (Pearson &amp; Gallagher, 1983; Fisher &amp; Frey, 2013)</div>';
  } else {
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
  }
  h += '<div class="ft">&copy; 2026 RTN Communication &amp; Literacy &middot; CC BY-NC 4.0</div></body></html>';
  var w = window.open(URL.createObjectURL(new Blob([h], {type: "text/html"})), "_blank");
  if (w) setTimeout(function() { w.print(); }, 500);
}


// ─── RENDER ───
function render() {
  ensureData();
  var el = document.getElementById("app");
  var h = '';

  // ═══ CHOOSER (Landing Screen — editorial calm) ═══
  if (S.mode === null) {
    h += '<div style="min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px 20px 40px;position:relative;z-index:1">';
    h += '<button onclick="toggleDark()" aria-label="Toggle dark mode" style="position:fixed;top:18px;right:22px;z-index:100;padding:7px 14px;border-radius:100px;border:1px solid var(--bd);background:var(--card);color:var(--mu);font-family:\'DM Sans\',sans-serif;font-size:11px;font-weight:500;letter-spacing:0.06em;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:border-color 0.2s ease, color 0.2s ease">';
    h += '<span style="font-size:13px;line-height:1">' + (S.dark ? '☾' : '☀') + '</span>' + (S.dark ? 'Dark' : 'Light');
    h += '</button>';

    h += '<div style="max-width:600px;width:100%;text-align:left">';

    // Kicker with hairline rule
    h += '<p style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:var(--mu);margin-bottom:18px;padding-bottom:10px;border-bottom:1px solid var(--bd);display:inline-block">';
    h += 'Structured Literacy · Plan · Collect · Print';
    h += '</p>';

    // Big Fraunces heading with rainbow underline
    h += '<h1 style="font-family:\'DM Sans\',system-ui,sans-serif;font-size:clamp(34px,5.5vw,48px);font-weight:500;letter-spacing:-0.015em;line-height:1.08;color:var(--tx);margin-bottom:14px;position:relative;display:inline-block;padding-bottom:10px">';
    h += 'Session Builder';
    h += '<span style="position:absolute;left:0;right:0;bottom:0;height:3px;border-radius:2px;background:linear-gradient(90deg, #8dd4b0 0%, #b8a0d8 50%, #f4b5c5 100%);opacity:0.78"></span>';
    h += '</h1>';

    // Lede
    h += '<p style="font-size:16px;color:var(--mu);line-height:1.7;margin-bottom:32px;max-width:520px">';
    h += 'A free, clinician-built planner for structured literacy. Choose your scope, set targets, collect live data &mdash; then print or export a clean session summary.';
    h += '</p>';

    // Two card-style buttons
    h += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-bottom:32px">';

    // Card 1: Activity (mint)
    h += '<button onclick="setMode(\'activity\')" style="padding:24px 22px;border-radius:18px;border:1px solid var(--bd);background:var(--card);cursor:pointer;text-align:left;transition:transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;font-family:inherit"';
    h += ' onmouseenter="this.style.borderColor=\'#8dd4b0\';this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 2px 4px rgba(40,36,32,0.04), 0 8px 24px rgba(40,36,32,0.06)\'"';
    h += ' onmouseleave="this.style.borderColor=\'var(--bd)\';this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">';
    h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
    h += '<span style="width:28px;height:28px;border-radius:8px;background:' + (S.dark ? '#1e2b22' : '#e8f6ed') + ';display:inline-flex;align-items:center;justify-content:center;font-family:\'DM Sans\',system-ui,sans-serif;font-weight:600;font-size:14px;color:#4f9c74">A</span>';
    h += '<span style="font-family:\'DM Sans\',system-ui,sans-serif;font-weight:500;font-size:19px;color:var(--tx);letter-spacing:-0.005em">Plan an Activity</span>';
    h += '</div>';
    h += '<ul style="list-style:none;margin:0;padding:0;color:var(--mu);font-size:13.5px;line-height:1.7">';
    ['Focus on one skill','I Do → We Do → You Do','Single-target data collection'].forEach(function(line){
      h += '<li style="padding-left:14px;position:relative">';
      h += '<span style="position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%;background:#8dd4b0"></span>';
      h += line;
      h += '</li>';
    });
    h += '</ul>';
    h += '<div style="margin-top:14px;font-family:\'DM Sans\',system-ui,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#4f9c74">Begin →</div>';
    h += '</button>';

    // Card 2: Session (lavender)
    h += '<button onclick="setMode(\'session\')" style="padding:24px 22px;border-radius:18px;border:1px solid var(--bd);background:var(--card);cursor:pointer;text-align:left;transition:transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;font-family:inherit"';
    h += ' onmouseenter="this.style.borderColor=\'#b8a0d8\';this.style.transform=\'translateY(-2px)\';this.style.boxShadow=\'0 2px 4px rgba(40,36,32,0.04), 0 8px 24px rgba(40,36,32,0.06)\'"';
    h += ' onmouseleave="this.style.borderColor=\'var(--bd)\';this.style.transform=\'translateY(0)\';this.style.boxShadow=\'none\'">';
    h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
    h += '<span style="width:28px;height:28px;border-radius:8px;background:' + (S.dark ? '#261e30' : '#efe8f6') + ';display:inline-flex;align-items:center;justify-content:center;font-family:\'DM Sans\',system-ui,sans-serif;font-weight:600;font-size:14px;color:#7a5ea8">S</span>';
    h += '<span style="font-family:\'DM Sans\',system-ui,sans-serif;font-weight:500;font-size:19px;color:var(--tx);letter-spacing:-0.005em">Plan a Full Session</span>';
    h += '</div>';
    h += '<ul style="list-style:none;margin:0;padding:0;color:var(--mu);font-size:13.5px;line-height:1.7">';
    ['Multiple components','Full structured literacy','Multi-skill data collection'].forEach(function(line){
      h += '<li style="padding-left:14px;position:relative">';
      h += '<span style="position:absolute;left:0;top:9px;width:6px;height:6px;border-radius:50%;background:#b8a0d8"></span>';
      h += line;
      h += '</li>';
    });
    h += '</ul>';
    h += '<div style="margin-top:14px;font-family:\'DM Sans\',system-ui,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#7a5ea8">Begin →</div>';
    h += '</button>';

    h += '</div>';

    // Footer signature
    h += '<div style="padding-top:20px;border-top:1px solid var(--bd);font-family:\'DM Sans\',system-ui,sans-serif;font-size:10px;font-weight:500;letter-spacing:0.16em;text-transform:uppercase;color:var(--mu);line-height:1.9">';
    h += 'Evidence-Based · Curriculum-Agnostic · Free<br>Rachel Terra Norton, MS, CCC-SLP · rachelslp.org';
    h += '</div>';

    h += '</div></div>';
    el.innerHTML = h;
    return;
  }

  var isActivity = S.mode === "activity";
  var titleText = isActivity ? "Activity Builder" : "Session Builder";
  var logoMark = isActivity ? "AB" : "SB";

  // ── Header ──
  h += '<header class="header no-print">';
  h += '<div style="display:flex;align-items:center;gap:10px"><div class="logo-mark">' + logoMark + '</div><div><div class="logo-text">' + titleText + '</div><div class="logo-sub">RTN Communication &amp; Literacy</div></div></div>';
  h += '<div style="display:flex;gap:4px;align-items:center;flex-wrap:wrap">';
  h += '<button class="btn-tab' + (S.view === "plan" ? " on" : "") + '" onclick="go(\'plan\')">📝 Plan</button>';
  h += '<button class="btn-tab' + (S.view === "collect" ? " on" : "") + '" onclick="go(\'collect\')">📊 Collect</button>';
  h += '<button class="btn-tab' + (S.view === "summary" ? " on" : "") + '" onclick="go(\'summary\')">📄 Summary</button>';
  h += '<div style="width:1px;height:18px;background:var(--bd);margin:0 2px"></div>';
  h += '<button class="btn btn-s btn-sm" onclick="startOver()" aria-label="Start over" title="Start over">↩</button>';
  h += '<button class="btn btn-s btn-sm" onclick="toggleDark()" aria-label="Toggle dark mode">' + (S.dark ? "☀️" : "🌙") + '</button>';
  h += '</div></header>';

  h += '<main class="main">';

  // ═══ PLAN ═══
  if (S.view === "plan") {
    var infoTitle = isActivity ? "Activity Info" : "Session Info";
    var numLabel = isActivity ? "ACTIVITY #" : "SESSION #";
    h += '<section class="card" style="padding:18px;margin-bottom:14px"><h2>' + infoTitle + '</h2>';
    h += '<div class="g3" style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;margin-top:12px">';
    h += '<div><label class="lbl">STUDENT NAME / INITIALS</label><input class="inp" value="' + esc(S.name) + '" oninput="S.name=this.value" placeholder="Optional"></div>';
    h += '<div><label class="lbl">DATE</label><input type="date" class="inp" value="' + S.date + '" oninput="S.date=this.value"></div>';
    h += '<div><label class="lbl">' + numLabel + '</label><input class="inp" value="' + esc(S.num) + '" oninput="S.num=this.value" placeholder="e.g. 12"></div>';
    h += '</div></section>';

    if (isActivity) {
      // ═══ ACTIVITY MODE — Stepped, visual, big-box planner ═══
      var A = S.activity;
      var stepN = function(n, label, done) {
        return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px"><div style="width:34px;height:34px;border-radius:10px;background:' + (done ? 'var(--ag)' : 'var(--bd)') + ';color:' + (done ? '#fff' : 'var(--mu)') + ';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;font-family:var(--ff);flex-shrink:0">' + (done ? '✓' : n) + '</div><div class="fh" style="font-weight:700;font-size:16px;color:var(--tx)">' + label + '</div></div>';
      };

      // ── STEP 1: Mode (Decoding / Encoding) ──
      h += '<section class="card" style="padding:20px;margin-bottom:14px">';
      h += stepN(1, 'Mode', !!A.modeSel);
      h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">';
      ACT_MODES.forEach(function(m) {
        var sel = A.modeSel === m.id;
        h += '<button onclick="actUpdR(\'modeSel\',\'' + m.id + '\')" style="padding:22px 16px;border-radius:16px;border:' + (sel ? '3px solid ' + m.color : '2px solid var(--bd)') + ';background:' + (sel ? m.soft : 'var(--card)') + ';cursor:pointer;text-align:center;font-family:var(--ff);transition:all 0.15s">';
        h += '<div style="font-size:36px;margin-bottom:6px">' + m.icon + '</div>';
        h += '<div class="fh" style="font-weight:700;font-size:16px;color:' + (sel ? m.color : 'var(--tx)') + ';letter-spacing:-0.01em">' + m.label + '</div>';
        h += '<div style="font-size:11px;color:var(--mu);margin-top:4px">' + m.desc + '</div>';
        h += '</button>';
      });
      h += '</div></section>';

      // ── STEP 2: Linguistic Level ──
      h += '<section class="card" style="padding:20px;margin-bottom:14px' + (A.modeSel ? '' : ';opacity:0.5;pointer-events:none') + '">';
      h += stepN(2, 'Linguistic Level', !!A.level);
      h += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">';
      LEVELS.forEach(function(l) {
        var sel = A.level === l.id;
        h += '<button onclick="actUpdR(\'level\',\'' + l.id + '\')" style="padding:18px 12px;border-radius:14px;border:' + (sel ? '3px solid var(--ac)' : '2px solid var(--bd)') + ';background:' + (sel ? 'rgba(138,108,184,0.10)' : 'var(--card)') + ';cursor:pointer;text-align:center;font-family:var(--ff);transition:all 0.15s">';
        h += '<div style="font-size:32px;margin-bottom:4px">' + l.icon + '</div>';
        h += '<div class="fh" style="font-weight:700;font-size:14px;color:' + (sel ? 'var(--ac)' : 'var(--tx)') + '">' + l.label + '</div>';
        h += '<div style="font-size:10px;color:var(--mu);margin-top:3px;line-height:1.4">' + l.desc + '</div>';
        h += '</button>';
      });
      h += '</div></section>';

      // ── STEP 3: Target ──
      h += '<section class="card" style="padding:20px;margin-bottom:14px' + (A.modeSel && A.level ? '' : ';opacity:0.5;pointer-events:none') + '">';
      h += stepN(3, 'Target / Focus Skill', !!A.target.trim());
      h += '<textarea class="ta" rows="2" oninput="actUpd(\'target\',this.value)" placeholder="What specific skill are you targeting? e.g., CVC blending, short vowel /a/, heart word \'said\', decodable passage fluency..." style="font-size:15px;padding:14px 16px">' + esc(A.target || '') + '</textarea>';
      if (A.modeSel && A.level) {
        var suggestions = getSuggestedTargets(A.level, A.modeSel);
        if (suggestions.length > 0) {
          h += '<div style="margin-top:10px"><div style="font-size:10px;font-weight:700;color:var(--mu);letter-spacing:0.5px;text-transform:uppercase;margin-bottom:6px">Suggested for ' + (A.modeSel === 'decoding' ? 'Decoding' : 'Encoding') + ' · ' + (LEVELS.find ? LEVELS.find(function(x){return x.id===A.level;}).label : A.level) + '</div>';
          h += '<div style="display:flex;flex-wrap:wrap;gap:3px;max-height:140px;overflow-y:auto">';
          suggestions.forEach(function(t) {
            h += '<button class="chip" onclick="actUpdR(\'target\',\'' + esc(t).replace(/'/g, "\\'") + '\')">' + esc(t) + '</button>';
          });
          h += '</div></div>';
        }
      }
      // Materials + minutes inline
      h += '<div style="margin-top:14px;display:grid;grid-template-columns:1fr auto;gap:10px">';
      h += '<div><label class="lbl">MATERIALS</label><input class="inp" value="' + esc(A.materials || '') + '" oninput="actUpd(\'materials\',this.value)" placeholder="phonogram cards, whiteboard, decodable text..."></div>';
      h += '<div><label class="lbl">MINUTES</label><input type="number" class="inp" style="width:80px;text-align:center" min="1" max="60" value="' + (A.minutes || 10) + '" onchange="actUpdR(\'minutes\',+this.value)"></div>';
      h += '</div>';
      h += '</section>';

      // ── STEP 4: Activity Structure (GRR — BIG boxes) ──
      var grrDone = (A.iDo || '').trim() || (A.weDo || '').trim() || (A.youDo || '').trim();
      h += '<section class="card" style="padding:20px;margin-bottom:14px' + (A.target.trim() ? '' : ';opacity:0.5;pointer-events:none') + '">';
      h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">';
      h += '<div style="width:34px;height:34px;border-radius:10px;background:' + (grrDone ? 'var(--ag)' : 'var(--bd)') + ';color:' + (grrDone ? '#fff' : 'var(--mu)') + ';display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;flex-shrink:0">' + (grrDone ? '✓' : '4') + '</div>';
      h += '<div><div class="fh" style="font-weight:700;font-size:16px">Activity Structure</div>';
      h += '<div style="font-size:10px;color:var(--mu);font-family:\'DM Sans\',system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase;margin-top:1px">Gradual Release of Responsibility</div></div>';
      h += '</div>';
      h += '<p style="font-size:12px;color:var(--mu);margin:10px 0 16px;line-height:1.55">Responsibility shifts gradually from teacher → student (Pearson &amp; Gallagher, 1983; Fisher &amp; Frey, 2013).</p>';

      h += '<div style="display:flex;flex-direction:column;gap:14px">';

      // I DO (bigger, more visual)
      h += '<div style="border-radius:14px;border:2px solid #8a6cb8;background:rgba(138,108,184,0.06);padding:14px 16px">';
      h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">';
      h += '<div style="width:44px;height:44px;border-radius:12px;background:#8a6cb8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🧑‍🏫</div>';
      h += '<div><div class="fh" style="font-weight:700;font-size:15px;color:#7a5ea8">I DO</div>';
      h += '<div style="font-size:11px;color:var(--mu)">Teacher models, thinks aloud, demonstrates</div></div></div>';
      h += '<textarea class="ta" rows="4" oninput="actUpd(\'iDo\',this.value)" placeholder="How will you explicitly model this skill? Script your teacher talk. Narrate your thinking. Example: \'Watch me. I see the letters s-a-t. I know /s/, /a/, /t/. I blend: sss-aaa-ttt → sat.\'" style="font-size:14px;background:var(--bg)">' + esc(A.iDo || '') + '</textarea>';
      h += '</div>';

      // WE DO
      h += '<div style="border-radius:14px;border:2px solid #4e7fb8;background:rgba(78,127,184,0.06);padding:14px 16px">';
      h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">';
      h += '<div style="width:44px;height:44px;border-radius:12px;background:#4e7fb8;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🤝</div>';
      h += '<div><div class="fh" style="font-weight:700;font-size:15px;color:#3a8a60">WE DO</div>';
      h += '<div style="font-size:11px;color:var(--mu)">Guided practice together — you scaffold with cues</div></div></div>';
      h += '<textarea class="ta" rows="4" oninput="actUpd(\'weDo\',this.value)" placeholder="How will you practice together? What scaffolds/cues will you use? Example: \'We try the next three words together. I\'ll point to each letter — you tell me the sound. If stuck, I\'ll give a verbal prompt, then a model.\'" style="font-size:14px;background:var(--bg)">' + esc(A.weDo || '') + '</textarea>';
      h += '</div>';

      // YOU DO
      h += '<div style="border-radius:14px;border:2px solid #27ae60;background:rgba(39,174,96,0.06);padding:14px 16px">';
      h += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">';
      h += '<div style="width:44px;height:44px;border-radius:12px;background:#27ae60;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">🎓</div>';
      h += '<div><div class="fh" style="font-weight:700;font-size:15px;color:#a05068">YOU DO</div>';
      h += '<div style="font-size:11px;color:var(--mu)">Independent application — where you collect data</div></div></div>';
      h += '<textarea class="ta" rows="4" oninput="actUpd(\'youDo\',this.value)" placeholder="How will the student apply this independently? What will you watch for? Example: \'Student reads 10 unseen CVC words aloud. I mark correct/incorrect per word. Target ≥ 80% accuracy before next step.\'" style="font-size:14px;background:var(--bg)">' + esc(A.youDo || '') + '</textarea>';
      h += '</div>';

      h += '</div></section>';

      h += '<div style="display:flex;gap:8px;margin-top:18px;justify-content:center;flex-wrap:wrap">';
      h += '<button class="btn btn-s" style="font-size:13px" onclick="doPrint()">🖨️ Print Blank</button>';
      var canStart = A.modeSel && A.level && A.target.trim();
      h += '<button class="btn btn-p" style="font-size:15px;padding:13px 30px' + (canStart ? '' : ';opacity:.4;pointer-events:none') + '" onclick="go(\'collect\')">Collect Data →</button></div>';

    } else {
      // ── SESSION MODE: Original multi-component flow ──
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
  }

  // ═══ COLLECT ═══
  if (S.view === "collect") {
    var liveTitle = isActivity ? "Live Activity" : "Live Session";
    h += '<div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px"><h2>' + liveTitle + (S.name ? ' <span style="font-weight:400;font-size:15px"> — ' + esc(S.name) + '</span>' : '') + '</h2><span style="font-size:11px;color:var(--mu)">' + S.date + '</span></div>';
    h += '<p style="font-size:11px;color:var(--mu);margin:0 0 14px">Tap the green check for correct, red X for incorrect. Percentage updates live.</p>';

    if (isActivity) {
      // ═══ ACTIVITY-MODE COLLECT (single target, from S.activity) ═══
      var A = S.activity;
      var aTotal = (A.correct || 0) + (A.incorrect || 0);
      var aPct = aTotal > 0 ? Math.round((A.correct / aTotal) * 100) : null;
      var modeData = null, levelData = null;
      for (var mm = 0; mm < ACT_MODES.length; mm++) if (ACT_MODES[mm].id === A.modeSel) modeData = ACT_MODES[mm];
      for (var ll = 0; ll < LEVELS.length; ll++) if (LEVELS[ll].id === A.level) levelData = LEVELS[ll];

      // Overview card: mode + level pills, target, materials
      h += '<section class="card" style="padding:16px 18px;margin-bottom:12px">';
      h += '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px">';
      if (modeData) h += '<span style="font-size:10px;font-weight:700;padding:4px 10px;border-radius:8px;background:' + modeData.soft + ';color:' + modeData.color + ';letter-spacing:0.5px">' + modeData.icon + ' ' + modeData.label.toUpperCase() + '</span>';
      if (levelData) h += '<span style="font-size:10px;font-weight:700;padding:4px 10px;border-radius:8px;background:var(--bd);color:var(--tx);letter-spacing:0.5px">' + levelData.icon + ' ' + levelData.label.toUpperCase() + '</span>';
      h += '<span style="font-size:10px;color:var(--mu);margin-left:auto">~' + (A.minutes || 0) + ' min</span>';
      h += '</div>';
      if (A.target) {
        h += '<div class="fh" style="font-weight:700;font-size:17px;line-height:1.35;color:var(--tx)">🎯 ' + esc(A.target) + '</div>';
      } else {
        h += '<div style="font-size:13px;color:var(--mu);font-style:italic">No target set — <a href="#" onclick="go(\'plan\');return false" style="color:var(--ac);text-decoration:underline">go back to Plan</a> to add one.</div>';
      }
      if (A.materials) h += '<div style="font-size:11px;color:var(--mu);margin-top:4px">Materials: ' + esc(A.materials) + '</div>';
      h += '</section>';

      // GRR reminder
      var hasAnyGRR = (A.iDo || '').trim() || (A.weDo || '').trim() || (A.youDo || '').trim();
      if (hasAnyGRR) {
        h += '<section class="card" style="padding:12px 14px;margin-bottom:12px">';
        h += '<div style="font-size:10px;color:var(--mu);font-family:\'DM Sans\',system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase;margin-bottom:8px">Activity Flow · Gradual Release</div>';
        h += '<div style="display:flex;flex-direction:column;gap:6px">';
        if ((A.iDo || '').trim()) h += '<div style="font-size:12px;border-left:3px solid #b8a0d8;padding:3px 10px;line-height:1.45"><span style="font-weight:700;color:#7a5ea8;font-size:10px;letter-spacing:1px">🧑‍🏫 I DO</span> · ' + esc(A.iDo) + '</div>';
        if ((A.weDo || '').trim()) h += '<div style="font-size:12px;border-left:3px solid #8dd4b0;padding:3px 10px;line-height:1.45"><span style="font-weight:700;color:#3a8a60;font-size:10px;letter-spacing:1px">🤝 WE DO</span> · ' + esc(A.weDo) + '</div>';
        if ((A.youDo || '').trim()) h += '<div style="font-size:12px;border-left:3px solid #f4b5c5;padding:3px 10px;line-height:1.45"><span style="font-weight:700;color:#a05068;font-size:10px;letter-spacing:1px">🎓 YOU DO</span> · ' + esc(A.youDo) + '</div>';
        h += '</div></section>';
      }

      // Big tapper card
      h += '<section class="card" style="padding:20px 16px 18px">';
      h += '<div style="display:flex;align-items:center;justify-content:center;gap:32px;margin-bottom:16px">';
      h += '<button class="tapper tp-n" onclick="actTap(0)" aria-label="Incorrect">&#10007;</button>';
      h += '<div style="text-align:center;min-width:110px"><div class="fh" style="font-size:46px;font-weight:700;line-height:1;color:' + (aPct === null ? 'var(--mu)' : pctCol(aPct)) + '">' + (aPct !== null ? aPct : 0) + '%</div>';
      h += '<div style="font-size:11px;color:var(--mu);margin-top:3px">' + (A.correct || 0) + ' / ' + aTotal + ' trials</div></div>';
      h += '<button class="tapper tp-y" onclick="actTap(1)" aria-label="Correct">&#10003;</button></div>';

      // Dots
      if (aTotal > 0 && aTotal <= 50) {
        h += '<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:12px" aria-hidden="true">';
        for (var adc = 0; adc < (A.correct || 0); adc++) h += '<span class="dot" style="background:var(--gn)"></span>';
        for (var adi = 0; adi < (A.incorrect || 0); adi++) h += '<span class="dot" style="background:var(--rd)"></span>';
        h += '</div>';
      }
      if (aTotal > 0) h += '<div style="text-align:center;margin-bottom:14px"><button class="btn-i" style="text-decoration:underline;font-size:10px" onclick="actReset()">Reset trials</button></div>';

      // Cue + mode/level info
      h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:4px">';
      h += '<div><label class="lbl">CUE LEVEL</label><select class="sl" onchange="actUpdR(\'cue\',this.value)"><option value="">Select...</option>';
      CUES.forEach(function(c) { h += '<option value="' + c + '"' + (A.cue === c ? ' selected' : '') + '>' + c + '</option>'; });
      h += '</select></div>';
      h += '<div style="display:flex;align-items:flex-end;font-size:12px;color:var(--mu);padding-bottom:10px">' + (modeData ? modeData.label : 'Mode') + ' · ' + (levelData ? levelData.label : 'Level') + '</div>';
      h += '</div>';

      // Notes
      h += '<div style="margin-top:10px"><label class="lbl">ACTIVITY NOTES</label><textarea class="ta" rows="3" oninput="actUpd(\'notes\',this.value)" placeholder="Error patterns, observations, next steps...">' + esc(A.notes || '') + '</textarea></div>';
      h += '</section>';

    } else {
      // ═══ SESSION-MODE COLLECT (existing multi-component flow) ═══
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
          h += '<div style="display:flex;align-items:center;justify-content:center;gap:24px;margin-bottom:14px">';
          h += '<button class="tapper tp-n" onclick="tap(\'' + id + '\',0)" aria-label="Incorrect">&#10007;</button>';
          h += '<div style="text-align:center;min-width:80px"><div class="fh" style="font-size:36px;font-weight:700;line-height:1;color:' + (pct === null ? 'var(--mu)' : pctCol(pct || 0)) + '">' + (pct !== null ? pct : 0) + '%</div>';
          h += '<div style="font-size:11px;color:var(--mu);margin-top:2px">' + (d.correct || 0) + ' / ' + total + ' trials</div></div>';
          h += '<button class="tapper tp-y" onclick="tap(\'' + id + '\',1)" aria-label="Correct">&#10003;</button></div>';

          if (total > 0 && total <= 50) {
            h += '<div style="display:flex;flex-wrap:wrap;gap:3px;justify-content:center;margin-bottom:12px" aria-hidden="true">';
            for (var dc = 0; dc < (d.correct || 0); dc++) h += '<span class="dot" style="background:var(--gn)"></span>';
            for (var di = 0; di < (d.incorrect || 0); di++) h += '<span class="dot" style="background:var(--rd)"></span>';
            h += '</div>';
          }
          if (total > 0) h += '<div style="text-align:center;margin-bottom:12px"><button class="btn-i" style="text-decoration:underline;font-size:10px" onclick="resetData(\'' + id + '\')">Reset</button></div>';

          h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">';
          h += '<div><label class="lbl">CUE LEVEL</label><select class="sl" onchange="updR(\'' + id + '\',\'cue\',this.value)"><option value="">Select...</option>';
          CUES.forEach(function(c) { h += '<option value="' + c + '"' + (d.cue === c ? ' selected' : '') + '>' + c + '</option>'; });
          h += '</select></div>';
          h += '<div style="display:flex;align-items:flex-end;font-size:12px;color:var(--mu);padding-bottom:10px">' + (MNAMES[d.mode] || "Both") + ' · ~' + d.minutes + ' min</div></div>';

          h += '<div style="margin-top:8px"><label class="lbl">SESSION NOTES</label><textarea class="ta" rows="2" oninput="upd(\'' + id + '\',\'notes\',this.value)" placeholder="Error patterns, observations, next steps...">' + esc(d.notes || '') + '</textarea></div>';

          if (i < S.sel.length - 1) {
            var nextC = findComp(S.sel[i + 1]);
            if (nextC) h += '<div style="text-align:center;margin-top:12px"><button class="btn btn-p" style="font-size:12px;padding:8px 20px" onclick="togExp(\'' + S.sel[i + 1] + '\')">Next: ' + nextC.label + ' →</button></div>';
          }
          h += '</div>';
        }
        h += '</div>';
      });

      h += '</div>';
    }

    h += '<div style="display:flex;gap:8px;margin-top:18px;justify-content:center"><button class="btn btn-s" onclick="go(\'plan\')">← Edit Plan</button>';
    h += '<button class="btn btn-p" style="padding:13px 28px" onclick="go(\'summary\')">View Summary →</button></div>';
  }

  // ═══ SUMMARY ═══
  if (S.view === "summary") {
    var sumTitle = isActivity ? "Activity Summary" : "Session Summary";
    h += '<div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;margin-bottom:14px">';
    h += '<div><h2>' + sumTitle + '</h2><p style="font-size:11px;color:var(--mu);margin:0">' + (S.name ? esc(S.name) + ' · ' : '') + S.date + (S.num ? ' · #' + esc(S.num) : '') + ' · ~' + totalMin() + ' min</p></div>';
    h += '<div class="no-print" style="display:flex;gap:6px"><button class="btn btn-s" onclick="doCopy()">' + (S.copyFb ? '✓ Copied' : '📋 Copy') + '</button><button class="btn btn-p" onclick="doPrint()">🖨️ Print / PDF</button></div></div>';

    // Overall stats
    var allC = 0, allI = 0;
    if (isActivity) {
      allC = S.activity.correct || 0;
      allI = S.activity.incorrect || 0;
    } else {
      S.sel.forEach(function(id) { allC += (S.data[id] && S.data[id].correct) || 0; allI += (S.data[id] && S.data[id].incorrect) || 0; });
    }
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

    if (isActivity) {
      // ═══ ACTIVITY-MODE SUMMARY ═══
      var sA = S.activity;
      var sTotal = (sA.correct || 0) + (sA.incorrect || 0);
      var sPct = sTotal > 0 ? Math.round(((sA.correct || 0) / sTotal) * 100) : null;
      var sModeData = null, sLevelData = null;
      for (var sm = 0; sm < ACT_MODES.length; sm++) if (ACT_MODES[sm].id === sA.modeSel) sModeData = ACT_MODES[sm];
      for (var sl = 0; sl < LEVELS.length; sl++) if (LEVELS[sl].id === sA.level) sLevelData = LEVELS[sl];

      // Target + meta card
      h += '<div class="card" style="padding:16px;margin-bottom:12px">';
      h += '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:8px">';
      if (sModeData) h += '<span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:8px;background:' + sModeData.soft + ';color:' + sModeData.color + ';letter-spacing:0.5px">' + sModeData.icon + ' ' + sModeData.label.toUpperCase() + '</span>';
      if (sLevelData) h += '<span style="font-size:10px;font-weight:700;padding:3px 10px;border-radius:8px;background:var(--bd);color:var(--tx);letter-spacing:0.5px">' + sLevelData.icon + ' ' + sLevelData.label.toUpperCase() + '</span>';
      h += '<span style="font-size:10px;color:var(--mu);margin-left:auto">~' + (sA.minutes || 0) + ' min</span>';
      h += '</div>';
      if (sA.target) h += '<div class="fh" style="font-weight:700;font-size:15px;line-height:1.4;margin-bottom:4px">🎯 ' + esc(sA.target) + '</div>';
      else h += '<div style="font-size:12px;color:var(--mu);font-style:italic">No target set</div>';
      if (sA.materials) h += '<div style="font-size:11px;color:var(--mu)">Materials: ' + esc(sA.materials) + '</div>';
      if (sA.cue) h += '<div style="font-size:11px;color:var(--mu)">Cue Level: ' + esc(sA.cue) + '</div>';
      if (sTotal > 0 && sPct !== null) h += '<div class="prog" style="margin-top:8px"><div class="prog-f" style="width:' + sPct + '%;background:' + pctCol(sPct) + '"></div></div>';
      if (sA.notes) h += '<div style="font-size:11px;color:var(--mu);font-style:italic;margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)">Notes: ' + esc(sA.notes) + '</div>';
      h += '</div>';

      // GRR structure card
      var hasGRR = (sA.iDo || '').trim() || (sA.weDo || '').trim() || (sA.youDo || '').trim();
      if (hasGRR) {
        h += '<section class="card" style="padding:16px;margin-bottom:14px">';
        h += '<div style="display:flex;align-items:baseline;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-bottom:12px">';
        h += '<div class="fh" style="font-weight:700;font-size:13px">Activity Structure</div>';
        h += '<span style="font-size:9px;color:var(--mu);font-family:\'DM Sans\',system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase">Gradual Release of Responsibility</span>';
        h += '</div>';
        h += '<div style="display:flex;flex-direction:column;gap:8px">';
        if ((sA.iDo || '').trim()) {
          h += '<div style="border-left:4px solid #8a6cb8;padding:8px 12px;background:rgba(138,108,184,0.06);border-radius:0 8px 8px 0">';
          h += '<div style="font-weight:700;color:#7a5ea8;font-size:10px;letter-spacing:1.5px;margin-bottom:3px">🧑‍🏫 I DO</div>';
          h += '<div style="font-size:12px;line-height:1.5;color:var(--tx)">' + esc(sA.iDo) + '</div></div>';
        }
        if ((sA.weDo || '').trim()) {
          h += '<div style="border-left:4px solid #4e7fb8;padding:8px 12px;background:rgba(78,127,184,0.06);border-radius:0 8px 8px 0">';
          h += '<div style="font-weight:700;color:#3a8a60;font-size:10px;letter-spacing:1.5px;margin-bottom:3px">🤝 WE DO</div>';
          h += '<div style="font-size:12px;line-height:1.5;color:var(--tx)">' + esc(sA.weDo) + '</div></div>';
        }
        if ((sA.youDo || '').trim()) {
          h += '<div style="border-left:4px solid #27ae60;padding:8px 12px;background:rgba(39,174,96,0.06);border-radius:0 8px 8px 0">';
          h += '<div style="font-weight:700;color:#a05068;font-size:10px;letter-spacing:1.5px;margin-bottom:3px">🎓 YOU DO</div>';
          h += '<div style="font-size:12px;line-height:1.5;color:var(--tx)">' + esc(sA.youDo) + '</div></div>';
        }
        h += '</div>';
        h += '<div style="margin-top:10px;font-size:9px;color:var(--mu);font-style:italic;text-align:center">Pearson &amp; Gallagher (1983); Fisher &amp; Frey (2013)</div>';
        h += '</section>';
      }
    } else {
      // ═══ SESSION-MODE SUMMARY (per-component) ═══
      h += '<div style="display:flex;flex-direction:column;gap:8px">';
      S.sel.forEach(function(id, i) {
        var comp = findComp(id);
        if (!comp) return;
        var d = S.data[id] || {};
        var total = (d.correct || 0) + (d.incorrect || 0);
        var pct = total > 0 ? Math.round(((d.correct || 0) / total) * 100) : null;

        h += '<div class="card" style="padding:12px 16px"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px"><div style="flex:1">';
        h += '<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">';
        h += '<span class="num">' + (i + 1) + '</span>';
        h += '<span style="font-size:14px">' + comp.icon + '</span>';
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
    }

    h += '<div class="no-print" style="display:flex;gap:8px;margin-top:18px;justify-content:center">';
    h += '<button class="btn btn-s" onclick="go(\'collect\')">← Collect</button>';
    h += '<button class="btn btn-s" onclick="doCopy()">' + (S.copyFb ? '✓ Copied' : '📋 Copy') + '</button>';
    h += '<button class="btn btn-p" onclick="doPrint()">🖨️ Print / PDF</button></div>';
  }

  h += '</main>';
  h += '<footer class="foot no-print">';
  h += '<button class="about-solid" onclick="toggleAbout()" aria-label="About this resource">📖 <span class="about-solid-tx">About this resource</span></button>';
  h += '<div class="foot-meta">&copy; 2026 RTN Communication &amp; Literacy · CC BY-NC 4.0 · Built for clinicians, by a clinician.</div>';
  h += '</footer>';

  if (S.showAbout) {
    h += '<div class="mdl-bd no-print" onclick="if(event.target===this)toggleAbout()" role="dialog" aria-modal="true" aria-labelledby="mdl-title">';
    h += '<div class="mdl">';
    h += '<div class="mdl-h"><div class="mdl-h-l"><div class="mdl-h-ic">📖</div><div><h2 id="mdl-title">About Session Builder</h2><div class="mdl-h-sub">RTN Communication &amp; Literacy</div></div></div><button class="mdl-x" onclick="toggleAbout()" aria-label="Close">×</button></div>';
    h += '<div class="mdl-b">';

    h += '<h3><span class="h3-ic">✨</span>About this resource</h3>';
    h += '<p>Session Builder is a free, open-source tool for planning structured literacy instruction and collecting trial-by-trial data. It was built by a speech-language pathologist to support SLPs, reading specialists, and literacy interventionists in evidence-based practice. Two workflows are included:</p>';
    h += '<ul>';
    h += '<li><strong>Plan an Activity</strong> — focus on a single skill using the Gradual Release of Responsibility framework (I Do → We Do → You Do) with single-target data collection.</li>';
    h += '<li><strong>Plan a Full Session</strong> — sequence multiple components into a structured literacy session with multi-skill data collection.</li>';
    h += '</ul>';
    h += '<p>The tool runs entirely in your browser. No account, login, or internet connection is required after the initial load. No data is sent to any server, stored in any database, or shared with any third party. Session data exists only in browser memory during use.</p>';

    h += '<h3><span class="h3-ic">🔬</span>Evidence basis</h3>';
    h += '<p>The 15 components reflect the universal structure of evidence-based structured literacy instruction across the linguistic hierarchy (sound, word, and text levels). The framework draws on converging research from the science of reading, including:</p>';
    h += '<ul>';
    h += '<li>National Reading Panel (2000) on the five pillars of reading instruction</li>';
    h += '<li>Ehri\'s phases of word reading and orthographic mapping</li>';
    h += '<li>Scarborough\'s Reading Rope</li>';
    h += '<li>Seidenberg &amp; McClelland\'s four-part processing model</li>';
    h += '<li>The International Dyslexia Association\'s Structured Literacy framework (Moats, Spear-Swerling, and colleagues)</li>';
    h += '<li>Gradual Release of Responsibility — Pearson &amp; Gallagher (1983); Fisher &amp; Frey (2013)</li>';
    h += '</ul>';
    h += '<p>This tool is curriculum-agnostic. References to instructional approaches describe general evidence-based practices documented in peer-reviewed research and are not intended to represent or replace any proprietary curriculum or methodology.</p>';

    h += '<h3><span class="h3-ic">⚖️</span>Disclaimer</h3>';
    h += '<p>This tool is designed to support session planning and data collection for qualified professionals. It is not a substitute for clinical judgment, formal assessment, or individualized treatment planning. Users are responsible for ensuring that their clinical practices comply with applicable professional standards, scope of practice guidelines, and institutional policies.</p>';
    h += '<p>Session Builder is an independent project and is not affiliated with, endorsed by, or sponsored by any commercial literacy program, publisher, or organization. All program names, product names, and trademarks referenced belong to their respective owners.</p>';

    h += '<h3><span class="h3-ic">📎</span>Citation</h3>';
    h += '<div class="cite">Norton, R. T. (2026). Session Builder: A structured literacy session planner with data collection [Web application]. RTN Communication &amp; Literacy.</div>';

    h += '<div class="lic">Code licensed under MIT. Educational content licensed under CC BY-NC 4.0.</div>';
    h += '<div class="rainbow"></div>';

    h += '</div></div></div>';
  }

  el.innerHTML = h;
}

// ─── Init ───
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape" && S.showAbout) toggleAbout();
});
ensureData();
render();
