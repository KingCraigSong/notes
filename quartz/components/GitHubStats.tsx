import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

const GITHUB_USERNAME = "KingCraigSong"

function GitHubStats(props: QuartzComponentProps) {
  return (
    <div className="github-stats-container">
      <h2 className="github-stats-title">📊 GitHub Stats</h2>
      <div className="github-stats-grid">
        <div className="github-stat-card">
          <img 
            src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=default&hide_title=true&count_private=true`} 
            alt="GitHub Stats" 
            className="github-stat-img"
            loading="lazy"
          />
        </div>
        <div className="github-stat-card">
          <img 
            src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${GITHUB_USERNAME}&layout=compact&count_private=true&size_weight=0.5&count_weight=0.5`} 
            alt="Top Languages" 
            className="github-stat-img"
            loading="lazy"
          />
        </div>
        <div className="github-stat-card">
          <img 
            src={`https://streak-stats.demolab.com?user=${GITHUB_USERNAME}&theme=default`} 
            alt="GitHub Streak" 
            className="github-stat-img"
            loading="lazy"
          />
        </div>
        <div className="github-stat-card">
          <img 
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${GITHUB_USERNAME}&theme=github`} 
            alt="Contribution Graph" 
            className="github-stat-img"
            loading="lazy"
          />
        </div>
      </div>
      <style>{`
        .github-stats-container {
          margin: 1.5rem 0;
        }
        .github-stats-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text);
        }
        .github-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1rem;
        }
        .github-stat-card {
          background: var(--bg-secondary);
          border-radius: 0.5rem;
          padding: 0.5rem;
          overflow: hidden;
        }
        .github-stat-img {
          width: 100%;
          height: auto;
          display: block;
        }
      `}</style>
    </div>
  )
}

export default (() => GitHubStats) satisfies QuartzComponentConstructor
