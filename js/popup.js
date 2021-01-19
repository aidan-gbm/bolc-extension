function findStudent(students, name) {
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

function getAccountability(request, students) {
    let rosterDiv = document.querySelector('#rosterDiv')
    if (request.action == 'getAccountability') {
        let rosters = { Present: [], Missing: [], Other: [] }
        request.names.forEach(name => {
            let s = findStudent(students, name)
            if (s >= 0) {
                rosters.Present.push(students[s])
                students.splice(s, 1)
            } else {
                rosters.Other.push(name)
            }
        })
        rosterDiv.innerHTML = ''
        rosters.Missing = students
        document.querySelector('#accountability').innerText = 'Refresh'
        for (key in rosters) {
            let label = document.createElement('h2')
            let list = document.createElement('ul')
            label.innerText = key
            rosters[key].forEach(value => {
                let li = document.createElement('li')
                li.innerText = value
                list.appendChild(li)
            })
            rosterDiv.appendChild(label)
            rosterDiv.appendChild(list)
            rosterDiv.removeAttribute('hidden')
        }
    }
}

window.onload = function() {
    let accountability = document.getElementById('accountability');

    accountability.onclick = function(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(
                tabs[0].id,
                {file: 'js/getStudents.js'}
            )
        });
    };
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    chrome.storage.local.get('students', function(data) {
        getAccountability(request, data.students)
    })
})