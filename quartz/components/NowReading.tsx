import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { BookIcon } from "./icons"

interface Options {
  title?: string
  tag: string
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions: Options = {
  title: "Now Reading",
  tag: "now-reading",
  sort: (f1, f2) => {
    // Sort by modification date, most recent first
    const date1 = f1.dates?.modified ?? new Date(0)
    const date2 = f2.dates?.modified ?? new Date(0)
    return date2.getTime() - date1.getTime()
  },
}

export default ((userOpts?: Partial<Options>) => {
  const NowReading: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions, ...userOpts }

    // Filter files by tag
    const books = allFiles
      .filter((file) => file.frontmatter?.tags?.includes(opts.tag))
      .sort(opts.sort)

    if (books.length === 0) return null

    return (
      <div class={classNames(displayClass, "now-reading", "widget-card")}>
        <div class="widget-header">
          <span class="widget-icon">
            <BookIcon />
          </span>
          <h3>{opts.title}</h3>
        </div>
        <div class="widget-content">
          <ul>
            {books.map((book) => {
              const title = book.frontmatter?.title ?? "Untitled"
              return (
                <li>
                  <a href={resolveRelative(fileData.slug!, book.slug!)} class="internal">
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

  NowReading.css = css
  return NowReading
}) satisfies QuartzComponentConstructor

const css = `
.now-reading ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.now-reading li {
  padding: 0.5rem 0;
  border-bottom: 1px solid color-mix(in srgb, var(--lightgray) 50%, transparent 50%);
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.now-reading li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.now-reading li:first-child {
  padding-top: 0;
}

.now-reading li:hover {
  padding-left: 0.5rem;
  background: color-mix(in srgb, var(--highlight) 50%, transparent 50%);
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  padding-right: 0.5rem;
  border-radius: 4px;
}

.now-reading a {
  color: var(--darkgray);
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
}

.now-reading a:hover {
  color: var(--secondary);
}
`
