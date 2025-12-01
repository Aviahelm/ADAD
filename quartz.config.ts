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
        header: "Limelight",
        body: "Faculty Glyphic",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
            light: "#f5f1e6",          // soft ivory paper
            lightgray: "#e0dbd2",      // muted notebook margin
            gray: "#a79f94",           // graphite pencil-gray
            darkgray: "#58534c",       // ink-on-paper charcoal
            dark: "#2c2a27",           // deep noir ink

            secondary: "#5f7f8a",      // solarized blue → cooled, muted
            tertiary: "#7d8f82",       // solarized green → desaturated sage
            highlight: "rgba(147, 157, 145, 0.18)", // paper shadow wash
            textHighlight: "#fef3a288", // soft solarized yellow highlight

        },
        darkMode: {
              light: "#1b1f22",          // cool black-ink charcoal (base)
              lightgray: "#2d3236",      // graphite shadow
              gray: "#596065",           // desaturated steel-gray
              darkgray: "#c4c8cc",       // silver text (not blue-tinted)
              dark: "#efefef",           // crisp off-white

              secondary: "#6c8fa0",      // solarized cyan → cooled, steely
              tertiary: "#8aa093",       // solarized green → muted sage-noir
              highlight: "rgba(130, 150, 170, 0.20)", // cool moonlight glow
              textHighlight: "#e3d67866", // softer solarized yellow highlight

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
