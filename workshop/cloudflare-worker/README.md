# Workshop Việt — Hành Lang Sáng Thế

Worker này phục vụ giao diện workshop và dữ liệu đã dịch tại:

`https://workshop.hanh-lang-sang-the.workers.dev`

## Nguồn triển khai

- Mã nguồn đã chuyển từ dự án Card32 sang Card36 ngày 2026-07-22.
- Repo đích: `https://github.com/abcxyzeric/Hanh-lang-sang-the`.
- Thư mục trong repo đích: `workshop/cloudflare-worker`.
- Tên Worker vẫn là `workshop`, vì vậy triển khai từ repo mới không làm đổi URL `workers.dev` hiện có.

## Cách triển khai

```powershell
npx wrangler whoami
npx wrangler deploy --dry-run
npx wrangler deploy
```

## Cơ chế dữ liệu

- Các route preset/content đã dịch được phục vụ từ `public/workshop-data/api`.
- Mục chưa dịch trả JSON 404, không tự proxy nội dung Trung vào catalog Việt.
- Các API khác tiếp tục proxy về `https://cloudflare-workshop.saugrodep.workers.dev`.
- `/embed` chuyển hướng về shell hiện tại bằng query chống cache.

## Tích hợp Card36

Tavern Helper `Xưởng sáng tạo` phải dùng:

- `TARGET_ORIGIN = https://workshop.hanh-lang-sang-the.workers.dev`
- `TARGET_URL = https://workshop.hanh-lang-sang-the.workers.dev/embed`

Giao thức worldbook dùng kênh `creative-workshop:worldbook`.
