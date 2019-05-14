/*
    Подключаем Ramon.Discord(библиотека для быстрого создания дискорд-ботов)
*/
const RamonDiscord = require('./ramon/ramon-discord');

/*
    Соединение с базой данных. Можно вообще не делать - если не собираемся использовать профили пользователей
*/
const DATABASE = {
    host: 'localhost',
    user: 'root',
    password: 'AzXIdyIMiD0QeWJU',
    database: 'profiles'
};

/*
    Функция инициализации бота
*/
const init = () => {
    /*
        Инициализируем бота. Вместо TOKEN - вводим токен дискорд-бота.
        в messages.json - будут хранится сообщения, обрабатываемые ботом. Посмотрите этот файл - там все предельно понятно.
        contollers - вызываемые контроллеры
        DATABASE - можно не указывать. Это подключение к базе данных
    */
    let build = RamonDiscord.build('TOKEN', require('./messages.json'), controllers, DATABASE);

    /*
        Если будем использовать профили. Можно удалить, если профили использоваться не будут.
    */
    build.useProfiles({
        /*
            Тут указывается структура профиля. В этом примере - пользователь будет иметь баланс
        */
        balance: 0
    });
};

var controllers = {
    testController: function() {
        console.info("test controller called");
    }
};

init();