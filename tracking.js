// generic tracking function for google analytics
// based on:
// https://developers.google.com/analytics/devguides/collection/gtagjs/events

const trackingLinks = document.getElementsByClassName('track');

for(const link of trackingLinks) {
//     console.dir(link);
    link.addEventListener('click', (e)=>{
        const trackingParams = getParams(e);
        if(typeof gtagDefaults === 'object') {
            if(!trackingParams.hasOwnProperty('event_category') && gtagDefaults.hasOwnProperty('category')) {
                trackingParams.event_category = gtagDefaults.category;
            }
        }
        sendEvent(trackingParams);
    });


}

function sendEvent(params = false) {
	const action = params?.action ?? 'click';
    console.log('sending event', params, action);

    if(typeof gtag === 'function') {
        gtag('event', action, params);
    } else if (dataLayer) {
		const custom_event = { action };
		for(const param of Object.keys(params)) {
			custom_event[param] = params[param];
		}
        dataLayer.push(custom_event);
// 		console.debug('dataLayer', dataLayer);
    } else {
		console.warn('no analytics tag found');
	}

}

// TODO: if label is empty replace with link text
function getParams(e) {
    const params = {};
    const dataset = e.target.dataset;

    for(const data in dataset) {
        let key = data;
        const value = dataset[data];

        // prameter reference
        // https://developers.google.com/gtagjs/reference/parameter
        if(data == 'label')
            key = 'event_label';
        if(data == 'category')
            key = 'event_category';

        if(typeof value == 'string' && value.length > 0)
            params[key] = value;
    }

    return params;
}
