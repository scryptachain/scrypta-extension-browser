console.log('ScryptaID extension injected, now you\'re able to use it.')
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.injectID){
        console.log('InjectingID: ' + request.injectID)
        localStorage.setItem('SID',request.injectID)
        sendResponse(window.location.hostname)
        location.reload()
    }
})