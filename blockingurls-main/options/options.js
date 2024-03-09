document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('add-period').addEventListener('click', addBlockingPeriod);
document.getElementById('save-settings').addEventListener('click', saveOptions);

function loadOptions() {
    // Load and display the saved options
    chrome.storage.sync.get(['blockingPeriods', 'blockedUrls'], function(data) {
        if (data.blockingPeriods) {
            data.blockingPeriods.forEach(period => createBlockingPeriodElement(period.start, period.end));
        }
        if (data.blockedUrls) {
            document.getElementById('blocked-urls').value = data.blockedUrls.join(', ');
        }
    });
}

function addBlockingPeriod() {
    createBlockingPeriodElement();
}

function createBlockingPeriodElement(start = '', end = '', isActive = true) {
    const div = document.createElement('div');
    div.className = 'blocking-period';
    div.innerHTML = `
        <input type="time" value="${start}" class="start-time"> - 
        <input type="time" value="${end}" class="end-time">
        <input type="checkbox" class="period-active" ${isActive ? 'checked' : ''}> Active
        <button class="remove-period">Remove</button>
    `;
    div.querySelector('.remove-period').addEventListener('click', function() {
        this.parentNode.remove();
    });
    document.getElementById('blocking-periods').appendChild(div);
}

function saveOptions() {
    const blockingPeriods = Array.from(document.querySelectorAll('.blocking-period')).map(period => {
        return {
            start: period.querySelector('.start-time').value,
            end: period.querySelector('.end-time').value,
            isActive: period.querySelector('.period-active').checked
        };
    });
    const blockedUrls = document.getElementById('blocked-urls').value.split(',').map(url => url.trim());

    chrome.storage.sync.set({blockingPeriods, blockedUrls}, function() {
        console.log('Settings saved.');
    });
}
