const axios = require('axios');

const font = {
    mathias: {
        a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i",
        j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r", 
        s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",
        A: "𝗔", B: "𝗕", C: "𝗖", D: "𝗗", E: "𝗘", F: "𝗙", G: "𝗚", H: "𝗛", I: "𝗜",
        J: "𝗝", K: "𝗞", L: "𝗟", M: "𝗠", N: "𝗡", O: "𝗢", P: "𝗣", Q: "𝗤", R: "𝗥",
        S: "𝗦", T: "𝗧", U: "𝗨", V: "𝗩", W: "𝗪", X: "𝗫", Y: "𝗬", Z: "𝗭",
    }
};

module.exports.config = {
    name: "ai",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "aesther",
    description: "GPT-4",
    usePrefix: false,
    commandCategory: "ai",
    usages: "[question]",
    cooldowns: 5,
    dependencies: {
        "axios": ""
    }
};

module.exports.handleEvent = async function ({ api, event }) {
    const lowerBody = event.body.toLowerCase();
    if (!(lowerBody.startsWith("eurix") || lowerBody.startsWith("ai"))) return;
    
    const args = event.body.split(/\s+/);
    args.shift();
    const question = args.join(" ");
    
    if (!question) {
        api.sendMessage("[🌐]𝘼𝙀𝙎𝙏𝙃𝙀𝙍©\n\n💬( ╹▽╹ )....? ", event.threadID, event.messageID);
        return;
    }
    
    api.sendMessage(`𝗟𝗢𝗔𝗗𝗜𝗡𝗚 𝗔𝗡𝗦𝗪𝗘𝗥 🔵🔴⚪....`, event.threadID, event.messageID);
    
    const apiUrl = `https://eurix-api.replit.app/gpt4?ask=${encodeURIComponent(question)}`;
    
    try {
        const response = await axios.get(apiUrl);
        let answer = response.data.answer;
        
        // Transform the answer into Mathias font
        answer = answer.split("").map(char =&gt; font.mathias[char] || char).join("");
        
        api.sendMessage(answer, event.threadID, event.messageID);
    } catch (error) {
        console.error("Error fetching AI response:", error);
        api.sendMessage("Error fetching AI response", event.threadID, event.messageID);
    }
};
