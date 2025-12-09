// =================================================================
// 1. ДАННЫЕ ПРИЛОЖЕНИЯ (IDIOM_DATA)
//    КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Используется префикс репозитория 'idioms-app/' 
//    и расширение .jpg для картинки.
// =================================================================

const OTHER_IDIOMS = [
    { id: 2, text: "Estar en las nubes", meme: "☁️", topic: "Эмоции", literalTranslation: "Быть в облаках" },
    { id: 3, text: "No tener pelos en la lengua", meme: "🗣️", topic: "Характер", literalTranslation: "Не иметь волос на языке" },
    { id: 4, text: "Poner los puntos sobre las íes", meme: "📝", topic: "Работа", literalTranslation: "Расставить точки над 'i'" },
    { id: 5, text: "Ahogarse en un vaso de agua", meme: "💧", topic: "Эмоции", literalTranslation: "Утонуть в стакане воды" },
];

const IDIOM_DATA_SINGLE = {
    "id": 1,
    "text": "Ser pan comido",
    "literalTranslation": "Быть съеденным хлебом",
    "meaning": "Быть очень легким, пустяковым делом, проще простого.",
    "example": "No te preocupes por el examen de matemáticas, ¡será pan comido!",
    "meme": "🍞",
    
    // ИСПРАВЛЕННЫЕ ПУТИ К МЕДИАФАЙЛАМ
    "meme_url": "idioms-app/assets/images/ser_pan_comido.jpg", 
    "audio_idiom_url": "idioms-app/assets/audio/ser_pan_comido.mp3", 
    "audio_example_url": "idioms-app/assets/audio/example_pan_comido.mp3", 
    
    "topic": "Характер",
    "exercises": [
        {
            "id": "ex1_base_choice",
            "type": "Выбор значения",
            "question": "Что означает идиома 'Ser pan comido'?",
            "options": ["Быть очень вкусным", "Быть очень легким, пустяковым делом", "Быть очень сложным делом"],
            "answer": "Быть очень легким, пустяковым делом"
        },
        {
            "id": "ex2_base_gap",
            "type": "Вставка пропущенного слова",
            "question": "Закончите идиому: El trabajo no es complicado, es pan ______.",
            "prompt_text_before": "El trabajo no es complicado, es pan",
            "input_placeholder": "______",
            "prompt_text_after": ".",
            "answer": "comido"
        },
        {
            "id": "ex3_base_match",
            "type": "Сопоставление пар",
            "question": "Сопоставьте испанские фразы с их русскими значениями:",
            "pairs": [
                {"item1": "Pan comido", "item2": "Раз плюнуть"},
                {"item1": "Es fácil", "item2": "Это легко"},
                {"item1": "Tarea difícil", "item2": "Сложная задача"}
            ]
        },
        {
            "id": "ex4_feature_translate",
            "type": "Синхронный Перевод",
            "question": "Используйте идиому 'Ser pan comido' для перевода фразы на испанский (наберите ответ):",
            "russian_phrase": "Не волнуйся, этот тест будет раз плюнуть для тебя!",
            "answer": "No te preocupes, este test será pan comido para ti"
        },
        {
            "id": "ex5_feature_dialogue",
            "type": "Разговорный Тест",
            "question": "Выберите наиболее логичный ответ в диалоге:",
            "dialogue_line": "— ¿Crees que aprobar el examen de conducir será muy difícil?",
            "options": [
                "A. Sí, es muy difícil.",
                "B. No, ¡será pan comido!",
                "C. Debes comer más pan."
            ],
            "answer": "B. No, ¡será pan comido!"
        }
    ]
};

const IDIOM_DATA = [IDIOM_DATA_SINGLE, ...OTHER_IDIOMS];
let currentFavorites = [1]; 
let userName = "Ученик"; 

// =================================================================
// 2. ФУНКЦИИ УПРАВЛЕНИЯ ЭКРАНАМИ И НАВИГАЦИЕЙ
// =================================================================

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    document.querySelectorAll('#bottom-nav button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-screen') === screenId.replace('screen-', '')) {
            button.classList.add('active');
        }
    });

    document.getElementById('main-header').style.display = (screenId === 'screen-detail') ? 'none' : 'block';

    if (screenId === 'screen-catalog') renderIdioms();
    if (screenId === 'screen-favorites') renderFavorites();
}

// =================================================================
// 3. РЕНДЕРИНГ ГЛАВНОГО ХАБА (DASHBOARD)
// =================================================================

function renderDashboard() {
    const dashboardScreen = document.getElementById('screen-dashboard');
    const isNewUser = false; 
    const mainActionText = isNewUser ? "🚀 Начать обучение" : "📚 Продолжить обучение";
    
    const idiomOfDayContent = IDIOM_DATA_SINGLE.meme_url ? 
        `<img src="${IDIOM_DATA_SINGLE.meme_url}" alt="Идиома дня" style="height: 50px; width: 50px; object-fit: cover; border-radius: 8px;">` :
        `<span class="meme-icon">${IDIOM_DATA_SINGLE.meme}</span>`;
        
    dashboardScreen.innerHTML = `
        <div class="dashboard-greeting">
            <h1>Привет, ${userName}!</h1>
        </div>

        <div class="dashboard-cta">
            <button class="cta-main-button" onclick="alert('Переход к следующей идиоме для изучения (Логика SRS)!')">
                ${mainActionText}
            </button>
        </div>

        <div class="dashboard-block idiom-of-day" onclick="renderDetailScreen(IDIOM_DATA[0])">
            <div class="block-title">✨ Идиома Дня</div>
            <div class="block-content">
                ${idiomOfDayContent}
                <span class="idiom-text-day">${IDIOM_DATA_SINGLE.text}</span>
                <span class="audio-icon">🔊</span>
            </div>
            <p class="meaning-text">${IDIOM_DATA_SINGLE.meaning.substring(0, 40)}...</p>
        </div>

        <div class="dashboard-actions">
            <div class="dashboard-block action-block" onclick="alert('Запуск режима повторения слабых идиом.')">
                <div class="block-icon">🔄</div>
                <div class="block-title">Повторение</div>
                <p>Закрепить сложные моменты</p>
            </div>
            <div class="dashboard-block action-block" onclick="alert('Переход к продвинутым тестам (Синхронный перевод).')">
                <div class="block-icon">🧠</div>
                <div class="block-title">Практика</div>
                <p>Продвинутые тесты и диалоги</p>
            </div>
        </div>
    `;
}

// =================================================================
// 4. РЕНДЕРИНГ СПИСКА ИДИОМ (КАТАЛОГ и Избранное)
// =================================================================

function renderIdioms() {
    const listContainer = document.getElementById('idiom-list');
    listContainer.innerHTML = '';

    IDIOM_DATA.forEach(idiom => {
        const isFavorite = currentFavorites.includes(idiom.id);
        const isCompleted = idiom.id === 1; 
        
        const card = document.createElement('div');
        card.className = `idiom-card`;
        card.innerHTML = `
            <div class="meme-icon">${idiom.meme || '📝'}</div>
            <div class="idiom-info">
                <span class="idiom-text">${idiom.text}</span>
                <span class="literal-text">${idiom.literalTranslation || ''}</span>
            </div>
            <span class="progress-icon">${isCompleted ? '✅' : ''}</span>
            <span class="favorite-icon" data-id="${idiom.id}">${isFavorite ? '❤️' : '🤍'}</span>
        `;
        
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-icon')) {
                const id = parseInt(e.target.dataset.id);
                toggleFavorite(id);
                renderIdioms(); 
                return;
            }
            
            const selectedIdiom = IDIOM_DATA.find(i => i.id === idiom.id);
            if (selectedIdiom && selectedIdiom.exercises) { 
                renderDetailScreen(selectedIdiom);
            } else {
                alert(`Нет полных данных для детального экрана идиомы: ${idiom.text}`);
            }
        });
        
        listContainer.appendChild(card);
    });
}

function renderFavorites() {
    const favoritesScreen = document.getElementById('favorites-list');
    favoritesScreen.innerHTML = '<p class="empty-state">Здесь будут ваши любимые идиомы.</p>';
}

function toggleFavorite(id) {
    if (currentFavorites.includes(id)) {
        currentFavorites = currentFavorites.filter(i => i !== id);
    } else {
        currentFavorites.push(id);
    }
    const currentIdiom = IDIOM_DATA.find(i => i.id === id);
    if (document.getElementById('screen-detail').classList.contains('active') && currentIdiom) {
        renderDetailScreen(currentIdiom);
    }
}

// =================================================================
// 5. РЕНДЕРИНГ ДЕТАЛЬНОГО ЭКРАНА И УПРАЖНЕНИЙ
// =================================================================

// Обновленная функция рендеринга упражнений (принимает idiom и exercise)
function renderExerciseBlock(idiom, exercise) { 
    let content = '';
    
    // Логика для Radio Buttons и Checkboxes
    if (exercise.type === "Выбор значения" || exercise.type === "Разговорный Тест") {
        content = exercise.options.map((option, i) => `
            <label class="radio-options"><input type="radio" name="${exercise.id}">${option}</label>
        `).join('');
        if (exercise.type === "Разговорный Тест") {
             content = `<p><strong>Диалог:</strong> ${exercise.dialogue_line}</p>` + content;
        }
    } 
    // Логика для Ввода текста
    else if (exercise.type === "Вставка пропущенного слова" || exercise.type === "Синхронный Перевод") {
         content = (exercise.type === "Вставка пропущенного слова") ?
            `<p>${exercise.prompt_text_before || ''} 
                <input type="text" placeholder="${exercise.input_placeholder || 'слово'}" style="width: 70px;"> 
                ${exercise.prompt_text_after || ''}
            </p>` :
            `<p><strong>Переведите:</strong> "${exercise.russian_phrase}"</p>
             <input type="text" placeholder="Введите ваш ответ на испанском" style="width: 100%; padding: 5px;">`;
    } 
    // Логика для Сопоставления
    else if (exercise.type === "Сопоставление пар") {
        content = `
            <div class="matching-list">
                ${exercise.pairs.map(p => `<span>${p.item1}</span><span>${p.item2}</span>`).join('')}
            </div>
            <small>Нажмите на пары для сопоставления.</small>
        `;
    }
    
    return `
        <div class="exercise-block" data-exercise-id="${exercise.id}">
            <h4>${exercise.type}</h4>
            <p>${exercise.question}</p>
            ${content}
            <div class="result-feedback"></div> <button onclick="checkAnswer(${idiom.id}, '${exercise.id}')">Проверить</button>
        </div>
    `;
}

function renderDetailScreen(idiom) {
    const detailScreen = document.getElementById('screen-detail');
    const isFavorite = currentFavorites.includes(idiom.id);
    
    // ОБНОВЛЕНО: Передача объекта idiom в renderExerciseBlock
    const exercisesHtml = idiom.exercises.map(ex => renderExerciseBlock(idiom, ex)).join('');

    let memeContent = idiom.meme_url ? 
        `<img src="${idiom.meme_url}" alt="Кадр из фильма для идиомы ${idiom.text}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0;">` :
        `<p style="font-size: 4em;">${idiom.meme}</p>`;

    detailScreen.innerHTML = `
        <div class="detail-header">
            <button onclick="showScreen('screen-dashboard')">⟨</button>
            <h2>${idiom.text}</h2>
            <span class="favorite-icon" onclick="toggleFavorite(${idiom.id})">${isFavorite ? '❤️' : '🤍'}</span>
        </div>
        
        <div class="detail-content">
            
            <audio id="audio-idiom" src="${idiom.audio_idiom_url}" type="audio/mpeg"></audio>
            <audio id="audio-example" src="${idiom.audio_example_url}" type="audio/mpeg"></audio>

            <div class="meme-image-container">
                ${memeContent}
            </div>

            <div class="idiom-title-block">
                ${idiom.text} 
                <span class="audio-icon" onclick="playAudio('idiom')">🔊</span>
            </div>
            
            <div class="content-line"><span>Дословный перевод:</span> ${idiom.literalTranslation}</div>
            <div class="content-line"><span>Значение:</span> ${idiom.meaning}</div>
            
            <div class="content-line">
                <span>Пример:</span> <span class="example-text">${idiom.example}</span> 
                <span class="audio-icon" onclick="playAudio('example')">🔊</span>
            </div>
            
            <div class="exercises-title">5 Упражнений на Практику:</div>
            <div class="exercise-grid">
                ${exercisesHtml}
            </div>
            
            <button class="finish-button" onclick="alert('Отправить все ответы и обновить прогресс!')">Завершить урок</button>
        </div>
    `;

    showScreen('screen-detail');
}

// =================================================================
// 6. ФУНКЦИЯ ВОСПРОИЗВЕДЕНИЯ АУДИО 
// =================================================================

function playAudio(type) {
    let audioId = (type === 'idiom') ? 'audio-idiom' : 'audio-example';
    const audioPlayer = document.getElementById(audioId);
    
    if (audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; 
        
        audioPlayer.play().catch(error => {
            console.error("Ошибка воспроизведения аудио:", error);
            if (error.name === "NotAllowedError") {
                alert("Браузер заблокировал автоматическое воспроизведение аудио. Попробуйте нажать еще раз.");
            }
        });
    } else {
        console.warn(`Аудиоплеер с ID ${audioId} не найден.`);
    }
}

// =================================================================
// 7. ФУНКЦИЯ ПРОВЕРКИ ОТВЕТОВ
// =================================================================

function getIdiomDataById(id) {
    return IDIOM_DATA.find(i => i.id === id);
}

function checkAnswer(idiomId, exerciseId) {
    const idiom = getIdiomDataById(idiomId);
    if (!idiom) return;

    const exercise = idiom.exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const exerciseBlock = document.querySelector(`.exercise-block[data-exercise-id="${exerciseId}"]`);
    const resultDiv = exerciseBlock.querySelector('.result-feedback');
    let userAnswer = '';
    let isCorrect = false;

    // Сброс классов
    exerciseBlock.classList.remove('correct-answer', 'incorrect-answer');

    // 1. Извлечение ответа пользователя
    if (exercise.type === "Выбор значения" || exercise.type === "Разговорный Тест") {
        const checkedRadio = exerciseBlock.querySelector(`input[name="${exerciseId}"]:checked`);
        // Извлекаем текст из родительского элемента (label)
        userAnswer = checkedRadio ? checkedRadio.parentElement.textContent.trim() : '';
        isCorrect = (userAnswer === exercise.answer);

    } else if (exercise.type === "Вставка пропущенного слова" || exercise.type === "Синхронный Перевод") {
        const inputField = exerciseBlock.querySelector('input[type="text"]');
        userAnswer = inputField ? inputField.value.trim() : '';
        // Проверка без учета регистра для гибкости
        isCorrect = (userAnswer.toLowerCase() === exercise.answer.toLowerCase());
        
    } else if (exercise.type === "Сопоставление пар") {
        // Заглушка, пока не реализована полная логика drag-and-drop
        resultDiv.innerHTML = `<p class="result-info">🛠️ Для сопоставления нужна интерактивная логика.</p>`;
        return;
    }
    
    // 2. Отображение результата
    if (isCorrect) {
        resultDiv.innerHTML = `<span class="correct">✅ Верно!</span>`;
        exerciseBlock.classList.add('correct-answer');
    } else {
        resultDiv.innerHTML = `<span class="incorrect">❌ Неверно.</span><br><small>Правильный ответ: **${exercise.answer}**</small>`;
        exerciseBlock.classList.add('incorrect-answer');
    }
    
    // Деактивируем кнопку после проверки
    exerciseBlock.querySelector('button').disabled = true;
}


// =================================================================
// 8. ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
// =================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    renderDashboard();

    document.querySelectorAll('#bottom-nav button').forEach(button => {
        button.addEventListener('click', (e) => {
            const screenId = 'screen-' + e.currentTarget.getAttribute('data-screen');
            showScreen(screenId);
        });
    });

    showScreen('screen-dashboard');
});
