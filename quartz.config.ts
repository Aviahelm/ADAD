import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Another Day, Another Death",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f3efe7",         // warm paper ivory
          lightgray: "#e2d9c9",     // faded parchment edge
          gray: "#b7a999",          // pencil graphite on aged paper
          darkgray: "#5a554f",      // muted ink
          dark: "#2f2b28",          // coffee-ground brown-black
          secondary: "#5e473a",     // roasted coffee brown
          tertiary: "#8d7f6d",      // sepia accent
          highlight: "rgba(120, 98, 85, 0.15)", // soft coffee wash
          textHighlight: "#fff8aa88", // pale yellow highlighter
        },
        darkMode: {
          light: "#1b1c1e",          // cool charcoal, not muddy
          lightgray: "#2a2c2f",      // graphite shadow
          gray: "#515458",           // steel-gray midpoint
          darkgray: "#c7cace",       // fog-silver for readable light text
          dark: "#eceeef",           // crisp off-white
          secondary: "#8fa6b5",      // cool mist-blue accent
          tertiary: "#9ab0a7",       // soft desaturated sage
          highlight: "rgba(150, 170, 185, 0.16)",  // cool mist glow
          textHighlight: "#d8d06b66", // softer, less muddy yellow highlight
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
