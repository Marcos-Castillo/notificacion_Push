self.addEventListener('push', function(event) {
    var options = {
      body: event.data.text(), // Contenido del mensaje de la notificación
      icon: './icono.png', 
    };
  console.log('push push push ')
    event.waitUntil(
      self.registration.showNotification('Título de la notificación', options)
    );
  });
  