# query-by-name-path
query dom element by name attribute path

# Install
```
npm install query-by-name-path
```

# Usage & Api
```javascript

var queryByNamePath = require("query-by-name-path");

/*
	namePath:
		array
			name string array;
		string
			name string list separated only by "." ( in priority );
			or name string list separated only by whitespace.
	strict:
		false
			it may have other names from `el` to the end of the name path;
		true
			it shouldn't have any other name from `el` to the end of the name path;
		undefined
			if `namePath` contain '.' then set strict to true, otherwise set to false.
*/
//queryByNamePath(el, namePath, strict)

document.getElementById('divResult3').innerHTML = '\
    <span name=a>aaa</span> \
    <span name=b>bbb \
        <span name=c>ccc</span> \
        <span name=a>aaa2</span> \
        <span name=d>ddd \
            <span>no-name \
                <span name=e>eee</span> \
            </span>\
        </span>\
    </span>\
    <span>no-name \
        <span name=c>ccc2</span> \
    </span>\
    ';

assert(
    queryByNamePath('divResult3', 'a').textContent === 'aaa' &&
    queryByNamePath('divResult3', 'c').textContent === 'ccc' &&
    queryByNamePath('divResult3', 'c', true).textContent === 'ccc2' && 	//strict mode
    queryByNamePath('divResult3', '.c').textContent === 'ccc2' && 	//strict mode
    queryByNamePath('divResult3', 'b.c').textContent === 'ccc' && 	//strict mode
    queryByNamePath('divResult3', ['b', 'c']).textContent === 'ccc' &&
    queryByNamePath('divResult3', ['b', 'a']).textContent === 'aaa2' &&

    queryByNamePath('divResult3', 'e').textContent === 'eee' &&
    queryByNamePath('divResult3', 'd.e', false).textContent === 'eee' &&
    queryByNamePath('divResult3', 'b.e', false).textContent === 'eee' &&
    queryByNamePath('divResult3', 'e', true) === null && 	//strict mode
    queryByNamePath('divResult3', 'd.e') === null && 	//strict mode
    queryByNamePath('divResult3', 'b.e') === null && 	//strict mode
    queryByNamePath('divResult3', 'b.d.e').textContent === 'eee' 	//strict mode
);

```
