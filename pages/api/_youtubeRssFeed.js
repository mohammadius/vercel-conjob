import log from "./_log";
import axios from "axios";
import DateDiff from "date-diff";
import Parser from "rss-parser";
let parser = new Parser();

export default async (rssUrl, webhookUrl) => {
	const { items, title } = await parser.parseURL(rssUrl);

	let newItems = items.filter((item) => {
		const pubDate = new Date(item.pubDate);
		const nowDate = new Date();

		const diff = new DateDiff(nowDate, pubDate);

		return diff.minutes() < 21;
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
