// packages/core/src/backend/atlas/query-engine/query-builder.js

/**
 * Safely escape identifiers (table names, column names)
 */
function escapeIdentifier(name) {

  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    throw new Error(`Invalid identifier: ${name}`)
  }

  return `"${name}"`

}

/**
 * Build WHERE clause safely
 */
function buildWhere(where = {}) {

  const conditions = []
  const values = []
  let index = 1

  for (const key of Object.keys(where)) {

    const column = escapeIdentifier(key)

    conditions.push(`${column} = $${index}`)
    values.push(where[key])

    index++

  }

  if (conditions.length === 0) {
    return { clause: "", values: [] }
  }

  return {
    clause: `WHERE ${conditions.join(" AND ")}`,
    values
  }

}

/**
 * Build INSERT query
 */
export function buildInsert(model, data) {

  const table = escapeIdentifier(model.name)

  const keys = Object.keys(data)

  const columns = keys.map(escapeIdentifier)

  const placeholders = keys.map((_, i) => `$${i + 1}`)

  const values = keys.map(k => data[k])

  const query = `
    INSERT INTO ${table} (${columns.join(", ")})
    VALUES (${placeholders.join(", ")})
    RETURNING *
  `

  return {
    query,
    values
  }

}

/**
 * Build SELECT query
 */
export function buildSelect(model, options = {}) {

  const table = escapeIdentifier(model.name)

  const where = buildWhere(options.where)

  const limit = options.limit ? `LIMIT ${parseInt(options.limit)}` : ""

  const query = `
    SELECT *
    FROM ${table}
    ${where.clause}
    ${limit}
  `

  return {
    query,
    values: where.values
  }

}

/**
 * Build UPDATE query
 */
export function buildUpdate(model, where = {}, data = {}) {

  const table = escapeIdentifier(model.name)

  const keys = Object.keys(data)

  const setParts = []
  const values = []

  let index = 1

  for (const key of keys) {

    const column = escapeIdentifier(key)

    setParts.push(`${column} = $${index}`)
    values.push(data[key])

    index++

  }

  const whereParts = []

  for (const key of Object.keys(where)) {

    const column = escapeIdentifier(key)

    whereParts.push(`${column} = $${index}`)
    values.push(where[key])

    index++

  }

  const query = `
    UPDATE ${table}
    SET ${setParts.join(", ")}
    ${whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : ""}
    RETURNING *
  `

  return {
    query,
    values
  }

}

/**
 * Build DELETE query
 */
export function buildDelete(model, where = {}) {

  const table = escapeIdentifier(model.name)

  const whereData = buildWhere(where)

  const query = `
    DELETE FROM ${table}
    ${whereData.clause}
  `

  return {
    query,
    values: whereData.values
  }

}