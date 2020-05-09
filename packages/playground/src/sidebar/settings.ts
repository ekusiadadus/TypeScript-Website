import { PlaygroundPlugin, PluginFactory } from ".."
import { showDTSPlugin } from "./showDTS"
import { compiledJSPlugin } from "./showJS"
import { showErrors } from "./showErrors"
import { optionsPlugin } from "./plugins"
import { runPlugin } from "./runtime"
import { LocalStorageOption } from "../ds/createDesignSystem"

export const getPlaygroundPlugins = (): PluginFactory[] => {
  const defaults = []
  if (!localStorage.getItem("disable-sidebar-js")) defaults.push(compiledJSPlugin)
  if (!localStorage.getItem("disable-sidebar-dts")) defaults.push(showDTSPlugin)
  if (!localStorage.getItem("disable-sidebar-err")) defaults.push(showErrors)
  if (!localStorage.getItem("disable-sidebar-run")) defaults.push(runPlugin)
  if (!localStorage.getItem("disable-sidebar-plugins")) defaults.push(optionsPlugin)
  return defaults
}

export const settingsPlugin: PluginFactory = (i, utils) => {
  const settings: LocalStorageOption[] = [
    {
      display: i("play_sidebar_options_disable_ata"),
      blurb: i("play_sidebar_options_disable_ata_copy"),
      flag: "disable-ata",
    },
    {
      display: i("play_sidebar_options_disable_save"),
      blurb: i("play_sidebar_options_disable_save_copy"),
      flag: "disable-save-on-type",
    },
    // {
    //   display: 'Verbose Logging',
    //   blurb: 'Turn on superfluous logging',
    //   flag: 'enable-superfluous-logging',
    // },
  ]

  const uiPlugins: LocalStorageOption[] = [
    {
      display: i("play_sidebar_js_title"),
      blurb: i("play_sidebar_js_blurb"),
      flag: "disable-sidebar-js",
      emptyImpliesEnabled: true,
    },
    {
      display: i("play_sidebar_dts_title"),
      blurb: i("play_sidebar_dts_blurb"),
      flag: "disable-sidebar-dts",
      emptyImpliesEnabled: true,
    },
    {
      display: i("play_sidebar_err_title"),
      blurb: i("play_sidebar_err_blurb"),
      flag: "disable-sidebar-err",
      emptyImpliesEnabled: true,
    },
    {
      display: i("play_sidebar_run_title"),
      blurb: i("play_sidebar_run_blurb"),
      flag: "disable-sidebar-run",
      emptyImpliesEnabled: true,
    },
    {
      display: i("play_sidebar_plugins_title"),
      blurb: i("play_sidebar_plugins_blurb"),
      flag: "disable-sidebar-plugins",
      emptyImpliesEnabled: true,
    },
  ]

  const plugin: PlaygroundPlugin = {
    id: "settings",
    displayName: i("play_subnav_settings"),
    didMount: async (sandbox, container) => {
      const ds = utils.createDesignSystem(container)

      ds.subtitle(i("play_subnav_settings"))
      ds.showOptionList(settings, { style: "separated" })

      ds.subtitle(i("play_settings_tabs_settings"))
      ds.showOptionList(uiPlugins, { style: "rows" })
    },
  }

  return plugin
}
