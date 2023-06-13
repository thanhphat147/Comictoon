# Comictoon

Mô tả: Người dùng có thể tìm kiếm và lựa chọn các thể loại truyện, bộ truyện mà mình yêu thích và đọc ngay trên thiết bị di động.

Hướng dẫn chạy ứng dụng bằng giả lập Android Studio:
1. Cài đặt Node.js, link: https://nodejs.org/en.
2. Cài đặt Expo CLI: nhấn tổ hợp window + R rồi nhập cmd, Enter. Nhập dòng lệnh sau rồi nhấn Enter để tiến hành cài đặt: "npx expo -h".
3. Cài đặt Visual Studio Code, link: https://code.visualstudio.com/download.
4. Cài đặt Android Studio, link: https://developer.android.com/studio.
5. Cài đặt biến môi trường: ANDROID_HOME, Anroid tools và Android build-tools.
6. Cài đặt WAMPSERVER hoặc XAMPP. Sau khi cài đặt xong thì chạy ứng dụng, mở trình duyệt web và nhập http://localhost/phpmyadmin/. Đăng nhập vào bằng user root.
7. Tạo cơ sở dữ liệu mới, đặt tên là "dbtruyen". Nhập cơ sở dữ liệu "dbtruyen.sql" bên trong thư mục code của ứng dụng đã tải về.
8. Mở Visual studio code, vào mục extension sau đó tìm Expo tools và cài đặt. Mở thư mục chứa code của ứng dụng.
9. Mở trình terminal trong Visual Studio Code, nhập và chạy "npm install"
10. Chạy các lệnh sau để cài đặt các thư viện:
    "npm install express"
    "npm install body-parser"
    "npm install mysql"
    "npm install cors --save"
11. Tại trình terminal, Nhập và chạy lệnh sau "node server.js"
12. Chạy file ngrok.exe trong thư mục code ứng dụng, 1 trình terminal sẽ hiện ra.
13. Nhập dòng sau và chạy: "ngrok http 3001".
14. copy địa chỉ Forwarding như hình bên dưới. Mở file config.js theo đường dẫn auth/config.js, xóa đại chỉ cũ và paste địa chỉ mới vào BASE_URL.

![image](https://github.com/thanhphat147/Comictoon/assets/32811788/cdfec2ef-49f9-499f-9b92-691e4c438800)

15. Mở tab terminal mới trong Visual Studio Code, nhập "npm start" sau đó nhấn phím a để chạy trình giả lập Android Studio.
