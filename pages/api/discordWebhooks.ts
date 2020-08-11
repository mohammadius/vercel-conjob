import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import Parser from "rss-parser";
import { env } from "process";
let parser = new Parser();

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const auth = req.headers.authorization;
	if (auth !== env.authPass) res.status(401).end();

	const { items } = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UC-lHJZR3Gqxm24_Vd_AJ5Yw");

	let newItems = items.filter((item) => {
		let pubDate = new Date(item.pubDate);
		let nowDate = new Date();
		var diffMins = Math.round((((pubDate.getDate() - nowDate.getDate()) % 86400000) % 3600000) / 60000);
		return diffMins < 31;
	});

	newItems.forEach((item) => {
		axios({
			method: "post",
			url: env.pewdiepieWebhookUrl,
			data: {
				content: item.link
			}
		});
	});

	res.status(204).end();
};
