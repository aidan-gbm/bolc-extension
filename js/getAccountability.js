function getNames(doc_root) {
    let names = []
    var nameContainers = doc_root.querySelectorAll('[class^=userNameMain]')
    nameContainers.forEach(nameContainer => {
        names.push(nameContainer.innerText.replace(/(\r\n|\n|\r)/gm, ""))
    })
    return names
}

chrome.runtime.sendMessage({
    action: "getAccountability",
    names: getNames(document)
})