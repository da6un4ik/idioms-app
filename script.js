const IDIOM_DATA = [
    {
        id: 1,
        text: "Ser pan comido",
        meaning: "Быть очень легким, проще простого.",
        example: "No te preocupes por el examen, ¡será pan comido!",
        image: "assets/ser_pan_comido.jpg", 
        audio_main: "assets/audio/ser_pan_comido.mp3",
        audio_example: "assets/audio/example_pan_comido.mp3",
        exercises: [
            { id: "ex1", type: "Выбор значения", question: "Что означает эта идиома?", options: ["Очень вкусно", "Очень легким", "Очень быстрым"], answer: "Очень легким" },
            { id: "ex2", type: "Вставка слова", question: "Дополни фразу:", prompt: "El examen es pan ___.", answer: "comido" },
            { id: "ex3", type: "Сопоставление", question: "Найди пары:", pairs: [["Pan comido", "Раз плюнуть"], ["Examen", "Тест"], ["Fácil", "Легко"]] },
            { id: "ex4", type: "Конструктор", question: "Собери фразу:", words: ["SERÁ", "PAN", "COMIDO"], answer: "SERÁ PAN COMIDO" },
            { id: "ex5", type: "Разговорный тест", dialogue: "— ¿Crees que el test es difícil?", question: "Выберите логичный ответ:", options: ["No, es pan comido.", "Sí, pan."], answer: "No, es pan comido." }
        ]
    }
];

function playAudio(path) {
    new Audio(path).play().catch(e => console.log("Audio error:", e));
}

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'screen-dashboard') renderDashboard();
}

function renderDashboard() {
    const dash = document.getElementById('screen-dashboard');
    const idiom = IDIOM_DATA[0];
    dash.innerHTML = `
        <div style="height:400px; background: linear-gradient(to top, #141414, transparent), url('${idiom.image}') center/cover; padding:20px; display:flex; align-items:flex-end;">
            <div>
                <h1>${idiom.text} <span class="audio-btn" onclick="playAudio('${idiom.audio_main}')">🔊</span></h1>
                <button class="check-btn" style="width:auto; padding:10px 30px;" onclick="renderDetail(${idiom.id})">▶ Изучать</button>
            </div>
        </div>
    `;
}

function renderDetail(id) {
    const idiom = IDIOM_DATA.find(i => i.id === id);
    const detail = document.getElementById('screen-detail');
    detail.innerHTML = `
        <button onclick="showScreen('screen-dashboard')" style="background:none; color:white; font-size:24px; border:none; margin-bottom:20px;">←</button>
        <div style="margin-bottom:25px;">
            <img src="${idiom.image}" style="width:100%; border-radius:8px;">
            <h2>${idiom.text} <span class="audio-btn" onclick="playAudio('${idiom.audio_main}')">🔊</span></h2>
            <p style="color:#aaa;">${idiom.meaning}</p>
            <div style="background:#333; padding:15px; border-radius:4px;">
                <strong>Пример:</strong> ${idiom.example} <span class="audio-btn" onclick="playAudio('${idiom.audio_example}')">🔊</span>
            </div>
        </div>
        <div class="exercise-grid">${idiom.exercises.map(ex => renderExercise(ex)).join('')}</div>`;
    showScreen('screen-detail');
}

function renderExercise(ex) {
    let content = '';
    if (ex.type === "Выбор значения" || ex.type === "Разговорный тест") {
        const diag = ex.dialogue ? `<p style="color:#aaa; border-left:3px solid #E50914; padding-left:15px; font-style:italic; margin-bottom:10px;">${ex.dialogue}</p>` : '';
        content = diag + ex.options.map(opt => `<label class="radio-options" onclick="selectRadio(this)"><input type="radio" name="${ex.id}" value="${opt}"> <span>${opt}</span></label>`).join('');
    } else if (ex.type === "Вставка слова") {
        content = `<p>${ex.prompt}</p><input type="text" id="in-${ex.id}" style="width:100%; padding:12px; background:#141414; color:#fff; border:1px solid #444; border-radius:4px;">`;
    } else if (ex.type === "Конструктор") {
        content = `<div class="sentence-area" id="res-${ex.id}"></div><div class="word-bank">${ex.words.map(w => `<button class="word-chip" onclick="moveWord(this, '${ex.id}')">${w}</button>`).join('')}</div>`;
    } else if (ex.type === "Сопоставление") {
        const left = ex.pairs.map(p => p[0]);
        const right = [...ex.pairs.map(p => p[1])].sort(() => Math.random() - 0.5);
        content = `<div class="matching-grid">
            <div>${left.map(l => `<div class="match-item" onclick="handleMatch(this, '${ex.id}')">${l}</div>`).join('')}</div>
            <div>${right.map(r => `<div class="match-item" onclick="handleMatch(this, '${ex.id}')">${r}</div>`).join('')}</div>
        </div>`;
    }
    return `<div class="exercise-block" id="block-${ex.id}"><h4>${ex.type}</h4><p>${ex.question}</p>${content}<div id="feed-${ex.id}"></div><button class="check-btn" onclick="checkAnswer('${ex.id}')">ПРОВЕРИТЬ</button></div>`;
}

function selectRadio(el) {
    el.parentElement.querySelectorAll('.radio-options').forEach(r => r.classList.remove('selected-radio'));
    el.classList.add('selected-radio');
    el.querySelector('input').checked = true;
}

function moveWord(btn, id) {
    const area = document.getElementById(`res-${id}`);
    const bank = btn.closest('.exercise-block').querySelector('.word-bank');
    (btn.parentElement === area ? bank : area).appendChild(btn);
}

let firstMatch = null;
function handleMatch(item, id) {
    if (item.classList.contains('matched')) return;
    if (!firstMatch) { firstMatch = item; item.classList.add('selected'); } 
    else {
        if (firstMatch === item) { item.classList.remove('selected'); firstMatch = null; return; }
        const ex = IDIOM_DATA[0].exercises.find(e => e.id === id);
        const match = ex.pairs.some(p => (p[0] === firstMatch.innerText && p[1] === item.innerText) || (p[1] === firstMatch.innerText && p[0] === item.innerText));
        if (match) { item.classList.add('matched'); firstMatch.classList.add('matched'); }
        firstMatch.classList.remove('selected'); firstMatch = null;
    }
}

function checkAnswer(exId) {
    const ex = IDIOM_DATA[0].exercises.find(e => e.id === exId);
    const block = document.getElementById(`block-${exId}`);
    const feed = document.getElementById(`feed-${exId}`);
    let correct = false;

    if (ex.type === "Выбор значения" || ex.type === "Разговорный тест") {
        const sel = block.querySelector('input:checked');
        correct = sel && sel.value === ex.answer;
    } else if (ex.type === "Вставка слова") {
        correct = document.getElementById(`in-${exId}`).value.trim().toLowerCase() === ex.answer.toLowerCase();
    } else if (ex.type === "Конструктор") {
        correct = Array.from(document.getElementById(`res-${exId}`).children).map(c => c.innerText).join(' ') === ex.answer;
    } else if (ex.type === "Сопоставление") {
        correct = block.querySelectorAll('.matched').length === ex.pairs.length * 2;
    }

    feed.innerHTML = correct ? '<span class="correct">✅ Верно!</span>' : '<span style="color:#E50914;">❌ Ошибка</span>';
}

document.querySelectorAll('#bottom-nav button').forEach(b => b.onclick = () => showScreen(`screen-${b.dataset.screen}`));
showScreen('screen-dashboard');
