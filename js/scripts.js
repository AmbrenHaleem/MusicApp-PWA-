
const showButtonRef = document.getElementById("show-button");
const sendButtonRef = document.getElementById("send-button");
// Creates a div for outputting messages to the user.
const form = document.getElementById('song-add-form');

// buttonRef.addEventListener("click", function() {
    
//     var messageDiv = (document.getElementById("message-div"));
//     if (messageDiv){
//         messageDiv.remove();
//     }
//     const title = document.getElementById("song-title").value;
//     const artist = document.getElementById("song-artist").value;
//     const likes = 0;
//     // Validates the user input.
//     const invalidMessages = [];
//     if (!title) {
//       invalidMessages.push('The title field is required.');
//     }

//     if (!artist) {
//       invalidMessages.push('The artist field is required.');
//     }

//     if (invalidMessages.length > 0) {
        
//         const description = invalidMessages.join('<br>');
//         displayFailureMessage('Invalid data!', description);
//         return;
//     }
//     document.getElementById(listId).innerHTML = '';
//       // Adds the song to the database.
//     musicDb.add(title, artist, likes)
//     .then((song) => {
//       displaySuccessMessage('Song added successfully!');
//        musicDb.getAll()
//        .then((results) => {
//          results.forEach(result => {
//           displayItemInList(result, listId)
//          });
//        })
//       // Clears the user input.
//       clearControls();
//     })
//     .catch((error) => {
//       displayFailureMessage('Failed to add song!', error);
//     });
    
// }, false);

/**
 * Displays a successful message.
 */
function displaySuccessMessage(message) {
  var messageOutput = document.createElement('div');
  messageOutput.id = "message-div";
  form.insertBefore(messageOutput, form.firstChild);
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
  form.insertBefore(messageOutput, form.firstChild);
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
  document.getElementById("song-title").value = "";
  document.getElementById("song-artist").value = "";
}



window.addEventListener('online',function(){
  console.log('You are online!');
  //renderPosts();
})

window.addEventListener('offline',function(){
  console.log('Oh no, you lost your connection.');
  //renderOffline();
})