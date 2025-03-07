<template>
    <nav class="navbar bg-dark navbar-expand-sm navbar-dark">
        <div class="container">
            <router-link to="/">
                <img src="../assets/logo-energy-pilates.png" alt="" style="width: 150px;">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-list"></i> Bài viết</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-film"></i> Video</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-cỉrcle-info"></i> Giới thiệu</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-calendar-days"></i> Sự kiện</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fa-solid fa-user"></i> Tài khoản
                        </a>
                        <ul class="dropdown-menu">
                            <div v-if="isLoggedIn">
                                <li><button class="dropdown-item" @click="logout">Đăng xuất</button></li>
                                <li><router-link class="dropdown-item" to="/edit-profile">Thông tin cá
                                        nhân</router-link></li>
                            </div>
                            <div v-else>
                                <li><router-link class="dropdown-item" to="/login">Đăng nhập</router-link></li>
                                <li><router-link class="dropdown-item" to="/register">Đăng kí</router-link></li>
                            </div>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav d-flex">
                    <li class="nav-item">
                        <!-- Button Đăng bài modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#dangBaiModal">
                            <i class="fa-solid fa-pen-to-square"></i> Đăng bài
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Modal Đăng bài-->
    <div class="modal fade" id="dangBaiModal" tabindex="-1" aria-labelledby="dangBaiModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Đăng bài</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form @submit.prevent="dangBai">
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" v-model="title" placeholder="Nhập vào tiêu đề">
                            <label for="">Tiêu đề</label>
                        </div>
                        <input type="file" name="" ref="fileInput" class="form-control mb-3" accept="image/*"
                            @change="handleFileChange">
                        <label for="">Nội dung</label>
                        <textarea class="form-control shadow-none border-0 mb-3" placeholder="Nội dung của bài viết"
                            v-model="content" id="floatingTextarea2" style="height: 100px"></textarea>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button> -->
                        <button type="submit" class="btn btn-primary">Đăng</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <!-- End Modal -->
    <section class="row container-fluid">
        <aside class="col-sm-4">
            <!-- <h3 class="text-info mt-2">Chuyên mục</h3> -->
            <!-- <ul class="list-group my-3">
                    <li class="list-group-item active bg-info d-flex justify-content-between align-items-center">
                        <a href="#" class="nav-link">Chế độ tập</a>
                        <span class="badge bg-primary rounded-pill">12</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="#" class="nav-link">Chế độ dinh dưỡng</a>
                        <span class="badge bg-primary rounded-pill">15</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <a href="#" class="nav-link">Cẩm nang cuộc sống</a>
                        <span class="badge bg-primary rounded-pill">99</span>
                    </li>
                </ul> -->
            <div class="card mt-3">
                <h3 class="card-header text-info ">
                    Bài viết nổi bật
                </h3>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            <img src="../assets/spinach_300x300.jpg" class="rounded-circle " width="100px" alt="">
                        </div>
                        <div class="col-sm-8">
                            <h6 class="card-title">Lợi ích khi ăn rau mỗi ngày</h6>
                            <p class="card-text"><small class="text-body-secondary">Tiêu thụ rau xanh hàng ngày sẽ giúp
                                    tăng cường thị lực, kiểm soát cân nặng, ngăn ngừa ung thư...</small></p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            <img src="../assets/orange_300x300.jpg" class="rounded-circle " width="100px" alt="">
                        </div>
                        <div class="col-sm-8">
                            <h6 class="card-title">9 tác dụng tuyệt vời của quả cam</h6>
                            <p class="card-text"><small class="text-body-secondary">Cam tự hào về khả năng chống lão hóa
                                    mạnh mẽ nhờ hàm lượng chất chống oxy hóa cao...</small></p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-sm-4">
                            <img src="../assets/sesameoil_300x300.jpg" class="rounded-circle " width="100px" alt="">
                        </div>
                        <div class="col-sm-8">
                            <h6 class="card-title">10 công dụng bất ngờ từ dầu dừa</h6>
                            <p class="card-text"><small class="text-body-secondary">Dầu dừa như một loại kem dưỡng ẩm tự
                                    nhiên cho cơ thể, giúp việc sản xuất collagen trong các tế bào...</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <article class="col-sm-8">
            <h3 class="text-info my-2">Tất cả bài viết</h3>
            <div class="row">
                <!-- <div class="col-sm-6 card p-0 mx-3 my-2" style="width: 390px;">
                    <h5 class="card-header">Phương pháp tập Pilates giúp phục hồi chấn thương cột sống <i class="fa-solid fa-message"></i> 16</h5>
                    <div class="card-body">
                        <img src="../assets/tap-piltes.jpg" class="img-fluid" alt="...">
                        <p class="card-text ">
                            Ngoài việc giúp duy trì vóc dáng, cải thiện sự linh hoạt dẻo dai cho người tập, 
                            Pilates giúp cơ bắp và các khớp mọc dài hơn, là giải pháp hữu hiệu để phục hồi chấn thương cột sống.
                        </p>
                    </div>
                </div> -->
                <div v-for="(post, index) in paginatedPosts" :key="post.id"
                    class="col-sm-6 card p-0 mx-1 my-2 text-decoration-none" style="width: 390px;">
                    <h5 class="card-header">
                        {{ post.title }}
                        <i class="fa-solid fa-message"></i>
                        {{ post.comments ? post.comments.length : 0 }}
                    </h5>
                    <router-link class="card-body text-decoration-none" :to="{ name: 'page-detail', params: { id: post.id } }">
                        <img :src="post.image" class="img-fluid" alt="...">
                        <p class="card-text ">
                            {{ post.content }}
                        </p>
                    </router-link>
                </div>
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center my-3">
                    <!-- Trang trước -->
                    <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="changePage(currentPage - 1)">
                        <a class="page-link" href="#" aria-label="Previous">
                            <i class="fa-solid fa-arrow-left"></i>
                        </a>
                    </li>

                    <!-- Các trang -->
                    <li v-for="page in totalPages" :key="page" class="page-item"
                        :class="{ active: page === currentPage }" @click="changePage(page)">
                        <a class="page-link" href="#">{{ page }}</a>
                    </li>

                    <!-- Trang sau -->
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }"
                        @click="changePage(currentPage + 1)">
                        <a class="page-link" href="#" aria-label="Next">
                            <i class="fa-solid fa-arrow-right"></i>
                        </a>
                    </li>
                </ul>
            </nav>
        </article>
    </section>
    <footer class=" bg-black p-3 text-center text-light ">©Copyright FPT Polytechnic</footer>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);
const currentPage = ref(1);
const postsPerPage = 4;

onMounted(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.value = savedPosts;
});
const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return posts.value.slice(start, end);
});
const totalPages = computed(() => Math.ceil(posts.value.length / postsPerPage));
const changePage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
const logout = () => {
    localStorage.removeItem('currentUser');
    currentUser.value = null;
    alert('Đã đăng xuất thành công!');
    router.push('/login');
};
const isLoggedIn = computed(() => !!currentUser.value);

const title = ref('');
const content = ref('');
const image = ref(null);
const fileInput = ref(null);

const dangBai = () => {
    const reader = new FileReader();
    reader.onload = () => {
        const newPost = {
            id: Date.now(),
            username: currentUser.value.username,
            title: title.value,
            content: content.value,
            image: reader.result, // Base64 string
            timestamp: new Date().toISOString(),
            comments: []
        };

        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(newPost);

        localStorage.setItem('posts', JSON.stringify(posts));
        title.value = '';
        content.value = '';
        image.value = null;
        if (fileInput.value) {
            fileInput.value.value = '';
        }
        alert('Đăng bài thành công!');
    };
    if (image.value) {
        reader.readAsDataURL(image.value);
    }
};

const handleFileChange = event => {
    const file = event.target.files[0];
    if (file && !['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        alert('Vui lòng chọn tệp ảnh định dạng JPG, PNG, hoặc GIF!');
        image.value = null;
        return;
    }
    image.value = file;
};
</script>
