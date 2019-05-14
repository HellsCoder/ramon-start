const Discord = require("discord.js");

const connectDiscord = (token) => {
    let client = new Discord.Client();
    client.login(token);
    return client;
};

const connectDatabase = (data) => {
    const mysql = require('mysql');
    let pool = mysql.createPool(data);
    pool.query(`CREATE TABLE IF NOT EXISTS \`profiles\` (
        \`profile_id\` int(15) NOT NULL AUTO_INCREMENT,
        \`profile_owner\` varchar(255) NOT NULL,
        \`profile_data\` text(65535) NOT NULL,
          PRIMARY KEY (\`profile_id\`)
    ) ENGINE=MyISAM DEFAULT CHARSET=cp1251 AUTO_INCREMENT=0 ;`)
    return pool;
};

module.exports = { connectDiscord, connectDatabase };