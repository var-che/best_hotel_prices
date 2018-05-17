var e = document.getElementById('ajaxsrwrap'); // container for all hotel lists

console.log(e)

// Options for the observer (which mutations to observe)
var config = { subtree: true, childList: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList) {
    for(var mutation of mutationsList) {
        if (mutation.type == 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type == 'subtree') {
            console.log('The ' + mutation.attributeName + ' subtree was modified.');
        }
    }
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(e, config);

// Later, you can stop observing
// observer.disconnect();