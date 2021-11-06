
// query-by-name-path @ npm, query dom element by name attribute path.

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

module.exports = function (el, namePath, strict) {
	//string to array
	if (typeof namePath === "string") {
		if (namePath.indexOf(".") >= 0) {
			if (typeof strict === "undefined") strict = true;
			namePath = namePath.replace(/^\./, "").split(".");
		}
		else {
			namePath = namePath.split(/\s+/);
		}
	}

	//build query string
	var i, imax = namePath.length, sa = [];
	for (i = 0; i < imax; i++) {
		sa[sa.length] = "[name='" + namePath[i].replace(/(\<\>\'\"\:)/g, "\\$1") + "']";
	}

	el = (typeof el === "string") ? document.getElementById(el) : el;
	if (!strict) return el.querySelector(sa.join(" "));

	// strict mode

	var elList = el.querySelectorAll(sa.join(" "));
	var j, jmax = elList.length, eli;
	for (j = 0; j < jmax; j++) {
		//check name path
		eli = elList[j].parentNode;
		for (i = imax - 2; i >= 0; i--) {
			while (!eli.hasAttribute("name")) { eli = eli.parentNode; }
			if (eli.getAttribute("name") != namePath[i]) break;	//not match
			eli = eli.parentNode;
		}
		if (i >= 0) continue;	//not match, check next

		//check to root
		while (1) {
			if (eli === el) return elList[j];	//matched and return
			if (eli.hasAttribute("name")) break;	//not match
			eli = eli.parentNode;
		}
	}
	return null;
}
