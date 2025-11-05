/** @type {import('next').NextConfig} */
const nextConfig = {
  // 임시 로컬 이미지 허용 설정
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '8-photo-fe-storage.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
