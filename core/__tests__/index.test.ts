import { OPERATIONS, isAuthorized, PROVIDERS } from '../src'

const scope = {
  articleScope: {
    objectId: 'article',
    rules: [
      {
        subjectRef: ['author'],
        subjectProvider: PROVIDERS.FIELD,
        operations: [OPERATIONS.ALL],
      },
      {
        subjectRef: ['reviewer'],
        subjectProvider: PROVIDERS.FIELD,
        operations: [OPERATIONS.UPDATE, OPERATIONS.READ],
      },
    ],
  },
  createDeliveryScope: {
    objectId: 'act.createDelivery',
    rules: [
      {
        subjectRef: ['masterdatacustodian'],
        subjectProvider: PROVIDERS.FIELD,
        operations: [OPERATIONS.ALL],
      },
    ],
  },
}

const bo = {
  articles: [
    { id: 'A1', author: 'author1', reviewer: 'reviewer1', content: '' },
    { id: 'A2', author: 'author2', reviewer: 'reviewer2', content: '' },
    { id: 'A3', author: 'author3', reviewer: 'reviewer3', content: '' },
  ],
}

describe('basic auth check', () => {
  it('should be able to CRUD own articles (author)', () => {
    expect.assertions(4)
    const author = { author: 'author1' }
    const canCreate = isAuthorized(author, bo.articles[0], OPERATIONS.CREATE, {
      rules: scope.articleScope.rules,
    })
    expect(canCreate).toBe(true)

    const canRead = isAuthorized(author, bo.articles[0], OPERATIONS.READ, {
      rules: scope.articleScope.rules,
    })
    expect(canRead).toBe(true)

    const canUpdate = isAuthorized(author, bo.articles[0], OPERATIONS.UPDATE, {
      rules: scope.articleScope.rules,
    })
    expect(canUpdate).toBe(true)

    const canDelete = isAuthorized(author, bo.articles[0], OPERATIONS.DELETE, {
      rules: scope.articleScope.rules,
    })
    expect(canDelete).toBe(true)
  })
  it('should NOT be able to CRUD other works (author)', () => {
    expect.assertions(4)
    const author = { author: 'author2' }
    const canCreate = isAuthorized(author, bo.articles[0], OPERATIONS.CREATE, {
      rules: scope.articleScope.rules,
    })
    expect(canCreate).toBe(false)

    const canRead = isAuthorized(author, bo.articles[0], OPERATIONS.READ, {
      rules: scope.articleScope.rules,
    })
    expect(canRead).toBe(false)

    const canUpdate = isAuthorized(author, bo.articles[0], OPERATIONS.UPDATE, {
      rules: scope.articleScope.rules,
    })
    expect(canUpdate).toBe(false)

    const canDelete = isAuthorized(author, bo.articles[0], OPERATIONS.DELETE, {
      rules: scope.articleScope.rules,
    })
    expect(canDelete).toBe(false)
  })
  it('should only be able to READ and UPDATE (reviewer)', () => {
    expect.assertions(4)
    const reviewer = { reviewer: 'reviewer1' }
    const canCreate = isAuthorized(
      reviewer,
      bo.articles[0],
      OPERATIONS.CREATE,
      {
        rules: scope.articleScope.rules,
      },
    )
    expect(canCreate).toBe(false)

    const canRead = isAuthorized(reviewer, bo.articles[0], OPERATIONS.READ, {
      rules: scope.articleScope.rules,
    })
    expect(canRead).toBe(true)

    const canUpdate = isAuthorized(
      reviewer,
      bo.articles[0],
      OPERATIONS.UPDATE,
      {
        rules: scope.articleScope.rules,
      },
    )
    expect(canUpdate).toBe(true)

    const canDelete = isAuthorized(
      reviewer,
      bo.articles[0],
      OPERATIONS.DELETE,
      {
        rules: scope.articleScope.rules,
      },
    )
    expect(canDelete).toBe(false)
  })
})
