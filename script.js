// =================================================================
// 1. ДАННЫЕ ПРИЛОЖЕНИЯ (IDIOM_DATA)
//    ВКЛЮЧАЕТ: Исправленные пути к медиафайлам и 5 новых упражнений.
// =================================================================

const OTHER_IDIOMS = [
    { id: 2, text: "Estar en las nubes", meme: "☁️", topic: "Эмоции", literalTranslation: "Быть в облаках" },
    { id: 3, text: "No tener pelos en la lengua", meme: "🗣️", topic: "Характер", literalTranslation: "Не иметь волос на языке" },
    { id: 4, text: "Poner los puntos sobre las íes", meme: "📝", topic: "Работа", literalTranslation: "Расставить точки над 'i'" },
    { id: 5, text: "Ahogarse en un vaso de agua", meme: "💧", topic: "Эмоции", literalTranslation: "Утонуть в стакане воды" },
];

// Функция-помощник для перемешивания слов
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const IDIOM_DATA_SINGLE = {
    "id": 1,
    "text": "Ser pan comido",
    "literalTranslation": "Быть съеденным хлебом",
    "meaning": "Быть очень легким, пустяковым делом, проще простого.",
    "example": "No te preocupes por el examen de matemáticas, ¡será pan comido!",
    "meme": "🍞",
    
    // ПУТИ: Префикс 'idioms-app/' и расширение '.jpg'
    "meme_url": "assets/images/ser_pan_comido.jpg", 
    "audio_idiom_url": "assets/audio/ser_pan_comido.mp3", 
    "audio_example_url": "assets/audio/example_pan_comido.mp3", 
    
    "topic": "Характер",
    "exercises": [
        // 1. Базовое: Выбор значения
        {
            "id": "ex1_base_choice",
            "type": "Выбор значения",
            "question": "Что означает идиома 'Ser pan comido'?",
            "options": ["Быть очень вкусным", "Быть очень легким", "Быть очень тяжелым", "Быть очень быстрым"],
            "answer": "Быть очень легким"
        },
        // 2. Базовое: Вставка пропущенного слова
        {
            "id": "ex2_base_gap",
            "type": "Вставка пропущенного слова",
            "question": "Вставьте пропущенное слово, чтобы закончить идиому: El trabajo no es complicado, es pan ______.",
            "prompt_text_before": "El trabajo no es complicado, es pan",
            "input_placeholder": "______",
            "prompt_text_after": ".",
            "answer": "comido"
        },
        // 3. Базовое: Сопоставление пар (ФУНКЦИОНАЛ ДОРАБОТАН)
        {
            "id": "ex3_base_match",
            "type": "Сопоставление пар",
            "question": "Сопоставьте испанские фразы с их русскими значениями:",
            "pairs": [
                {"item1": "Pan comido", "item2": "Это раз плюнуть"},
                {"item1": "Tarea difícil", "item2": "Сложная задача"},
                {"item1": "Es fácil", "item2": "Это легко"}
            ]
        },
        // 4. Фишка: Синхронный Перевод (ТЕПЕРЬ КОНСТРУКТОР)
        {
            "id": "ex4_feature_translate",
            "type": "Синхронный Перевод",
            "question": "Соберите фразу, используя 'кубики' слов:",
            "russian_phrase": "Не волнуйся, этот тест будет раз плюнуть для тебя!",
            // Ответ для проверки
            "answer": "No te preocupes este examen será pan comido para ti",
            // Слова для конструктора (необходимо для рендеринга)
            "words": [
                "No", "te", "preocupes", "este", "examen", "será", "pan", "comido", "para", "ti"
            ]
        },
        // 5. Фишка: Разговорный Тест
        {
            "id": "ex5_feature_dialogue",
            "type": "Разговорный Тест",
            "question": "Выберите наиболее логичный ответ в диалоге:",
            "dialogue_line": "— ¿Crees que aprobar el curso de natación será muy difícil?",
            "options": [
                "No, será pan comido.", 
                "Sí, es muy difícil.", 
                "Debes comer más pan.", 
                "Está lloviendo mucho."
            ],
            "answer": "No, será pan comido."
        }
    ]
};

const IDIOM_DATA = [IDIOM_DATA_SINGLE, ...OTHER_IDIOMS];
let currentFavorites = [1]; 
let userName = "Ученик"; 

// =================================================================
// 2. ФУНКЦИИ УПРАВЛЕНИЯ ЭКРАНАМИ И НАВИГАЦИЕЙ (БЕЗ ИЗМЕНЕНИЙ)
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

// ... (Остальные функции renderDashboard, renderIdioms, toggleFavorite без изменений)

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

function renderExerciseBlock(idiom, exercise) { 
    let content = '';
    
    // Логика для Radio Buttons (Выбор значения / Разговорный Тест)
    if (exercise.type === "Выбор значения" || exercise.type === "Разговорный Тест") {
        content = exercise.options.map((option, i) => `
            <label class="radio-options"><input type="radio" name="${exercise.id}">${option}</label>
        `).join('');
        if (exercise.type === "Разговорный Тест") {
             content = `<p><strong>Диалог:</strong> ${exercise.dialogue_line}</p>` + content;
        }
    } 
    // Логика для Вставки пропущенного слова
    else if (exercise.type === "Вставка пропущенного слова") {
         content = `<p>${exercise.prompt_text_before || ''} 
                <input type="text" placeholder="${exercise.input_placeholder || 'слово'}" style="width: 70px;"> 
                ${exercise.prompt_text_after || ''}
            </p>`;
    }
    // Логика для Синхронного Перевода (КОНСТРУКТОР)
    else if (exercise.type === "Синхронный Перевод") {
        const shuffledWords = shuffleArray([...exercise.words]); // Копируем и перемешиваем
         content = `
            <p><strong>Переведите:</strong> "${exercise.russian_phrase}"</p>
            <div class="word-constructor">
                <div class="sentence-area" id="constructor-result-${exercise.id}" 
                     ondblclick="clearConstructor('${exercise.id}')">
                </div>
                <div class="word-bank">
                    ${shuffledWords.map((word, index) => 
                        `<button class="word-chip" data-word="${word}" data-index="${index}" 
                                 onclick="selectWord(this, '${exercise.id}')">${word}</button>`
                    ).join('')}
                </div>
                <div class="constructor-actions">
                    <button class="action-btn" onclick="clearConstructor('${exercise.id}')">Очистить</button>
                    <button class="action-btn" onclick="resetConstructor('${exercise.id}')">Сбросить</button>
                </div>
            </div>
        `;
    } 
    // Логика для Сопоставления пар
    else if (exercise.type === "Сопоставление пар") {
        // Мы перемешиваем пары для Column A и Column B, чтобы они не совпадали по порядку
        const columnA = exercise.pairs.map(p => ({ text: p.item1, group: 'A', match: p.item2 }));
        const columnB = exercise.pairs.map(p => ({ text: p.item2, group: 'B', match: p.item1 }));
        
        const shuffledA = shuffleArray(columnA);
        const shuffledB = shuffleArray(columnB);

        content = `
            <div class="matching-grid">
                <div class="matching-column" id="col-A-${exercise.id}">
                    ${shuffledA.map((item, index) => 
                        `<div class="match-item" data-group="A" data-match="${item.match}" data-index="${index}" 
                            onclick="toggleMatchingPair(this, '${idiom.id}', '${exercise.id}')">${item.text}</div>`
                    ).join('')}
                </div>
                <div class="matching-column" id="col-B-${exercise.id}">
                    ${shuffledB.map((item, index) => 
                        `<div class="match-item" data-group="B" data-match="${item.match}" data-index="${index}" 
                            onclick="toggleMatchingPair(this, '${idiom.id}', '${exercise.id}')">${item.text}</div>`
                    ).join('')}
                </div>
            </div>
        `;
    }
    
    return `
        <div class="exercise-block" data-exercise-id="${exercise.id}">
            <h4>${exercise.type}</h4>
            <p>${exercise.question}</p>
            ${content}
            <div class="result-feedback"></div> 
            <button onclick="checkAnswer(${idiom.id}, '${exercise.id}')">Проверить</button>
        </div>
    `;
}

function renderDetailScreen(idiom) {
    const detailScreen = document.getElementById('screen-detail');
    const isFavorite = currentFavorites.includes(idiom.id);
    
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
// 6. ФУНКЦИИ ИНТЕРАКТИВА (КОНСТРУКТОР СЛОВ)
// =================================================================

function selectWord(chip, exerciseId) {
    const sentenceArea = document.getElementById(`constructor-result-${exerciseId}`);
    
    if (chip.parentElement.classList.contains('word-bank')) {
        // Перемещаем чип из банка в область предложения
        sentenceArea.appendChild(chip);
        chip.classList.add('selected');
        chip.onclick = () => sentenceArea.removeChild(chip); // Обратный клик для удаления
    } else {
         // Удаляем чип из области предложения
        sentenceArea.removeChild(chip);
    }
}

function clearConstructor(exerciseId) {
    const sentenceArea = document.getElementById(`constructor-result-${exerciseId}`);
    sentenceArea.innerHTML = '';
}

function resetConstructor(exerciseId) {
    const exerciseBlock = document.querySelector(`.exercise-block[data-exercise-id="${exerciseId}"]`);
    const wordBank = exerciseBlock.querySelector('.word-bank');
    const sentenceArea = document.getElementById(`constructor-result-${exerciseId}`);

    // Перемещаем все чипы обратно в банк и сбрасываем их состояние
    sentenceArea.innerHTML = '';
    
    // Находим чипы, которые изначально были в банке
    const chips = exerciseBlock.querySelectorAll('.word-chip');
    chips.forEach(chip => {
        chip.classList.remove('selected');
        chip.onclick = () => selectWord(chip, exerciseId);
        wordBank.appendChild(chip);
    });
}


// =================================================================
// 7. ФУНКЦИИ ИНТЕРАКТИВА (СОПОСТАВЛЕНИЕ)
// =================================================================

// Хранилище для выбранных элементов
let selectedMatch = null; 

function toggleMatchingPair(clickedItem, idiomId, exerciseId) {
    // Если упражнение уже проверено и заблокировано, ничего не делаем
    const exerciseBlock = document.querySelector(`.exercise-block[data-exercise-id="${exerciseId}"]`);
    if (exerciseBlock.querySelector('button').disabled) return;

    if (clickedItem.classList.contains('matched')) return;

    if (selectedMatch === null) {
        // Шаг 1: Выбор первого элемента
        clickedItem.classList.add('selected');
        selectedMatch = clickedItem;
    } else if (selectedMatch === clickedItem) {
        // Шаг 2: Отмена выбора
        clickedItem.classList.remove('selected');
        selectedMatch = null;
    } else if (selectedMatch.dataset.group !== clickedItem.dataset.group) {
        // Шаг 3: Выбор второго элемента (из другой колонки)
        
        // Проверка совпадения
        const isMatchAtoB = selectedMatch.dataset.match === clickedItem.textContent;
        const isMatchBtoA = clickedItem.dataset.match === selectedMatch.textContent;
        
        if (isMatchAtoB || isMatchBtoA) {
            // Верно! Фиксируем пару.
            selectedMatch.classList.add('matched');
            clickedItem.classList.add('matched');
            
            // Проверка, все ли пары найдены
            const allItems = exerciseBlock.querySelectorAll('.match-item');
            const allMatched = allItems.length === exerciseBlock.querySelectorAll('.matched').length;
            
            if (allMatched) {
                // Если все сопоставлено, автоматически проверяем и блокируем
                checkAnswer(idiomId, exerciseId); 
            }
            
        } else {
            // Неверно. Визуальный фидбек и сброс выбора.
            selectedMatch.classList.add('mismatch');
            clickedItem.classList.add('mismatch');
            
            setTimeout(() => {
                selectedMatch.classList.remove('selected', 'mismatch');
                clickedItem.classList.remove('selected', 'mismatch');
            }, 500);
        }
        
        // Сброс временного хранилища
        selectedMatch.classList.remove('selected');
        selectedMatch = null;
    } else {
        // Выбран элемент из той же колонки - сбрасываем старый и выбираем новый
        selectedMatch.classList.remove('selected');
        clickedItem.classList.add('selected');
        selectedMatch = clickedItem;
    }
}


// =================================================================
// 8. ФУНКЦИЯ ПРОВЕРКИ ОТВЕТОВ (Обновлена для конструктора и сопоставления)
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
    let feedbackText = '';

    // Сброс классов
    exerciseBlock.classList.remove('correct-answer', 'incorrect-answer');

    // 1. ИЗВЛЕЧЕНИЕ ОТВЕТА И ПРОВЕРКА
    if (exercise.type === "Выбор значения" || exercise.type === "Разговорный Тест") {
        const checkedRadio = exerciseBlock.querySelector(`input[name="${exerciseId}"]:checked`);
        userAnswer = checkedRadio ? checkedRadio.parentElement.textContent.trim() : '';
        if (exercise.type === "Разговорный Тест" && userAnswer.match(/^[A-Z]\.\s/)) {
            userAnswer = userAnswer.substring(3).trim();
        }
        isCorrect = (userAnswer === exercise.answer);

    } else if (exercise.type === "Вставка пропущенного слова") {
        const inputField = exerciseBlock.querySelector('input[type="text"]');
        userAnswer = inputField ? inputField.value.trim() : '';
        isCorrect = (userAnswer.toLowerCase() === exercise.answer.toLowerCase());
        
    } else if (exercise.type === "Синхронный Перевод") {
        // Логика для Конструктора слов
        const sentenceArea = document.getElementById(`constructor-result-${exerciseId}`);
        // Собираем слова из чипов в предложении
        userAnswer = Array.from(sentenceArea.querySelectorAll('.word-chip'))
            .map(chip => chip.dataset.word)
            .join(' ')
            .trim();
        
        // Убираем лишние знаки препинания и пробелы для более точной проверки
        const cleanAnswer = exercise.answer.toLowerCase().replace(/[.,!?:;]/g, '').trim();
        const cleanUserAnswer = userAnswer.toLowerCase().replace(/[.,!?:;]/g, '').trim();

        isCorrect = (cleanUserAnswer === cleanAnswer);
        
        if (!isCorrect) {
             feedbackText = `<br><small>Ваш ответ: **${userAnswer}**</small>`;
        }
        
    } else if (exercise.type === "Сопоставление пар") {
        // Логика для Сопоставления пар
        const allItems = exerciseBlock.querySelectorAll('.match-item');
        const numMatched = exerciseBlock.querySelectorAll('.matched').length;
        
        isCorrect = (numMatched === allItems.length);
        
        if (!isCorrect) {
            feedbackText = `<br><small>Вы сопоставили ${numMatched} из ${allItems.length / 2} пар.</small>`;
        }
    }
    
    // 2. ОТОБРАЖЕНИЕ РЕЗУЛЬТАТА
    if (isCorrect) {
        resultDiv.innerHTML = `<span class="correct">✅ Верно!</span>`;
        exerciseBlock.classList.add('correct-answer');
    } else {
        resultDiv.innerHTML = `<span class="incorrect">❌ Неверно.</span>${feedbackText}<br><small>Правильный ответ: **${exercise.answer}**</small>`;
        exerciseBlock.classList.add('incorrect-answer');
    }
    
    // Деактивируем кнопку после проверки
    exerciseBlock.querySelector('button').disabled = true;
}


// =================================================================
// 9. ФУНКЦИЯ ВОСПРОИЗВЕДЕНИЯ АУДИО (БЕЗ ИЗМЕНЕНИЙ)
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
// 10. ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ
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
