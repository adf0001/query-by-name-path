// global, for html page
assert = require("assert");
queryByNamePath = require("../query-by-name-path.js");

module.exports = {

	"queryByNamePath()": function (done) {
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

		done(false);
	},

};

// for html page
//if (typeof setHtmlPage === "function") setHtmlPage("title", "10em", 1);	//page setting
if (typeof showResult !== "function") showResult = function (text) { console.log(text); }

//for mocha
if (typeof describe === "function") describe('mocha-test', function () { for (var i in module.exports) { it(i, module.exports[i]); } });
