# Pagoda Online

Website tĩnh mô phỏng trải nghiệm đi lễ chùa online, tập trung vào 2 hành trình chính:

- Khám phá thông tin chùa và chọn gói lễ.
- Vào không gian dâng hương (carousel 3 ban thờ) để thực hiện nghi thức.

Project hiện có các trang chính:

- `index.html`: trang giới thiệu và điều hướng.
- `pagodas/chua-ha.html`: trải nghiệm Chùa Hà.
- `pagodas/chua-thanh-chua.html`: trải nghiệm Chùa Thánh Chúa.
- `pagodas/chua-tran-quoc.html`: trang placeholder (đang phát triển).
- `pray/pray.html`: trang dâng hương trực quan.

## Tính năng chính

### 1) Trang chủ (`index.html`)

- Hero + nhạc nền (chỉ phát sau khi người dùng bấm nút bắt đầu).
- Điều hướng sang các trang chùa.
- Nút cuộn lên đầu trang có vòng tiến trình cuộn.

Code liên quan:

- `index/js/main.js`
- `index/js/modules/music-controller.js`
- `index/js/modules/scroll-top-progress.js`

### 2) Trang chùa (`pagodas/*.html`)

- Bố cục giới thiệu chùa, mâm lễ gợi ý, bảng giá gói lễ.
- Gallery/slider ảnh (`Swiper`) và lightbox (`GLightbox`).
- FAQ accordion.
- Khối hoạt động tâm linh: công đức, phóng sinh, xem bói.
- Mở khóa nội dung văn khấn qua quảng cáo video (skip sau 5 giây).

Code liên quan:

- Entry: `pagodas/assets/js/main.js`
- Shared modules: `pagodas/assets/js/shared/*`
- Feature modules:
  - `pagodas/assets/js/features/donation/*`
  - `pagodas/assets/js/features/rescue/*`
  - `pagodas/assets/js/features/fortune/*`
  - `pagodas/assets/js/features/package/*`
  - `pagodas/assets/js/features/wish-ad/*`

### 3) Trang dâng hương (`pray/pray.html`)

- Carousel 3 ban thờ (Đức Ông, Tam Bảo, Thánh Mẫu).
- Đồng bộ tiêu đề navbar theo slide hiện tại.
- Nút “Thắp hương”:
  - phát nhạc nền (chỉ kích hoạt một lần),
  - hiển thị lư hương trên slide,
  - ẩn phần chữ mô tả để tập trung trải nghiệm,
  - tự reset trạng thái sau 5 phút.

Code liên quan:

- `pray/js/main.js`
- `pray/js/modules/incense/*`
- `pray/js/modules/navbar/hero-navbar-sync.js`
- `pray/js/modules/carousel/hero-carousel-trigger.js`

## Kiến trúc JavaScript

Project dùng ES Modules thuần (không bundler), tổ chức theo hướng tách lớp:

- `core`: config, event bus, state, utility.
- `shared`: preloader, nav, scroll, carousel, modal loader, vendor init.
- `features`: từng nghiệp vụ riêng theo `handlers + logic + render + init`.

Một số điểm cấu hình trung tâm:

- `pagodas/assets/js/core/config/flags.js`
  - Chia bộ câu hỏi xem bói theo từng trang:
    - `chua-ha.html` -> câu hỏi index `[0,1,2]`
    - `chua-thanh-chua.html` -> câu hỏi index `[3,4,5]`
  - `wishAdSkipSeconds = 5`
- `pagodas/assets/js/core/config/paths.js`
  - Đường dẫn ảnh phản hồi, QR và danh sách modal HTML nạp động.

## Cấu trúc thư mục

```text
pagoda-online/
├── index.html
├── index/
│   ├── css/
│   └── js/
├── pagodas/
│   ├── chua-ha.html
│   ├── chua-thanh-chua.html
│   ├── chua-tran-quoc.html
│   ├── components/              # modal HTML nạp động
│   └── assets/
│       ├── css/
│       ├── js/
│       │   ├── core/
│       │   ├── shared/
│       │   └── features/
│       └── vendor/
├── pray/
│   ├── pray.html
│   ├── css/
│   ├── js/
│   └── vendor/
└── assets/
    ├── img/
    ├── audio/
    └── ads/
```

## Chạy local

Vì project có dùng `fetch()` để nạp modal (`pagodas/components/*.html`), cần chạy qua HTTP server; không nên mở bằng `file://`.

### Cách nhanh với Python

```bash
python -m http.server 5500
```

Sau đó mở:

- `http://localhost:5500/index.html`
- `http://localhost:5500/pagodas/chua-ha.html`
- `http://localhost:5500/pagodas/chua-thanh-chua.html`
- `http://localhost:5500/pray/pray.html`

## Thư viện đang dùng

- Bootstrap 5
- jQuery (chủ yếu trong trang `pray`)
- AOS
- Swiper
- GLightbox
- Font Awesome
- Bootstrap Icons

## Lưu ý hiện trạng kỹ thuật

- `pagodas/chua-tran-quoc.html` hiện là trang placeholder “đang phát triển”.
- Luồng sự kiện trong JS `features/*-handlers.js` đang lắng nghe theo class `.js-*`, trong khi một số nút trong HTML đang gọi `onclick="..."` và không thấy hàm global tương ứng trong code ES module hiện tại.
- `modal-rescue.html` dùng id `rescue-total-price`, nhưng `rescue-render.js` đang cập nhật `rescue-price-value`.

Nếu cần, có thể chuẩn hóa toàn bộ event trigger về một cơ chế duy nhất (khuyến nghị dùng class `.js-*` + event delegation) để tránh lệch giữa HTML và JS.
