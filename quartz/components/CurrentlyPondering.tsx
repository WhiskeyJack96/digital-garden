import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { ThoughtBubbleIcon } from "./icons"

const CurrentlyPondering: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  // Find the currently-pondering metadata file

  const question = "How different are LLM's from compilers?"
  const title = "Currently Pondering"

  if (!question) return null

  return (
    <div class={classNames(displayClass, "currently-pondering", "widget-card", "widget-compact")}>
      <div class="widget-header">
        <span class="widget-icon">
          <ThoughtBubbleIcon />
        </span>
        <h3>{title}</h3>
      </div>
      <div class="widget-content">
        <p class="pondering-question">{question}</p>
      </div>
    </div>
  )
}

CurrentlyPondering.css = `
.pondering-question {
  margin: 0;
  padding: 0.75rem;
  background: color-mix(in srgb, var(--highlight) 80%, transparent 20%);
  border-radius: 4px;
  font-size: 0.95rem;
  font-style: italic;
  color: var(--darkgray);
  line-height: 1.6;
  border-left: 3px solid var(--secondary);
}
`

export default (() => CurrentlyPondering) satisfies QuartzComponentConstructor
