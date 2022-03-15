// As we have no server-side application or routes, we will use
// a URL "hash" for this demo, but we chould just as easily use
// a URL route segment.

// As we will use the target selector in several parts of the demo,
// we will declare it as a variable here.

var targetSelector = '.mix';

/**
 * Reads a hash from the URL (if present), and converts it into a class
 * selector string. E.g "#green" -> ".green". Otherwise, defaults
 * to the targetSelector, equivalent to "all"
 *
 * @return {string}
 */

function getSelectorFromHash() {
	var hash = window.location.hash.replace(/^#/g, '');

	var selector = hash ? '.' + hash : targetSelector;

	return selector;
}

/**
 * Updates the URL whenever the current filter changes.
 *
 * @param   {mixitup.State} state
 * @return  {void}
 */

function setHash(state) {
	var selector = state.activeFilter.selector;
	var newHash = '#' + selector.replace(/^./g, '');

	if (selector === targetSelector && window.location.hash) {
		// Equivalent to filter "all", remove the hash

		history.pushState(null, document.title, window.location.pathname); // or history.replaceState()
	} else if (newHash !== window.location.hash && selector !== targetSelector) {
		// Change the hash

		history.pushState(null, document.title, window.location.pathname + newHash); // or history.replaceState()
	}
}

// Instantiate and configure the mixer

var mixer = mixitup('.service16', {
	selectors: {
		target: targetSelector
	},
	load: {
		filter: getSelectorFromHash() // Ensure that the mixer's initial filter matches the URL on startup
	},
	callbacks: {
		onMixEnd: setHash // Call the setHash() method at the end of each operation
	}
});

var mixer1 = mixitup('.servicego', {
	selectors: {
		target: targetSelector
	},
	load: {
		filter: getSelectorFromHash() // Ensure that the mixer's initial filter matches the URL on startup
	},
	callbacks: {
		onMixEnd: setHash // Call the setHash() method at the end of each operation
	}
});