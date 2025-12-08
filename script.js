// --- ДАННЫЕ (для прототипа) ---
const IDIOM_DATA = [
    { 
        id: 1, 
        text: "Ser pan comido", 
        literalTranslation: "Быть съеденным хлебом", 
        meaning: "Очень легко, пустячное дело, проще простого.", 
        example: "El examen fue muy pan comido. (Экзамен был очень легким)",
        meme: "🍞 (Иллюстрация тут)", 
        topic: "Еда",
        exercises: [
            { 
                title: "Упражнение 1", 
                subtitle: "Выберите значение:", 
                question: "Что означает идиома 'Ser pan comido'?", 
                type: "Выбор", 
                options: ["Легкое дело", "Вкусный хлеб", "Сложная задача"] 
            },
            { 
                title: "Упражнение 2", 
                subtitle: "Вставьте пропущенное слово.", 
                question: "La tarea fue muy _____.", 
                type: "Пропуск" 
            },
            { 
                title: "Упражнение 3", 
                subtitle: "Сопоставьте простейшие пары:", 
                question: "", 
                type: "Сопоставление", 
                pairs: ["Легко", "Просто", "Просто", "Sin esfuerzo"] 
            },
        ]
    },
    // Остальные идиомы для списка
    { id: 2, text: "Estar en las nubes", meme: "☁️", topic: "Эмоции" },
    { id: 3, text: "No tener pelos en la lengua", meme: "🗣️", topic: "Характер" },
    { id: 4, text: "Poner los puntos sobre las íes", meme: "📝", topic: "Работа" },
    { id: 5, text: "Ahogarse en un vaso de agua", meme: "💧", topic: "Эмоции" },
];

let currentFavorites = [1]; // Заглушка избранного

// --- ФУНКЦИИ УПРАВЛЕНИЯ ЭКРАНАМИ ---

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    
    // Обновление активной кнопки навигации
    document.querySelectorAll('#bottom-nav button').forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-screen') === screenId.replace('screen-', '')) {
            button.classList.add('active');
        }
    });
    
    // Скрытие основного заголовка на детальном экране
    document.getElementById('main-header').style.display = (screenId === 'screen-detail') ? 'none' : 'block';
}

// --- ФУНКЦИЯ РЕНДЕРИНГА УПРАЖНЕНИЙ ---
function renderExerciseBlock(exercise) {
    let content = '';

    if (exercise.type === "Выбор") {
        content = exercise.options.map((option, i) => `
            <label class="radio-options"><input type="radio" name="ex1">${option}</label>
        `).join('');
    } else if (exercise.type === "Пропуск") {
        content = `
            <p>${exercise.question.split('_')[0]} <input type="text" placeholder="пропущенное слово" style="width: 70px;"> ${exercise.question.split('_')[1] || ''}</p>
        `;
    } else if (exercise.type === "Сопоставление") {
        content = `
            <div class="matching-list">
                <span>Легко</span><span>Просто</span>
                <span>Просто</span><span>Sin esfuerzo</span>
                <span>Быстро</span><span>Rápido</span>
            </div>
        `;
    }

    return `
        <div class="exercise-block">
            <h4>${exercise.title}</h4>
            <p>${exercise.subtitle}</p>
            ${content}
            <button>Проверить</button>
        </div>
    `;
}


// --- ФУНКЦИЯ: РЕНДЕРИНГ ДЕТАЛЬНОГО ЭКРАНА (ПОЛНЫЙ МАКЕТ) ---

function renderDetailScreen(idiom) {
    const detailScreen = document.getElementById('screen-detail');
    const isFavorite = currentFavorites.includes(idiom.id);

    // Генерация HTML для упражнений
    const exercisesHtml = idiom.exercises.map(renderExerciseBlock).join('');
    
    detailScreen.innerHTML = `
        <div class="detail-header">
            <button onclick="showScreen('screen-idioms')">⟨</button>
            <h2>${idiom.text}</h2>
            <span class="favorite-icon">${isFavorite ? '❤️' : '🤍'}</span>
        </div>
        
        <div class="detail-content">
            <div class="meme-image-container">
                <p style="font-size: 4em;">${idiom.meme}</p>
            </div>

            <div class="idiom-title-block">
                ${idiom.text} <span class="audio-icon" onclick="alert('Проигрывание аудио идиомы!')">🔊</span>
            </div>
            
            <div class="content-line">
                <span>Дословный перевод:</span> ${idiom.literalTranslation}
            </div>

            <div class="content-line">
                <span>Значение:</span> ${idiom.meaning}
            </div>
            
            <div class="content-line">
                <span>Пример:</span> <span class="example-text">${idiom.example}</span> <span class="audio-icon" onclick="alert('Проигрывание аудио примера!')">🔊</span>
            </div>
            
            <div class="exercises-title">Упражнения:</div>
            <div class="exercise-grid">
                ${exercisesHtml}
            </div>
        </div>
    `;

    showScreen('screen-detail');
}

// --- ФУНКЦИИ РЕНДЕРИНГА СПИСКОВ (Остаются прежними, но без логики блокировки) ---

function renderIdioms() {
    const listContainer = document.getElementById('idiom-list');
    listContainer.innerHTML = '';

    IDIOM_DATA.forEach(idiom => {
        const isFavorite = currentFavorites.includes(idiom.id);
        
        const card = document.createElement('div');
        card.className = `idiom-card`;
        card.innerHTML = `
            <div class="meme-icon">${idiom.meme}</div>
            <span class="idiom-text">${idiom.text}</span>
            <span class="favorite-icon">${isFavorite ? '❤️' : '🤍'}</span>
        `;
        
        card.addEventListener('click', () => {
             const selectedIdiom = IDIOM_DATA.find(i => i.id === idiom.id);
             // Проверяем, есть ли полные данные для рендеринга
             if (selectedIdiom.meaning) { 
                 renderDetailScreen(selectedIdiom);
             } else {
                 alert(`Нет полных данных для идиомы: ${idiom.text}. (Отображаем только Ser pan comido)`);
             }
        });
        
        listContainer.appendChild(card);
    });
}


// --- ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Загрузка данных в список
    renderIdioms();

    // 2. Обработчик навигации
    document.querySelectorAll('#bottom-nav button').forEach(button => {
        button.addEventListener('click', (e) => {
            const screenId = 'screen-' + e.currentTarget.getAttribute('data-screen');
            showScreen(screenId);
        });
    });

    // Показать начальный экран
    showScreen('screen-idioms');
});
