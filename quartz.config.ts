import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Whiskey Stacks",
    pageTitleSuffix: "",
    headerQuote: "The world changes, and life fights entropy. Forward was the only way. Forming something new out of the now, not scavenging for what might have been. -- Marina J. Lostetter via Noumenon Ultra",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "garden.jacobmikesell.com",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Crimson Pro",
        body: "Source Serif Pro",
        code: "JetBrains Mono",
      },
      colors: {
        lightMode: {
          light: "#faf8f3",
          lightgray: "#e8dcc4",
          gray: "#b09a7e",
          darkgray: "#3d3326", // Slightly darker for better contrast
          dark: "#2d2419",
          secondary: "#8b5a3c",
          tertiary: "#a67c52",
          highlight: "rgba(139, 90, 60, 0.10)", // Slightly more subtle
          textHighlight: "rgba(212, 165, 116, 0.25)",
        },
        darkMode: {
          light: "#1a1410",
          lightgray: "#3d3326",
          gray: "#5c4f3e",
          darkgray: "#f0e8d8", // Brighter for better readability
          dark: "#faf8f3",
          secondary: "#d4a574",
          tertiary: "#b8915f", // Warmer tertiary for dark mode
          highlight: "rgba(212, 165, 116, 0.15)", // Better visibility
          textHighlight: "rgba(212, 165, 116, 0.3)",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
