<template>
    <div class="bg-light vw-100 vh-100 d-flex align-items-center justify-content-center">
        <div class="card mx-auto align-items-center shadow-sm border-0" style="width: 400px;">
            <div class="card-body ">
                <h4 class="mb-2">Forgot Password 🔒</h4>
                <p class="mb-4">Enter your email and we'll send you instructions to reset your password</p>
            
                <form id="formAuthentication" class="mb-3" action="index.html" method="POST">
                    <div class="mb-3">
                        <label for="" class="form-label">Email</label>
                        <input type="email" class="form-control" id="email" name="email-username"
                            placeholder="Enter your email" autofocus="">
                    </div>
                    <div class="mb-3">
                        <button class="btn btn-primary d-grid w-100" type="submit">Send Reset Link</button>
                    </div>
                </form>
            
                <p class="text-center">
                    <router-link class="nav-link" to="/login">
                        <span class="text-primary"><i class="fa fa-arrow-left"></i> Back to login</span>
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>