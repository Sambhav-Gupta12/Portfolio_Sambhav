import { useEffect, useState } from "react";
import { Github } from "./icons";
import Container from "./Container";

const MAX_REPOS = 8;

function sortRepos(repos) {
  return [...repos].sort((a, b) => {
    const starDiff = (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
    if (starDiff !== 0) return starDiff;
    return new Date(b.updated_at) - new Date(a.updated_at);
  });
}

export default function GitHubActivity() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch("/api/github-repos");
        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = await response.json();
        if (cancelled) return;

        const own = sortRepos(
          (Array.isArray(data) ? data : []).filter((repo) => !repo.fork),
        ).slice(0, MAX_REPOS);

        setRepos(own);
        setStatus("ready");
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Unable to load repos");
        setStatus("error");
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="scroll-mt-12 border-b border-border"
      data-reveal
    >
      <Container className="py-12 md:py-14">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="activity-heading"
              className="text-xl font-medium tracking-tight text-foreground md:text-2xl"
            >
              GitHub
            </h2>
            <p className="mt-1 text-sm text-muted">
              Recent public repos — secondary evidence.
            </p>
          </div>
          <a
            href="https://github.com/Sambhav-Gupta12"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Github size={14} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
            <span>View profile</span>
          </a>
        </header>

        {status === "loading" && (
          <p className="mt-6 text-sm text-muted" role="status">
            Loading repositories…
          </p>
        )}

        {status === "error" && (
          <p className="mt-6 text-sm text-muted" role="alert">
            Couldn’t load activity
            {error ? `: ${error}` : "."}
          </p>
        )}

        {status === "ready" && repos.length === 0 && (
          <p className="mt-6 text-sm text-muted">No public repositories to show.</p>
        )}

        {status === "ready" && repos.length > 0 && (
          <ul className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {repos.map((repo) => (
              <li key={repo.name} className="min-w-0">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full min-h-11 rounded border border-border p-3 transition-[border-color] duration-200 hover:border-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium text-foreground">
                      {repo.name}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-muted">
                      ★ {repo.stargazers_count ?? 0}
                    </span>
                  </div>
                  {repo.description && (
                    <p className="mt-1.5 line-clamp-1 break-words text-xs text-muted">
                      {repo.description}
                    </p>
                  )}
                  {repo.language && (
                    <p className="mt-2 font-mono text-xs text-muted">
                      {repo.language}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
