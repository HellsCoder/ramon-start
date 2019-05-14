/*
    Подключаем Ramon.Discord(библиотека для быстрого создания дискорд-ботов)
*/
const RamonDiscord = require('./ramon/ramon-discord');



/*
    Функция инициализации бота
*/
const init = () => {
    /*
        Инициализируем бота. Вместо TOKEN - вводим токен дискорд-бота.
        в messages.json - будут хранится сообщения, обрабатываемые ботом. Посмотрите этот файл - там все предельно понятно.
    */
    let build = RamonDiscord.build('TOKEN', require('./messages.json'));
};


init();
