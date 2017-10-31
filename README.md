# essed

`essed` is a simple program with purpose similar to `sed` or `awk`


## Pros and cons

### When to use essed

* Dealing with line-delimited JSON
* One-time time-consuming task
* Playing around
* Want to leverage knowledge of JavaScript

### When not to use essed

* Performance - `sed` is strongly optimized C code. JavaScript is much slower. It's totally possible for `essed` to be *200* times slower than C-based tools.
* Non-UTF8 encodings (at least yet)
* Dealing with binary files

### Consider

* Portability - you can use `essed` in your `npm` scripts. Though, it won't be installed globally on your CI.




## TODO

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

Color even lines (terminal):

```bash
cat ~/.zshrc | essed -m "i % 2 ? line.yellow : line"
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
* `shared` - empty object shared by many invocations
* `P`, `Bluebird` - Bluebird instance
* `lodash`, `_` - lodash instance
* `hl`, `highland` - highland instance
* `deburr`, `pad`, `trim`, `truncate`, `upperFirst`, `replace` - exported from `lodash`
* `execFile`, `execFileSync` - exported from native `child_process`
* `colors` - [`colors`]((https://www.npmjs.com/package/colors)) instance
* `log` - function that logs it's input on **`stderr`** and returns first argument.
* `fs` - native Node.js module
** `log(line) === line`

[colors](https://www.npmjs.com/package/colors) module is avalaible by default.

Line is available as `line`, `l`, `value`, `$0`.

Number of line is avalaiable as `i` and `index`.


# Resources to read:

* Libraries used
  * [`child_process`](https://nodejs.org/api/child_process.html)
  * [`lodash`](https://lodash.com/docs/)
  * [`highland`](http://highlandjs.org/)
  * [`bluebird`](http://bluebirdjs.com/docs/api-reference.html)
  * [`colors`](https://www.npmjs.com/package/colors)
* [Recipes](./recipes.md)
* [jq](https://stedolan.github.io/jq/) - can be better choice for JSON-heavy jobs
