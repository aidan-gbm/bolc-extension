window.onload = function() {
    let curStudents = []
    let studentSelect = document.querySelector('#students')
    chrome.storage.local.get('students', function(data) {
        data.students.forEach(name => {
            let o = new Option(name, name)
            curStudents.push(name)
            studentSelect.add(o)
        })
    })

    let addBtn = document.querySelector('#addBtn')
    let addTxt = document.querySelector('#addTxt')
    addBtn.onclick = function(e) {
        addStudents = []
        addTxt.value.split(/\r\n|\n|\r/g).forEach(s => {
            if (s != '' && !curStudents.includes(s)) {
                curStudents.push(s)
                addStudents.push(s)
            }
        })
        chrome.storage.local.set({
            students: curStudents.sort()
        }, function() {
            let err = chrome.runtime.lastError
            if (err) {
                console.error(err)
            } else {
                addStudents.forEach(s => {
                    let o = new Option(s, s)
                    studentSelect.add(o, undefined)
                })
                addTxt.value = ''
            }
        })
    }

    let removeBtn = document.querySelector('#removeBtn')
    removeBtn.onclick = function(e) {
        let selected = []
        for (let idx = 0; idx < studentSelect.options.length; idx++) {
            selected[idx] = studentSelect.options[idx].selected
        }

        // Remove selected from curStudents & select
        let idx = studentSelect.options.length
        while (idx--) {
            if (selected[idx]) {
                curStudents.splice(idx, 1)
                studentSelect.remove(idx)
            }
        }

        // Update storage
        chrome.storage.local.set({
            students: curStudents
        }, function() {
            let err = chrome.runtime.lastError
            if (err) {
                console.error(err)
            }
        })
    }
}
