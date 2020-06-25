// generic tracking function
// based on:
// https://developers.google.com/analytics/devguides/collection/gtagjs/events

const trackingLinks = document.getElementsByClassName('track');

for(const link of trackingLinks) {
    console.dir(link);
    link.addEventListener('click', (e)=>{
        const trackingParams = getParams(e);
        sendEvent(trackingParams);
    });


}

function sendEvent(params = false, action = false) {
    const eAction = action !== false ? action : 'click';
    console.log('sending event', params);
}

// TODO: if label is empty replace with link text
function getParams(e) {
    const params = {};
    const dataset = e.target.dataset;

    for(const data in dataset) {
        let key = data;
        const value = dataset[data];

        if(data == 'label')
            key = 'event_label';
        if(data == 'category')
            key = 'event_category';

        if(typeof value == 'string' && value.length > 0)
            params[key] = value;
    }

    return params;
}