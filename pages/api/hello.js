import { Octokit } from "@octokit/core";

const octokit = new Octokit({
  auth: `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`,
});

export const OWNER = "facebook";
export const REPO = "react";

export async function getAllPRs() {
  // const { request } = require("@octokit/request");

  const result = await octokit.request("GET /repos/{owner}/{repo}/pulls", {
    owner: OWNER,
    repo: REPO,
    per_page: 100,
    page: 1,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return result.data;
}

export async function getCommentsCount(comments_url) {
  const result = await octokit.request(`GET ${comments_url}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return result.data;
}

export async function handler(req, res) {
  if (req.method === "POST") {
    const id = req.query.id;
    console.log(id);
  } else {
    const allPrs = await getAllPRs();
    res.status(200).json({ message: "Success" });
  }
}
