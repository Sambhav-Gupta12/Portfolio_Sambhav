/**
 * Vercel serverless function — not part of the Vite client build.
 * GET /api/github-repos
 */

const GITHUB_REPOS_URL =
  "https://api.github.com/users/Sambhav-Gupta12/repos?sort=updated&per_page=100";

function pickFields(repo) {
  return {
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    homepage: repo.homepage,
    topics: repo.topics ?? [],
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    updated_at: repo.updated_at,
    fork: repo.fork,
  };
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "sambhav-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(GITHUB_REPOS_URL, { headers });

    if (!response.ok) {
      const detail = await response.text();
      return res.status(response.status).json({
        error: "GitHub API request failed",
        detail: detail.slice(0, 500),
      });
    }

    const repos = await response.json();
    const payload = Array.isArray(repos) ? repos.map(pickFields) : [];

    // Cache on Vercel’s CDN for at least 1 hour; allow stale while revalidating
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({
      error: "Failed to fetch repositories",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
