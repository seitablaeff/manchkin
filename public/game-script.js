// game-script.js
document.addEventListener('DOMContentLoaded', function() {
    var game = document.getElementById('game');
    var userIdDisplay = document.getElementById('userId');
    var roomNumberDisplay = document.getElementById('roomNumber');
    var userList = document.getElementById('userList');
    var socket = io();

    if (!localStorage.getItem('username') || !localStorage.getItem('roomNumber')) {
        window.location.href = 'index.html';
    } else {
        game.classList.remove('hidden');
    }

    var roomId = localStorage.getItem('roomNumber');
    var username = JSON.parse(localStorage.getItem('currentUser')).username;

    socket.on('connect', () => {
        userIdDisplay.textContent = socket.id;
        roomNumberDisplay.textContent = roomId;
        socket.emit('joinRoom', roomId);
    });

    socket.on('updateUserList', (users) => {
        userList.innerHTML = ''; // Очищаем текущий список
        users.forEach((userId) => {
            var userElement = document.createElement('div');
            userElement.textContent = userId; // Вы можете заменить userId на более информативный идентификатор
            userList.appendChild(userElement);
        });
    });

    var chatForm = document.getElementById('chatForm');
    var messageInput = document.getElementById('messageInput');
    var messages = document.getElementById('messages');

    chatForm.addEventListener('submit', function(event) {
        event.preventDefault();
        var message = messageInput.value;
        if (message) {
            socket.emit('chatMessage', { room: roomId, message: message });
            messageInput.value = '';
        }
    });

    socket.on('chatMessage', function(data) {
        var messageElement = document.createElement('div');
        messageElement.textContent = `${data.id}: ${data.message}`;
        messages.appendChild(messageElement);
        messages.scrollTop = messages.scrollHeight;
    });

    var treasures = [
        // другое
        'assets/Сокровища/другое/Наёмничек.jpg',
        'assets/Сокровища/другое/Полуучи Уровень. Зелье Крутизны.jpg',
        'assets/Сокровища/другое/Получи Уровень. 1000 Голдов.jpg',
        'assets/Сокровища/другое/Получи Уровень. Выгодная Ошибка при Сложении.jpg',
        'assets/Сокровища/другое/Получи Уровень. Используй Непонятное Правило.jpg',
        'assets/Сокровища/другое/Получи Уровень. Кипяток в Муравейнике.jpg',
        'assets/Сокровища/другое/Получи уровень. Поглумись над Телами Врагов.jpg',
        'assets/Сокровища/другое/Получи уровень. Получи уровень.jpg',
        'assets/Сокровища/другое/Получи Уровень. Прикорми Мастера.jpg',
        'assets/Сокровища/другое/Получи Уровень. Рассчитайсяс с Наёмником.jpg',
        'assets/Сокровища/другое/Разжалоби Мастера.jpg',
        'assets/Сокровища/другое/Реально Конкретный Титул.jpg',
        'assets/Сокровища/другое/Укради уровень.jpg',
        'assets/Сокровища/другое/Ура, Клад!.jpg',
    
        // обложка
        'assets/Сокровища/обложка_сокровища.jpg',
    
        // Шмотки
        'assets/Сокровища/Шмотки/Q-Кубик.jpg',
        'assets/Сокровища/Шмотки/Башмаки Могучего Пенделя.jpg',
        'assets/Сокровища/Шмотки/Башмаки Реально Быстрого Бега.jpg',
        'assets/Сокровища/Шмотки/Бензопила Кровавого Расчленения.jpg',
        'assets/Сокровища/Шмотки/Боевая Стремянка.jpg',
        'assets/Сокровища/Шмотки/Булава Острокнечности.jpg',
        'assets/Сокровища/Шмотки/Волшебная Лампа.jpg',
        'assets/Сокровища/Шмотки/Доспехи Поперёк-Себя-Шире.jpg',
        'assets/Сокровища/Шмотки/Дуб Джентельменов.jpg',
        'assets/Сокровища/Шмотки/Дупельгангер.jpg',
        'assets/Сокровища/Шмотки/Замораживающее Взрывное Зелье.jpg',
        'assets/Сокровища/Шмотки/Зелье Дружбы.jpg',
        'assets/Сокровища/Шмотки/Зелье Идиотской Храбрости.jpg',
        'assets/Сокровища/Шмотки/Зелье Невидимости.jpg',
        'assets/Сокровища/Шмотки/Зелье Пламенной Отравы.jpg',
        'assets/Сокровища/Шмотки/Зелье Попуморфа.jpg',
        'assets/Сокровища/Шмотки/Зелье Ротовой Вони.jpg',
        'assets/Сокровища/Шмотки/Зелье Стрелочника.jpg',
        'assets/Сокровища/Шмотки/Кинжал Измены.jpg',
        'assets/Сокровища/Шмотки/Клёвые Шарики.jpg',
        'assets/Сокровища/Шмотки/Кожаный Прикид.jpg',
        'assets/Сокровища/Шмотки/Колготки Великанской Силы.jpg',
        'assets/Сокровища/Шмотки/Коленеотбойный молоточек.jpg',
        'assets/Сокровища/Шмотки/Крыска на Палочке.jpg',
        'assets/Сокровища/Шмотки/Лук с Ленточками.jpg',
        'assets/Сокровища/Шмотки/Магическая Ракета.jpg',
        'assets/Сокровища/Шмотки/Меч Коварного Бастарда.jpg',
        'assets/Сокровища/Шмотки/Меч Песни и Пляски.jpg',
        'assets/Сокровища/Шмотки/Меч Широты Взглядов.jpg',
        'assets/Сокровища/Шмотки/Мифрильный Доспех.jpg',
        'assets/Сокровища/Шмотки/Наколеники Развода.jpg',
        'assets/Сокровища/Шмотки/Огромная Каменюга.jpg',
        'assets/Сокровища/Шмотки/Одиннадцатовый Кий.jpg',
        'assets/Сокровища/Шмотки/Остроконечная Шляпа Могущества.jpg',
        'assets/Сокровища/Шмотки/Острые коленки.jpg',
        'assets/Сокровища/Шмотки/Палёные Доспехи.jpg',
        'assets/Сокровища/Шмотки/Пафосный Баклер.jpg',
        'assets/Сокровища/Шмотки/Пелье зутаницы.jpg',
        'assets/Сокровища/Шмотки/Питьё Противно-Спортивное.jpg',
        'assets/Сокровища/Шмотки/Плащ Замутнения.jpg',
        'assets/Сокровища/Шмотки/Посох Напалма.jpg',
        'assets/Сокровища/Шмотки/Радиоактивно-Электрокислотное Зелье.jpg',
        'assets/Сокровища/Шмотки/Рапира Такнечестности.jpg',
        'assets/Сокровища/Шмотки/Сандалеты-Протекторы.jpg',
        'assets/Сокровища/Шмотки/Склизистая Оболочка.jpg',
        'assets/Сокровища/Шмотки/Снотворное Зелье.jpg',
        'assets/Сокровища/Шмотки/Совсехсторонний Щит.jpg',
        'assets/Сокровища/Шмотки/Сорвиголовная Бандана.jpg',
        'assets/Сокровища/Шмотки/Стенка-Встанька.jpg',
        'assets/Сокровища/Шмотки/Сэндвич Запоздалого Прозрения с Сыром и Селёдкой.jpg',
        'assets/Сокровища/Шмотки/Тёрка Умиротворения.jpg',
        'assets/Сокровища/Шмотки/Тюбик Клея.jpg',
        'assets/Сокровища/Шмотки/Хотельное Кольцо 1.jpg',
        'assets/Сокровища/Шмотки/Хотельное Кольцо 2.jpg',
        'assets/Сокровища/Шмотки/Чарующая Дуда.jpg',
        'assets/Сокровища/Шмотки/Читерский Кубик.jpg',
        'assets/Сокровища/Шмотки/Швейцарская Армейская Алебарда.jpg',
        'assets/Сокровища/Шмотки/Шлем Бесстрашия.jpg',
        'assets/Сокровища/Шмотки/Шлем-Рогач.jpg',
        'assets/Сокровища/Шмотки/Штырь Лозоходца.jpg',
        'assets/Сокровища/Шмотки/Яппиток.jpg'
    ];
    
    var doors = [
        // Андед
        'assets/Двери/Андед/Андедный Коник.jpg',
        'assets/Двери/Андед/Бледные Братья.jpg',
        'assets/Двери/Андед/Г-н Кости.jpg',
        'assets/Двери/Андед/Король Тут. Андед.jpg',
        
        // Другое
        'assets/Двери/Другое/Амбал +10 к Монстру.jpg',
        'assets/Двери/Другое/Божественное вмешательство.jpg',
        'assets/Двери/Другое/Бродячья Тварь 1.jpg',
        'assets/Двери/Другое/Бродячья Тварь 2.jpg',
        'assets/Двери/Другое/Бродячья Тварь 3.jpg',
        'assets/Двери/Другое/Гадкая Парочка.jpg',
        'assets/Двери/Другое/Детёныш -5 к Монстру.jpg',
        'assets/Двери/Другое/Древний +10 к Монстру.jpg',
        'assets/Двери/Другое/Иллюзия.jpg',
        'assets/Двери/Другое/Мозговитый +5 к Монстру.jpg',
        'assets/Двери/Другое/Помоги Себе Сам!.jpg',
        'assets/Двери/Другое/Психованный +5 к Монстру.jpg',
        'assets/Двери/Другое/Ушёл на Обед.jpg',
        'assets/Двери/Другое/Чит!.jpg',
    
        // Класс
        'assets/Двери/Класс/Воин 1.jpg',
        'assets/Двери/Класс/Воин 2.jpg',
        'assets/Двери/Класс/Воин 3.jpg',
        'assets/Двери/Класс/Волшебник 1.jpg',
        'assets/Двери/Класс/Волшебник 2.jpg',
        'assets/Двери/Класс/Волшебник 3.jpg',
        'assets/Двери/Класс/Вор 1.jpg',
        'assets/Двери/Класс/Вор 2.jpg',
        'assets/Двери/Класс/Вор 3.jpg',
        'assets/Двери/Класс/Клирик 1.jpg',
        'assets/Двери/Класс/Клирик 2.jpg',
        'assets/Двери/Класс/Клирик 3.jpg',
        'assets/Двери/Класс/Суперманчкин 1.jpg',
        'assets/Двери/Класс/Суперманчкин 2.jpg',
    
        // Монстр
        'assets/Двери/Монстр/3 872 Орка.jpg',
        'assets/Двери/Монстр/Адвокат.jpg',
        'assets/Двери/Монстр/Амазонка.jpg',
        'assets/Двери/Монстр/Бигфут.jpg',
        'assets/Двери/Монстр/Бульрог.jpg',
        'assets/Двери/Монстр/Вопящий Задрот.jpg',
        'assets/Двери/Монстр/Газебо.jpg',
        'assets/Двери/Монстр/Гарпистки.jpg',
        'assets/Двери/Монстр/Гиппогриф.jpg',
        'assets/Двери/Монстр/Желатиновый Октаэдр.jpg',
        'assets/Двери/Монстр/Закос Под Вампира.jpg',
        'assets/Двери/Монстр/Здоровенная Бешенная Цыпа.jpg',
        'assets/Двери/Монстр/Кальмадзилла.jpg',
        'assets/Двери/Монстр/Лепрекон.jpg',
        'assets/Двери/Монстр/Летучие Лягушки.jpg',
        'assets/Двери/Монстр/Лицесос.jpg',
        'assets/Двери/Монстр/Мадемонуазели.jpg',
        'assets/Двери/Монстр/Молотая крысотка.jpg',
        'assets/Двери/Монстр/Невыразимо Жуткий Неописуемый Ужас.jpg',
        'assets/Двери/Монстр/Обдолбанный Голем.jpg',
        'assets/Двери/Монстр/Питбуль.jpg',
        'assets/Двери/Монстр/Плутониевый дракок.jpg',
        'assets/Двери/Монстр/Рыгачу.jpg',
        'assets/Двери/Монстр/Сопливый Нос.jpg',
        'assets/Двери/Монстр/Сочащаяся Слизь.jpg',
        'assets/Двери/Монстр/Страховой Агент.jpg',
        'assets/Двери/Монстр/Типа Вошки.jpg',
        'assets/Двери/Монстр/Трава в Горшке.jpg',
        'assets/Двери/Монстр/Увечный Гоблин.jpg',
        'assets/Двери/Монстр/Ускоренные Улитки.jpg',
        'assets/Двери/Монстр/Утикора.jpg',
        'assets/Двери/Монстр/Форумный Тролль.jpg',
        'assets/Двери/Монстр/Языческий демон.jpg',
    
        // Проклятие
        'assets/Двери/Проклятие/Проклятие! Большая Потеря.jpg',
        'assets/Двери/Проклятие/Проклятие! В Конец Мерзкое Проклятие.jpg',
        'assets/Двери/Проклятие/Проклятие! Кривящее Зеркало.jpg',
        'assets/Двери/Проклятие/Проклятие! Налоги.jpg',
        'assets/Двери/Проклятие/Проклятие! Невелика Потеря 1.jpg',
        'assets/Двери/Проклятие/Проклятие! Невелика Потеря 2.jpg',
        'assets/Двери/Проклятие/Проклятие! Смена Класса.jpg',
        'assets/Двери/Проклятие/Проклятие! Смена Пола.jpg',
        'assets/Двери/Проклятие/Проклятие! Смена Расы.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь 1 Уровень.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь 2 Карты.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь Класс.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь Надетую Обувку.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь Надетый Броник.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь Надетый Головняк.jpg',
        'assets/Двери/Проклятие/Проклятие! Теряешь Расу.jpg',
        'assets/Двери/Проклятие/Проклятие! Терять 1 Уровень.jpg',
        'assets/Двери/Проклятие/Проклятие! Утка Обречённости.jpg',
        'assets/Двери/Проклятие/Проклятье! Курица на Башне.jpg',
    
        // Раса
        'assets/Двери/Раса/Дварф 1.jpg',
        'assets/Двери/Раса/Дварф 2.jpg',
        'assets/Двери/Раса/Дварф 3.jpg',
        'assets/Двери/Раса/Полукровка 1.jpg',
        'assets/Двери/Раса/Полукровка 2.jpg',
        'assets/Двери/Раса/Халфлинг 1.jpg',
        'assets/Двери/Раса/Халфлинг 2.jpg',
        'assets/Двери/Раса/Халфлинг 3.jpg',
        'assets/Двери/Раса/Эльф 1.jpg',
        'assets/Двери/Раса/Эльф 2.jpg',
        'assets/Двери/Раса/Эльф 3.jpg',
    ];

    var cardDisplay = document.getElementById('cardDisplay');
    var cardImage = document.getElementById('cardImage');
    var closeCardButton = document.getElementById('closeCard');
    var onHandButton = document.getElementById('onHand');
    var onTableButton = document.getElementById('onTable');

    document.getElementById('doors-deck').addEventListener('dblclick', function() {
        displayCard(doors);
    });

    document.getElementById('treasures-deck').addEventListener('dblclick', function() {
        displayCard(treasures);
    });

    closeCardButton.addEventListener('click', function() {
        cardDisplay.classList.add('hidden');
    });

    onHandButton.addEventListener('click', function() {
        var newCard = document.createElement('img');
        newCard.src = cardImage.src;
        newCard.alt = 'Hand Card';
        newCard.setAttribute('data-placement', 'none');
        document.getElementById('handCards').appendChild(newCard);
        cardDisplay.classList.add('hidden');
    });

    onTableButton.addEventListener('click', function() {
        var newCard = document.createElement('img');
        newCard.src = cardImage.src;
        newCard.alt = 'Table Card';
        newCard.setAttribute('data-placement', 'none');
        document.getElementById('tableCards').appendChild(newCard);
        cardDisplay.classList.add('hidden');
    });

    function displayCard(deck) {
        var card = deck[Math.floor(Math.random() * deck.length)];
        cardImage.src = card;
        cardDisplay.classList.remove('hidden');
    }

    // Initialize SortableJS for each container
    ['table', 'myCards', 'hand', 'selectedCards'].forEach(function(id) {
        new Sortable(document.getElementById(id), {
            group: 'shared',
            animation: 150,
            ghostClass: 'sortable-ghost'
        });
    });
});