async function handleSignup(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  const userData = {
    username: username,
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Account created successfully!");
      window.location.href = "login.html";
    } else {
      alert(data.message || "An error occurred. Please try again.");
    }
  } catch (error) {
    console.error("Error during signup:", error);
    alert("An error occurred. Please try again.");
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const loginData = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch("http://localhost:8000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "index.html";
      console.log(data);

      localStorage.setItem("token", data.token);
      localStorage.setItem("data", JSON.stringify(data.data));
    } else {
      document.getElementById("errorMessage").style.display = "block";
    }
  } catch (error) {
    console.error("Error during login:", error);
    document.getElementById("errorMessage").style.display = "block";
  }
}
