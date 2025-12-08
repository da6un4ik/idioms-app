// --- ЗАГЛУШКА ДАННЫХ (для прототипа) ---
const IDIOM_DATA = [
    { id: 1, text: "Ser pan comido", isFree: true, meme: "🍞", topic: "Еда" },
    { id: 2, text: "Estar en las nubes", isFree: true, meme: "☁️", topic: "Эмоции" },
    { id: 3, text: "No tener pelos en la lengua", isFree: true, meme: "🗣️", topic: "Характер" },
    { id: 4, text: "Poner los puntos sobre las íes", isFree: false, meme: "📝", topic: "Работа" },
    { id: 5, text: "Ahogarse en un vaso de agua", isFree: false, meme: "💧", topic: "Эмоции" },
    // Добавьте больше идиом
];

let isPaid = false; // Состояние оплаты (заглушка)
let currentFavorites = [1, 3]; // Заглушка избранного

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
    
    // Скрытие модального окна разблокировки, если мы переходим на другой экран
    document.getElementById('screen-unlock').style.display = 'none';
}

function renderIdioms() {
    const listContainer = document.getElementById('idiom-list');
    listContainer.innerHTML = '';

    IDIOM_DATA.forEach(idiom => {
        const isLocked = !isPaid && idiom.id > 3;
        const isFavorite = currentFavorites.includes(idiom.id);
        
        const card = document.createElement('div');
        card.className = `idiom-card ${isLocked ? 'locked' : ''}`;
        card.innerHTML = `
            <div class="meme-icon">${idiom.meme}</div>
            <span class="idiom-text">${idiom.text}</span>
            <span class="favorite-icon">${isFavorite ? '❤️' : '🤍'}</span>
        `;
        
        card.addEventListener('click', () => {
            if (isLocked) {
                document.getElementById('screen-unlock').style.display = 'flex';
            } else {
                alert(`Переход на детальный экран идиомы: ${idiom.text}`);
                // В реальном приложении здесь будет переход на детальный экран с подгрузкой всех данных.
            }
        });
        
        listContainer.appendChild(card);
    });
}

function renderProfile() {
    const profileScreen = document.getElementById('screen-profile');
    profileScreen.innerHTML = '';

    if (isPaid) {
        profileScreen.innerHTML = `
            <h2>👤 Мой Профиль</h2>
            <h3>📈 Мой Прогресс</h3>
            <p>Изучено идиом: 2/5 (заглушка)</p>
            <p>Средний балл: 85% (заглушка)</p>
            <button onclick="window.open('https://t.me/your_school_chat', '_blank')">💬 Чат с преподавателем (Telegram)</button>
            <hr>
            <p>Спасибо за покупку!</p>
        `;
    } else {
        profileScreen.innerHTML = `
            <h2>👤 Профиль</h2>
            <p>Вы используете бесплатную версию.</p>
            <p>Перейдите в каталог, чтобы начать.</p>
            <button onclick="document.getElementById('screen-unlock').style.display = 'flex';">Разблокировать полный доступ</button>
        `;
    }
}

function renderAdditionalExercises() {
     const addExScreen = document.getElementById('screen-add-exercises');
     addExScreen.innerHTML = '';
     
     if (isPaid) {
         addExScreen.innerHTML = `
             <h2>🏋️ Дополнительные Упражнения</h2>
             <p>1. Упражнения на случайную идиому</p>
             <p>2. Тексты с использованием идиом</p>
             <p>3. Предложения для самостоятельного перевода</p>
             <p>Здесь будет логика для запуска этих упражнений.</p>
         `;
     } else {
         addExScreen.innerHTML = `
             <h2>🔒 Дополнительные Упражнения</h2>
             <p>Эти упражнения доступны только в полной версии.</p>
             <button onclick="document.getElementById('screen-unlock').style.display = 'flex';">Разблокировать полный доступ</button>
         `;
     }
}

// --- ИНИЦИАЛИЗАЦИЯ И ОБРАБОТЧИКИ ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Загрузка данных в список
    renderIdioms();
    renderProfile();
    renderAdditionalExercises();

    // 2. Обработчик навигации
    document.querySelectorAll('#bottom-nav button').forEach(button => {
        button.addEventListener('click', (e) => {
            const screenId = 'screen-' + e.currentTarget.getAttribute('data-screen');
            showScreen(screenId);
            
            // Если переходим на Профиль, обновим его
            if (screenId === 'screen-profile') {
                renderProfile();
            }
            if (screenId === 'screen-add-exercises') {
                renderAdditionalExercises();
            }
        });
    });
    
    // 3. Обработчик кнопки покупки (заглушка)
    document.getElementById('buy-button').addEventListener('click', () => {
        // Здесь в реальном приложении запускается процесс оплаты
        alert('Запуск процесса оплаты...'); 
        
        // Эмуляция успешной оплаты
        isPaid = true; 
        document.getElementById('screen-unlock').style.display = 'none';
        
        // Обновление всех экранов после покупки
        renderIdioms();
        renderProfile();
        renderAdditionalExercises();
        alert('Поздравляем! Полный доступ разблокирован.');
    });

    // Показать начальный экран
    showScreen('screen-idioms');
});
