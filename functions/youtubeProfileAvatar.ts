import axios from "axios";
import cheerio from "cheerio";

export default async (ChannelUrl: string): Promise<string> => {
	const { data } = await axios({ method: "get", url: ChannelUrl });
	const $ = cheerio.load(data);
	return $("meta[property=og:image]").attr("content");
};
