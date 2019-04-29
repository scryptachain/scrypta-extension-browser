console.log('ScryptaID injected.')
chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
    if (request.injectID){
        console.log('InjectingID: ' + request.injectID);
        var d = new Date();
        d.setTime(d.getTime() + (365*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "scrypta_key=" + request.injectID + ";" + expires + ";path=/;secure;domain;samesite;domain=." + window.location.hostname;
        sendResponse(window.location.hostname);
        location.reload()
    }
});