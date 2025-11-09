import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { ScrollIcon } from "./icons"

interface Options {
  title?: string
  tag: string
  limit: number
  sort: (cfg: GlobalConfiguration) => (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions: Partial<Options> = {
  title: "Recent Sessions",
  tag: "session",
  limit: 3,
  sort: byDateAndAlphabetical,
}

export default ((userOpts?: Partial<Options>) => {
  const SessionLog: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts } as Options

    // Filter files by tag and sort by date
    const sessions = allFiles
      .filter((file) => file.frontmatter?.tags?.includes(opts.tag))
      .sort(opts.sort(cfg))
      .slice(0, opts.limit)

    if (sessions.length === 0) return null

    return (
      <div class={classNames(displayClass, "session-log", "widget-card")}>
        <div class="widget-header">
          <span class="widget-icon">
            <ScrollIcon />
          </span>
          <h3>{opts.title}</h3>
        </div>
        <div class="widget-content">
          <ul>
            {sessions.map((session) => {
              const title = session.frontmatter?.title ?? "Untitled"
              const date = getDate(cfg, session)
              return (
                <li>
                  {date && (
                    <span class="session-date">
                      <Date date={date} locale={cfg.locale} />
                    </span>
                  )}
                  <a
                    href={resolveRelative(fileData.slug!, session.slug!)}
                    class="internal session-title-link"
                  >
                    {title}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  SessionLog.css = css
  return SessionLog
}) satisfies QuartzComponentConstructor

const css = `
.session-log ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.session-log li {
  padding: 0.5rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--lightgray) 50%, transparent 50%);
  font-size: 0.95rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: all 0.2s ease;
}

.session-log li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.session-log li:first-child {
  padding-top: 0;
}

.session-log li:hover {
  padding-left: 0.5rem;
  background: color-mix(in srgb, var(--highlight) 50%, transparent 50%);
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-right: 0.5rem;
  border-radius: 4px;
}

.session-date {
  font-size: 0.8rem;
  color: var(--dark-gray);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.session-title,
.session-title-link {
  color: var(--darkgray);
}

.session-title-link {
  text-decoration: none;
  transition: color 0.2s ease;
}

.session-title-link:hover {
  color: var(--secondary);
}
`
