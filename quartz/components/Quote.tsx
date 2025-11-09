import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { QuoteIcon } from "./icons"

const Quote: QuartzComponent = ({ cfg, displayClass }: QuartzComponentProps) => {
  const quote = cfg?.headerQuote
  if (!quote) return null

  return (
    <div class={classNames(displayClass, "header-quote")}>
      <span class="quote-icon">
        <QuoteIcon />
      </span>
      <p>{quote}</p>
    </div>
  )
}

Quote.css = `
.header-quote {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin: 0.5rem 0 1rem;
  padding: 0.75rem 1.25rem;
  background: var(--highlight);
  border-left: 3px solid var(--secondary);
  border-radius: 0 4px 4px 0;
  transition: all 0.2s ease;
}

.header-quote:hover {
  border-left-width: 4px;
  padding-left: 1.15rem;
}

.quote-icon {
  width: 16px;
  height: 16px;
  color: var(--secondary);
  flex-shrink: 0;
  margin-top: 0.15rem;
  opacity: 0.7;
}

.quote-icon svg {
  width: 100%;
  height: 100%;
  fill: none;
  stroke: currentColor;
}

.header-quote p {
  margin: 0;
  font-style: italic;
  font-size: 0.95rem;
  color: var(--darkgray);
  opacity: 0.9;
  letter-spacing: 0.02em;
  line-height: 1.5;
}
`

export default (() => Quote) satisfies QuartzComponentConstructor
