<template>
  <div>
    <h1>Đăng nhập bằng Google</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  // Logic chạy khi component con được mở
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get('access_token');

  if (accessToken) {
    fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const userData = {
          userName: data.name || 'No Name Available',
          userEmail: data.email,
          userImage: data.picture,
        };

        // Gửi thông tin người dùng về cửa sổ chính qua postMessage
        window.opener.postMessage(userData, 'http://localhost:5173'); // Đảm bảo URL là đúng

        // Đóng cửa sổ con sau khi gửi thông tin
        window.close();
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
      });
  }
});
</script>
