import axios from "axios";
import { env } from "process";

export default async (message: string) =>
	axios({
		method: "post",
		url: env.loggerWebhookUrl,
		data: { content: message }
	});
