# Road map

## Reuse

* Load code from file
* Add "recipes" - reusable named commands

## Functionalities

* `assert` - assert input match some criteria. If it doesn't, break pipeline, otherwise return untouched
* `find` - find and return first line matching some criteria
* `limit` parameter on `filter` - if number of matched items exceed limit, drop them down
* `limit` parameter on `map`
* `takeWhile`
* `takeUntil`
* `findLast`
* `reduce`

## Input formats
* Native support for line-delimited JSON

## Improve CLI

* Provide Webpack compiled build to improve startup time
* Provide way to load external modules
