if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(reg) {

    // Are Notifications supported in the service worker?
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.warn('Notifications aren\'t supported.');
    }
    // Check the current Notification permission.
    // If its denied, it's a permanent block until the
    // user changes the permission
    if (Notification.permission === 'denied') {
      console.warn('The user has blocked notifications.');
    }
    // Check if push messaging is supported
    if (!('PushManager' in window)) {
      console.warn('Push messaging isn\'t supported.');
    }

    // push messaging
    reg.pushManager.subscribe({
        userVisibleOnly: true
    }).then(function(sub) {
        // try to send an example push message to this client (CHROME only)
        var pushServer = 'https://android.googleapis.com/gcm/send/'; // google cloud messaging server
        var clientId = sub.endpoint.split(pushServer)[1]; // get id from endpoint (gcm only)
        console.log('endpoint:', sub.endpoint, 'cliendId', clientId);
        $.ajax({
            type: 'POST',
            url: 'https://android.googleapis.com/gcm/send',
            contentType: 'application/json',
            headers:{'Authorization':'key=AIzaSyCCC1_DFCHTubarUIof-Xs--g98bJD8efA'}, // firebase auth key
            data: JSON.stringify({
                "registration_ids" : [clientId]
            })
        })
    });

    // updatefound is fired if service-worker.js changes.
    reg.onupdatefound = function() {
      var installingWorker = reg.installing;

      installingWorker.onstatechange = function() {
        switch (installingWorker.state) {
          case 'installed':
            if (navigator.serviceWorker.controller) {
                alert('E\' disponibile una nuova edizione: aggiorna la pagina per visualizzarla');
              // At this point, the old content will have been purged and the fresh content will
              // have been added to the cache.
              // It's the perfect time to display a "New content is available; please refresh."
              // message in the page's interface.
              console.log('New or updated content is available.');
            } else {
              // At this point, everything has been precached.
              // It's the perfect time to display a "Content is cached for offline use." message.
              // alert('Content is now available offline!');
              console.log('Content is now available offline!');
            }
            break;
          case 'redundant':
            console.error('The installing service worker became redundant.');
            break;
        }
      };
    };
  }).catch(function(e) {
    console.error('Error during service worker registration:', e);
  });

}
