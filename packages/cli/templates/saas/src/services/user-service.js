/*
SaaS User Service
*/

import crypto from "crypto"

class UserService {

constructor() {

/*
In real applications this should use Najumi Atlas database
*/
this.users = new Map()

}

/*
Hash password
*/
hashPassword(password) {

const salt = crypto.randomBytes(16).toString("hex")

const hash = crypto
  .pbkdf2Sync(password, salt, 10000, 64, "sha512")
  .toString("hex")

return `${salt}:${hash}`

}

/*
Verify password
*/
verifyPassword(password, storedHash) {

const [salt, hash] = storedHash.split(":")

const verifyHash = crypto
  .pbkdf2Sync(password, salt, 10000, 64, "sha512")
  .toString("hex")

return hash === verifyHash

}

/*
Create user
*/
async createUser({ email, password }) {

if (!email || !password) {

  throw new Error("Email and password are required")

}

if (this.users.has(email)) {

  throw new Error("User already exists")

}

const passwordHash = this.hashPassword(password)

const user = {

  id: Date.now(),

  email,

  password: passwordHash,

  createdAt: new Date().toISOString()

}

this.users.set(email, user)

return {

  id: user.id,

  email: user.email

}

}

/*
Authenticate user
*/
async authenticate({ email, password }) {

const user = this.users.get(email)

if (!user) {

  throw new Error("Invalid credentials")

}

const valid = this.verifyPassword(password, user.password)

if (!valid) {

  throw new Error("Invalid credentials")

}

return {

  id: user.id,

  email: user.email

}

}

/*
Get user by email
*/
async getUserByEmail(email) {

const user = this.users.get(email)

if (!user) {

  return null

}

return {

  id: user.id,

  email: user.email

}

}

}

let instance = null

export function getUserService() {

if (!instance) {

instance = new UserService()

}

return instance

}