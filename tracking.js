// generic tracking function
// based on:
// https://developers.google.com/analytics/devguides/collection/gtagjs/events

const trackingLinks = document.getElementsByClassName('track');

for(const link of trackingLinks) {
    console.dir(link);
    link.addEventListener('click', (e)=>{
        const trackingParams = getParams(e);
    });


}


function getParams(e) {
    const params = {};
    console.log(e);
    const dataset = e.target.dataset;
    console.log(dataset);
    for(const data in dataset) {
        let key = data;
        if(data == 'label')
            key = 'event_label';
        if(data == 'category')
            key = 'event_category';

        params[key] = dataset[data];
    }
    console.log(params);
    return params;
}