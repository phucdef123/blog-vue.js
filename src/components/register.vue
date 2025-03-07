<template>
    <div class="bg-light vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="card mx-auto align-items-center shadow-sm border-0" style="width: 400px;">
            <div class="card-body ">
                <h4 class="mb-2">Welcome to MyBlog! 👋</h4>
                <p class="mb-4">Make your app management easy and fun!</p>
                <div id="liveAlertPlaceholder"></div>
                <form id="formAuthentication" class="mb-3" @submit.prevent="register">
                    <div class="mb-3">
                        <label for="" class="form-label">Username</label>
                        <input type="text" class="form-control" v-model="username" name="email-username"
                            placeholder="Enter your username" required>
                    </div>
                    <div class="mb-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="email" name="email-username"
                            placeholder="Enter your email" required>
                    </div>
                    <div class="mb-3 form-password-toggle">
                        <div class="d-flex justify-content-between">
                            <label class="form-label" for="password">Password</label>
                        </div>
                        <div class="input-group input-group-merge">
                            <input type="password" v-model="password" class="form-control" name="password"
                                placeholder="············" aria-describedby="password" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="remember-me" required>
                            <label class="form-check-label" for="remember-me"> I agree to privacy policy & terms
                            </label>
                        </div>
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit" id="liveAlertBtn">Sign up</button>
                    </div>
                </form>

                <p class="text-center">
                    <span>Already have an account?</span>
                    <router-link class="nav-link" to="/login">
                        <p class="text-primary">Sign in instead</p>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');

const register = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username.value);
    if (userExists) {
        appendAlert('Username already exists!', 'danger');
        return;
    }
    const newUser = {
        username: username.value,
        email: email.value,
        password: password.value
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(localStorage.getItem('users'));  

    appendAlert('Register successfully!', 'success');
    setTimeout(() => {
        router.push('/login');
    }, 1500);
}

const appendAlert = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

</script>