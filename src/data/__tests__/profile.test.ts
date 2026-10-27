import { describe, expect, it } from 'vitest'
import { contacts, personalProjects, products, roles } from '../profile'

describe('profile data', () => {
  it('gives every product and project a unique id for its page anchor', () => {
    const ids = [...products, ...personalProjects].map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('lists roles newest first', () => {
    expect(roles[0].end).toBe('now')
  })

  it('uses only mailto or https contact links', () => {
    for (const link of contacts) {
      expect(link.href).toMatch(/^(mailto:|https:\/\/)/)
    }
  })
})
