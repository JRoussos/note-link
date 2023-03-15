// import { registerRoute } from 'workbox-routing'

// registerRoute( '/_share', shareTargetHandler, 'POST' )

// async function shareTargetHandler({ event }) {
//     const formData = await event.request.formData();
//     const mediaFiles = formData.getAll('media');

//     for (const mediaFile of mediaFiles) {
//         console.log(mediaFile)
//         // Do something with mediaFile
//         // Maybe cache it or post it back to a server
//     }

//     // Do something with the rest of formData as you need
//     // Maybe save it to IndexedDB

//     localStorage.setItem('form_data', JSON.stringify(formData))
// };

console.log('yello');

self.addEventListener('fetch', event => {
    const url = new URL(event.request.url)
    // If this is an incoming POST request for the
    // registered "action" URL, respond to it.
    if (event.request.method === 'POST' && url.pathname === '/create') {
        event.respondWith((async () => {
            const formData = await event.request.formData()

            console.log(formData)
            // const link = formData.get('link') || '';
            // const responseUrl = await saveBookmark(link);
            // return Response.redirect(responseUrl, 303);
        })())
    }
});