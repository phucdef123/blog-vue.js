<template>
    <div class="bg-light vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="card mx-auto align-items-center shadow-sm border-0" style="width: 400px;">
            <div class="card-body ">
                <h4 class="mb-2">Welcome to MyBlog! 👋</h4>
                <p class="mb-4">Please sign-in to your account and start the adventure</p>
            
                <form id="formAuthentication" class="mb-3" @submit.prevent="login">
                    <div class="mb-3">
                        <label for="email" class="form-label">Username</label>
                        <input type="text" class="form-control" v-model="username" name="email-username"
                            placeholder="Enter your username">
                    </div>
                    <div class="mb-3 form-password-toggle">
                        <div class="d-flex justify-content-between">
                            <label class="form-label" for="password">Password</label>
                            <router-link class="nav-link" to="/forgot-password">
                                <p class="text-primary">Forgot password?</p>
                            </router-link>
                        </div>
                        <div class="input-group input-group-merge">
                            <input type="password" v-model="password" class="form-control" name="password" placeholder="············"
                                aria-describedby="password">
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember-me">
                            <label class="form-check-label" for="remember-me"> Remember Me </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit">Sign in</button>
                    </div>
                </form>
            
                <p class="text-center">
                    <span>New on our platform?</span>
                    <router-link class="nav-link" to="/register">
                        <p class="text-primary">Create an account</p>
                    </router-link>
                </p>
                <button class="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 mx-auto" style="width: fit-content;" @click="signInWithGoogle">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="20" height="20">
                    Đăng nhập bằng Google
                </button>


                <!-- <div class="g-signin2" data-onsuccess="onSignIn" 
                data-clientid="608583552385-i9t9o8n0n8gak0h6v0ua0bn7bmllkro5.apps.googleusercontent.com"></div> -->
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();
const username = ref('');
const password = ref('');

onMounted(() => {
  // Lắng nghe thông điệp từ cửa sổ con
  window.addEventListener('message', handleAuthCallback);

  // Khởi tạo Google API khi Vue component đã mounted
  window.gapi.load('auth2', () => {
    window.gapi.auth2.init({
      client_id: '608583552385-72aidj7se05tb87823qde0a80g2vj1ql.apps.googleusercontent.com',
    });
  });
});

onBeforeUnmount(() => {
  // Xóa sự kiện listener khi component bị unmounted
  window.removeEventListener('message', handleAuthCallback);
});

const login = () => {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find((user) => user.username === username.value && user.password === password.value);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    router.push('/');
  } else {
    alert('Invalid username or password');
  }
};

function signInWithGoogle() {
  const googleAuthWindow = window.open(
    `https://accounts.google.com/o/oauth2/auth?client_id=608583552385-72aidj7se05tb87823qde0a80g2vj1ql.apps.googleusercontent.com&redirect_uri=http://localhost:5173/callback&response_type=token&scope=email profile`,
    'GoogleAuthWindow',
    'width=500,height=600'
  );
}


function handleAuthCallback(event) {
  // Kiểm tra nguồn (origin) của thông điệp
  const allowedOrigins = ['http://localhost:5173', 'https://accounts.google.com'];

  if (!allowedOrigins.includes(event.origin)) {
    console.log('Origin không hợp lệ:', event.origin);
    return;
  }

  const userData = event.data;

  if (userData) {
    user.value = {
      username: userData.userName,
      email: userData.userEmail,
      image: userData.userImage,
    };

    // Lưu thông tin người dùng vào localStorage
    localStorage.setItem('currentUser', JSON.stringify(user.value));
    // Chuyển hướng sau khi đăng nhập thành công
    router.push('/');
  }
}
</script>