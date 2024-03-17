const axios = require("axios");

module.exports.config = {
		name: "measure",
		version: "1.0.0",
		credits: "Samir Œ , Faith Xe",
		hasPrefix: false,
		role: 0,
		description: "Get image measurements",
		aliases: ["measure"],
		usage: '{prefix}measurements',
		cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
		if (event.type === "message_reply" && (!event.messageReply || !event.messageReply.attachments || event.messageReply.attachments.length === 0)) {
				api.sendMessage("Please reply to a message with an image attachment.", event.threadID, event.messageID);
				return;
		}

		const imageUrl = event.messageReply.attachments[0].url;

		try {
				const response = await axios.post("https://api-samir.onrender.com/measure", {
						imageUrl: imageUrl
				});

				const measurements = response.data;

				const replyMessage = `
						𝚒𝚖𝚊𝚐𝚎 𝚖𝚎𝚊𝚜𝚞𝚛𝚎𝚖𝚎𝚗𝚝𝚜:
						- 𝙵𝚘𝚛𝚖𝚊𝚝: [ ${measurements.format} ]
						- 𝚆𝚒𝚍𝚝𝚑: [ ${measurements.width} ]
						- 𝙷𝚎𝚒𝚐𝚑𝚝: [ ${measurements.height} ]
						- 𝙲𝚑𝚊𝚗𝚗𝚎𝚕𝚜: [ ${measurements.channels} ]
						- 𝚂𝚒𝚣𝚎: [ ${measurements.size} 𝚋𝚢𝚝𝚎𝚜 ]
						- 𝙳𝚎𝚗𝚜𝚒𝚝𝚢: [ ${measurements.density} ]
						- 𝙲𝚘𝚕𝚘𝚛 𝚂𝚙𝚊𝚌𝚎: [ ${measurements.space} ]
						- 𝙰𝚕𝚙𝚑𝚊𝙲𝚑𝚊𝚗𝚗𝚎𝚕: [ ${measurements.hasAlpha ? "𝚈𝚎𝚜" : "𝙽𝚘"} ]
				`;

				const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });

				api.sendMessage({
						body: replyMessage,
						attachment: imageResponse.data
				}, event.threadID, event.messageID);
		} catch (error) {
				console.error(error);
				api.sendMessage("An error occurred while fetching image measurements.", event.threadID, event.messageID);
		}
};
