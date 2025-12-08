// --- ДАННЫЕ (для прототипа) ---
const IDIOM_DATA = [
    { id: 1, text: "Ser pan comido", meme: "🍞", topic: "Еда" },
    { id: 2, text: "Estar en las nubes", meme: "☁️", topic: "Эмоции" },
    { id: 3, text: "No tener pelos en la lengua", meme: "🗣️", topic: "Характер" },
    { id: 4, text: "Poner los puntos sobre las íes", meme: "📝", topic: "Работа" },
    { id: 5, text: "Ahogarse en un vaso de agua", meme: "💧", topic: "Эмоции" },
    // Добавьте больше идиом
];

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
}

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
             alert(`Переход на детальный экран идиомы: ${idiom.text}`);
             // В реальном приложении здесь будет переход на детальный экран с подгрузкой всех данных.
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
