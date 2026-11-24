"use strict";

const rules = {
  positive: ["Schau, wer etwas tut.", "Bei he, she, it und einzelnen Personen oder Dingen steht meist -s am Verb. Bei I, you, we, they und bei mehreren Personen oder Dingen steht die Grundform."],
  watch: ["Achte auf das Ende von watch.", "Bei he, she, it wird watch zu watches."],
  special: ["Prüfe, ob das Verb bei he, she, it eine besondere Form hat.", "Bei he, she, it wird go zu goes, do zu does und have zu has."],
  negative: ["Schau auf das Subjekt. Prüfe dann die Verbform nach der Verneinung.", "Bei I, you, we, they steht don’t, bei he, she, it steht doesn’t. Danach folgt die Grundform."],
  frequency: ["Achte darauf, ob die Zeitangabe aus einem Wort oder mehreren Wörtern besteht.", "In diesem Satz steht das Häufigkeitswort vor dem Vollverb. Every day steht hier am Satzende."],
  never: ["Überlege, ob never bereits eine Verneinung ausdrückt.", "Never bedeutet nie. Es braucht hier kein zusätzliches don’t oder doesn’t."],
  question: ["Schau auf das Subjekt. Welche Form passt davor?", "Ja-/Nein-Fragen mit Vollverben beginnen mit do bei I, you, we, they oder mit does bei he, she, it. Das Vollverb bleibt in der Grundform."],
  wh: ["Überlege, welche Information in der Antwort steckt.", "Das Fragewort steht am Anfang. Bei diesem Fragetyp folgen do oder does, das Subjekt und die Grundform."],
  who: ["Frage dich, ob du wissen willst, wer etwas tut oder wen es betrifft.", "Fragt who nach der handelnden Person, folgt das Verb direkt. Fragt who nach wen oder wem, folgen bei Vollverben do oder does, das Subjekt und die Grundform."],
  short: ["Schau auf den Anfang der Frage und darauf, wer antwortet.", "Kurzantworten auf Do-Fragen verwenden do oder don’t. Auf Does-Fragen folgen does oder doesn’t. Wenn du selbst auf Do you …? antwortest, verwendest du I."],
  becan: ["Schau, mit welchem Verb die Frage beginnt.", "Bei Fragen mit be oder can steht in der Kurzantwort die passende Form von be oder can. Zu I gehört am, zu she und he gehört is."]
};

const bossHints = {
  positive: "Bestimme das Subjekt.",
  watch: "Achte auf die Endung.",
  special: "Prüfe die Sonderform.",
  negative: "Prüfe Hilfsverb und Grundform.",
  frequency: "Achte auf die Zeitangabe.",
  never: "Was bedeutet never?",
  question: "Prüfe Hilfsverb und Grundform.",
  wh: "Welche Information fehlt?",
  who: "Wer tut etwas?",
  short: "Wer antwortet?",
  becan: "Beachte den Frageanfang."
};

const choose = (rule, prompt, answer, ...options) => ({ type: "choice", rule, prompt, answer, options: [answer, ...options] });
const pair = (rule, prompt, answer, ...options) => ({ ...choose(rule, prompt, answer, ...options), type: "pair" });
const build = (rule, instruction, answer, ...extra) => ({ type: "build", rule, instruction, answer, options: [...answer.split(" "), ...extra] });
const write = (rule, instruction, prompt, answer, ...variants) => ({ type: "write", rule, instruction, prompt, answer, variants });
const fix = (rule, prompt, answer, ...variants) => write(rule, "Verbessere den Satz und schreibe ihn vollständig.", prompt, answer, ...variants);

const chapters = {
  statements: {
    title: "Statements and negatives",
    description: "Aussagesätze, Verneinungen und passende Verbformen",
    levels: [
      [
        choose("positive", "I ___ football.", "play", "plays"),
        choose("positive", "She ___ flowers.", "likes", "like"),
        choose("positive", "We ___ in the garden.", "work", "works"),
        choose("positive", "He ___ his friends after school.", "meets", "meet"),
        choose("negative", "They ___ watch birds.", "don’t", "doesn’t"),
        choose("negative", "Katie ___ play football.", "doesn’t", "don’t"),
        choose("positive", "My friends ___ to music.", "listen", "listens"),
        choose("watch", "My brother ___ films.", "watches", "watch"),
        choose("special", "She ___ to school by bike.", "goes", "go"),
        choose("negative", "I don’t ___ sport on Mondays.", "do", "does")
      ],
      [
        choose("watch", "Katie ___ birds on Saturdays.", "watches", "watchs", "watch"),
        choose("special", "My sister ___ a bike.", "has", "have", "haves"),
        choose("special", "My friend ___ sport every day.", "does", "do", "dos"),
        choose("special", "Kira ___ to the park every day.", "goes", "go", "gos"),
        choose("negative", "He ___ a dog.", "doesn’t have", "doesn’t has", "don’t have"),
        choose("negative", "Katie and Kira ___ TV every day.", "don’t watch", "doesn’t watch", "don’t watches"),
        pair("positive", "Bees → ___ flowers.", "like", "likes", "liks"),
        pair("positive", "Water → ___ plants grow.", "helps", "help", "helpes"),
        choose("never", "Er spielt nie Fußball.", "He never plays football.", "He doesn’t never play football.", "He never play football."),
        choose("negative", "Finde den Satz mit einem Fehler.", "She doesn’t goes to the park.", "She goes to the park.", "She doesn’t go to the park.")
      ],
      [
        build("positive", "Baue den Satz. Katie mag Blumen.", "Katie likes flowers."),
        build("frequency", "Baue den Satz. Beginne mit I often.", "I often listen to music."),
        build("negative", "Baue den Satz. Wir spielen keinen Fußball.", "We don’t play football."),
        build("special", "Baue den Satz. Er hat einen Hund.", "He has a dog.", "have"),
        build("watch", "Baue den Satz. Kira schaut Filme.", "Kira watches films.", "watch"),
        build("negative", "Baue den Satz. Sie macht keinen Sport.", "She doesn’t do sport.", "does"),
        build("positive", "Baue den Satz. Sonnenblumen brauchen Wasser.", "Sunflowers need water."),
        build("frequency", "Baue den Satz. Sie fährt jeden Tag mit dem Rad zur Schule. Beginne mit She.", "She goes to school by bike every day."),
        build("negative", "Baue den Satz. Beginne mit They don’t.", "They don’t work in the garden.", "works"),
        build("never", "Baue den Satz. Er steht nie früh auf.", "He never gets up early.", "doesn’t")
      ],
      [
        pair("special", "My sister → ___ a picnic in the park.", "has", "have", "haves"),
        pair("positive", "My grandparents → ___ animals.", "love", "loves", "lovees"),
        choose("negative", "Wähle die richtige Verbesserung: He don’t need water.", "He doesn’t need water.", "He doesn’t needs water.", "He don’t needs water."),
        build("negative", "Baue den Satz. Kira schaut keine Tierfilme.", "Kira doesn’t watch animal films.", "don’t", "watches"),
        build("special", "Baue den Satz. Meine Schwester macht jeden Tag Sport. Beginne mit My sister.", "My sister does sport every day.", "do", "has"),
        choose("watch", "Finde den Satz mit einem Fehler.", "My brother watchs birds.", "My brother watches birds.", "My brothers watch birds."),
        pair("negative", "They (−) → ___ a big garden.", "don’t have", "doesn’t have", "don’t has"),
        build("never", "Baue den Satz. Beginne mit My brother never.", "My brother never gets up early.", "doesn’t", "get"),
        choose("special", "Katie ___ (+) a bike, but Kira ___ (−) a bike.", "has / doesn’t have", "have / doesn’t has", "has / don’t have"),
        build("frequency", "Baue den Satz. Beginne mit We usually.", "We usually have a picnic in the park.", "has", "does")
      ],
      [
        write("watch", "Setze watch in der richtigen Form ein.", "Katie ___ birds every day.", "watches"),
        write("special", "Setze go in der richtigen Form ein.", "My sister ___ to school by bike.", "goes"),
        pair("special", "Kira → ___ a bike.", "has", "have", "haves"),
        write("negative", "Schreibe die Verneinung von play in die Lücke.", "She ___ football.", "doesn’t play"),
        write("negative", "Schreibe die Verneinung von need in die Lücke.", "We ___ water.", "don’t need"),
        fix("special", "My brother gos to the park.", "My brother goes to the park."),
        fix("negative", "Katie doesn’t watches films.", "Katie doesn’t watch films."),
        write("frequency", "Schreibe den ganzen Satz. Setze often direkt nach I.", "I / often / listen to music", "I often listen to music."),
        write("positive", "Schreibe den ganzen Satz.", "Bees / like / flowers", "Bees like flowers."),
        write("negative", "Verneine den Satz. Schreibe ihn ganz.", "He has a dog.", "He doesn’t have a dog.")
      ],
      [
        choose("positive", "Wähle den richtigen Satz über Pflanzen.", "Plants need water.", "Plants needs water.", "Plants needes water."),
        pair("special", "She → ___ sport on Mondays.", "does", "do", "dos"),
        choose("negative", "Finde den Satz mit einem Fehler.", "Kira doesn’t likes flowers.", "Kira likes flowers.", "Kira doesn’t like flowers."),
        build("frequency", "Baue den Satz. Beginne mit Katie usually.", "Katie usually goes to school by bike.", "go", "does"),
        build("negative", "Baue den Satz. Beginne mit They.", "They don’t work in the garden every day.", "doesn’t", "works"),
        write("special", "Ergänze die passende Form von have.", "My friend ___ a big garden.", "has"),
        fix("watch", "My sister watchs films.", "My sister watches films."),
        write("positive", "Schreibe den ganzen Satz.", "Water / help / plants / grow", "Water helps plants grow."),
        write("negative", "Verneine den Satz. Schreibe ihn ganz.", "My brother goes to the park on Mondays.", "My brother doesn’t go to the park on Mondays."),
        write("never", "Schreibe den ganzen Satz. Beginne mit She never.", "She / never / play / football", "She never plays football.")
      ]
    ]
  },
  questions: {
    title: "Questions and answers",
    description: "Fragen, Fragewörter und passende Kurzantworten",
    levels: [
      [
        choose("question", "___ you play football?", "Do", "Does"),
        choose("question", "___ Kira like flowers?", "Does", "Do"),
        choose("question", "___ they watch birds?", "Do", "Does"),
        choose("question", "Does she ___ a dog?", "have", "has"),
        choose("short", "Do you listen to music? (+)", "Yes, I do.", "Yes, I does."),
        choose("short", "Does he play football? (−)", "No, he doesn’t.", "No, he don’t."),
        choose("short", "Do they go to school by bike? (−)", "No, they don’t.", "No, they doesn’t."),
        choose("question", "___ your brother watch films?", "Does", "Do"),
        choose("short", "Does Katie like flowers? (+)", "Yes, she does.", "Yes, she do."),
        choose("question", "___ Kira and Katie work in the garden?", "Do", "Does")
      ],
      [
        choose("question", "Wähle die richtige Frage.", "Does she watch birds?", "Does she watches birds?", "Do she watch birds?"),
        pair("wh", "In the park. → ___ do they watch birds?", "Where", "When", "How"),
        pair("wh", "On Mondays. → ___ does she play football?", "When", "Where", "Who"),
        pair("wh", "By bike. → ___ do you go to school?", "How", "When", "What"),
        pair("wh", "Bottles. → ___ do they collect at school?", "What", "When", "Where"),
        pair("wh", "Every day. → ___ do you listen to music?", "How often", "How many", "How"),
        pair("wh", "Three friends. → ___ friends do you meet?", "How many", "How often", "When"),
        choose("short", "Does your brother do sport? (−)", "No, he doesn’t.", "No, he don’t.", "Yes, he does."),
        choose("wh", "Finde die Frage mit einem Fehler.", "Where she does work?", "Where does she work?", "Where do they work?"),
        choose("short", "Do you and Kira watch films? (+)", "Yes, we do.", "Yes, I do.", "Yes, we does.")
      ],
      [
        build("question", "Baue die Frage. Spielst du Fußball?", "Do you play football?"),
        build("question", "Baue die Frage. Mag Katie Blumen?", "Does Katie like flowers?", "likes"),
        build("question", "Baue die Frage. Schauen sie Vögel an?", "Do they watch birds?", "Does"),
        build("wh", "Baue die Frage. Wo arbeitet sie?", "Where does she work?", "works"),
        build("wh", "Baue die Frage. Wann machst du Sport?", "When do you do sport?"),
        build("wh", "Baue die Frage. Wie kommst du zur Schule?", "How do you go to school?", "does"),
        build("wh", "Baue die Frage. Was sammeln sie?", "What do they collect?", "Where"),
        build("wh", "Baue die Frage. Wie oft schaut er Filme?", "How often does he watch films?", "watches"),
        build("short", "Baue eine bejahte Kurzantwort. Does Kira work in the garden?", "Yes, she does.", "do."),
        build("short", "Baue eine verneinte Kurzantwort. Do they have a dog?", "No, they don’t.", "doesn’t.")
      ],
      [
        choose("who", "Wer hilft dir?", "Who helps you?", "Who do you help?", "Who do helps you?"),
        choose("who", "Wem hilft sie?", "Who does she help?", "Who helps her?", "Who does she helps?"),
        pair("becan", "Can you swim? (−)", "No, I can’t.", "No, I don’t.", "No, I’m not."),
        pair("becan", "Are you eleven? (+)", "Yes, I am.", "Yes, I do.", "Yes, I can."),
        pair("becan", "Is Katie at home? (−)", "No, she isn’t.", "No, she doesn’t.", "No, I’m not."),
        build("wh", "Baue die Frage. Wie viele Freunde triffst du?", "How many friends do you meet?", "often", "does"),
        build("who", "Baue die Frage. Wer schaut mit dir Filme?", "Who watches films with you?", "do", "watch"),
        build("who", "Baue die Frage. Wen trifft sie nach der Schule?", "Who does she meet after school?", "meets", "do"),
        choose("question", "Verbessere die Frage: Does he has a bike?", "Does he have a bike?", "Do he have a bike?", "Does he haves a bike?"),
        pair("wh", "I meet Kira. → ___ do you meet after school?", "Who", "Where", "When")
      ],
      [
        choose("question", "___ Katie ride a bike?", "Does", "Do", "Is"),
        write("question", "Ergänze die passende Form von have.", "Does your friend ___ a dog?", "have"),
        write("wh", "Ergänze das Fragewort. Die Antwort hilft dir.", "___ do you work? – In the garden.", "Where"),
        write("wh", "Ergänze den Frageausdruck. Die Antwort hilft dir.", "___ do you watch films? – Every day.", "How often"),
        write("short", "Schreibe eine ganze verneinte Kurzantwort.", "Does Kira have a dog?", "No, she doesn’t."),
        write("becan", "Schreibe eine ganze bejahte Kurzantwort.", "Is Katie at home?", "Yes, she is."),
        write("who", "Schreibe auf Englisch. Verwende help.", "Wer hilft dir?", "Who helps you?"),
        write("question", "Schreibe die vollständige Frage.", "she / play football", "Does she play football?"),
        write("wh", "Verbessere die Frage und schreibe sie ganz.", "Where does he works?", "Where does he work?"),
        write("wh", "Schreibe die vollständige Frage.", "When / you / meet your friends", "When do you meet your friends?")
      ],
      [
        choose("who", "Wen trifft Kira nach der Schule?", "Who does Kira meet after school?", "Who meets Kira after school?", "Who does Kira meets after school?"),
        pair("wh", "Two friends. → ___ friends play football with you?", "How many", "How often", "Where"),
        choose("question", "Finde die Frage mit einem Fehler.", "Does she goes to school by bike?", "Does she go to school by bike?", "Do they go to school by bike?"),
        build("wh", "Baue die Frage. Wie oft schaut Kira Filme?", "How often does Kira watch films?", "do", "watches"),
        build("who", "Baue die Frage. Wer hilft Kira im Garten?", "Who helps Kira in the garden?", "does", "help"),
        write("question", "Ergänze die passende Form von do.", "Does Kira ___ sport every day?", "do"),
        write("becan", "Schreibe eine ganze verneinte Kurzantwort.", "Can you swim?", "No, I can’t."),
        write("short", "Schreibe eine ganze bejahte Kurzantwort.", "Do you and Kira work in the garden?", "Yes, we do."),
        write("wh", "Verbessere die Frage und schreibe sie ganz.", "Where he does watch birds?", "Where does he watch birds?"),
        write("who", "Schreibe auf Englisch. Verwende help.", "Wem hilfst du?", "Who do you help?")
      ]
    ]
  }
};

const storageKey = "simple-present-challenge-class6-v1";
const ids = Object.keys(chapters);
const levelNames = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Final Boss"];
const levelSkills = ["Formen auswählen", "Formen und Fehler unterscheiden", "Sätze aus Bausteinen bauen", "Aufgaben im Wechsel lösen", "Selbst schreiben", "Das ganze Kapitel anwenden"];
const emptyProgress = () => Object.fromEntries(ids.map(id => [id, Array(6).fill(null)]));
const app = document.querySelector("#app");
let progress = emptyProgress();
let storageAvailable = true;
let round;

function readProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return Object.fromEntries(ids.map(id => [id, Array.from({ length: 6 }, (_, i) => {
      const score = saved?.[id]?.[i];
      return Number.isInteger(score) && score >= 0 && score <= 10 ? score : null;
    })]));
  } catch {
    return emptyProgress();
  }
}

try {
  localStorage.getItem(storageKey);
  progress = readProgress();
} catch {
  storageAvailable = false;
}

function save(score) {
  const current = readProgress();
  const { id, level } = round;
  current[id][level] = Math.max(current[id][level] ?? 0, score);
  if (!storageAvailable) {
    progress[id][level] = Math.max(progress[id][level] ?? 0, score);
    return;
  }
  progress = current;
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {
    storageAvailable = false;
  }
}

const stars = score => score === 10 ? 3 : score >= 8 ? 2 : score >= 7 ? 1 : 0;
const passed = scores => scores.filter(score => score >= 7).length;
const starCount = scores => scores.reduce((sum, score) => sum + stars(score), 0);
const unlocked = (id, level) => progress[id].slice(0, level).every(score => score >= 7);

function normalize(value) {
  return value.toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\b(don't|doesn't|can't|isn't|aren't|i'm)\b/g, word => ({
      "don't": "do not", "doesn't": "does not", "can't": "can not",
      "isn't": "is not", "aren't": "are not", "i'm": "i am"
    })[word])
    .replace(/\bcannot\b/g, "can not")
    .replace(/\s*,\s*/g, " ")
    .trim()
    .replace(/[.!?]+$/, "")
    .replace(/\s+/g, " ")
    .trim();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

const english = value => '<span lang="en">' + escapeHtml(value) + '</span>';
const meter = (value, max, label) => `<progress value="${value}" max="${max}" aria-label="${label}"></progress>`;
const starLine = score => `<span class="stars" aria-label="${stars(score)} von 3 Sternen">${"★".repeat(stars(score))}${"☆".repeat(3 - stars(score))}</span>`;

function display(html) {
  app.innerHTML = html + (storageAvailable ? "" : '<p class="storage-note">Der Browser kann den Fortschritt gerade nur bis zum Schließen oder Neuladen der Seite behalten.</p>');
  window.scrollTo(0, 0);
  app.querySelector("h1")?.focus({ preventScroll: true });
}

function showHome() {
  const total = ids.flatMap(id => progress[id]);
  display(`
    <section class="hero">
      <div><h1 tabindex="-1" lang="en">Simple Present<br>Challenge</h1>
      <p>Wähle ein Kapitel. Mit mindestens 7 von 10 richtigen Antworten schaltest du die nächste Stufe frei.</p></div>
      <div class="overview">
        <strong>Gesamtfortschritt</strong>
        ${meter(passed(total), 12, "Gesamtfortschritt")}
        <span>${passed(total)} von 12 Stufen bestanden</span>
        <span class="star-total">★ ${starCount(total)} von 36 Sternen</span>
      </div>
    </section>
    <div class="chapter-grid">
      ${ids.map((id, i) => `
        <a class="panel chapter ${id}" href="#${id}">
          <span class="chapter-label">Kapitel ${i + 1}</span>
          <h2 lang="en">${chapters[id].title}</h2>
          <p>${chapters[id].description}</p>
          ${meter(passed(progress[id]), 6, "Kapitel " + (i + 1))}
          <div class="chapter-meta"><span>${passed(progress[id])} von 6 bestanden · ★ ${starCount(progress[id])}/18</span><strong>Kapitel öffnen →</strong></div>
        </a>`).join("")}
    </div>
    <button class="secondary reset" id="reset">Fortschritt zurücksetzen</button>`);

  document.querySelector("#reset").onclick = () => {
    if (!window.confirm("Alle Ergebnisse und Sterne beider Kapitel löschen?")) return;
    try {
      localStorage.removeItem(storageKey);
    } catch {
      storageAvailable = false;
    }
    progress = emptyProgress();
    showHome();
  };
}

function nav(id, insideLevel = false) {
  return `<nav aria-label="Navigation"><a href="#start">← Kapitelauswahl</a>
    ${insideLevel ? `<a href="#${id}">Levelübersicht</a>` : ""}</nav>`;
}

function showLevels(id) {
  const scores = progress[id];
  const total = ids.flatMap(key => progress[key]);
  display(`<div class="${id}">
    ${nav(id)}
    <section class="section-head">
      <h1 tabindex="-1" lang="en">${chapters[id].title}</h1>
      <p>${chapters[id].description}</p>
      ${meter(passed(scores), 6, "Kapitel-Fortschritt")}
      <div class="chapter-meta"><span>${passed(scores)} von 6 Stufen bestanden · ★ ${starCount(scores)}/18</span><span>Gesamt · ${passed(total)} von 12</span></div>
    </section>
    <div class="levels">
      ${levelNames.map((name, level) => {
        const score = scores[level];
        const open = unlocked(id, level);
        const details = `<strong lang="en">${name}</strong><span>${levelSkills[level]}</span>
          ${open ? `<span class="level-status">${score === null ? "Spielbereit" : "Bestes Ergebnis · " + score + "/10"} ${starLine(score)}</span>` :
            `<span class="level-status">Gesperrt · ${levelNames[level - 1]} bestehen</span>`}`;
        return open
          ? `<a class="panel level" href="#${id}/${level + 1}">${details}</a>`
          : `<div class="panel level locked">${details}</div>`;
      }).join("")}
    </div>
  </div>`);
}

function route() {
  round = undefined;
  const [id, target] = location.hash.slice(1).split("/");
  if (!ids.includes(id)) return showHome();
  const level = levelNames.findIndex((_, i) => String(i + 1) === target);
  if (level < 0 || !unlocked(id, level)) return showLevels(id);
  startRound(id, level);
}

function startRound(id, level) {
  const tasks = chapters[id].levels[level];
  round = { id, level, tasks, position: 0, score: 0 };
  showTask();
}

function answerControls(task) {
  if (task.type === "write") {
    return '<label for="answer">Deine Antwort auf Englisch</label><input id="answer" name="answer" lang="en" type="text" autocomplete="off" autocorrect="off" spellcheck="false" required><button class="primary" type="submit">Prüfen</button>';
  }
  const options = shuffle(task.options);
  if (task.type === "build") {
    return `<div class="sentence" id="sentence" role="group" aria-label="Deine Satzbausteine"></div>
      <div class="tiles" id="tiles" role="group" aria-label="Verfügbare Satzbausteine">
        ${options.map((word, i) => `<button type="button" class="tile" data-tile="${i}" lang="en">${escapeHtml(word)}</button>`).join("")}
      </div>
      <button class="primary" type="submit" disabled>Prüfen</button>`;
  }
  return `<div class="options">
    ${options.map(option => `<button class="option" type="button" data-option="${escapeHtml(option)}">${english(option)}</button>`).join("")}
  </div>`;
}

function showTask() {
  const { id, level, position, tasks } = round;
  const task = tasks[position];
  const hint = level === 5 ? bossHints[task.rule] : rules[task.rule][0];
  const instruction = task.instruction ?? (
    task.prompt.endsWith("(+)") ? "Wähle die bejahte Kurzantwort." :
    task.prompt.endsWith("(−)") ? "Wähle die verneinte Kurzantwort." :
    task.type === "pair" ? "Ordne die passende Ergänzung zu." : "Tippe die passende Antwort an."
  );
  display(`<div class="${id} task-shell">
    ${nav(id, true)}
    <section class="panel task">
      <div class="task-meta"><span lang="en">${levelNames[level]}</span><span>Aufgabe ${position + 1} von 10</span></div>
      ${meter(position + 1, 10, "Aufgabe im Level")}
      <div class="chapter-meta"><span>Kapitel · ${passed(progress[id])}/6 bestanden</span><span>Gesamt · ${passed(ids.flatMap(key => progress[key]))}/12 bestanden</span></div>
      <h1 tabindex="-1">${escapeHtml(instruction)}</h1>
      ${task.prompt ? `<p class="prompt" ${/^(Wähle|Finde|Verbessere|Wer |Wem |Wen |Er spielt)/.test(task.prompt) ? "" : 'lang="en"'}>${escapeHtml(task.prompt.replace(/ \([+−]\)$/, ""))}</p>` : ""}
      ${task.type === "build" ? '<p class="muted">Tippe die Wörter in der richtigen Reihenfolge an. Tippe ein gewähltes Wort erneut an, um es zu entfernen.</p>' : ""}
      <details class="hint"><summary>Tipp auf Deutsch</summary><p>${hint}</p></details>
      <form id="answer-form">${answerControls(task)}</form>
      <div id="feedback" aria-live="polite"></div>
    </section></div>`);

  const form = document.querySelector("#answer-form");
  const selected = [];
  form.querySelectorAll("[data-option]").forEach(button => {
    button.onclick = () => grade(task, button.dataset.option, form);
  });

  if (task.type === "build") {
    const sentence = form.querySelector("#sentence");
    const tiles = [...form.querySelectorAll("[data-tile]")];
    const submit = form.querySelector('[type="submit"]');
    const update = focusTile => {
      sentence.innerHTML = "";
      for (const tile of tiles) tile.disabled = selected.includes(tile);
      for (const tile of selected) {
        const token = document.createElement("button");
        token.type = "button";
        token.className = "tile chosen";
        token.lang = "en";
        token.textContent = tile.textContent;
        token.setAttribute("aria-label", tile.textContent + " entfernen");
        token.onclick = () => {
          selected.splice(selected.indexOf(tile), 1);
          update(tile);
        };
        sentence.append(token);
      }
      submit.disabled = selected.length === 0;
      focusTile?.focus();
    };
    for (const tile of tiles) tile.onclick = () => {
      selected.push(tile);
      update(tiles.find(item => !selected.includes(item)) || submit);
    };
  }

  form.onsubmit = event => {
    event.preventDefault();
    const answer = task.type === "build" ? selected.map(tile => tile.textContent).join(" ") : form.elements.answer?.value;
    if (answer?.trim()) grade(task, answer, form);
  };
}

function grade(task, answer, form) {
  if (form.dataset.graded) return;
  form.dataset.graded = "true";
  const correct = task.type === "choice" || task.type === "pair"
    ? answer === task.answer
    : [task.answer, ...(task.variants ?? [])].some(value => normalize(answer) === normalize(value));
  if (correct) round.score++;
  for (const control of form.elements) {
    if (control.matches("input")) control.readOnly = true;
    else control.disabled = true;
    if (control.dataset.option === task.answer) control.classList.add("correct");
    if (!correct && control.dataset.option === answer) control.classList.add("incorrect");
  }
  const last = round.position === round.tasks.length - 1;
  if (last) save(round.score);
  const feedback = document.querySelector("#feedback");
  feedback.innerHTML = `<div class="feedback ${correct ? "good" : "wrong"}">
    <strong>${correct ? "Richtig!" : "Das war noch nicht richtig."}</strong>
    ${correct ? "" : `<p><strong>Lösung:</strong> ${english(task.answer)}</p><p>${rules[task.rule][1]}</p>`}
    </div><button class="primary" id="next">${last ? "Ergebnis ansehen" : "Nächste Aufgabe"}</button>`;
  const next = document.querySelector("#next");
  next.onclick = () => {
    if (last) return showResult();
    round.position++;
    showTask();
  };
  next.focus();
}

function showResult() {
  const { id, level, score } = round;
  const success = score >= 7;
  display(`<div class="${id} task-shell">
    ${nav(id, true)}
    <section class="panel task result">
      <p class="task-meta" lang="en">${levelNames[level]}</p>
      <h1 tabindex="-1">${success ? "Bestanden!" : "Versuch es noch einmal"}</h1>
      <p class="score">${score}/10 richtig</p>
      ${starLine(score)}
      <p>${success ? (level < 5 ? levelNames[level + 1] + " ist spielbereit." : "Du hast alle Stufen dieses Kapitels bestanden.") : "Zum Bestehen brauchst du mindestens 7 richtige Antworten."}</p>
      <p>Bestes Ergebnis · ${progress[id][level]}/10</p>
      <div class="actions">
        ${success && level < 5 ? `<a class="primary" href="#${id}/${level + 2}">Weiter zu ${levelNames[level + 1]}</a>` : ""}
        <button class="secondary" id="replay">Erneut spielen</button>
      </div>
    </section></div>`);
  document.querySelector("#replay").onclick = () => startRound(id, level);
}

window.addEventListener("hashchange", route);
window.addEventListener("storage", event => {
  if (event.key === storageKey || event.key === null) {
    progress = readProgress();
    if (!round) route();
  }
});
route();
