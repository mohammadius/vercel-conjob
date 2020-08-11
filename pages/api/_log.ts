import axios from "axios";
import { env } from "process";

export default async (username: string, message: string) =>
	axios({
		method: "post",
		url: env.loggerWebhookUrl,
		data: {
			content: message,
			username: username
		}
	});
