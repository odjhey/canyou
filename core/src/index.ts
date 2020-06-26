enum OPERATIONS {
  CREATE,
  READ,
  UPDATE,
  DELETE,
  ALL,
}

enum PROVIDERS {
  FIELD,
  ROLE,
}

const isAuthorized: (
  subject: object,
  object: object,
  operation: OPERATIONS,
  scope: {
    rules: Array<{
      subjectRef: Array<string>
      subjectProvider: PROVIDERS
      operations: Array<OPERATIONS>
    }>
  },
) => boolean = (subject, object, operation, scope) => {
  //filter rules based on operation
  const filteredRulesByOperation = scope.rules.filter((rule) => {
    if (rule.operations.includes(OPERATIONS.ALL)) {
      return true
    }
    if (rule.operations.includes(operation)) {
      return true
    }
    return false
  })

  //check each rule.subjectRef if has match with subject
  const rulesWithSubjectMatch = filteredRulesByOperation.filter((rule) => {
    //FIELD
    if (rule.subjectProvider === PROVIDERS.FIELD) {
      const hasFieldMatch = rule.subjectRef.reduce((subAccu, sub) => {
        //compare properties of object and subject based on specified FIELD
        if (subject[sub] && object[sub]) {
          return subject[sub] === object[sub] || subAccu
        }
        return subAccu
      }, false)

      if (hasFieldMatch) {
        return true
      }
    }
    return false
  })

  if (rulesWithSubjectMatch.length > 0) {
    return true
  }
  return false
}

export { isAuthorized, PROVIDERS, OPERATIONS }
