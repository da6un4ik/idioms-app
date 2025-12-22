// 1. ДАННЫЕ
const IDIOM_DATA = [
    {
        id: 1,
        text: "Ser pan comido",
        meaning: "Проще простого (раз плюнуть).",
        example: "No te preocupes por el examen, ¡será pan comido!",
        image: "assets/images/ser_pan_comido.jpg", 
        category: "Легкость",
        exercises: [
            { id: "ex1_1", type: "Выбор значения", question: "Что это означает?", options: ["Очень вкусно", "Очень легко"], answer: "Очень легко" },
            { id: "ex1_2", type: "Вставка слова", question: "Дополни:", prompt: "El examen es pan ___.", answer: "comido" }
        ]
    },
    {
        id: 2,
        text: "Estar en las nubes",
        meaning: "Витать в облаках (рассеянность).",
        example: "¡Escucha! Siempre estás en las nubes.",
        image: "assets/images/estar_en_las_nubes.jpg", 
        category: "Внимание",
        exercises: [
            { id: "ex2_1", type: "Выбор значения", question: "Что это означает?", options: ["Быть рассеянным", "Лететь"], answer: "Быть рассеянным" }
        ]
    },
    {
        id: 3,
        text: "Tirar la casa por la ventana",
        meaning: "Сорить деньгами (праздник).",
        example: "Para su boda, tiraron la casa por la ventana.",
        image: "assets/images/casa_ventana.jpg", 
        category: "Деньги",
        exercises: [
            { id: "ex3_1", type: "Вставка слова", question: "Дополни:", prompt: "Tiraron la casa por la ___.", answer: "ventana" }
        ]
    }
];

// 2. СОСТОЯНИЕ (LocalStorage)
let favorites = JSON.parse(localStorage.getItem('idioms_favs')) || [];
let completedIdioms = JSON.parse(localStorage.getItem('idioms_completed')) || [];

// 3. НАВИГАЦИЯ (Работает для всех кнопок)
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
        s.style.display = 'none';
        s.classList.remove('active');
    });
    const target = document.getElementById(screenId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
    document.querySelectorAll('#bottom-nav button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.screen === screenId);
    });

    if (screenId === 'dashboard') renderDashboard();
    if (screenId === 'catalog') renderCatalog();
    if (screenId === 'favorites') renderFavorites();
    window.scrollTo(0,0);
}

// 4. ГЛАВНАЯ СТРАНИЦА (С ПРОГРЕССОМ)
function renderDashboard() {
    const dash = document.getElementById('dashboard');
    let hero = IDIOM_DATA.find(i => !completedIdioms.includes(i.id)) || IDIOM_DATA[0];

    dash.innerHTML = `
        <div class="netflix-hero" style="background-image: linear-gradient(to top, #141414 15%, transparent), url('${hero.image}');">
            <div class="hero-content">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                    <span style="background:#E50914; color:white; padding:2px 6px; border-radius:2px; font-size:12px; font-weight:bold;">N</span>
                    <span style="letter-spacing:1px; font-size:11px; color:#aaa; font-weight:bold;">ИДИОМА ДНЯ</span>
                </div>
                <h1 style="margin:0 0 15px 0; font-size:32px;">${hero.text}</h1>
                <div style="display:flex; gap:10px;">
                    <button class="check-btn" style="width:auto; padding:10px 25px;" onclick="renderDetail(${hero.id})">▶ Изучать</button>
                    <button class="check-btn" style="width:auto; padding:10px 25px; background:rgba(255,255,255,0.2); color:white; border:none;" onclick="toggleFavorite(${hero.id})">
                        ${favorites.includes(hero.id) ? '✓ В списке' : '+ Мой список'}
                    </button>
                </div>
            </div>
        </div>

        <div style="padding: 0 20px; margin-bottom: 30px;">
            <div style="background:#222; padding:15px; border-radius:8px; display:flex; justify-content:space-between; align-items:center; border:1px solid #333;">
                <div><div style="font-size:11px; color:#888;">УДАРНЫЙ ТЕМП</div><div style="font-size:18px; font-weight:bold;">🔥 5 ДНЕЙ</div></div>
                <div style="text-align:right;"><div style="font-size:11px; color:#888;">ВЫУЧЕНО</div><div style="font-size:18px; font-weight:bold; color:#46d369;">
                    ${Math.round((completedIdioms.length / IDIOM_DATA.length) * 100)}%
                </div></div>
            </div>
        </div>

        <p class="section-title" style="padding:0 20px;">ПРОДОЛЖИТЬ</p>
        <div class="horizontal-scroll no-scrollbar" style="padding:0 20px;">
            ${IDIOM_DATA.map(idiom => `
                <div class="continue-card" onclick="renderDetail(${idiom.id})" style="${completedIdioms.includes(idiom.id) ? 'opacity:0.6' : ''}">
                    <div class="continue-thumb" style="background-image: url('${idiom.image}');">
                        ${completedIdioms.includes(idiom.id) ? '<div class="badge-done">✓</div>' : ''}
                    </div>
                    <div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${completedIdioms.includes(idiom.id) ? '100%' : '30%'}"></div></div>
                    <div style="padding:10px; font-size:12px; font-weight:bold;">${idiom.text}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// 5. КАТАЛОГ И ПОИСК
function renderCatalog(filter = "") {
    const list = document.getElementById('idiom-list');
    const filtered = IDIOM_DATA.filter(i => i.text.toLowerCase().includes(filter.toLowerCase()) || i.meaning.toLowerCase().includes(filter.toLowerCase()));
    list.innerHTML = `<div class="catalog-grid" style="margin-top:20px;">
        ${filtered.map(idiom => `
            <div class="catalog-item" onclick="renderDetail(${idiom.id})">
                <img src="${idiom.image}">${completedIdioms.includes(idiom.id) ? '<div class="badge-done">✓</div>' : ''}
                <p>${idiom.text}</p>
            </div>`).join('')}
    </div>`;
}

// 6. ДЕТАЛИ И УПРАЖНЕНИЯ
function renderDetail(id) {
    const idiom = IDIOM_DATA.find(i => i.id === id);
    const container = document.getElementById('detail');
    const isDone = completedIdioms.includes(id);

    container.innerHTML = `
        <button onclick="showScreen('dashboard')" style="background:none; color:white; border:none; padding:20px 0; cursor:pointer; font-size:18px;">← Назад</button>
        <div style="width:100%; height:200px; border-radius:8px; background: url('${idiom.image}') center/cover; margin-bottom: 20px;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <h2 style="margin:0;">${idiom.text}</h2>
            <button onclick="toggleFavorite(${idiom.id})" style="background:none; border:none; color:white; font-size:24px;">${favorites.includes(id) ? '❤️' : '🤍'}</button>
        </div>
        <p style="color:#aaa; margin-bottom:20px;">${idiom.meaning}</p>
        <button onclick="toggleCompleted(${id})" style="width:100%; padding:15px; border-radius:4px; font-weight:bold; cursor:pointer; background:${isDone ? '#46d369' : 'transparent'}; color:${isDone ? '#000' : '#46d369'}; border:1px solid #46d369; margin-bottom:20px;">
            ${isDone ? '✅ ВЫУЧЕНО' : 'ОТМЕТИТЬ КАК ВЫУЧЕННОЕ'}
        </button>
        <div class="exercise-grid">${idiom.exercises.map(ex => renderExercise(ex, idiom)).join('')}</div>
    `;
    showScreen('detail');
}

// 7. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function renderExercise(ex, idiom) {
    let html = `<div class="exercise-block" style="background:#222; padding:15px; border-radius:8px; margin-bottom:15px;">
        <h4 style="color:#E50914; margin:0 0 10px 0;">${ex.type}</h4><p>${ex.question}</p>`;
    if (ex.type === "Выбор значения") {
        html += ex.options.map(opt => `<label style="display:block; margin-bottom:8px;"><input type="radio" name="${ex.id}" value="${opt}"> ${opt}</label>`).join('');
    } else {
        html += `<input type="text" id="in-${ex.id}" style="width:100%; padding:10px; background:#111; color:#fff; border:1px solid #444;">`;
    }
    html += `<div id="feed-${ex.id}" style="margin-top:10px;"></div>
             <button class="check-btn" onclick="checkAnswer('${ex.id}', ${idiom.id})">ПРОВЕРИТЬ</button></div>`;
    return html;
}

function checkAnswer(exId, idiomId) {
    const ex = IDIOM_DATA.find(i => i.id === idiomId).exercises.find(e => e.id === exId);
    let userAns = "";
    if (ex.type === "Выбор значения") {
        const selected = document.querySelector(`input[name="${exId}"]:checked`);
        userAns = selected ? selected.value : "";
    } else {
        userAns = document.getElementById(`in-${exId}`).value.trim();
    }
    const isCorrect = userAns.toLowerCase() === ex.answer.toLowerCase();
    document.getElementById(`feed-${exId}`).innerHTML = isCorrect ? '<span style="color:#46d369;">✅ Верно!</span>' : '<span style="color:#E50914;">❌ Ошибка</span>';
}

function toggleFavorite(id) {
    const idx = favorites.indexOf(id);
    if (idx > -1) favorites.splice(idx, 1); else favorites.push(id);
    localStorage.setItem('idioms_favs', JSON.stringify(favorites));
    renderDashboard(); // Обновляем кнопки на главной
    if(document.getElementById('detail').style.display === 'block') renderDetail(id);
}

function toggleCompleted(id) {
    const idx = completedIdioms.indexOf(id);
    if (idx > -1) completedIdioms.splice(idx, 1); else completedIdioms.push(id);
    localStorage.setItem('idioms_completed', JSON.stringify(completedIdioms));
    renderDetail(id);
}

function renderFavorites() {
    const favData = IDIOM_DATA.filter(i => favorites.includes(i.id));
    document.getElementById('favorites-list').innerHTML = `<h2>Мой список</h2>
        <div class="catalog-grid">${favData.map(i => `<div class="catalog-item" onclick="renderDetail(${i.id})"><img src="${i.image}"><p>${i.text}</p></div>`).join('')}</div>
        ${favData.length === 0 ? '<p>Тут пока пусто</p>' : ''}`;
}

// 8. ИНИЦИАЛИЗАЦИЯ (Запуск)
document.querySelectorAll('#bottom-nav button').forEach(btn => {
    btn.addEventListener('click', () => showScreen(btn.dataset.screen));
});

document.addEventListener('input', (e) => {
    if (e.target.id === 'search-input') renderCatalog(e.target.value);
});

showScreen('dashboard');
