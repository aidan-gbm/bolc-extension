chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({
        students: []
    }, function() {
        console.log("Initialized BOLC extension.");
    });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'bbb.cybbh.space'},
                }),
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'bbb2.cybbh.space'},
                })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});
