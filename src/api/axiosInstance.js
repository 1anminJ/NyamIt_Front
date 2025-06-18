import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    window.location.href = '/login'; // or '/'
};


// 요청 시 토큰 자동 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 가로채서 401 처리
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn('401 에러 발생 - 자동 로그아웃 처리');
            sessionStorage.removeItem('jwtToken'); // 세션에서 토큰 삭제

            // 페이지 이동
            window.location.href = '/login'; // 로그인 페이지로 강제 이동 (라우터에 맞게 수정 가능)
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
