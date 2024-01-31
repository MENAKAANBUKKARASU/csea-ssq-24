document.addEventListener("DOMContentLoaded", function () {
    const commentInput = document.getElementById("inp");
    const commentsContainer = document.getElementById("comments-list");
  
    function getComments() {
      return JSON.parse(localStorage.getItem("comments")) || [
        { text: "Our college is good", timestamp: getCurrentTimestamp() },
        { text: "This is the college with lots of restrictions for girls", timestamp: getCurrentTimestamp() },
        { text: "So happy to be here", timestamp: getCurrentTimestamp() },
      ];
    }
  
    function displayComments() {
      commentsContainer.innerHTML = "";
      const comments = getComments();
  
      comments.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.className = "comment";
        commentElement.innerHTML = `
          <p>${comment.text}</p>
          <span class="timestamp">${formatTimestamp(comment.timestamp)}</span>
        `;
        commentsContainer.appendChild(commentElement);
      });
    }
  
    function addComment() {
      const commentText = commentInput.value.trim();
      if (commentText === "") {
        alert("Please enter a comment.");
        return;
      }
  
      const newComment = { text: commentText, timestamp: getCurrentTimestamp() };
      const comments = getComments();
      comments.push(newComment);
  
      localStorage.setItem("comments", JSON.stringify(comments));
  
      displayComments();
  
      commentInput.value = "";
    }
  
    function getCurrentTimestamp() {
      return new Date().toISOString();
    }
  
    function formatTimestamp(timestamp) {
      const options = { hour: "numeric", minute: "numeric", second: "numeric" };
      return new Date(timestamp).toLocaleDateString("en-US", options);
    }
  
    displayComments();
    document.getElementById("post-comment-btn").addEventListener("click", addComment);
  });
  