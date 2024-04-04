module.exports.config = {
    name: "namebot",
    version: "1.0.4",
    hasPermssion: 0,
    creditss: "datoccho",
    usePrefix: true,
    description: "Automatically prevent change bot nickname",
    commandCategory: "system",
    usages: "",
    cooldowns: 5
};


module.exports.handleEvent = async function ({ api, args, event, client, __GLOBAL, Threads, Currencies }) {
    const { threadID } = event;
    let { nicknames } = await api.getThreadInfo(event.threadID)
    const nameBot = nicknames[api.getCurrentUserID()]
    if (nameBot !== `${config.BOTNAME}`) {
        api.changeNickname(`${(!global.config.BOTNAME) ? "𝘿𝙊𝙉𝙏 𝘾𝙃𝘼𝙉𝙂𝙀 𝙏𝙃𝙀 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 🌐" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
        setTimeout(() => {
            return api.sendMessage(`𝘿𝙊𝙉𝙏 𝘾𝙃𝘼𝙉𝙂𝙀 𝙏𝙃𝙀 𝘽𝙊𝙏 𝙉𝘼𝙈𝙀 🌐`, threadID);
        }, 1500);
    }
}

module.exports.run = async({ api, event, Threads}) => {
    let data = (await Threads.getData(event.threadID)).data || {};
    if (typeof data["cnamebot"] == "undefined" || data["cnamebot"] == false) data["cnamebot"] = true;
    else data["cnamebot"] = false;

    await Threads.setData(event.threadID, { data });
    global.data.threadData.set(parseInt(event.threadID), data);

    return api.sendMessage(`✅ ${(data["cnamebot"] == true) ? "Turn on" : "Turn off"} successfully cnamebot!`, event.threadID);

}
