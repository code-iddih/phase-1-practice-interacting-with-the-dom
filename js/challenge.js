// Initialize counter value and timer for incrementing
let counterValue = 0;
let timer = setInterval(() => {
  // Update the counter display every second
  document.getElementById('counter').textContent = counterValue++;
}, 1000);

// Event listener for plus button to increment counter
document.getElementById('plus').addEventListener('click', () => {
  counterValue++;
  document.getElementById('counter').textContent = counterValue;
});

// Event listener for minus button to decrement counter
document.getElementById('minus').addEventListener('click', () => {
  counterValue--;
  document.getElementById('counter').textContent = counterValue;
});

// Object to store like counts for each number
let likeCounts = {};

// Event listener for heart (like) button to add like and count
document.getElementById('heart').addEventListener('click', () => {
  const currentNumber = counterValue;

  // Update likeCounts for the current number
  if (!likeCounts[currentNumber]) {
    likeCounts[currentNumber] = 1;
  } else {
    likeCounts[currentNumber]++;
  }

  // Update the display of likes
  updateLikesDisplay();
});

// Function to update the display of likes
function updateLikesDisplay() {
  const likesList = document.querySelector('.likes');
  likesList.innerHTML = ''; // Clear previous list

  // Iterate through likeCounts object and update list
  Object.keys(likeCounts).forEach(number => {
    const listItem = document.createElement('li');
    listItem.textContent = `${number} has been liked ${likeCounts[number]} time${likeCounts[number] === 1 ? '' : 's'}`;
    likesList.appendChild(listItem);
  });
}

// Variable to track pause state
let isPaused = false;

// Event listener for pause/resume button
document.getElementById('pause').addEventListener('click', () => {
  if (!isPaused) {
    // Pause the timer
    clearInterval(timer);
    isPaused = true;
    // Update button text and disable other buttons
    document.getElementById('pause').textContent = 'resume';
    document.getElementById('plus').disabled = true;
    document.getElementById('minus').disabled = true;
    document.getElementById('heart').disabled = true;
  } else {
    // Resume the timer
    timer = setInterval(() => {
      document.getElementById('counter').textContent = counterValue++;
    }, 1000);
    isPaused = false;
    // Update button text and enable other buttons
    document.getElementById('pause').textContent = 'pause';
    document.getElementById('plus').disabled = false;
    document.getElementById('minus').disabled = false;
    document.getElementById('heart').disabled = false;
  }
});

// Event listener for comment submission
document.getElementById('submit').addEventListener('click', (event) => {
  event.preventDefault(); // Prevent form submission
  const commentInput = document.getElementById('comment-input').value;
  const commentList = document.getElementById('list');
  // Create a new comment element and append to the list
  const commentItem = document.createElement('div');
  commentItem.textContent = commentInput;
  commentList.appendChild(commentItem);
  // Clear the comment input field
  document.getElementById('comment-input').value = '';
});

// Initial call to updateLikesDisplay to populate initial likes
updateLikesDisplay();
