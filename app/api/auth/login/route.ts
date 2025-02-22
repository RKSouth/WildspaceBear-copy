export async function loginUser(email: string, password: string) {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
  
    // Store token in localStorage or cookies
    localStorage.setItem("token", data.token);
    return data;
  }