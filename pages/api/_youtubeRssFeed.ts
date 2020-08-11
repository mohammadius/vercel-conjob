import log from "./_log";
import axios from "axios";
import Parser from "rss-parser";
let parser = new Parser();

export default async (rssUrl: string, webhookUrl: string) => {
	const { items, title } = await parser.parseURL(rssUrl);

	let newItems = items.filter((item) => {
		let pubDate = new Date(item.pubDate);
		let nowDate = new Date();
		var diffMins = Math.round((((pubDate.getDate() - nowDate.getDate()) % 86400000) % 3600000) / 60000);
		return diffMins < 31;
	});

	await log(title, `recieved ${items.length} rss feed total\n${newItems.length > 0 ? newItems.length : "none"} of them are new`);

	newItems.forEach(async (item) => {
		await axios({
			method: "post",
			url: webhookUrl,
			data: {
				content: item.link
			}
		});
	});
};
