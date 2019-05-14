'use strict';

class RamonMessages {
    constructor(json, impl) {
        /*
            Require JSON messages, and store as object
        */
        this.json = json;
        this.profile = null;
        this.impl = impl;
    }

    setProfileInstance(instance) {
        this.profile = instance;
    }

    call(message) {
        for (let i = 0; i < this.json.messages.length; i++) {
            let block = this.json.messages[i];
            if (block.mode) {
                if (block.message == message.content) {
                    sendByBlock(block, this);
                }
                continue;
            } else {
                if (message.content.toLowerCase().indexOf(block.message.toLowerCase()) !== -1) {
                    sendByBlock(block, this);
                }
            }
        }

        async function sendByBlock(block, parent) {
            let mess = await parent.parse(block.answer, message.author.id);
            if (block.controller) {
                /*
                    Reflection call controller
                */
                parent.impl[block.controller]();
            }
            if (block.type == "REPLY") {
                message.reply(mess);
                return;
            } else {
                message.channel.send(mess);
                return;
            }
        }
    }

    async parse(mess, id) {
        var message = mess[this.arrayRandom(mess.length)];
        if (this.profile) {
            await this.profile.getData(id).then(data => {
                message = message.replace(/{([\s\S]+?)}/, e => {
                    /* WARNING: Bad code */
                    e = e.replace("{", "");
                    e = e.replace("}", "");
                    return data[e];
                });
            });
            return message;
        }
        return message;
    }

    arrayRandom(max) {
        const min = 0;
        max = max - 1;
        let rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }
};


module.exports = RamonMessages;