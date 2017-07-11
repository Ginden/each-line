# essed

`essed` is a simple program aiming to replace `sed` in certain tasks.

## mapping

In 1.0 relase only mapping with ad-hoc code is supported.



### Examples

Remove whitespace from each line:
```bash
cat ~/.bashrc | essed --map "line.trim()"
```

Reverse lines:
```bash
cat ~/.bashrc | essed --map "line.reverse()"
```

Remove comments:

```bash
cat ~/.zshrc | essed --map "line.trim().startsWith('#') ? null : line"
```


### Allowed return values

* `Promise<string>`
* highland streams
* `ReadableStream` resolving to streams

### Enviroment

For your convenience we expose following "globals":
* `P`, `Bluebird` - Bluebird instance
* `lodash`, `_` - lodash instance
* `hl`, `highland` - highland instance

Line is available as `line`, `value`, `$0`.

