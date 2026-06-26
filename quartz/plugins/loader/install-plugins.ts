#!/usr/bin/env node
import fs from "fs"
import path from "path"
import YAML from "yaml"
import { installPlugins, parsePluginSource } from "./gitLoader.js"

const CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.yaml")
const DEFAULT_CONFIG_YAML_PATH = path.join(process.cwd(), "quartz.config.default.yaml")

function getConfigPath(): string {
  if (fs.existsSync(CONFIG_YAML_PATH)) return CONFIG_YAML_PATH
  if (fs.existsSync(DEFAULT_CONFIG_YAML_PATH)) return DEFAULT_CONFIG_YAML_PATH
  return CONFIG_YAML_PATH
}

function readPluginsFromConfig(): string[] {
  const configPath = getConfigPath()
  if (!fs.existsSync(configPath)) {
    return []
  }

  const raw = fs.readFileSync(configPath, "utf-8")
  const json = YAML.parse(raw) as any

  if (!json?.plugins || !Array.isArray(json.plugins)) {
    return []
  }

  return json.plugins
    .filter((entry: any) => entry.enabled !== false)
    .map((entry: any) => {
      if (typeof entry.source === "string") {
        return entry.source
      }
      if (typeof entry.source === "object" && entry.source.repo) {
        return entry.source
      }
      return null
    })
    .filter((source: string | null) => source !== null)
}

async function main() {
  const externalPlugins = readPluginsFromConfig()

  if (externalPlugins.length === 0) {
    console.log("No external plugins to install.")
    return
  }

  console.log(`Installing ${externalPlugins.length} plugin(s) from Git...`)

  const specs = externalPlugins.map((source: string) => parsePluginSource(source))
  const installed = await installPlugins(specs, { verbose: true })

  if (installed.size === externalPlugins.length) {
    console.log("✓ All plugins installed successfully")
  } else {
    console.error(`✗ Only ${installed.size}/${externalPlugins.length} plugins installed`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error("Failed to install plugins:", err)
  process.exit(1)
})
