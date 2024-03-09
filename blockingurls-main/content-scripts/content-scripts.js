chrome.storage.sync.get(['blockingPeriods', 'blockedUrls'], function(data) {
    if (!data.blockingPeriods || !data.blockedUrls) {
        return; // No blocking periods or URLs configured
    }

    const currentUrl = window.location.hostname;
    if (!isUrlBlocked(currentUrl, data.blockedUrls)) {
        return; // Current URL is not in the blocked list
    }

    const currentTime = new Date();
    if (!isInBlockingPeriod(currentTime, data.blockingPeriods)) {
        return; // Current time is not in any blocking period
    }

    // If both checks pass, block access to the page
    document.body.innerHTML = '<h1>This page is blocked during your focus time.</h1>';
});

function isUrlBlocked(url, blockedUrls) {
    return blockedUrls.some(blockedUrl => url.includes(blockedUrl.trim()));
}

function isInBlockingPeriod(currentTime, blockingPeriods) {
    return blockingPeriods.some(period => {
        const [startHour, startMinutes] = period.start.split(':').map(Number);
        const [endHour, endMinutes] = period.end.split(':').map(Number);
        const startDate = new Date(currentTime);
        startDate.setHours(startHour, startMinutes, 0);
        const endDate = new Date(currentTime);
        endDate.setHours(endHour, endMinutes, 0);
        return currentTime >= startDate && currentTime <= endDate;
        if (!period.isActive) {
            return false;
        }
    });
}
