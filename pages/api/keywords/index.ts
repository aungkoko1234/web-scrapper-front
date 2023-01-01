import { NextApiRequest, NextApiResponse } from "next";
import { apiClient } from "../../../lib/httpClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ message: "Only GET requests allowed" });
      return;
    }
    const { search, page = 1, limit = 10 } = req.query;
    let url = `keywords?page=${page}&limit=${limit}`;
    if (search) {
      url = url + `&search=${search}`;
    }
    console.log("url", url);
    const response = await apiClient().get(url);
    return res.status(200).json(response.data.data);
  } catch (e) {
    // console.log("error", e);
    return res.status(500).json({ error: "Unexpected error." });
  }
};

export default handler;
