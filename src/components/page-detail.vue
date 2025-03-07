<template>
    <nav class="navbar bg-dark navbar-expand-sm navbar-dark">
        <div class="container">
            <router-link class="nav-link" to="/">
                <img src="../assets/logo-energy-pilates.png" alt="" style="width: 150px;">
            </router-link>
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
                            <li><router-link class="dropdown-item" to="/login">Đăng nhập</router-link></li>
                            <li><router-link class="dropdown-item" to="/register">Đăng kí</router-link></li>
                            <li><router-link class="dropdown-item" to="/edit-profile">Thông tin cá nhân</router-link></li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav d-flex">
                    <li class="nav-item">
                        <!-- Button Đăng bài modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#dangBaiModal">
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
            <div class="modal-body">
                <form action="">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="" placeholder="Nhập vào tiêu đề">
                        <label for="">Tiêu đề</label>
                    </div>
                    <input type="file" name="" id="" class="form-control mb-3" accept="image/*">
                    <label for="">Nội dung</label>
                    <textarea class="form-control shadow-none border-0 mb-3" placeholder="Nội dung của bài viết" id="floatingTextarea2" style="height: 100px"></textarea>
                </form>
            </div>
            <div class="modal-footer">
                <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button> -->
                <button type="button" class="btn btn-primary">Đăng</button>
            </div>
            </div>
        </div>
    </div>
    <!-- End Modal -->
    <div >
        <div class="container-fluid py-5">
            <div class="row justify-content-center">
                <div class="col-lg-8">
                    <div class="card shadow" v-if="post">
                        <!-- Post Header -->
                         
                        <img :src="post.image" class="card-img-top post-image" alt="Blog Image">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3">
                                <span class="badge bg-primary">Bài viết</span>
                                <small class="text-muted">
                                    <i class="fa fa-calendar-alt me-2"></i>
                                    {{ Intl.DateTimeFormat('en-GB').format(new Date(post.timestamp)) }}
                                </small>
                            </div>
                            <h1 class="card-title mb-4">{{ post.title }}</h1>

                            <!-- Post Content -->
                            <div class="post-content">
                                <p class="lead">{{ post.content }}</p>
                                <!-- <div class="my-4">
                                    <h4>Lợi ích chính:</h4>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item" v-for="(benefit, index) in post.benefits"
                                            :key="index">
                                            <i class="bi bi-check-circle-fill text-success me-2"></i>
                                            {{ benefit }}
                                        </li>
                                    </ul>
                                </div> -->
                           
                                <div>
                                    <h5>Bình luận bài viết tại đây</h5>
                                    <form @submit.prevent="addComment" class="d-flex flex-column">
                                        <div class="d-flex justify-content-center">
                                            <textarea v-model="newComment.text" class="form-control m-3" placeholder="Nhập bình luận của bạn"></textarea>
                                        </div>
                                        <div class="ms-3">
                                            <button type="submit" class="btn btn-success w-auto my-3">Gửi bình luận</button>
                                        </div>
                                    </form>
                                    <div v-if="post.comments && post.comments.length" class="mt-3">
                                        <h5>Danh sách các bình luận</h5>
                                        <ul style="list-style-type: circle;">
                                            <li v-for="(comment, index) in post.comments" :key="index">
                                                <p><strong>{{ comment.name }}</strong>: {{ comment.text }}</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                            <!-- Post Footer -->
                            <div class="d-flex justify-content-between align-items-center mt-4 pt-4 border-top">
                                <!-- <div class="btn-group">
                                    <button class="btn btn-outline-primary">
                                        <i class="bi bi-hand-thumbs-up me-1"></i>
                                        Thích
                                    </button>
                                    <button class="btn btn-outline-primary">
                                        <i class="bi bi-share me-1"></i>
                                        Chia sẻ
                                    </button>
                                </div> -->
                                <router-link to="/post" class="btn btn-outline-primary">
                                    <i class="fa fa-arrow-left me-2"></i>Quay lại
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>Loading...</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <section class="container-fluid row my-3">
        <article class="col-md-8 row">
            <h2 class="text-center text-info">Phương pháp tập Pilates giúp phục hồi chấn thương cột sống</h2>
            <img src="../assets/tap-pilates1.jpg" alt="">
            <p class="my-3">
                Tập Pilates có thể vẫn còn khá xa lạ với người Việt, nhưng tại các nước phương Tây thì đây chính là phương pháp tập thể dục giúp duy trì vóc dáng, 
                tăng cường ý chỉ và cải thiện sự linh hoạt, dẻo dai cho người tập. Đặc biệt, các bài tập Pilates còn có khả năng trị đau lưng, là giải pháp hữu hiệu để phục hồi chấn thương cột sống. 
                Sau đây hãy cùng tìm hiểu các phương pháp tập luyện này giúp phục hồi chấn thương cột sống nhanh chóng nhé!
            </p>
            <h5>Pilates giúp phục hồi chấn thương cột sống nhanh chóng</h5>
            <p class="my-3">
                Một trong những căn bệnh ngày càng phổ biến, đặc biệt là dân văn phòng, đó là đau lưng, thoát vị đĩa đệm. Tuy nhiên, nếu điều trị không đúng cách có thể dẫn đến nhiều biến chứng nguy hiểm, bao gồm: 
                Ví dụ, điều trị bằng laser không đúng cách hoặc tập yoga không đúng cách có thể khiến bệnh nhân nằm liệt giường.
            </p>
            <img src="../assets/tap-piltes.jpg" alt="">
            <h5>Phương pháp tập Pilates Cat Cow</h5>
            <p class="my-3">Các bước thực hiện:</p>
            <p>
                • Bắt đầu với tư thế 4 điểm. Vai và cổ tay của bạn phải thẳng hàng và vuông góc với thảm, lưng của bạn phải bằng phẳng và xương chậu của bạn phải cân đối. <br>
                • Hít vào, võng lưng, nâng cằm lên, mở rộng ngực. <br>
                • Thở ra, cong xương cụt, nâng cong lưng và đưa cầm về gần khoang ngực. <br>
                • Lặp đi lặp lại động tác từ 5-7 lần.
            </p>
            <h5>Lời kết</h5>
            <p>
                Trên đây là phương pháp tập Pilates giúp phục hồi chấn thương cột sống nhanh chóng. Để đạt được kết quả tập luyện như mong muốn, bạn cần duy trì chế độ tập luyện đều đặn, thực hiện đúng động tác, kết hợp cùng chế độ ăn uống khoa học.
            </p>
        </article>
        <aside class="col-sm-4 ">
            <h5>Bình luận bài viết tại đây</h5>
            <form action="" class="row">
                <textarea name="" id="" class="form-control m-3" placeholder="Nhập bình luận của bạn"></textarea>
                <div class="">
                    <button type="submit" class="btn btn-success w-auto">Gửi bình luận</button>
                </div>
            </form>
            <h5>Danh sách các bình luận gần đây</h5>
            <p>
                <b>• Bình An: </b>bài viết raasrt hữu ích. <br>
                <b>• Quốc Thịnh: </b>bài này chill phết.
            </p>
        </aside>
    </section> -->
    <footer class=" bg-black p-3 text-center text-light ">©Copyright FPT Polytechnic</footer>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const postId = ref(route.params.id);
const post = ref(null);
const posts = ref([]);
const currentUser = ref(JSON.parse(localStorage.getItem('currentUser')) || { username: 'Người dùng ẩn danh' });
const newComment = ref({ name: currentUser.value.username, text: '' });

onMounted(() => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.value = savedPosts;

    post.value = posts.value.find((p) => p.id === parseInt(postId.value));

    if (!post.value.comments) {
        post.value.comments = []; // Khởi tạo nếu chưa có bình luận
    }
});
const addComment = () => {
    if (!newComment.value.text.trim()) {
        alert('Bình luận không được để trống!');
        return;
    }

    post.value.comments.push({ name: newComment.value.name, text: newComment.value.text });

    const updatedPosts = posts.value.map(p => (p.id === post.value.id ? post.value : p));
    localStorage.setItem('posts', JSON.stringify(updatedPosts));

    newComment.value.text = '';

    alert('Bình luận đã được thêm!');
};

</script>

<style scoped>
.post-image {
    height: 400px;
    object-fit: cover;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.8;
}
</style>