// When DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const getStartedBtn = document.getElementById("getStartedBtn");
  const profileBtn = document.getElementById("profileimg-ball");
  const loginForm = document.getElementById("loginForm"); 
  const profileImageInput = document.getElementById("profileImageInput");
  const profileImageDisplay = document.getElementById("profileImageDisplay");
  const clearcodebtn = document.getElementById("clearBtn");
  const codearea = document.getElementById("codearea");

  if (clearcodebtn && codearea) {
    clearcodebtn.addEventListener("click", () => {
      codearea.value = ""; // Clear the code area
    });
  }

  // Check if user is already logged in
  const savedUser = JSON.parse(localStorage.getItem("user"));
  if (savedUser) {
    showProfile();
    if (profileImageDisplay) {
      profileImageDisplay.src = savedUser.image || "default.png";
    }
  } else {
    showLogin();
  }

  // Handle login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("loginName").value;
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      if (name && email && password) {
        const user = { name, email, password };
        localStorage.setItem("user", JSON.stringify(user));
        showProfile();
      }
    });
  }

  // Handle image change
  if (profileImageInput && profileImageDisplay) {
    profileImageInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const imageData = e.target.result;
          const updatedUser = JSON.parse(localStorage.getItem("user"));
          updatedUser.image = imageData;
          localStorage.setItem("user", JSON.stringify(updatedUser));
          profileImageDisplay.src = imageData;
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const profileImg = document.querySelector(".profileimg");
  if (profileImg) {
    const user = JSON.parse(localStorage.getItem("user"));
    profileImg.src = (user && user.image) ? user.image : "default.png";
  }

  function showProfile() {
    if (getStartedBtn) getStartedBtn.style.display = "none";
    if (profileBtn) profileBtn.style.display = "inline-block";
  }

  function showLogin() {
    if (getStartedBtn) getStartedBtn.style.display = "inline-block";
    if (profileBtn) profileBtn.style.display = "none";
  }
});
