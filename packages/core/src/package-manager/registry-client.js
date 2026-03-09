// packages/core/src/package-manager/registry-client.js

const DEFAULT_REGISTRY = "https://registry.najumi.dev"

export class RegistryClient {

  constructor(options = {}) {

    this.registry = options.registry || DEFAULT_REGISTRY

  }

  async request(endpoint) {

    const url = `${this.registry}${endpoint}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Registry request failed: ${url}`)
    }

    return await response.json()

  }

  // fetch package metadata
  async getPackage(name) {

    return await this.request(`/${name}.json`)

  }

  // fetch specific version
  async getPackageVersion(name, version) {

    return await this.request(`/${name}/${version}.json`)

  }

  // search packages
  async search(query) {

    return await this.request(`/search?q=${encodeURIComponent(query)}`)

  }

  // list popular packages
  async listPopular() {

    return await this.request(`/popular`)

  }

  // check latest version
  async getLatestVersion(name) {

    const pkg = await this.getPackage(name)

    return pkg.version

  }

}