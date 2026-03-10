// packages/core/src/backend/auth/strategies/oauth-auth.js

import crypto from "crypto"
import https from "https"
import { URL } from "url"

function generateState() {
  return crypto.randomBytes(16).toString("hex")
}

function fetchJson(url, options = {}) {

  return new Promise((resolve, reject) => {

    const req = https.request(url, options, res => {

      let data = ""

      res.on("data", chunk => {
        data += chunk
      })

      res.on("end", () => {

        try {

          const parsed = JSON.parse(data)

          resolve(parsed)

        } catch (err) {

          reject(err)

        }

      })

    })

    req.on("error", reject)

    if (options.body) {
      req.write(options.body)
    }

    req.end()

  })

}

export function createOAuthStrategy(config = {}) {

  const providers = new Map()
  const stateStore = new Map()

  return {

    name: "oauth",

    /**
     * Register OAuth provider
     */
    registerProvider(name, providerConfig) {

      if (!name) {
        throw new Error("OAuth provider name required")
      }

      providers.set(name, providerConfig)

    },

    /**
     * Get OAuth authorization URL
     */
    getAuthorizationUrl(providerName, redirectUri) {

      const provider = providers.get(providerName)

      if (!provider) {
        throw new Error(`OAuth provider not found: ${providerName}`)
      }

      const state = generateState()

      stateStore.set(state, {
        provider: providerName,
        createdAt: Date.now()
      })

      const url = new URL(provider.authorizationUrl)

      url.searchParams.set("client_id", provider.clientId)
      url.searchParams.set("redirect_uri", redirectUri)
      url.searchParams.set("response_type", "code")
      url.searchParams.set("scope", provider.scope || "")
      url.searchParams.set("state", state)

      return url.toString()

    },

    /**
     * Exchange code for access token
     */
    async exchangeCode(providerName, code, redirectUri) {

      const provider = providers.get(providerName)

      if (!provider) {
        throw new Error(`OAuth provider not found: ${providerName}`)
      }

      const body = new URLSearchParams({
        client_id: provider.clientId,
        client_secret: provider.clientSecret,
        code,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      }).toString()

      const tokenResponse = await fetchJson(provider.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body
      })

      return tokenResponse

    },

    /**
     * Fetch user profile
     */
    async fetchUser(providerName, accessToken) {

      const provider = providers.get(providerName)

      if (!provider) {
        throw new Error(`OAuth provider not found: ${providerName}`)
      }

      const user = await fetchJson(provider.userInfoUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })

      return user

    },

    /**
     * Verify OAuth callback
     */
    async authenticate(req) {

      const url = new URL(req.url, `http://${req.headers.host}`)

      const code = url.searchParams.get("code")
      const state = url.searchParams.get("state")

      if (!code || !state) {
        return null
      }

      const stateRecord = stateStore.get(state)

      if (!stateRecord) {
        return null
      }

      stateStore.delete(state)

      const providerName = stateRecord.provider

      const provider = providers.get(providerName)

      if (!provider) {
        return null
      }

      const redirectUri = provider.redirectUri

      const tokenData = await this.exchangeCode(providerName, code, redirectUri)

      if (!tokenData.access_token) {
        return null
      }

      const user = await this.fetchUser(providerName, tokenData.access_token)

      return {
        provider: providerName,
        profile: user,
        accessToken: tokenData.access_token
      }

    },

    /**
     * List registered providers
     */
    listProviders() {

      return Array.from(providers.keys())

    }

  }

}