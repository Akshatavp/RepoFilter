let USER_API = "https://respofilt.onrender.com/api/user";
let LIST_API = "https://respofilt.onrender.com/api/list";
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
    const response = await fetch(`${USER_API}/signup`, {
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
    const response = await fetch(`${USER_API}/login`, {
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

async function authCheck(token) {
  const response = await fetch(`${USER_API}/auth`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    if (data.auth == false) {
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }
}

async function searchItems(code, token) {
  const response = await fetch(`${USER_API}/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  return data;
}

//List

async function saveList(name, codeList, token, userId) {
  const response = await fetch(`${LIST_API}/save/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, codeList }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("List saved successfully!");
  } else {
    alert(data.message || "Error saving list.");
  }
}

async function updateListDetails(listId, userId, token, newName, updatedList) {
  const response = await fetch(`${LIST_API}/update/${listId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName, codeList: updatedList }),
  });

  const data = await response.json();

  if (response.ok) {
    alert("List updated successfully.");
  } else {
    alert(data.message || "Failed to update list.");
  }
}

async function fetchListDetails(listId, userId, token) {
  const response = await fetch(`${LIST_API}/${userId}/${listId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    displayListDetails(data.list);
  } else {
    alert(data.message || "Failed to fetch list details.");
  }
}

async function fetchLists(userId, token) {
  const response = await fetch(`${LIST_API}/${userId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    console.log(data);
    displayLists(data.lists);
  } else {
    alert(data.message || "Failed to fetch lists.");
  }
}

async function deleteList(listId) {
  if (confirm("Are you sure you want to delete this list?")) {
    const token = localStorage.getItem("token");
    var userId = localStorage.getItem("data");
    userId = JSON.parse(userId).id;

    const response = await fetch(`${LIST_API}/${userId}/${listId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (response.ok) {
      alert("List deleted successfully");
      fetchLists(userId, token);
    } else {
      alert(data.message || "Failed to delete list.");
    }
  }
}
