class User {
    static create(email: string, password: string) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ email, password });
      localStorage.setItem('users', JSON.stringify(users));
    }
  
    static find(email: string, password: string) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.find(
        (user: { email: string; password: string }) => user.email === email && user.password === password
      );
    }
  }
  
  export default User;
  