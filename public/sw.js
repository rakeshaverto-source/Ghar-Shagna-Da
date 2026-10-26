// Service worker for web push: new-lead alerts (admin) and new-blog alerts (visitors)

self.addEventListener('push', (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: 'Ghar Shagna Da', body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Ghar Shagna Da', {
      body: data.body || '',
      icon: '/logo.png',
      badge: '/logo.png',
      image: data.image,
      data: { url: data.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL(event.notification.data?.url || '/', self.location.origin).href;

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      // Reuse an open tab of this site if there is one
      for (const client of windows) {
        if (client.url.startsWith(self.location.origin) && 'focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
