<template>
        <div class="login-img">
        <img src="/src//views/home/img/log.svg">
    </div>
    <div class="login-page">
      <h1>Đăng nhập</h1>
      <form @submit.prevent="login">
        <label for="username">Mã nhân viên</label>
        <input type="text" id="username" v-model="username" required>
        <label for="password">Mật khẩu</label>
        <input type="password" id="password" v-model="password" required>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>

  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        // Implement your login logic here
        console.log('Logging in with:', this.username, this.password);
        window.location.href = '/fixed_asset';
      }
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 400px;
    margin: 0 auto;
    border-radius: 5px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    width: 100vw;
    flex-direction: column;
    overflow: hidden;
    padding-bottom: 50%;
    padding-right: 20%;
  }

  .login-img{
    margin: 0 auto;
    border-radius: 5px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    
  }
  
  h1 {
  margin-bottom: 20px;
  color: #333;
  font-size: 25px;
}

form {
  display: flex;
  flex-direction: column;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-size: 14px;
  color: #333;
  text-align: left;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: calc(100% - 22px);
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 16px;
  width: 298px !important;
}

button:hover {
  background-color: #0056b3;
}
  </style>