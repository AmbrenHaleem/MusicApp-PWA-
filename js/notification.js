
const notificationButton = document.getElementById('send-button');
const showButton = document.getElementById('show-button');
const notificationAddForm = document.getElementById('notification-add-form');
// Register the service worker

  if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js', { scope : '/'})
      .then(function(registration){
          console.log('Register Success : ' , registration)
      })
      .catch(function(error){
        console.log('Registration Failed : ', error)
      })
  }
  else{
      console.log('Service workers are not supported.')
  }
  
if ('Notification' in window && 'serviceWorker' in navigator){
        console.log('Permission', Notification.permission)
        switch (Notification.permission){
            case 'denied' : 
                notificationNotAllowed();
                break;
            case 'granted' : 
                notificationAllowed();
                break;
            case 'default' : 
                notificationNotAllowed();
                break;
        }
}
else{
    notificationNotAllowed();
}

function notificationNotAllowed(){
    //send notification button displayed and form hidden
    console.log('Notification not allowed!');
    notificationAddForm.style.visibility = 'hidden';
    notificationButton.style.visibility = 'visible';
}

function notificationAllowed(){
    //If granted, the form must be displayed. The button “Send
    //Notifications” must be hidden.
    console.log('Notification allowed!');
    notificationAddForm.style.visibility = 'visible';
    notificationButton.style.visibility = 'hidden';
}

function notificationDefault(){
    console.log('Notification default!');
}
notificationButton.addEventListener('click', function(){
    //on send notification button click, 
    //request permission from the user to send notifications.
    // Upon authorization, no notification needs to be displayed to the user.
    requestUserPermission();
});

function requestUserPermission(){
  console.log("User permission requested.");
   Notification.requestPermission()
   .then((permission) => {
    console.log("permission : ",permission);
    if(permission == 'granted'){
        notificationAllowed();
    }
    else{
        notificationNotAllowed();
    }
   });
}

showButton.addEventListener('click', function(){
    var messageDiv = (document.getElementById("message-div"));
    if (messageDiv){
        messageDiv.remove();
    }
    const title = document.getElementById("message-title").value;
  
    // Validates the user input.
    const invalidMessages = [];
    if (!title) {
      invalidMessages.push('The title field is required.');
    }
    if (invalidMessages.length > 0) {
        
        const description = invalidMessages.join('<br>');
        displayFailureMessage('Invalid data!', description);
        return;
    }

    displayNotification();
});

function displayNotification(){
    console.log('Notification', Notification);
    console.log('Notification', Notification.maxActions);
    const options = {
        body : document.getElementById("message-body").value ,
        icon : '/images/logo.png',
        // image: '/images/thank-you.jpg',
        actions: [
            {
                action : 'confirm',
                title: 'Agree',
                // icon: '/images/okay.png',
            },{
                action: 'cancel',
                title: 'Disagree',
                // icon: '/images/cancel.png',
            }
        ],
        data: {
            name: 'ac'
        }
    };

    //new Notification('Successfully subscribed!', options);
    navigator.serviceWorker.ready.then(registration => {
        console.log('Registration',registration);
        registration.showNotification(document.getElementById("message-title").value, options);
    });
}
/**
 * Displays a successful message.
 */
function displaySuccessMessage(message) {
    var messageOutput = document.createElement('div');
    messageOutput.id = "message-div";
    notificationAddForm.insertBefore(messageOutput, notificationAddForm.firstChild);
    messageOutput.innerHTML = `
      <div class='song-add-success'>
        ${message}
      </div>
    `;
  }
  /**
   * Displays an error message.
   */
  function displayFailureMessage(message, description) {
    var messageOutput = document.createElement('div');
    messageOutput.id = "message-div";
    notificationAddForm.insertBefore(messageOutput, notificationAddForm.firstChild);
    messageOutput.innerHTML = `
      <div class='song-failure'>
        ${message}
        <span>${description}</span>
      </div>
    `;
  }
  /**
   * Clear controls
   */
  function clearControls(){
    document.getElementById("message-title").value = "";
    document.getElementById("message-body").value = "";
  }
  
  navigator.serviceWorker.addEventListener('message',(message) =>{
    console.log('Message received : ', message);
    const data = message.data;
    console.log('Received data : ', data);
    if(data){
      const messageDiv = document.createElement('div');
      messageDiv.className = 'messageDiv';
      notificationAddForm.append(messageDiv);
      messageDiv.innerHTML = `
      <p>
      ${data}
      </p>
      `;
    }
  });
