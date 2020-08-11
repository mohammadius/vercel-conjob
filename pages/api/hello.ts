import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
	const auth = req.headers.authorization;
	res.status(200).end();
};
