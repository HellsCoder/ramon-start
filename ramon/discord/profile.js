class Profile {
    constructor(pool, profile) {
        this.pool = pool;
        this.profile = profile;
    }

    newProfile(id) {
        this.pool.query("INSERT INTO `profiles` (profile_owner, profile_data) VALUES (" + this.pool.escape(id) + ",'" + this.profile + "')");
    }

    async getData(id) {
        let parent = this;
        const result = await new Promise((reslove, reject) => {
            parent.pool.query("SELECT profile_data FROM `profiles` WHERE `profile_owner` = " + parent.pool.escape(id), function(err, result) {
                if (err) {
                    return reject();
                }
                if (result.length <= 0) {
                    parent.newProfile(id);
                    return reslove(parent.profile);
                }
                let object = JSON.parse(result[0].profile_data);
                return reslove(object);
            });
        });
        return result;
    }

    setData(id, data) {
        data = JSON.stringify(data);
        this.pool.query("UPDATE `profiles` SET `profile_data` = '" + data + "' WHERE `profile_owner` = " + pool.escape(id));
    }
};

module.exports = Profile;