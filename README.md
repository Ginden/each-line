# essed

`essed` is a simple program with purpose similar to `sed`.


## Pros and cons

### When to use essed

* Dealing with line-delimited JSON
* One-time time-consuming task
* Playing around
* Want to leverage knowledge of JavaScript

### When not to use essed

* Performance - `sed` is strongly optimized C code. JavaScript is much slower.
* Non-UTF8 encodings (at least yet)
* Dealing with binary files

### Consider

* Portability - you can use `essed` in your `npm` scripts. Though, it won't be installed globally on your CI.




## TODO
* Loading code from file - 
* `assert` - assert input match some criteria. If it doesn't, break pipeline, otherwise return untouched
* `find` - find first line matching some criteria
* `limit` parameter on `filter` - if number of matched items exceed limit
* `limit` parameter on `map`
* `takeWhile`
* `takeUntil`
* `findLast`
* `reduce`
* Native support for line-delimited JSON

## map

### Examples

Remove whitespace from each line:
```bash
cat ~/.bashrc | essed --map "line.trim()"
```

Reverse lines:
```bash
cat ~/.bashrc | essed --map "$0.reverse()"
```

Remove comments (nulls and undefineds are filtered out from output):

```bash
cat ~/.zshrc | essed --map "value.trim().startsWith('#') ? null : line"
```

## filter

### Examples

Remove comments:
```bash
essed --filter "line.trim().startsWith('#')" ~/.zshrc
```

## Comming

### Allowed return values

* `string`
* `Promise<string>`
* `highland<string>`
* `ReadableStream<string>`

### Enviroment

For your convenience we expose following "globals":
* `P`, `Bluebird` - Bluebird instance
* `lodash`, `_` - lodash instance
* `hl`, `highland` - highland instance
* `deburr`, `pad`, `trim`, `truncate`, `upperFirst`, `replace` - exported from `lodash`
* `execFile`, `execFileSync` - exported from native `child_process`
* `log` - function that logs it's input on **`stderr`** and returns first argument.

Line is available as `line`, `value`, `$0`.

Number of line is avalaiable as `i` and `index`.

# Resources to read:

* Libraries used
  * [`child_process`](https://nodejs.org/api/child_process.html)
  * [`lodash`](https://lodash.com/docs/)
  * [`highland`](http://highlandjs.org/)
  * [`bluebird`](http://bluebirdjs.com/docs/api-reference.html)
* [Recipes](./recipes.md)
* [jq](https://stedolan.github.io/jq/) - can be better choice for JSON-heavy jobs