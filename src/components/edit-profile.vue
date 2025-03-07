<template>
    <div class="container-xxl min-vh-100 vw-100 bg-light d-flex align-items-center justify-content-center ">

        <!--Main start-->
        <div class="card " style="width: 800px;">
            <router-link class="nav-link" to="/">
                <h5 class="card-header"><i class="fa-solid fa-arrow-left"></i> Quay lại</h5>
            </router-link>
            <!-- Account -->
            <ul class="nav nav-tabs my-2" role="tablist">
                <li class="nav-item">
                    <a href="#profile" class="nav-link active" data-bs-toggle="tab">Hồ sơ</a>
                </li>
                <li class="nav-item">
                    <a href="#baiviet" class="nav-link" data-bs-toggle="tab">Bài viết</a>
                </li>
            </ul>

            <!--Profile start-->
            <div class="tab-content">
                <div class="container tab-pane active" id="profile">
                    <div class="card-body">
                        <div class="d-flex align-items-start align-items-sm-center gap-4">
                            <img src="../assets/avatar.png" alt="user-avatar" class="d-block rounded" height="100"
                                width="100" id="uploadedAvatar">
                            <div class="button-wrapper">
                                <label for="upload" class="btn btn-primary me-2 mb-4" tabindex="0">
                                    <span class=" d-sm-block">Upload new photo</span>
                                    <input type="file" id="upload" class="account-file-input" hidden=""
                                        accept="image/png, image/jpeg">
                                </label>
                                <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                    <span class=" d-sm-block">Reset</span>
                                </button>
            
                                <p class="text-muted mb-0">Allowed JPG, GIF or PNG.</p>
                            </div>
                        </div>
                    </div>
                    <hr class="my-0">
                    <div class="card-body">
                        <form id="formAccountSettings"  @submit.prevent="saveChanges">
                            <div class="row">
                                <div class="mb-3 col-md-12">
                                    <label for="firstName" class="form-label"> Username</label>
                                    <input class="form-control" type="text" id="firstName" name="firstName" v-model="currentUser.username">
                                </div>
                                <div class="mb-3 col-md-12">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input class="form-control" type="text" id="email" name="email" v-model="currentUser.email"
                                        placeholder="">
                                </div>
                                <div class="mb-3 col-md-12">
                                    <label for="organization" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="organization" name="organization"
                                    v-model="currentUser.password">
                                </div>
            
                            </div>
                            <div class="mt-2">
                                <button type="submit" class="btn btn-primary me-2">Save changes</button>
                                <button type="reset" class="btn btn-outline-secondary">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
                <!--Profile end-->

                <!--Bài viết start-->
                <div class="tab-pane fade container  " id="baiviet">
                    <div class="card-body ">
                        <div v-if="userPosts.length === 0" class="text-center">
                            <p>Bạn chưa đăng bài viết nào.</p>
                        </div>
                        <div v-else class="row w-100">
                            <div v-for="(post, index) in userPosts" :key="index" class="card p-0 my-2">
                                <h5 class="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        {{ post.title }}
                                        <i class="fa-solid fa-message"></i> 
                                        {{ post.comments ? post.comments.length : 0 }}
                                    </div>
                                    <div class="dropdown">
                                        <button class="btn" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i class="fa-solid fa-ellipsis-vertical"></i>
                                        </button>
                                        <ul class="dropdown-menu">
                                            <li>
                                                <button
                                                    type="button"
                                                    class="btn dropdown-item"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#editModal"
                                                    @click="editPost(index)"
                                                >
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <a class="dropdown-item" href="#" @click="deletePost(post.id)">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </h5>
                                <div class="card-body">
                                    <img
                                        v-if="post.image"
                                        :src="post.image"
                                        class="img-fluid"
                                        alt="..."
                                        style="width: 200px;"
                                    />
                                    <p class="card-text">{{ post.content }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--Bài viết end-->
        </div>
        <!--Main end-->

        <!-- Modal Sửa bài-->
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="dangBaiModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Chỉnh sửa</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="savePostChanges">
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" v-model="editingPost.title" placeholder="Nhập vào tiêu đề" >
                            <label for="">Tiêu đề</label>
                        </div>
                        <input type="file" name=""  class="form-control mb-3" accept="image/*"
                        @change="event => (editingPost.image = event.target.files[0])">
                        <label for="">Nội dung</label>
                        <textarea class="form-control shadow-none border-0 mb-3" placeholder="Nội dung của bài viết" 
                        v-model="editingPost.content" id="floatingTextarea2" style="height: 100px"></textarea>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button> -->
                        <button type="submit" class="btn btn-primary">Sửa</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
        <!-- End Modal -->
    </div>
</template>
<script setup>
    import {ref, onMounted, computed} from 'vue';

    const currentUser = ref({
        username: '',
        email: '',
        password: '',
    });
    const posts = ref([]);
    const editingPost = ref({
        title: '',
        content: '',
        image: null,
    });


    onMounted(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            currentUser.value = savedUser;
        }
        posts.value = JSON.parse(localStorage.getItem('posts')) || [];
    });
    const saveChanges = () => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const updatedUsers = users.map(user => {
            if (user.username === currentUser.value.username) {
                return { ...user, ...currentUser.value }; // Cập nhật thông tin
            }
            return user;
        });
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('currentUser', JSON.stringify(currentUser.value));
        
        alert('Thông tin đã được cập nhật!');
    };
    const editPost = index => {
        editingPost.value = { ...posts.value[index], index }; 
    };
    const savePostChanges = () => {
        if (editingPost.value.index !== undefined) {
            const { index, ...updatedPost } = editingPost.value;

            if (editingPost.value.image instanceof File) {
                const reader = new FileReader();
                reader.onload = () => {
                    updatedPost.image = reader.result; // Lưu Base64
                    posts.value.splice(index, 1, updatedPost);
                    localStorage.setItem('posts', JSON.stringify(posts.value));

                    alert('Bài viết đã được cập nhật!');
                    editingPost.value = { title: '', content: '', image: null }; // Reset
                };
                reader.readAsDataURL(editingPost.value.image);
            } else {
                posts.value.splice(index, 1, updatedPost);
                localStorage.setItem('posts', JSON.stringify(posts.value));

                alert('Bài viết đã được cập nhật!');
                editingPost.value = { title: '', content: '', image: null }; // Reset
            }
        }
    };

    const userPosts = computed(() => {
        return posts.value.filter(post => post.username === currentUser.value.username);
    });
    const deletePost = postId => {
        if (confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            posts.value = posts.value.filter(post => post.id !== postId);

            localStorage.setItem('posts', JSON.stringify(posts.value));

            alert('Đã xóa bài viết thành công!');
        }
    };

</script>