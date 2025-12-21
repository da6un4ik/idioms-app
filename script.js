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
            { id: "ex1_4", type: "Конструктор", question: "Собери фразу:", words: ["SERÁ", "PAN", "COMIDO"], answer: "SERÁ PAN COMIDO" },
            { id: "ex1_5", type: "Разговорный тест", dialogue: "— ¿Crees que el test es difícil?", question: "Ответ:", options: ["No, es pan comido.", "Sí, pan."], answer: "No, es pan comido." }
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
            { id: "ex2_2", type: "Вставка слова", question: "Дополни фразу:", prompt: "Escucha, ¡siempre estás en las ___!", answer: "nubes" },
            { id: "ex2_4", type: "Конструктор", question: "Собери фразу:", words: ["SIEMPRE", "ESTÁS", "EN", "LAS", "NUBES"], answer: "SIEMPRE ESTÁS EN LAS NUBES" },
            { id: "ex2_5", type: "Разговорный тест", dialogue: "— ¿Por qué no me contestas?", question: "Ответ:", options: ["Perdón, estaba en las nubes.", "Sí, las nubes son bonitas."], answer: "Perdón, estaba en las nubes." }
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
            { id: "ex3_2", type: "Вставка слова", question: "Дополни фразу:", prompt: "Tiraron la casa por la ___.", answer: "ventana" },
            { id: "ex3_4", type: "Конструктор", question: "Собери фразу:", words: ["TIRARON", "LA", "CASA", "POR", "LA", "VENTANA"], answer: "TIRARON LA CASA POR LA VENTANA" },
            { id: "ex3_5", type: "Разговорный тест", dialogue: "— ¡Vaya fiesta de cumpleaños!", question: "Ответ:", options: ["Sí, han tirado la casa por la ventana.", "No, la ventana está cerrada."], answer: "Sí, han tirado la casa por la ventana." }
        ]
    }
];

let favorites = JSON.parse(localStorage.getItem('idioms_favs')) || [];

function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('#bottom-nav button').forEach(b => b.classList.remove('active'));
    
    document.getElementById(`screen-${id}`).classList.add('active');
    const navBtn = document.querySelector(`button[data-screen="${id}"]`);
    if(navBtn) navBtn.classList.add('active');

    if(id === 'dashboard') renderDashboard();
    if(id === 'favorites') renderFavorites();
    if(id === 'catalog') renderCatalog();
    window.scrollTo(0,0);
}

function playAudio(path) {
    new Audio(path).play().catch(() => console.log("Audio file missing"));
}

function toggleFavorite(id, event) {
    if(event) event.stopPropagation();
    const index = favorites.indexOf(id);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(id);
    
    localStorage.setItem('idioms_favs', JSON.stringify(favorites));
    
    // Обновляем текущий вид
    if(document.getElementById('screen-dashboard').classList.contains('active')) renderDashboard();
    if(document.getElementById('screen-favorites').classList.contains('active')) renderFavorites();
}

function renderDashboard() {
    const dash = document.getElementById('screen-dashboard');
    const hero = IDIOM_DATA[0];
    dash.innerHTML = `
        <div class="netflix-hero" style="background-image: linear-gradient(to top, #141414 15%, transparent), url('${hero.image}');">
            <div class="hero-content">
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
                    <span style="background:#E50914; color:white; padding:2px 6px; border-radius:2px; font-size:12px; font-weight:bold;">N</span>
                    <span style="letter-spacing:2px; font-size:11px; color:#aaa; font-weight:bold;">ИДИОМА ДНЯ</span>
                </div>
                <h1 style="margin:0 0 15px 0; font-size:32px;">${hero.text}</h1>
                <div style="display:flex; gap:10px;">
                    <button class="check-btn" style="width:auto; padding:10px 25px;" onclick="renderDetail(${hero.id})">▶ Изучать</button>
                    <button class="check-btn" style="width:auto; padding:10px 25px; background:rgba(255,255,255,0.2); color:white;" onclick="toggleFavorite(${hero.id})">
                        ${favorites.includes(hero.id) ? '✓ В списке' : '+ Мой список'}
                    </button>
                </div>
            </div>
        </div>

        <p class="section-title">Продолжить изучение</p>
        <div class="horizontal-scroll no-scrollbar">
            ${IDIOM_DATA.map(idiom => `
                <div class="continue-card" onclick="renderDetail(${idiom.id})">
                    <div class="continue-thumb" style="background-image: url('${idiom.image}');"></div>
                    <div style="padding:10px; font-size:12px; font-weight:bold;">${idiom.text}</div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCatalog() {
    const container = document.getElementById('idiom-list');
    container.innerHTML = `<h2 style="margin-top:40px;">Все идиомы</h2>
        <div class="catalog-grid">
            ${IDIOM_DATA.map(idiom => `
                <div class="catalog-item" onclick="renderDetail(${idiom.id})">
                    <img src="${idiom.image}">
                    <p>${idiom.text}</p>
                </div>
            `).join('')}
        </div>`;
}

function renderFavorites() {
    const container = document.getElementById('favorites-list');
    const favData = IDIOM_DATA.filter(i => favorites.includes(i.id));
    
    if(favData.length === 0) {
        container.innerHTML = `<div style="text-align:center; margin-top:100px; color:#666;">
            <p style="font-size:40px;">➕</p><p>Ваш список пуст</p></div>`;
    } else {
        container.innerHTML = `<h2 style="margin-top:40px;">Мой список</h2>
            <div class="catalog-grid">${favData.map(idiom => `
                <div class="catalog-item" onclick="renderDetail(${idiom.id})">
                    <img src="${idiom.image}">
                    <p>${idiom.text}</p>
                </div>`).join('')}</div>`;
    }
}

function renderDetail(id) {
    const idiom = IDIOM_DATA.find(i => i.id === id);
    const detail = document.getElementById('screen-detail');
    detail.innerHTML = `
        <button onclick="showScreen('dashboard')" style="background:none; color:white; font-size:24px; border:none; padding:20px 0; cursor:pointer;">← Назад</button>
        <div style="width:100%; height:200px; border-radius:8px; background: #222 url('${idiom.image}') center/cover; margin-bottom: 20px;"></div>
        <div style="display:flex; justify-content:space-between; align-items:center;">
             <h2 style="margin:0;">${idiom.text} <span class="audio-btn" onclick="playAudio('${idiom.audio_main}')">🔊</span></h2>
             <button onclick="toggleFavorite(${idiom.id}); renderDetail(${idiom.id})" style="background:none; border:none; color:white; font-size:24px;">
                ${favorites.includes(idiom.id) ? '✓' : '+'}
             </button>
        </div>
        <p style="color:#aaa; margin-bottom:20px;">${idiom.meaning}</p>
        <div style="background:#333; padding:15px; border-radius:4px; margin-bottom:30px; border-left:4px solid #E50914;">
            <strong>Пример:</strong><br>${idiom.example} <span class="audio-btn" onclick="playAudio('${idiom.audio_example}')">🔊</span>
        </div>
        <div class="exercise-grid">${idiom.exercises.map(ex => renderExercise(ex, idiom)).join('')}</div>
    `;
    showScreen('detail');
}

function renderExercise(ex, idiom) {
    let content = '';
    if (ex.type === "Выбор значения" || ex.type === "Разговорный тест") {
        const diag = ex.dialogue ? `<p style="color:#888; font-style:italic; margin-bottom:10px;">${ex.dialogue}</p>` : '';
        content = diag + ex.options.map(opt => `
            <label class="radio-options" onclick="selectRadio(this)">
                <input type="radio" name="${ex.id}" value="${opt}"> <span>${opt}</span>
            </label>`).join('');
    } else if (ex.type === "Вставка слова") {
        content = `<p>${ex.prompt}</p><input type="text" id="in-${ex.id}" style="width:100%; padding:14px; background:#141414; color:#fff; border:1px solid #444; border-radius:4px;">`;
    } else if (ex.type === "Конструктор") {
        content = `<div class="sentence-area" id="res-${ex.id}"></div>
                   <div class="word-bank">${ex.words.map(w => `<button class="word-chip" onclick="moveWord(this, '${ex.id}')">${w}</button>`).join('')}</div>`;
    }
    return `<div class="exercise-block" id="block-${ex.id}"><h4>${ex.type}</h4><p>${ex.question}</p>${content}<div id="feed-${ex.id}"></div><button class="check-btn" onclick="checkAnswer('${ex.id}', ${idiom.id})">ПРОВЕРИТЬ</button></div>`;
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

function checkAnswer(exId, idiomId) {
    const idiom = IDIOM_DATA.find(i => i.id === idiomId);
    const ex = idiom.exercises.find(e => e.id === exId);
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
    }

    feed.innerHTML = correct ? '<span class="correct">✅ Верно!</span>' : '<span style="color:#E50914; display:block; margin-top:10px;">❌ Ошибка</span>';
}

document.querySelectorAll('#bottom-nav button').forEach(b => {
    b.onclick = () => showScreen(b.dataset.screen);
});

showScreen('dashboard');
