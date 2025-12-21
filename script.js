const IDIOM_DATA = [
    {
        id: 1,
        text: "Ser pan comido",
        meaning: "Проще простого (раз плюнуть)",
        example: "No te preocupes, ¡será pan comido!",
        meme_url: "https://via.placeholder.com/600x400/000/fff?text=Ser+Pan+Comido", // Замени на свою
        exercises: [
            { id: "ex1", type: "Выбор значения", question: "Что это значит?", options: ["Очень вкусно", "Очень легко", "Очень быстро"], answer: "Очень легко" },
            { id: "ex2", type: "Вставка слова", question: "Дополни:", prompt: "Es pan ____.", answer: "comido" },
            { id: "ex3", type: "Сопоставление", question: "Найди пары:", pairs: [["Pan comido", "Легко"], ["Difícil", "Трудно"]] },
            { id: "ex4", type: "Конструктор", question: "Собери фразу:", words: ["No", "te", "preocupes"], answer: "No te preocupes" },
            { id: "ex5", type: "Диалог", dialogue: "¿Es difícil?", question: "Ответь:", options: ["No, es pan comido.", "Sí, pan."], answer: "No, es pan comido." }
        ]
    }
];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    document.querySelectorAll('#bottom-nav button').forEach(b => {
        b.classList.toggle('active', b.dataset.screen === id.replace('screen-', ''));
    });
    if(id === 'screen-dashboard') renderDashboard();
    if(id === 'screen-catalog') renderCatalog();
}

function renderDashboard() {
    const dash = document.getElementById('screen-dashboard');
    const idiom = IDIOM_DATA[0];
    dash.innerHTML = `
        <div class="netflix-hero" style="background-image: linear-gradient(to top, #141414, transparent), url('${idiom.meme_url}')">
            <div class="hero-content">
                <h1 class="hero-title">${idiom.text}</h1>
                <button class="play-btn" onclick="renderDetail(${idiom.id})">▶ Изучать</button>
            </div>
        </div>
        <div class="dashboard-section-title">Популярно сейчас</div>
        <div id="quick-list"></div>
    `;
}

function renderCatalog() {
    const list = document.getElementById('idiom-list');
    list.innerHTML = '<div class="dashboard-section-title">Все серии</div>';
    IDIOM_DATA.forEach(idiom => {
        list.innerHTML += `
            <div class="netflix-card" onclick="renderDetail(${idiom.id})">
                <div class="card-thumb" style="background-image: url('${idiom.meme_url}')"></div>
                <div class="card-body"><span class="card-title">${idiom.text}</span></div>
            </div>`;
    });
}

function renderDetail(id) {
    const idiom = IDIOM_DATA.find(i => i.id === id);
    const detail = document.getElementById('screen-detail');
    detail.innerHTML = `
        <button onclick="showScreen('screen-dashboard')" style="background:none; color:white; font-size:24px; border:none; margin-bottom:10px;">←</button>
        <div class="exercise-grid">
            ${idiom.exercises.map(ex => renderExercise(ex)).join('')}
        </div>`;
    showScreen('screen-detail');
}

function renderExercise(ex) {
    let content = '';
    if (ex.type === "Выбор значения" || ex.type === "Диалог") {
        content = (ex.dialogue ? `<p style="color:#aaa; border-left:2px solid #E50914; padding-left:10px;">${ex.dialogue}</p>` : '') +
            ex.options.map(opt => `
            <label class="radio-options" onclick="this.parentElement.querySelectorAll('.radio-options').forEach(r=>r.classList.remove('selected-radio')); this.classList.add('selected-radio')">
                <input type="radio" name="${ex.id}" value="${opt}"> ${opt}
            </label>`).join('');
    } else if (ex.type === "Вставка слова") {
        content = `<p>${ex.prompt}</p><input type="text" id="in-${ex.id}">`;
    } else if (ex.type === "Конструктор") {
        content = `<div class="sentence-area" id="res-${ex.id}"></div>
                   <div class="word-bank">${ex.words.map(w => `<span class="word-chip" onclick="moveWord(this, '${ex.id}')">${w}</span>`).join('')}</div>`;
    } else if (ex.type === "Сопоставление") {
        const left = ex.pairs.map(p => p[0]).sort();
        const right = ex.pairs.map(p => p[1]).sort();
        content = `<div class="matching-grid">
            <div class="matching-column">${left.map(l => `<div class="match-item" onclick="handleMatch(this, '${ex.id}')">${l}</div>`).join('')}</div>
            <div class="matching-column">${right.map(r => `<div class="match-item" onclick="handleMatch(this, '${ex.id}')">${r}</div>`).join('')}</div>
        </div>`;
    }

    return `
        <div class="exercise-block" id="block-${ex.id}">
            <h4>${ex.type}</h4>
            <p>${ex.question}</p>
            ${content}
            <div id="feed-${ex.id}"></div>
            <button class="check-btn" onclick="checkAnswer('${ex.id}')">Проверить</button>
        </div>`;
}

function moveWord(chip, id) {
    const area = document.getElementById(`res-${id}`);
    const bank = document.querySelector(`#block-${id} .word-bank`);
    (chip.parentElement === area ? bank : area).appendChild(chip);
}

let firstMatch = null;
function handleMatch(item, id) {
    if (item.classList.contains('matched')) return;
    if (!firstMatch) {
        firstMatch = item; item.classList.add('selected');
    } else {
        if (firstMatch === item) { item.classList.remove('selected'); firstMatch = null; return; }
        const ex = IDIOM_DATA[0].exercises.find(e => e.id === id);
        const isCorrect = ex.pairs.some(p => (p[0] === firstMatch.innerText && p[1] === item.innerText) || (p[1] === firstMatch.innerText && p[0] === item.innerText));
        if (isCorrect) {
            item.classList.add('matched'); firstMatch.classList.add('matched');
        }
        firstMatch.classList.remove('selected'); firstMatch = null;
    }
}

function checkAnswer(exId) {
    const ex = IDIOM_DATA[0].exercises.find(e => e.id === exId);
    const block = document.getElementById(`block-${exId}`);
    const feed = document.getElementById(`feed-${exId}`);
    let isCorrect = false;

    if (ex.type === "Выбор значения" || ex.type === "Диалог") {
        const sel = block.querySelector('input:checked');
        isCorrect = sel && sel.value === ex.answer;
    } else if (ex.type === "Вставка слова") {
        isCorrect = document.getElementById(`in-${exId}`).value.trim().toLowerCase() === ex.answer.toLowerCase();
    } else if (ex.type === "Конструктор") {
        isCorrect = Array.from(document.getElementById(`res-${exId}`).children).map(c => c.innerText).join(' ') === ex.answer;
    } else if (ex.type === "Сопоставление") {
        isCorrect = block.querySelectorAll('.matched').length === ex.pairs.length * 2;
    }

    feed.innerHTML = isCorrect ? '<span class="correct">✅ Отлично!</span>' : '<span class="incorrect">❌ Попробуй еще раз</span>';
    block.style.borderColor = isCorrect ? '#46d369' : '#E50914';
}

document.querySelectorAll('#bottom-nav button').forEach(b => b.onclick = () => showScreen(`screen-${b.dataset.screen}`));
showScreen('screen-dashboard');
