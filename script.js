// =================================================================
// 1. ДАННЫЕ ПРИЛОЖЕНИЯ (IDIOM_DATA)
// =================================================================

const OTHER_IDIOMS = [
    { 
        id: 2, 
        text: "Estar en las nubes", 
        meme: "☁️", 
        topic: "Эмоции", 
        literalTranslation: "Быть в облаках",
        meaning: "Витать в облаках, быть рассеянным.",
        meme_url: "idioms-app/assets/images/estar_en_las_nubes.jpg"
    },
    { 
        id: 3, 
        text: "No tener pelos en la lengua", 
        meme: "🗣️", 
        topic: "Характер", 
        literalTranslation: "Не иметь волос на языке",
        meaning: "Говорить то, что думаешь, без стеснения.",
        meme_url: "idioms-app/assets/images/no_tener_pelos.jpg"
    }
];

// Функция для перемешивания слов (нужна для конструктора)
function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

const IDIOM_DATA_SINGLE = {
    "id": 1,
    "text": "Ser pan comido",
    "literalTranslation": "Быть съеденным хлебом",
    "meaning": "Быть очень легким, пустяковым делом, проще простого.",
    "example": "No te preocupes por el examen de matemáticas, ¡será pan comido!",
    "meme": "🍞",
    "meme_url": "idioms-app/assets/images/ser_pan_comido.jpg", 
    "audio_idiom_url": "idioms-app/assets/audio/ser_pan_comido.mp3", 
    "audio_example_url": "idioms-app/assets/audio/example_pan_comido.mp3", 
    "topic": "Характер",
    "exercises": [
        {
            "id": "ex1",
            "type": "Выбор значения",
            "question": "Что означает идиома 'Ser pan comido'?",
            "options": ["Быть очень вкусным", "Быть очень легким", "Быть очень тяжелым", "Быть очень быстрым"],
            "answer": "Быть очень легким"
        },
        {
            "id": "ex2",
            "type": "Вставка пропущенного слова",
            "question": "Закончите фразу: El trabajo no es complicado, es pan ______.",
            "prompt_text_before": "El trabajo не сложный, es pan",
            "answer": "comido"
        },
        {
            "id": "ex3",
            "type": "Сопоставление пар",
            "question": "Сопоставьте пары:",
            "pairs": [
                {"item1": "Pan comido", "item2": "Это раз плюнуть"},
                {"item1": "Tarea difícil", "item2": "Сложная задача"},
                {"item1": "Es fácil", "item2": "Это легко"}
            ]
        },
        {
            "id": "ex4",
            "type": "Синхронный Перевод",
            "question": "Соберите фразу:",
            "russian_phrase": "Не волнуйся, этот тест будет раз плюнуть для тебя!",
            "answer": "No te preocupes este examen será pan comido para ti",
            "words": ["No", "te", "preocupes", "este", "examen", "será", "pan", "comido", "para", "ti"]
        },
        {
            "id": "ex5",
            "type": "Разговорный Тест",
            "question": "Выберите логичный ответ:",
            "dialogue_line": "— ¿Crees que aprobar el curso de natación será muy difícil?",
            "options": ["No, será pan comido.", "Sí, es muy difícil.", "Debes comer más pan."],
            "answer": "No, será pan comido."
        }
    ]
};

const IDIOM_DATA = [IDIOM_DATA_SINGLE, ...OTHER_IDIOMS];
let currentFavorites = [1]; 
let userName = "Ученик"; 

// =================================================================
// 2. НАВИГАЦИЯ И ЭКРАНЫ
// =================================================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    document.querySelectorAll('#bottom-nav button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-screen') === screenId.replace('screen-', '')) btn.classList.add('active');
    });

    if (screenId === 'screen-dashboard') renderDashboard();
    if (screenId === 'screen-catalog') renderIdioms();
}

// =================================================================
// 3. РЕНДЕРИНГ (NETFLIX STYLE)
// =================================================================

function renderDashboard() {
    const dashboard = document.getElementById('screen-dashboard');
    const heroImage = IDIOM_DATA_SINGLE.meme_url;
    
    dashboard.innerHTML = `
        <div class="netflix-hero" onclick="renderDetailScreen(IDIOM_DATA[0])" 
             style="background-image: linear-gradient(to top, #141414 10%, transparent 70%), url('${heroImage}');">
            <div class="hero-content">
                <span class="hero-label">ИДИОМА ДНЯ</span>
                <h1 class="hero-title">${IDIOM_DATA_SINGLE.text}</h1>
                <p class="hero-description">${IDIOM_DATA_SINGLE.meaning}</p>
                <div class="hero-buttons">
                    <button class="play-btn">▶ Изучать</button>
                    <button class="info-btn">ⓘ Инфо</button>
                </div>
            </div>
        </div>
        <div class="dashboard-section-title">Продолжить просмотр</div>
        <div class="dashboard-actions">
            <div class="action-block" onclick="alert('Режим повторения')"><div class="block-icon">🔄</div><div>Повтор</div></div>
            <div class="action-block" onclick="alert('Практика')"><div class="block-icon">🧠</div><div>Практика</div></div>
        </div>
    `;
}

function renderIdioms() {
    const list = document.getElementById('idiom-list');
    list.innerHTML = '<div class="dashboard-section-title">Каталог идиом</div>';
    IDIOM_DATA.forEach(idiom => {
        const isFav = currentFavorites.includes(idiom.id);
        const card = document.createElement('div');
        card.className = 'netflix-card';
        card.innerHTML = `
            <div class="card-thumb" style="background-image: url('${idiom.meme_url}'); background-size: cover;">${idiom.meme_url ? '' : idiom.meme}</div>
            <div class="card-body">
                <div class="card-header-row"><span class="card-title">${idiom.text}</span><span class="favorite-icon">${isFav ? '❤️' : '🤍'}</span></div>
                <span class="card-meta">${idiom.topic}</span>
            </div>
        `;
        card.onclick = () => renderDetailScreen(idiom);
        list.appendChild(card);
    });
}

function renderDetailScreen(idiom) {
    const screen = document.getElementById('screen-detail');
    const exercisesHtml = (idiom.exercises || []).map(ex => renderExerciseBlock(idiom, ex)).join('');
    
    screen.innerHTML = `
        <div class="detail-header"><button onclick="showScreen('screen-dashboard')">←</button><h2>${idiom.text}</h2><span></span></div>
        <div class="detail-content">
            <div class="meme-image-container" style="background-image: url('${idiom.meme_url}'); background-size: cover;"></div>
            <div class="idiom-title-block">${idiom.text} <span class="audio-icon" onclick="playAudio('idiom')">🔊</span></div>
            <div class="content-line"><span>Значение:</span> ${idiom.meaning}</div>
            <div class="content-line"><span>Пример:</span> ${idiom.example} <span class="audio-icon" onclick="playAudio('example')">🔊</span></div>
            <div class="exercises-title">Практика</div>
            <div class="exercise-grid">${exercisesHtml}</div>
            <audio id="audio-idiom" src="${idiom.audio_idiom_url}"></audio>
            <audio id="audio-example" src="${idiom.audio_example_url}"></audio>
        </div>
    `;
    showScreen('screen-detail');
}

// =================================================================
// 4. ЛОГИКА УПРАЖНЕНИЙ
// =================================================================

function renderExerciseBlock(idiom, ex) {
    let content = '';
    if (ex.type === "Выбор значения" || ex.type === "Разговорный Тест") {
        content = ex.options.map(opt => `<label class="radio-options"><input type="radio" name="${ex.id}">${opt}</label>`).join('');
        if (ex.dialogue_line) content = `<p style="font-style: italic;">${ex.dialogue_line}</p>` + content;
    } else if (ex.type === "Вставка пропущенного слова") {
        content = `<p>${ex.prompt_text_before} <input type="text" id="input-${ex.id}" placeholder="..."> .</p>`;
    } else if (ex.type === "Синхронный Перевод") {
        const shuffled = shuffleArray(ex.words);
        content = `<p><strong>${ex.russian_phrase}</strong></p>
                   <div class="sentence-area" id="res-${ex.id}"></div>
                   <div class="word-bank">${shuffled.map(w => `<button class="word-chip" onclick="handleWordClick(this, '${ex.id}')">${w}</button>`).join('')}</div>`;
    } else if (ex.type === "Сопоставление пар") {
        const colA = shuffleArray(ex.pairs.map(p => p.item1));
        const colB = shuffleArray(ex.pairs.map(p => p.item2));
        content = `<div class="matching-grid">
            <div class="matching-column">${colA.map(v => `<div class="match-item" data-val="${v}" onclick="handleMatch(this, '${ex.id}')">${v}</div>`).join('')}</div>
            <div class="matching-column">${colB.map(v => `<div class="match-item" data-val="${v}" onclick="handleMatch(this, '${ex.id}')">${v}</div>`).join('')}</div>
        </div>`;
    }

    return `<div class="exercise-block" id="block-${ex.id}">
        <h4>${ex.type}</h4><p>${ex.question}</p>${content}
        <div class="result-feedback" id="feed-${ex.id}"></div>
        <button onclick="checkAnswer('${idiom.id}', '${ex.id}')">Проверить</button>
    </div>`;
}

// Функции-обработчики кликов
function handleWordClick(btn, exId) {
    const res = document.getElementById(`res-${exId}`);
    if (btn.parentElement.classList.contains('word-bank')) {
        res.appendChild(btn);
    } else {
        document.querySelector(`#block-${exId} .word-bank`).appendChild(btn);
    }
}

let firstMatch = null;
function handleMatch(el, exId) {
    if (el.classList.contains('matched')) return;
    if (!firstMatch) {
        firstMatch = el;
        el.classList.add('selected');
    } else {
        if (firstMatch.parentElement === el.parentElement) {
            firstMatch.classList.remove('selected');
            firstMatch = el;
            el.classList.add('selected');
            return;
        }
        // Логика проверки пары будет в checkAnswer, тут просто визуальный выбор
        el.classList.add('selected');
        const idiom = IDIOM_DATA.find(i => i.exercises.some(e => e.id === exId));
        const pair = idiom.exercises.find(e => e.id === exId).pairs.find(p => 
            (p.item1 === firstMatch.innerText && p.item2 === el.innerText) || 
            (p.item2 === firstMatch.innerText && p.item1 === el.innerText)
        );

        if (pair) {
            firstMatch.classList.add('matched');
            el.classList.add('matched');
        } else {
            const f = firstMatch;
            el.classList.add('mismatch'); f.classList.add('mismatch');
            setTimeout(() => { el.classList.remove('mismatch', 'selected'); f.classList.remove('mismatch', 'selected'); }, 500);
        }
        firstMatch = null;
    }
}

function checkAnswer(idiomId, exId) {
    const idiom = IDIOM_DATA.find(i => i.id == idiomId);
    const ex = idiom.exercises.find(e => e.id === exId);
    const block = document.getElementById(`block-${exId}`);
    const feed = document.getElementById(`feed-${exId}`);
    let isCorrect = false;

    if (ex.type === "Выбор значения" || ex.type === "Разговорный Тест") {
        const sel = block.querySelector('input:checked');
        isCorrect = sel && sel.parentElement.innerText === ex.answer;
    } else if (ex.type === "Вставка пропущенного слова") {
        isCorrect = block.querySelector('input').value.trim().toLowerCase() === ex.answer.toLowerCase();
    } else if (ex.type === "Синхронный Перевод") {
        const userStr = Array.from(block.querySelectorAll('.sentence-area .word-chip')).map(c => c.innerText).join(' ');
        isCorrect = userStr.toLowerCase() === ex.answer.toLowerCase();
    } else if (ex.type === "Сопоставление пар") {
        isCorrect = block.querySelectorAll('.matched').length === ex.pairs.length * 2;
    }

    block.classList.add(isCorrect ? 'correct-answer' : 'incorrect-answer');
    feed.innerHTML = isCorrect ? '<span class="correct">✅ Верно!</span>' : `<span class="incorrect">❌ Ошибка. Ответ: ${ex.answer || 'внимательнее!'}</span>`;
}

function playAudio(id) {
    const player = document.getElementById(`audio-${id}`);
    if (player) { player.currentTime = 0; player.play(); }
}

// =================================================================
// 5. ИНИЦИАЛИЗАЦИЯ
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('#bottom-nav button').forEach(b => {
        b.onclick = () => showScreen(`screen-${b.dataset.screen}`);
    });
    showScreen('screen-dashboard');
});
