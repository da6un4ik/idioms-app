// --- 1. БАЗА ДАННЫХ ИДИОМ ---
const IDIOM_DATA = [
    {
        id: 1,
        text: "Ser pan comido",
        meaning: "Проще простого (раз плюнуть).",
        example: "No te preocupes por el examen, ¡será pan comido!",
        image: "assets/images/ser_pan_comido.jpg", 
        audio_main: "assets/audio/ser_pan_comido.mp3",
        audio_example: "assets/audio/example_pan_comido.mp3",
        category: "Легкость",
        exercises: [
            { id: "ex1_1", type: "Выбор значения", question: "Что означает эта идиома?", options: ["Очень вкусно", "Очень легким", "Очень быстрым"], answer: "Очень легким" },
            { id: "ex1_2", type: "Вставка слова", question: "Дополни фразу:", prompt: "El examen es pan ___.", answer: "comido" },
            { id: "ex1_4", type: "Конструктор", question: "Собери фразу:", words: ["SERÁ", "PAN", "COMIDO"], answer: "SERÁ PAN COMIDO" }
        ]
    },
    {
        id: 2,
        text: "Estar en las nubes",
        meaning: "Витать в облаках (быть рассеянным).",
        example: "¡Escucha! Siempre estás en las nubes.",
        image: "assets/images/estar_en_las_nubes.jpg", 
        audio_main: "assets/audio/estar_en_las_nubes.mp3",
        audio_example: "assets/audio/example_nubes.mp3",
        category: "Внимание",
        exercises: [
            { id: "ex2_1", type: "Выбор значения", question: "Что означает эта идиома?", options: ["Летать на самолете", "Быть рассеянным", "Любить погоду"], answer: "Быть рассеянным" },
            { id: "ex2_2", type: "Вставка слова", question: "Дополни фразу:", prompt: "Escucha, ¡siempre estás en las ___!", answer: "nubes" }
        ]
    },
    {
        id: 3,
        text: "Tirar la casa por la ventana",
        meaning: "Сорить деньгами (гулять на всю катушку).",
        example: "Para su boda, tiraron la casa por la ventana.",
        image: "assets/images/casa_ventana.jpg", 
        audio_main: "assets/audio/casa_ventana.mp3",
        audio_example: "assets/audio/example_ventana.mp3",
        category: "Деньги",
        exercises: [
            { id: "ex3_1", type: "Выбор значения", question: "В какой ситуации это говорят?", options: ["При переезде", "При больших тратах", "При ремонте"], answer: "При больших тратах" },
            { id: "ex3_4", type: "Конструктор", question: "Собери фразу:", words: ["TIRARON", "LA", "CASA", "POR", "LA", "VENTANA"], answer: "TIRARON LA CASA POR LA VENTANA" }
        ]
    }
];

// --- 2. ГЛОБАЛЬНЫЕ СОСТОЯНИЯ ---
let favorites = JSON.parse(localStorage.getItem('idioms_favs')) || [];
let completedIdioms = JSON.parse(localStorage.getItem('idioms_completed')) || [];

// --- 3. НАВИГАЦИЯ ---
function showScreen(screenId) {
    // Скрываем все экраны
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });

    // Показываем нужный
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'block';
    }

    // Обновляем кнопки меню
    document.querySelectorAll('#bottom-nav button').forEach(btn => {
        btn.classList.remove('active');
        if(btn.dataset.screen === screenId) btn.classList.add('active');
    });

    // Вызываем рендер контента
    if (screenId === 'dashboard') renderDashboard();
    if (screenId === 'catalog') renderCatalog();
    if (screenId === 'favorites') renderFavorites();

    window.scrollTo(0,0);
}

// --- 4. ФУНКЦИИ РЕНДЕРА ---

function renderDashboard() {
    const container = document.getElementById('dashboard');
    if (!container) return;

    let hero = IDIOM_DATA.find(i => !completedIdioms.includes(i.id)) || IDIOM_DATA[0];

    container.innerHTML = `
        <div class="netflix-hero" style="background-image: linear-gradient(to top, #141414 15%, transparent), url('${hero.image}');">
            <div class="hero-content">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                    <span style="background:#E50914; color:white; padding:2px 6px; border-radius:2px; font-size:12px; font-weight:bold;">N</span>
                    <span style="letter-spacing:1px; font-size:11px; color:#aaa; font-weight:bold;">
                        ${completedIdioms.includes(hero.id) ? 'ВЫУЧЕНО ✅' : 'РЕКОМЕНДУЕМ К ИЗУЧЕНИЮ'}
                    </span>
                </div>
                <h1 style="margin:0 0 15px 0; font-size:32px;">${hero.text}</h1>
                <button class="check-btn" style="width:auto; padding:10px 25px;" onclick="renderDetail(${hero.id})">▶ Изучать</button>
            </div>
        </div>
        <p class="section-title">Продолжить</p>
        <div class="horizontal-scroll no-scrollbar">
            ${IDIOM_DATA.map(idiom => `
                <div class="continue-card" onclick="renderDetail(${idiom.id})" style="${completedIdioms.includes(idiom.id) ? 'opacity:0.6' : ''}">
                    <div class="continue-thumb" style="background-image: url('${idiom.image}');"></div>
                    ${completedIdioms.includes(idiom.id) ? '<div class="badge-done">✓</div>' : ''}
                    <div style="padding:10px; font-size:12px; font-weight:bold;">${idiom.text}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCatalog(filter = "") {
    const listContainer = document.getElementById('idiom-list');
    if (!listContainer) return;

    const filtered = IDIOM_DATA.filter(i => 
        i.text.toLowerCase().includes(filter.toLowerCase()) || 
        i.meaning.toLowerCase().includes(filter.toLowerCase())
    );

    listContainer.innerHTML = `
        <div class="catalog-grid">
            ${filtered.map(idiom => `
                <div class="catalog-item" onclick="renderDetail(${idiom.id})">
                    <img src="${idiom.image}">
                    ${completedIdioms.includes(idiom.id) ? '<div class="badge-done">✓</div>' : ''}
                    <p>${idiom.text}</p>
                </div>
            `).join('')}
        </div>
        ${filtered.length === 0 ? '<p style="text-align:center; color:#666; margin-top:20px;">Ничего не найдено</p>' : ''}
    `;
}

function renderFavorites() {
    const container = document.getElementById('favorites-list');
    if (!container) return;

    const favData = IDIOM_DATA.filter(i => favorites.includes(i.id));
    
    container.innerHTML = `<h2 style="margin-top:20px;">Мой список</h2>`;
    if(favData.length === 0) {
        container.innerHTML += `<div style="text-align:center; margin-top:100px; color:#666;"><p>Список пуст</p></div>`;
    } else {
        container.innerHTML += `<div class="catalog-grid">${favData.map(idiom => `
            <div class="catalog-item" onclick="renderDetail(${idiom.id})">
                <img src="${idiom.image}">
                <p>${idiom.text}</p>
            </div>`).join('')}</div>`;
    }
}

function renderDetail(id) {
    const idiom = IDIOM_DATA.find(i => i.id === id);
    const container = document.getElementById('detail');
    if (!container) return;

    const isDone = completedIdioms.includes(id);

    container.innerHTML = `
        <button onclick="showScreen('dashboard')" style="background:none; color:white; font-size:24px; border:none; padding:20px 0; cursor:pointer;">← Назад</button>
        <div style="width:100%; height:200px; border-radius:8px; background: #222 url('${idiom.image}') center/cover; margin-bottom: 20px;"></div>
        
        <div style="display:flex; justify-content:space-between; align-items:center;">
             <h2 style="margin:0;">${idiom.text}</h2>
             <button onclick="toggleFavorite(${idiom.id})" style="background:none; border:none; color:white; font-size:24px;">
                ${favorites.includes(id) ? '❤️' : '🤍'}
             </button>
        </div>
        <p style="color:#aaa; margin:10px 0 20px 0;">${idiom.meaning}</p>

        <button onclick="toggleCompleted(${id})" class="btn-done-action" 
                style="background:${isDone ? '#46d369' : 'transparent'}; color:${isDone ? '#000' : '#46d369'}; border:1px solid #46d369; width:100%; padding:15px; border-radius:4px; font-weight:bold;">
            ${isDone ? '✅ ВЫУЧЕНО' : 'ОТМЕТИТЬ КАК ВЫУЧЕННОЕ'}
        </button>

        <div class="exercise-grid">${idiom.exercises.map(ex => renderExercise(ex, idiom)).join('')}</div>
    `;
    showScreen('detail');
}

// --- 5. ЛОГИКА УПРАЖНЕНИЙ ---
function renderExercise(ex, idiom) {
    let content = '';
    if (ex.type === "Выбор значения") {
        content = ex.options.map(opt => `
            <label class="radio-options" style="display:flex; align-items:center; margin-bottom:10px; background:#333; padding:10px; border-radius:5px;">
                <input type="radio" name="${ex.id}" value="${opt}" style="margin-right:10px;"> <span>${opt}</span>
            </label>`).join('');
    } else if (ex.type === "Вставка слова") {
        content = `<p>${ex.prompt}</p><input type="text" id="in-${ex.id}" style="width:100%; padding:12px; background:#141414; color:#fff; border:1px solid #444;">`;
    } else if (ex.type === "Конструктор") {
        content = `<div class="sentence-area" id="res-${ex.id}" style="border:1px dashed #555; min-height:50px; padding:10px; margin-bottom:10px;"></div>
                   <div class="word-bank">${ex.words.map(w => `<button class="word-chip" onclick="moveWord(this, '${ex.id}')" style="margin:2px;">${w}</button>`).join('')}</div>`;
    }
    return `<div class="exercise-block"><h4>${ex.type}</h4><p>${ex.question}</p>${content}<div id="feed-${ex.id}"></div><button class="check-btn" onclick="checkAnswer('${ex.id}', ${idiom.id})">ПРОВЕРИТЬ</button></div>`;
}

function moveWord(btn, id) {
    const area = document.getElementById(`res-${id}`);
    const bank = btn.closest('.exercise-block').querySelector('.word-bank');
    (btn.parentElement === area ? bank : area).appendChild(btn);
}

function checkAnswer(exId, idiomId) {
    const idiom = IDIOM_DATA.find(i => i.id === idiomId);
    const ex = idiom.exercises.find(e => e.id === exId);
    const feed = document.getElementById(`feed-${exId}`);
    let correct = false;

    if (ex.type === "Выбор значения") {
        const sel = document.querySelector(`input[name="${exId}"]:checked`);
        correct = sel && sel.value === ex.answer;
    } else if (ex.type === "Вставка слова") {
        correct = document.getElementById(`in-${exId}`).value.trim().toLowerCase() === ex.answer.toLowerCase();
    } else if (ex.type === "Конструктор") {
        correct = Array.from(document.getElementById(`res-${exId}`).children).map(c => c.innerText).join(' ') === ex.answer;
    }
    feed.innerHTML = correct ? '<span style="color:#46d369;">✅ Верно!</span>' : '<span style="color:#E50914;">❌ Ошибка</span>';
}

// --- 6. ОБРАБОТЧИКИ СОБЫТИЙ ---
function toggleCompleted(id) {
    const idx = completedIdioms.indexOf(id);
    if (idx > -1) completedIdioms.splice(idx, 1);
    else completedIdioms.push(id);
    localStorage.setItem('idioms_completed', JSON.stringify(completedIdioms));
    renderDetail(id);
}

function toggleFavorite(id) {
    const idx = favorites.indexOf(id);
    if (idx > -1) favorites.splice(idx, 1);
    else favorites.push(id);
    localStorage.setItem('idioms_favs', JSON.stringify(favorites));
    renderDetail(id);
}

// Навигация
document.querySelectorAll('#bottom-nav button').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

// Поиск
document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') renderCatalog(e.target.value);
});

// Старт приложения
showScreen('dashboard');
