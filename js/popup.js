function getStudent(students, name) {
    let retVal = -1
    for (let idx = 0; idx < students.length; idx++) {
        let lastName = students[idx].split(',')[0]
        if (name.includes(students[idx]) || name.includes(lastName)) {
            retVal = idx
            break
        }
    }
    return retVal
}

function displayRosters(request, students) {
    let presentRoster = document.getElementById('present');
    let missingRoster = document.getElementById('missing');
    let unknownRoster = document.getElementById('unknown');
    if (request.action == 'getAccountability') {
        presentRoster.innerHTML = ''
        missingRoster.innerHTML = ''
        unknownRoster.innerHTML = ''
        request.names.forEach(name => {
            let li = document.createElement('li')
            li.innerText = name
            let s = getStudent(students, name)
            if (s >= 0) {
                students.splice(s, 1)
                presentRoster.appendChild(li)
            } else {
                unknownRoster.appendChild(li)
            }
        })
        students.forEach(name => {
            let li = document.createElement('li')
            li.innerText = name
            missingRoster.appendChild(li)
        })
    }
}

window.onload = function() {
    let accountability = document.getElementById('accountability');

    accountability.onclick = function(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'js/getAccountability.js'}
            )
        });
    };
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.storage.local.get('students', function(data) {
        displayRosters(request, data.students)
    })
})