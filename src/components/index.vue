<template>
    <nav class="navbar bg-dark navbar-expand-sm navbar-dark">
        <div class="container">
            <a class="navbar-brand" href="#">
                <img src="../assets/logo-energy-pilates.png" alt="" style="width: 150px;">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="collapsibleNavbar">
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/post"><i class="fa-solid fa-list"></i> Bài viết</router-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-film"></i> Video</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#"><i class="fa-solid fa-circle-info"></i> Giới thiệu</a>
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
                <ul class="navbar-nav d-flex" v-if="isLoggedIn">
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
    <header class="">
        <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                    aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img :src="banner1" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img :src="banner2" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img :src="banner3" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </header>

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
                            <input type="text" class="form-control" v-model="title"  placeholder="Nhập vào tiêu đề">
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
        <aside class="col-sm-4 p-5 ">
            <h2 class="text-info mb-3">Về tôi</h2>
            <div class="card blog bg-light">
                <img src="../assets/avatar.png" class="card-img-top" alt=".">
                <div class="card-body">
                    <h5 class="card-title">Giới thiệu bản thân</h5>
                    <p class="card-text">
                        TS. Trần Hoàng, Tổ chức tư vấn sức khỏe quốc tế độc lập. <br>
                        Châm ngôn: Ta không được chọn nơi sinh ra, nhưng ta có thể chọn cách mình sẽ sống.
                    </p>
                </div>
            </div>
            <ul class="nav nav-tabs my-2" role="tablist">
                <li class="nav-item">
                    <a href="#docnhieu" class="nav-link active" data-bs-toggle="tab">Đọc nhiều</a>
                </li>
                <li class="nav-item">
                    <a href="#xemnhieu" class="nav-link" data-bs-toggle="tab">Xem nhiều</a>
                </li>
            </ul>

            <div class="tab-content">
                <div class="container tab-pane active" id="docnhieu">
                    <div class="col-sm-12  p-2">
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[0].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[0].title }}</h6>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[1].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[1].title }}</h6>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[2].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[2].title }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container tab-pane " id="xemnhieu">
                    <div class="col-sm-12  p-2">
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[0].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[0].title }}</h6>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[1].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[1].title }}</h6>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img :src="tinDocNhieu[2].img" style="width: 125px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h6>{{ tinDocNhieu[2].title }}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </aside>
        <article class="col-sm-8 p-5 ">
            <h2 class="text-info mb-3">Blog của tôi</h2>
            <div class="  ">
                <div class=" row gap-4">
                    <div class="col-sm-6 card p-0">
                        <h5 class="card-header">Phương pháp tập Pilates giúp phục hồi chấn thương cột sống <i
                                class="fa-solid fa-message"></i> 16</h5>
                        <div class="card-body">
                            <img src="../assets/tap-piltes.jpg" class="img-fluid" alt="...">
                            <p class="card-text ">
                                Ngoài việc giúp duy trì vóc dáng, cải thiện sự linh hoạt dẻo dai cho người tập,
                                Pilates giúp cơ bắp và các khớp mọc dài hơn, kéo dài hơn...
                            </p>
                        </div>
                    </div>
                    <div class="col-sm-6 row card p-2">
                        <div class="d-flex align-items-center mb-3">
                            <img src="../assets/corevalue.jpg" style="width: 100px;" class="img-fluid me-3" alt="...">
                            <div>
                                <h5>Biết ơn đời, đời sẽ thương ta</h5>
                                <div><i class="fa-solid fa-message"></i> 30</div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="../assets/orange_300x300.jpg" style="width: 100px;" class="img-fluid me-3"
                                alt="...">
                            <div>
                                <h5>9 tác dụng tuyệt vời của quả cam</h5>
                                <div><i class="fa-solid fa-message"></i> 28</div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="../assets/sesameoil_300x300.jpg" style="width: 100px;" class="img-fluid me-3"
                                alt="...">
                            <div>
                                <h5>10 công dụng bất ngờ từ dầu dừa</h5>
                                <div><i class="fa-solid fa-message"></i> 15</div>
                            </div>
                        </div>
                        <div class="d-flex align-items-center mb-3">
                            <img src="../assets/spinach_300x300.jpg" style="width: 100px;" class="img-fluid me-3"
                                alt="...">
                            <div>
                                <h5>Lợi ích khi ăn rau mỗi ngày</h5>
                                <div><i class="fa-solid fa-message"></i> 12</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <button type="button" class="btn btn-info w-auto my-3">
                        <router-link class="nav-link" to="/post">Xem thêm</router-link>
                    </button>
                </div>
            </div>
            <h3 class="text-info text-center my-3">VIDEO - ĐỪNG BỎ LỠ</h3>
            <div class="row gap-4">
                <div class="card col-sm-5 p-2 " style="width: 360px;">
                    <img src="../assets/video1.jpg" class="" alt="">
                    <h6>Đi xa hơn để trưởng thành hơn</h6>
                    <p>
                        Tuổi trẻ chỉ nghỉ đến những chuyến đi, đợi mong được 1 ngày bay nhảy trên những phương
                        trời mới lạ. Để rồi những cô đơn mê mỏi, tuổi trẻ ấy mới muốn một nơi để trở về.
                    </p>
                </div>
                <div class="card col-sm-5 p-2" style="width: 360px;">
                    <img src="../assets/video2.jpg" class="" alt="">
                    <h6>Chút tâm tư những ngày cuối năm</h6>
                    <p>
                        Guồng quay cuộc sống dẫu có vội vàng, dẫu có tấp nập đến đâu thì cũng chẳng nằm ngoài qiu luật
                        tự nhiên
                        và bất biến xuân, hạ, thu, đông. và rồi một năm cũ sắp trôi qua.
                    </p>
                </div>
                <div class="card col-sm-5 p-2" style="width: 360px;">
                    <img src="../assets/video3.jpg" class="" alt="">
                    <h6>Ước gì được trở về với tuổi thơ</h6>
                    <p>
                        Tuổi trẻ chỉ nghỉ đến những chuyến đi, đợi mong được 1 ngày bay nhảy trên những phương
                        trời mới lạ. Để rồi những cô đơn mê mỏi, tuổi trẻ ấy mới muốn một nơi để trở về.
                    </p>
                </div>
                <div class="card col-sm-5 p-2" style="width: 360px;">
                    <img src="../assets/video4.jpg" class="" alt="">
                    <h6>Ba người thầy vĩ đại</h6>
                    <p>
                        Ta xem vạn vật là thầy. Tin thần học hỏi của ta luôn rộng mở hơn tất cả các người.
                        Ta học hỏi từ tất cả mọi vật, từ cành cây ngọn cỏ đến đám mây trên trời kia.
                    </p>
                </div>
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-info w-auto my-3">Xem thêm</button>
            </div>
        </article>
    </section>

    <footer class=" bg-black p-3 text-center text-light ">©Copyright FPT Polytechnic</footer>
    <div class="modal" tabindex="-1" id="modalMessage">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">MyBlog</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Xin chào {{ currentUser.username }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';
import imgtin1 from '../assets/corevalue.jpg';
import imgtin2 from '../assets/sesameoil_300x300.jpg';
import imgtin3 from '../assets/spinach_300x300.jpg';

const router = useRouter();

const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')));
const logout = () => {
    localStorage.removeItem('currentUser');
    currentUser.value = null;
    localStorage.setItem('modalShown', 'false');
    alert('Đã đăng xuất thành công!');
    router.push('/login');
};
const isLoggedIn = computed(() => !!currentUser.value);
var flag = localStorage.getItem('modalShown') !== 'true'; 

onMounted(() => {
    if (isLoggedIn && flag) {
        const modalElement = document.getElementById('modalMessage');
        const modalInstance = new bootstrap.Modal(modalElement);
        modalInstance.show();

        localStorage.setItem('modalShown', 'true');
    }
});



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

const tinDocNhieu = ([
    { title: 'Biết ơn đời, đời sẽ thương ta', img: imgtin1 },
    { title: '10 công dụng bất ngờ từ dầu dừa', img: imgtin2 },
    { title: 'Lợi ích khi ăn rau mỗi ngày', img: imgtin3 },
])
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log('User signed out.');
    });
  }
</script>