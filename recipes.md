# sed vs. essed

I have picked top questions from StackOverflow where `sed` is a good choice. 
Choose right tools for your purposes - `sed` is optimized C code and it's installed on most of Unix systems.

`essed` is intented to be used mainly for development with familiar JavaScript syntax and it will be significantly slower.


**Task**: [Delete lines in a text file that containing a specific string](https://stackoverflow.com/q/5410757/2446102)

**sed**: 
```sh
$ sed '/pattern to match/d' ./infile
```
**essed**:
```sh
$ essed --filter '!line.match(/pattern to match/)' ./infile
```

---

**Task**: [Extract a predetermined range of lines from a text file on Unix](https://stackoverflow.com/q/83329/2446102)
**sed**:
```sh
$ sed -n 16224,16482p filename
```
**essed**
```sh
$ essed --filter "_.inRange(i, 16224, 16482)" filename
```

---

**Task**: [get nth line from a file](https://stackoverflow.com/q/6022384/2446102)
**Comment**: I recommend to use `sed` here. `find` is on road map.
**sed**: 
```sh
$ sed '209q;d' file
```
**essed**: TODO

