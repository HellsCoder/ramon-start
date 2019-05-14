/*
    Ramon.Discord

    Developed by HellsCoder
    Contact Us: vk.com/bytecode
*/

const connector = require("./discord/connector");
const RamonMessages = require('./discord/parser/messages');
const Profile = require("./discord/profile");

/** 
@method build
@param token {string} Discord-bot token
@param messages {string} Path to JSON map-messages
@param database {object} Database data: host, user, password and database name
*/
const build = (token, messages, impl, database) => {
    let client = connector.connectDiscord(token);

    const RamonMessagesInstance = new RamonMessages(messages, impl);

    client.on("message", (message) => {
        RamonMessagesInstance.call(message);
    });

    /**
     * @method useProfiles
     * @param profile {object} The structure of the profile 
     */
    const useProfiles = (profile) => {
        profile = JSON.stringify(profile);
        let pool = connector.connectDatabase(database)
        if (database) {
            let ProfileInstance = new Profile(pool, profile);
            RamonMessagesInstance.setProfileInstance(ProfileInstance);
            client.on('guildMemberAdd', member => {
                ProfileInstance.newProfile(member.id);
            });
        }
    };

    return { useProfiles };
};

module.exports = { build };