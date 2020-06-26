# Use Cases

1. crud
1. create
1. read
1. update
1. delete

1. crud if owner
1. read if public

1. roles
1. profiles
1. auth obj

# API

```
articles
rules []
  allow: [*], provider: "login", operations: [read]
  allow: [author], provider: "login", operations: [*]

drafts
rules []
  allow: [author], provider: "login", operations: [*]
  allow: [reviewer], provider: "login", operations: [read]

drafts.comment
rules []
  allow: [*], provider: "login", operations: [*]
```

```
isAuthorized(subject, object, operation, scope)
where:
  subject = user/service
  object = fields needed for scope for the object in question
  scope = rules/logic

look in scope if if has
  allow == subject
  provider //todo
  && operation == operation

```
