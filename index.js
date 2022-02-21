const inputEl = document.getElementById("input-el")
const inputBtnEl = document.getElementById("input-btn")
const listEl = document.getElementById("list")
const deleteBtnEl = document.getElementById("delete-btn")
const tabEl = document.getElementById("tab-btn")
const leadsfromlocal = JSON.parse(localStorage.getItem("myLeads"))
var myLeads = []
var url = ""

if (leadsfromlocal){
    myLeads = leadsfromlocal
    render()
}

function render(){
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
                <li>
                    <a href="${myLeads[i]}" target='_blank'>"${myLeads[i]}"</a>
                </li>
            `
    }
    listEl.innerHTML = listItems
}

inputBtnEl.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render()
})



tabEl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render()
    })
})

deleteBtnEl.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    listEl.innerHTML = ""
    render()
})

