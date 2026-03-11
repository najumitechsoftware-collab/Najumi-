/*
Dashboard Service
*/

class DashboardService {

constructor() {

this.apiBase = "/api"

}

/*
Fetch dashboard stats
*/
async getStats() {

try {

  const response = await fetch(`${this.apiBase}/stats`)

  if (!response.ok) {

    throw new Error("Failed to fetch stats")

  }

  const data = await response.json()

  return data

} catch (error) {

  console.error("Dashboard stats error:", error)

  /*
  fallback demo data
  */
  return {

    users: 102,

    revenue: "$4,200",

    visits: "8,920",

    sessions: 64

  }

}

}

/*
Fetch users list
*/
async getUsers() {

try {

  const response = await fetch(`${this.apiBase}/users`)

  if (!response.ok) {

    throw new Error("Failed to fetch users")

  }

  const data = await response.json()

  return data

} catch (error) {

  console.error("Users fetch error:", error)

  /*
  fallback demo users
  */
  return [

    { id: 1, email: "user1@example.com", status: "active" },

    { id: 2, email: "user2@example.com", status: "active" },

    { id: 3, email: "user3@example.com", status: "pending" }

  ]

}

}

/*
Fetch analytics data
*/
async getAnalytics() {

try {

  const response = await fetch(`${this.apiBase}/analytics`)

  if (!response.ok) {

    throw new Error("Failed to fetch analytics")

  }

  const data = await response.json()

  return data

} catch (error) {

  console.error("Analytics fetch error:", error)

  /*
  fallback analytics data
  */
  return {

    users: 1024,

    revenue: "$12,500",

    sessions: 89,

    requests: "34,200"

  }

}

}

}

let instance = null

export function getDashboardService() {

if (!instance) {

instance = new DashboardService()

}

return instance

}