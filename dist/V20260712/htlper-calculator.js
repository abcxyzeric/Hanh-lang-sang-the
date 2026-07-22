/**
 * 变量映射：
 * variables.人物.等级
 * variables.人物.当前总经验
 * variables.人物.升级阈值
 * variables.人物.属性.属性点
 * variables.人物.SP
 * variables.人物.RP
 */

(function () {
    'use strict';

    // ==========================================
    // 核心公式
    // ==========================================

    function calculateDiabloThreshold(targetLevel) {
        if (targetLevel <= 1) return 0;
        let total = 0;
        for (let L = 1; L < targetLevel; L++) {
            total += Math.floor(100 * Math.pow(L, 1.5));
        }
        return total;
    }

    // ==========================================
    // 工具函数
    // ==========================================

    function safeParseInt(value, def = 0) {
        const n = parseInt(value, 10);
        return isNaN(n) ? def : n;
    }

    function safeParseFloat(value, def = 0) {
        const n = parseFloat(value);
        return isNaN(n) ? def : n;
    }

    function normalizeQualityName(value) {
        return value === '\u795E\u5668' ? '\u5353\u8D8A' : value;
    }

    // 兼容旧存档：只迁移名为“品质”的字段，避免误改世界观文本中的“神器”。

    const CALC_VI_TO_ZH_KEY_MAP = {
  "Thông tin thế giới": "\u4E16\u754C\u4FE1\u606F",
  "Danh sách nhiệm vụ": "\u4EFB\u52A1\u5217\u8868",
  "Người ở gần": "\u9644\u8FD1\u7684\u4EBA",
  "Danh sách gắn kết": "\u7F81\u7ECA\u5217\u8868",
  "Nhân vật": "\u4EBA\u7269",
  "Tài sản cốt lõi": "\u6838\u5FC3\u8D44\u4EA7",
  "Bộ sưu tập quân cờ chủng tộc": "\u79CD\u65CF\u68CB\u5B50\u6536\u85CF",
  "Đồng hồ tận thế": "\u672B\u65E5\u65F6\u949F",
  "Tin đồn": "\u4F20\u95FB",
  "Chiến đấu": "\u6218\u6597",
  "Sự kiện hiện tại": "\u5F53\u524D\u4E8B\u4EF6",
  "Cấu hình hệ thống": "\u7CFB\u7EDF\u914D\u7F6E",
  "Niên lịch": "\u5E74\u5386",
  "Thời gian": "\u65F6\u95F4",
  "Diễn biến thế giới": "\u4E16\u754C\u5267\u60C5",
  "Vị trí": "\u4F4D\u7F6E",
  "Đại lục": "\u5927\u9646",
  "Khu vực": "\u533A\u57DF",
  "Địa điểm": "\u573A\u6240",
  "Kinh Tủng Lạc Viên": "\u60CA\u609A\u4E50\u56ED",
  "Đang đăng nhập": "\u767B\u5F55\u4E2D",
  "Tên nhiệm vụ": "\u4EFB\u52A1\u540D",
  "Bên ủy thác": "\u59D4\u6258\u65B9",
  "Tiêu đề": "\u6807\u9898",
  "Tóm tắt": "\u7B80\u4ECB",
  "Mục tiêu": "\u76EE\u6807",
  "Phần thưởng": "\u5956\u52B1",
  "Giao trả": "\u4EA4\u4ED8",
  "Tên họ": "\u59D3\u540D",
  "Tên": "\u540D\u79F0",
  "Giới tính": "\u6027\u522B",
  "Chủng tộc": "\u79CD\u65CF",
  "Nghề nghiệp": "\u804C\u4E1A",
  "Thiết lập nền": "\u80CC\u666F\u8BBE\u5B9A",
  "Ngoại hình": "\u5916\u8C8C",
  "Trang phục": "\u7740\u88C5",
  "Cấp độ": "\u7B49\u7EA7",
  "Tổng kinh nghiệm hiện tại": "\u5F53\u524D\u603B\u7ECF\u9A8C",
  "Ngưỡng lên cấp": "\u5347\u7EA7\u9608\u503C",
  "Giới hạn sinh lực": "\u751F\u547D\u503C\u4E0A\u9650",
  "Sinh lực hiện tại": "\u5F53\u524D\u751F\u547D\u503C",
  "Sinh lực tạm thời": "\u4E34\u65F6\u751F\u547D\u503C",
  "Đặc chất": "\u7279\u8D28",
  "Tên đặc chất": "\u7279\u8D28\u540D",
  "Ô đặc chất bổ sung": "\u989D\u5916\u7279\u8D28\u69FD",
  "Nhãn": "\u6807\u7B7E",
  "Mô tả": "\u63CF\u8FF0",
  "Thuộc tính": "\u5C5E\u6027",
  "Sức mạnh": "\u529B\u91CF",
  "Nhanh nhẹn": "\u654F\u6377",
  "Thể chất": "\u4F53\u8D28",
  "Trí lực": "\u667A\u529B",
  "Cảm nhận": "\u611F\u77E5",
  "Mị lực": "\u9B45\u529B",
  "Điểm thuộc tính": "\u5C5E\u6027\u70B9",
  "Thuộc tính chiến đấu": "\u6218\u6597\u5C5E\u6027",
  "Tỷ lệ chí mạng": "\u66B4\u51FB\u7387",
  "Sát thương chí mạng": "\u66B4\u51FB\u4F24\u5BB3",
  "Ngưỡng chí mạng": "\u66B4\u51FB\u9608\u503C",
  "Giảm sát thương vật lý": "\u7269\u7406\u51CF\u4F24",
  "Giảm sát thương phép": "\u9B54\u6CD5\u51CF\u4F24",
  "Tài nguyên hành động mỗi lượt": "\u6BCF\u56DE\u5408\u52A8\u4F5C\u8D44\u6E90",
  "Hành động chính": "\u4E3B\u52A8\u4F5C",
  "Hành động phụ": "\u9644\u8D60\u52A8\u4F5C",
  "Di chuyển": "\u79FB\u52A8",
  "Phản ứng": "\u53CD\u5E94\u52A8\u4F5C",
  "Tương tác ngắn": "\u7B80\u77ED\u4EA4\u4E92",
  "Số lần tấn công": "\u653B\u51FB\u6B21\u6570",
  "Bảng vũ khí": "\u6B66\u5668\u9762\u677F",
  "Xúc xắc sát thương": "\u4F24\u5BB3\u9AB0",
  "Hệ số cấp độ": "\u7B49\u7EA7\u7CFB\u6570",
  "Sát thương cố định": "\u56FA\u5B9A\u4F24\u5BB3",
  "Cây kỹ năng": "\u6280\u80FD\u6811",
  "Danh sách kỹ năng": "\u6280\u80FD\u5217\u8868",
  "Tên kỹ năng": "\u6280\u80FD\u540D",
  "Tổng SP": "\u603BSP",
  "SP đã dùng": "\u5DF2\u4F7F\u7528SP",
  "Kỹ năng tài nguyên": "\u8D44\u6E90\u6280\u80FD",
  "Cấp bậc": "\u9636\u4F4D",
  "Tên vật triệu hồi": "\u53EC\u5524\u7269\u540D\u79F0",
  "Hiệu ứng đặc biệt": "\u7279\u6B8A\u6548\u679C",
  "Cấp học được": "\u4E60\u5F97\u7B49\u7EA7",
  "Giới hạn cấp": "\u7B49\u7EA7\u4E0A\u9650",
  "Tiêu hao SP": "SP\u6D88\u8017",
  "Hồi chiêu": "\u51B7\u5374",
  "Bội suất sát thương": "\u4F24\u5BB3\u500D\u7387",
  "Cấp hiện tại": "\u5F53\u524D\u7B49\u7EA7",
  "Bộ đếm hồi chiêu": "\u51B7\u5374\u8BA1\u6570",
  "Đang trang bị": "\u662F\u5426\u88C5\u5907",
  "Bật chế độ tổ hợp": "\u7EC4\u5408\u6A21\u5F0F\u542F\u7528",
  "Cấp kỹ năng": "\u6280\u80FD\u7B49\u7EA7",
  "Đang hồi chiêu": "\u51B7\u5374\u4E2D",
  "Giá trị tăng trưởng sát thương": "\u4F24\u5BB3\u6210\u957F\u503C",
  "Phiên bản bội suất sát thương": "\u4F24\u5BB3\u500D\u7387\u7248\u672C",
  "Vật triệu hồi": "\u53EC\u5524\u7269",
  "Giới hạn HP": "HP\u4E0A\u9650",
  "Bội suất kỹ năng": "\u6280\u80FD\u500D\u7387",
  "Thời lượng": "\u6301\u7EED\u65F6\u95F4",
  "Đồng đội": "\u4F19\u4F34",
  "Ô kỹ năng chủ động": "\u4E3B\u52A8\u6280\u80FD\u69FD",
  "Ô kỹ năng thức tỉnh": "\u89C9\u9192\u6280\u80FD\u69FD",
  "Ô áo nghĩa liên kết": "\u8FDE\u643A\u5965\u4E49\u69FD",
  "Áo nghĩa liên kết": "\u8FDE\u643A\u5965\u4E49",
  "Lời thề đồng hành": "\u540C\u884C\u8A93\u7EA6",
  "Chia sẻ kinh nghiệm": "\u5206\u4EAB\u7ECF\u9A8C",
  "Suy nghĩ hiện tại": "\u5F53\u524D\u60F3\u6CD5",
  "Hiệu ứng trạng thái": "\u72B6\u6001\u6548\u679C",
  "Tên trạng thái": "\u72B6\u6001\u540D",
  "Ảnh hưởng thuộc tính": "\u5C5E\u6027\u5F71\u54CD",
  "Ảnh hưởng đặc biệt": "\u7279\u6B8A\u5F71\u54CD",
  "Túi đồ": "\u80CC\u5305",
  "Tiền chung": "\u901A\u7528\u5E01",
  "Vật phẩm": "\u9053\u5177",
  "Tên vật phẩm": "\u9053\u5177\u540D",
  "Số lượng": "\u6570\u91CF",
  "Hiệu quả": "\u6548\u679C",
  "Danh sách trang bị": "\u88C5\u5907\u5217\u8868",
  "Định danh trang bị duy nhất": "\u88C5\u5907\u552F\u4E00\u6807\u8BC6",
  "Loại": "\u7C7B\u578B",
  "Vị trí trang bị": "\u90E8\u4F4D",
  "Hòm trang bị": "\u88C5\u5907\u7BB1",
  "Trạng thái mặc": "\u7A7F\u6234\u72B6\u6001",
  "Phẩm chất": "\u54C1\u8D28",
  "Cấp phẩm": "\u54C1\u7EA7",
  "Cấp cường hóa": "\u5F3A\u5316\u7B49\u7EA7",
  "Cộng thuộc tính": "\u5C5E\u6027\u52A0\u6210",
  "Phòng ngự": "\u9632\u5FA1\u529B",
  "Danh vọng": "\u58F0\u671B",
  "Tên phe phái": "\u9635\u8425\u540D\u79F0",
  "Phe phái": "\u9635\u8425",
  "Điểm danh vọng": "\u58F0\u671B\u503C",
  "Cấp danh vọng": "\u58F0\u671B\u7B49\u7EA7",
  "Tên tài sản": "\u8D44\u4EA7\u540D\u79F0",
  "Quy mô chủ thể": "\u4E3B\u4F53\u89C4\u6A21",
  "Địa điểm sở tại": "\u6240\u5728\u5730",
  "Chuỗi xây dựng": "\u5EFA\u8BBE\u5E8F\u5217",
  "Hướng xây dựng": "\u5EFA\u8BBE\u65B9\u5411",
  "Giai đoạn xây dựng": "\u5EFA\u8BBE\u9636\u6BB5",
  "Cơ sở cốt lõi": "\u6838\u5FC3\u8BBE\u65BD",
  "Chức năng": "\u529F\u80FD",
  "Sản lượng": "\u4EA7\u51FA",
  "Ngày sản lượng kế tiếp": "\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F",
  "Nhân sự trú đóng": "\u9A7B\u624E\u4EBA\u5458",
  "Sự kiện chờ xử lý": "\u5F85\u529E\u4E8B\u4EF6",
  "Đạo lộ": "\u9053\u9014",
  "Tên đạo lộ": "\u9053\u9014\u540D\u79F0",
  "Tên mục tầng đạo lộ": "\u9053\u9014\u5C42\u7EA7\u9879\u540D\u79F0",
  "Giai đoạn": "\u9636\u6BB5",
  "Nguyên lực hiện tại": "\u5F53\u524D\u6E90\u529B",
  "Giới hạn nguyên lực": "\u6E90\u529B\u4E0A\u9650",
  "Yếu tố": "\u8981\u7D20",
  "Kỳ tích": "\u5947\u8FF9",
  "Quyền năng": "\u6743\u80FD",
  "Truy nguyên": "\u6EAF\u6E90",
  "Ảnh hưởng thế giới": "\u4E16\u754C\u5F71\u54CD",
  "Nhãn khái niệm": "\u6982\u5FF5\u6807\u7B7E",
  "Năng lực đạo lộ": "\u9053\u9014\u80FD\u529B",
  "Chuyện phố phường": "\u8857\u5934\u5DF7\u8BAE",
  "Tiêu đề tin đồn": "\u4F20\u95FB\u6807\u9898",
  "Người kể chuyện": "\u8BF4\u4E66\u4EBA",
  "Nội dung": "\u5185\u5BB9",
  "Độ tin cậy": "\u53EF\u4FE1\u5EA6",
  "Giao dịch tình báo": "\u60C5\u62A5\u4EA4\u6613",
  "Tên tình báo": "\u60C5\u62A5\u540D",
  "Người bán": "\u5356\u5BB6",
  "Tóm lược": "\u6458\u8981",
  "Giá chào": "\u8981\u4EF7",
  "Cáo thị và hịch văn": "\u5E03\u544A\u4E0E\u6A84\u6587",
  "Người ban bố": "\u53D1\u5E03\u8005",
  "Vị trí niêm yết": "\u5F20\u8D34\u4F4D\u7F6E",
  "Niên lịch khởi đầu": "\u8D77\u59CB\u5E74\u5386",
  "Điểm hiện tại": "\u5F53\u524D\u70B9\u6570",
  "Số công trạng": "\u529F\u4E1A\u6B21\u6570",
  "Công trạng đã trấn áp": "\u5DF2\u9547\u529F\u4E1A",
  "Đã thanh trừ": "\u7F34\u6E05",
  "Ngày thanh trừ": "\u7F34\u6E05\u65E5",
  "Số đời còn sống": "\u5B58\u6D3B\u4E16\u6570",
  "Chế độ hệ thống kỹ năng": "\u6280\u80FD\u7CFB\u7EDF\u6A21\u5F0F",
  "Chế độ chỉ số chiến đấu": "\u6218\u6597\u6570\u503C\u6A21\u5F0F",
  "Độ khó": "\u96BE\u5EA6",
  "Trạng thái kỹ năng tổ hợp": "\u7EC4\u5408\u6280\u80FD\u72B6\u6001",
  "Nhóm cao cấp hiện tại": "\u5F53\u524D\u9AD8\u7EA7\u7EC4",
  "Ô hiển thị hiện tại": "\u5F53\u524D\u663E\u793A\u69FD",
  "Ô kỹ năng cơ bản": "\u57FA\u7840\u6280\u80FD\u69FD",
  "Ô kỹ năng chuyển chức": "\u8F6C\u804C\u6280\u80FD\u69FD",
  "Cấu hình nhóm kỹ năng cao cấp": "\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E",
  "Hiển thị ngắn và chi tiết": "\u7B80\u8BE6\u663E\u793A",
  "Đường dẫn hiển thị rút gọn": "\u7B80\u8981\u663E\u793A\u8DEF\u5F84",
  "Thế giới quan": "\u4E16\u754C\u89C2",
  "Làm đẹp thoại": "\u5BF9\u767D\u7F8E\u5316",
  "Bội suất kẻ địch": "\u654C\u4EBA\u500D\u7387",
  "Bội suất HP": "HP\u500D\u7387",
  "Tên sự kiện": "\u4E8B\u4EF6\u540D\u79F0",
  "Phụ bản Kinh Tủng Lạc Viên": "\u60CA\u609A\u4E50\u56ED\u526F\u672C",
  "Đánh giá phụ bản Kinh Tủng Lạc Viên": "\u60CA\u609A\u4E50\u56ED\u526F\u672C\u8BC4\u4EF7",
  "Tạm lưu phụ bản": "\u6682\u5B58\u526F\u672C",
  "Phụ bản Long Tộc": "\u9F99\u65CF\u526F\u672C",
  "Chương phụ bản": "\u526F\u672C\u7BC7\u7AE0",
  "Đang chiến đấu": "\u662F\u5426\u6218\u6597\u4E2D",
  "Lượt hiện tại": "\u5F53\u524D\u8F6E\u6B21",
  "Trạng thái": "\u72B6\u6001",
  "Độ thuần thục": "\u719F\u7EC3\u5EA6",
  "Sinh hoạt": "\u751F\u6D3B",
  "Ngưỡng tăng bậc": "\u5347\u9636\u9608\u503C",
  "Độ thiện cảm": "\u597D\u611F\u5EA6",
  "Tăng trưởng": "\u6210\u957F",
  "Sát thương": "\u4F24\u5BB3",
  "Hiệu ứng cổ điển": "\u7ECF\u5178\u6548\u679C",
  "Hiệu ứng mới": "\u65B0\u7248\u6548\u679C",
  "Vị trí gốc": "\u539F\u59CB\u90E8\u4F4D",
  "Chế độ bội suất sát thương": "\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F",
  "Ở gần": "\u9644\u8FD1",
  "Tiền vàng": "\u91D1\u5E01"
};
    const CALC_ZH_TO_VI_KEY_MAP = {
  "\u4E16\u754C\u4FE1\u606F": "Thông tin thế giới",
  "\u4EFB\u52A1\u5217\u8868": "Danh sách nhiệm vụ",
  "\u9644\u8FD1\u7684\u4EBA": "Người ở gần",
  "\u7F81\u7ECA\u5217\u8868": "Danh sách gắn kết",
  "\u4EBA\u7269": "Nhân vật",
  "\u6838\u5FC3\u8D44\u4EA7": "Tài sản cốt lõi",
  "\u79CD\u65CF\u68CB\u5B50\u6536\u85CF": "Bộ sưu tập quân cờ chủng tộc",
  "\u672B\u65E5\u65F6\u949F": "Đồng hồ tận thế",
  "\u4F20\u95FB": "Tin đồn",
  "\u6218\u6597": "Chiến đấu",
  "\u5F53\u524D\u4E8B\u4EF6": "Sự kiện hiện tại",
  "\u7CFB\u7EDF\u914D\u7F6E": "Cấu hình hệ thống",
  "\u5E74\u5386": "Niên lịch",
  "\u65F6\u95F4": "Thời gian",
  "\u4E16\u754C\u5267\u60C5": "Diễn biến thế giới",
  "\u4F4D\u7F6E": "Vị trí",
  "\u5927\u9646": "Đại lục",
  "\u533A\u57DF": "Khu vực",
  "\u573A\u6240": "Địa điểm",
  "\u60CA\u609A\u4E50\u56ED": "Kinh Tủng Lạc Viên",
  "\u767B\u5F55\u4E2D": "Đang đăng nhập",
  "\u4EFB\u52A1\u540D": "Tên nhiệm vụ",
  "\u59D4\u6258\u65B9": "Bên ủy thác",
  "\u6807\u9898": "Tiêu đề",
  "\u7B80\u4ECB": "Tóm tắt",
  "\u76EE\u6807": "Mục tiêu",
  "\u5956\u52B1": "Phần thưởng",
  "\u4EA4\u4ED8": "Giao trả",
  "\u59D3\u540D": "Tên họ",
  "\u540D\u79F0": "Tên",
  "\u6027\u522B": "Giới tính",
  "\u79CD\u65CF": "Chủng tộc",
  "\u804C\u4E1A": "Nghề nghiệp",
  "\u80CC\u666F\u8BBE\u5B9A": "Thiết lập nền",
  "\u5916\u8C8C": "Ngoại hình",
  "\u7740\u88C5": "Trang phục",
  "\u7B49\u7EA7": "Cấp độ",
  "\u5F53\u524D\u603B\u7ECF\u9A8C": "Tổng kinh nghiệm hiện tại",
  "\u5347\u7EA7\u9608\u503C": "Ngưỡng lên cấp",
  "\u751F\u547D\u503C\u4E0A\u9650": "Giới hạn sinh lực",
  "\u5F53\u524D\u751F\u547D\u503C": "Sinh lực hiện tại",
  "\u4E34\u65F6\u751F\u547D\u503C": "Sinh lực tạm thời",
  "\u7279\u8D28": "Đặc chất",
  "\u7279\u8D28\u540D": "Tên đặc chất",
  "\u989D\u5916\u7279\u8D28\u69FD": "Ô đặc chất bổ sung",
  "\u6807\u7B7E": "Nhãn",
  "\u63CF\u8FF0": "Mô tả",
  "\u5C5E\u6027": "Thuộc tính",
  "\u529B\u91CF": "Sức mạnh",
  "\u654F\u6377": "Nhanh nhẹn",
  "\u4F53\u8D28": "Thể chất",
  "\u667A\u529B": "Trí lực",
  "\u611F\u77E5": "Cảm nhận",
  "\u9B45\u529B": "Mị lực",
  "\u5C5E\u6027\u70B9": "Điểm thuộc tính",
  "\u6218\u6597\u5C5E\u6027": "Thuộc tính chiến đấu",
  "\u66B4\u51FB\u7387": "Tỷ lệ chí mạng",
  "\u66B4\u51FB\u4F24\u5BB3": "Sát thương chí mạng",
  "\u66B4\u51FB\u9608\u503C": "Ngưỡng chí mạng",
  "\u7269\u7406\u51CF\u4F24": "Giảm sát thương vật lý",
  "\u9B54\u6CD5\u51CF\u4F24": "Giảm sát thương phép",
  "\u6BCF\u56DE\u5408\u52A8\u4F5C\u8D44\u6E90": "Tài nguyên hành động mỗi lượt",
  "\u4E3B\u52A8\u4F5C": "Hành động chính",
  "\u9644\u8D60\u52A8\u4F5C": "Hành động phụ",
  "\u79FB\u52A8": "Di chuyển",
  "\u53CD\u5E94\u52A8\u4F5C": "Phản ứng",
  "\u7B80\u77ED\u4EA4\u4E92": "Tương tác ngắn",
  "\u653B\u51FB\u6B21\u6570": "Số lần tấn công",
  "\u6B66\u5668\u9762\u677F": "Bảng vũ khí",
  "\u4F24\u5BB3\u9AB0": "Xúc xắc sát thương",
  "\u7B49\u7EA7\u7CFB\u6570": "Hệ số cấp độ",
  "\u56FA\u5B9A\u4F24\u5BB3": "Sát thương cố định",
  "\u6280\u80FD\u6811": "Cây kỹ năng",
  "\u6280\u80FD\u5217\u8868": "Danh sách kỹ năng",
  "\u6280\u80FD\u540D\u79F0": "Tên kỹ năng",
  "\u6280\u80FD\u540D": "Tên kỹ năng",
  "\u603BSP": "Tổng SP",
  "\u5DF2\u4F7F\u7528SP": "SP đã dùng",
  "\u8D44\u6E90\u6280\u80FD": "Kỹ năng tài nguyên",
  "\u9636\u4F4D": "Cấp bậc",
  "\u53EC\u5524\u7269\u540D\u79F0": "Tên vật triệu hồi",
  "\u7279\u6B8A\u6548\u679C": "Hiệu ứng đặc biệt",
  "\u4E60\u5F97\u7B49\u7EA7": "Cấp học được",
  "\u7B49\u7EA7\u4E0A\u9650": "Giới hạn cấp",
  "SP\u6D88\u8017": "Tiêu hao SP",
  "\u51B7\u5374": "Hồi chiêu",
  "\u4F24\u5BB3\u500D\u7387": "Bội suất sát thương",
  "\u5F53\u524D\u7B49\u7EA7": "Cấp hiện tại",
  "\u51B7\u5374\u8BA1\u6570": "Bộ đếm hồi chiêu",
  "\u662F\u5426\u88C5\u5907": "Đang trang bị",
  "\u7EC4\u5408\u6A21\u5F0F\u542F\u7528": "Bật chế độ tổ hợp",
  "\u6280\u80FD\u7B49\u7EA7": "Cấp kỹ năng",
  "\u51B7\u5374\u4E2D": "Đang hồi chiêu",
  "\u4F24\u5BB3\u6210\u957F\u503C": "Giá trị tăng trưởng sát thương",
  "\u4F24\u5BB3\u500D\u7387\u7248\u672C": "Phiên bản bội suất sát thương",
  "\u53EC\u5524\u7269": "Vật triệu hồi",
  "HP\u4E0A\u9650": "Giới hạn HP",
  "\u6280\u80FD\u500D\u7387": "Bội suất kỹ năng",
  "\u6301\u7EED\u65F6\u95F4": "Thời lượng",
  "\u4F19\u4F34": "Đồng đội",
  "\u4E3B\u52A8\u6280\u80FD\u69FD": "Ô kỹ năng chủ động",
  "\u89C9\u9192\u6280\u80FD\u69FD": "Ô kỹ năng thức tỉnh",
  "\u8FDE\u643A\u5965\u4E49\u69FD": "Ô áo nghĩa liên kết",
  "\u8FDE\u643A\u5965\u4E49": "Áo nghĩa liên kết",
  "\u540C\u884C\u8A93\u7EA6": "Lời thề đồng hành",
  "\u5206\u4EAB\u7ECF\u9A8C": "Chia sẻ kinh nghiệm",
  "\u5F53\u524D\u60F3\u6CD5": "Suy nghĩ hiện tại",
  "\u72B6\u6001\u6548\u679C": "Hiệu ứng trạng thái",
  "\u72B6\u6001\u540D": "Tên trạng thái",
  "\u5C5E\u6027\u5F71\u54CD": "Ảnh hưởng thuộc tính",
  "\u7279\u6B8A\u5F71\u54CD": "Ảnh hưởng đặc biệt",
  "\u80CC\u5305": "Túi đồ",
  "\u901A\u7528\u5E01": "Tiền chung",
  "\u9053\u5177": "Vật phẩm",
  "\u9053\u5177\u540D": "Tên vật phẩm",
  "\u6570\u91CF": "Số lượng",
  "\u6548\u679C": "Hiệu quả",
  "\u88C5\u5907\u5217\u8868": "Danh sách trang bị",
  "\u88C5\u5907\u552F\u4E00\u6807\u8BC6": "Định danh trang bị duy nhất",
  "\u7C7B\u578B": "Loại",
  "\u90E8\u4F4D": "Vị trí trang bị",
  "\u88C5\u5907\u7BB1": "Hòm trang bị",
  "\u7A7F\u6234\u72B6\u6001": "Trạng thái mặc",
  "\u54C1\u8D28": "Phẩm chất",
  "\u54C1\u7EA7": "Cấp phẩm",
  "\u5F3A\u5316\u7B49\u7EA7": "Cấp cường hóa",
  "\u5C5E\u6027\u52A0\u6210": "Cộng thuộc tính",
  "\u9632\u5FA1\u529B": "Phòng ngự",
  "\u58F0\u671B": "Danh vọng",
  "\u9635\u8425\u540D\u79F0": "Tên phe phái",
  "\u9635\u8425": "Phe phái",
  "\u58F0\u671B\u503C": "Điểm danh vọng",
  "\u58F0\u671B\u7B49\u7EA7": "Cấp danh vọng",
  "\u8D44\u4EA7\u540D\u79F0": "Tên tài sản",
  "\u4E3B\u4F53\u89C4\u6A21": "Quy mô chủ thể",
  "\u6240\u5728\u5730": "Địa điểm sở tại",
  "\u5EFA\u8BBE\u5E8F\u5217": "Chuỗi xây dựng",
  "\u5EFA\u8BBE\u65B9\u5411": "Hướng xây dựng",
  "\u5EFA\u8BBE\u9636\u6BB5": "Giai đoạn xây dựng",
  "\u6838\u5FC3\u8BBE\u65BD": "Cơ sở cốt lõi",
  "\u529F\u80FD": "Chức năng",
  "\u4EA7\u51FA": "Sản lượng",
  "\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F": "Ngày sản lượng kế tiếp",
  "\u9A7B\u624E\u4EBA\u5458": "Nhân sự trú đóng",
  "\u89D2\u8272": "Nhân vật",
  "\u5F85\u529E\u4E8B\u4EF6": "Sự kiện chờ xử lý",
  "\u9053\u9014": "Đạo lộ",
  "\u9053\u9014\u540D\u79F0": "Tên đạo lộ",
  "\u9053\u9014\u5C42\u7EA7\u9879\u540D\u79F0": "Tên mục tầng đạo lộ",
  "\u9636\u6BB5": "Giai đoạn",
  "\u5F53\u524D\u6E90\u529B": "Nguyên lực hiện tại",
  "\u6E90\u529B\u4E0A\u9650": "Giới hạn nguyên lực",
  "\u8981\u7D20": "Yếu tố",
  "\u5947\u8FF9": "Kỳ tích",
  "\u6743\u80FD": "Quyền năng",
  "\u6EAF\u6E90": "Truy nguyên",
  "\u4E16\u754C\u5F71\u54CD": "Ảnh hưởng thế giới",
  "\u6982\u5FF5\u6807\u7B7E": "Nhãn khái niệm",
  "\u9053\u9014\u80FD\u529B": "Năng lực đạo lộ",
  "\u8857\u5934\u5DF7\u8BAE": "Chuyện phố phường",
  "\u4F20\u95FB\u6807\u9898": "Tiêu đề tin đồn",
  "\u8BF4\u4E66\u4EBA": "Người kể chuyện",
  "\u5185\u5BB9": "Nội dung",
  "\u53EF\u4FE1\u5EA6": "Độ tin cậy",
  "\u60C5\u62A5\u4EA4\u6613": "Giao dịch tình báo",
  "\u60C5\u62A5\u540D": "Tên tình báo",
  "\u5356\u5BB6": "Người bán",
  "\u6458\u8981": "Tóm lược",
  "\u8981\u4EF7": "Giá chào",
  "\u5E03\u544A\u4E0E\u6A84\u6587": "Cáo thị và hịch văn",
  "\u53D1\u5E03\u8005": "Người ban bố",
  "\u5F20\u8D34\u4F4D\u7F6E": "Vị trí niêm yết",
  "\u8D77\u59CB\u5E74\u5386": "Niên lịch khởi đầu",
  "\u5F53\u524D\u70B9\u6570": "Điểm hiện tại",
  "\u529F\u4E1A\u6B21\u6570": "Số công trạng",
  "\u5DF2\u9547\u529F\u4E1A": "Công trạng đã trấn áp",
  "\u7F34\u6E05": "Đã thanh trừ",
  "\u7F34\u6E05\u65E5": "Ngày thanh trừ",
  "\u5B58\u6D3B\u4E16\u6570": "Số đời còn sống",
  "\u6280\u80FD\u7CFB\u7EDF\u6A21\u5F0F": "Chế độ hệ thống kỹ năng",
  "\u6218\u6597\u6570\u503C\u6A21\u5F0F": "Chế độ chỉ số chiến đấu",
  "\u96BE\u5EA6": "Độ khó",
  "\u7EC4\u5408\u6280\u80FD\u72B6\u6001": "Trạng thái kỹ năng tổ hợp",
  "\u5F53\u524D\u9AD8\u7EA7\u7EC4": "Nhóm cao cấp hiện tại",
  "\u5F53\u524D\u663E\u793A\u69FD": "Ô hiển thị hiện tại",
  "\u57FA\u7840\u6280\u80FD\u69FD": "Ô kỹ năng cơ bản",
  "\u8F6C\u804C\u6280\u80FD\u69FD": "Ô kỹ năng chuyển chức",
  "\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E": "Cấu hình nhóm kỹ năng cao cấp",
  "\u7B80\u8BE6\u663E\u793A": "Hiển thị ngắn và chi tiết",
  "\u7B80\u8981\u663E\u793A\u8DEF\u5F84": "Đường dẫn hiển thị rút gọn",
  "\u4E16\u754C\u89C2": "Thế giới quan",
  "\u5BF9\u767D\u7F8E\u5316": "Làm đẹp thoại",
  "\u654C\u4EBA\u500D\u7387": "Bội suất kẻ địch",
  "HP\u500D\u7387": "Bội suất HP",
  "\u4E8B\u4EF6\u540D\u79F0": "Tên sự kiện",
  "\u60CA\u609A\u4E50\u56ED\u526F\u672C": "Phụ bản Kinh Tủng Lạc Viên",
  "\u60CA\u609A\u4E50\u56ED\u526F\u672C\u8BC4\u4EF7": "Đánh giá phụ bản Kinh Tủng Lạc Viên",
  "\u6682\u5B58\u526F\u672C": "Tạm lưu phụ bản",
  "\u9F99\u65CF\u526F\u672C": "Phụ bản Long Tộc",
  "\u526F\u672C\u7BC7\u7AE0": "Chương phụ bản",
  "\u662F\u5426\u6218\u6597\u4E2D": "Đang chiến đấu",
  "\u5F53\u524D\u8F6E\u6B21": "Lượt hiện tại",
  "\u72B6\u6001": "Trạng thái",
  "\u719F\u7EC3\u5EA6": "Độ thuần thục",
  "\u751F\u6D3B": "Sinh hoạt",
  "\u5347\u9636\u9608\u503C": "Ngưỡng tăng bậc",
  "\u597D\u611F\u5EA6": "Độ thiện cảm",
  "\u6210\u957F": "Tăng trưởng",
  "\u4F24\u5BB3": "Sát thương",
  "\u7ECF\u5178\u6548\u679C": "Hiệu ứng cổ điển",
  "\u65B0\u7248\u6548\u679C": "Hiệu ứng mới",
  "\u539F\u59CB\u90E8\u4F4D": "Vị trí gốc",
  "\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F": "Chế độ bội suất sát thương",
  "\u9644\u8FD1": "Ở gần",
  "\u91D1\u5E01": "Tiền vàng"
};
    const CALC_VI_TO_ZH_VALUE_MAP = {
  "Có": "\u662F",
  "Thần khí": "\u795E\u5668",
  "Thường": "\u666E\u901A",
  "Tinh xảo": "\u7CBE\u826F",
  "Hiếm": "\u7A00\u6709",
  "Xuất sắc": "\u5353\u8D8A",
  "Truyền thuyết": "\u4F20\u8BF4",
  "Sử thi": "\u53F2\u8BD7",
  "Thần thoại": "\u795E\u8BDD",
  "Cơ bản": "\u57FA\u7840",
  "Chuyển chức": "\u8F6C\u804C",
  "Nâng cao": "\u8FDB\u9636",
  "Tuyệt sát": "\u5FC5\u6740",
  "Áo nghĩa": "\u5965\u4E49",
  "Thức tỉnh I": "\u89C9\u9192\u4E00",
  "Thức tỉnh II": "\u89C9\u9192\u4E8C",
  "Thức tỉnh III": "\u89C9\u9192\u4E09",
  "Học việc": "\u5B66\u5F92",
  "Thành thạo": "\u719F\u624B",
  "Chuyên gia": "\u4E13\u5BB6",
  "Đại sư": "\u5927\u5E08",
  "Huyền thoại": "\u4F20\u5947",
  "Chủ động": "\u4E3B\u52A8",
  "Triệu hồi": "\u53EC\u5524",
  "Đặc biệt": "\u7279\u6B8A",
  "Đặc biệt nghề nghiệp": "\u804C\u4E1A\u7279\u6B8A",
  "Không": "\u65E0",
  "Vĩnh viễn": "\u6C38\u4E45",
  "Đang tiến hành": "\u8FDB\u884C\u4E2D",
  "Đã hoàn thành": "\u5DF2\u5B8C\u6210",
  "Sáng sớm": "\u6E05\u6668",
  "Buổi sáng": "\u4E0A\u5348",
  "Buổi trưa": "\u4E2D\u5348",
  "Buổi chiều": "\u4E0B\u5348",
  "Chạng vạng": "\u508D\u665A",
  "Vào đêm": "\u5165\u591C",
  "Đêm khuya": "\u6DF1\u591C",
  "Rạng sáng": "\u51CC\u6668",
  "Bình minh": "\u9ECE\u660E",
  "Dễ": "\u7B80\u5355",
  "Khó": "\u56F0\u96BE",
  "Vương giả": "\u738B\u8005",
  "Ác mộng": "\u5669\u68A6",
  "Tùy chỉnh": "\u81EA\u5B9A\u4E49",
  "Vũ khí": "\u6B66\u5668",
  "Giáp": "\u9632\u5177",
  "Trang sức": "\u9996\u9970",
  "Tay chính": "\u4E3B\u624B",
  "Tay phụ": "\u526F\u624B",
  "Giáp vai": "\u62A4\u80A9",
  "Áo": "\u4E0A\u8863",
  "Đai lưng": "\u8170\u5E26",
  "Quần": "\u4E0B\u88C5",
  "Giày": "\u978B\u5B50",
  "Nhẫn": "\u6212\u6307",
  "Vòng tay": "\u624B\u956F",
  "Dây chuyền": "\u9879\u94FE",
  "Đã trang bị": "\u5DF2\u88C5\u5907",
  "Chưa trang bị": "\u672A\u88C5\u5907",
  "Vật phẩm tiêu hao": "\u6D88\u8017\u54C1",
  "Nguyên liệu": "\u6750\u6599",
  "Tạp vật": "\u6742\u7269",
  "Vật phẩm nhiệm vụ": "\u4EFB\u52A1\u7269\u54C1",
  "Vật phẩm duy nhất": "\u552F\u4E00\u7269\u54C1",
  "Đang ủ mầm": "\u915D\u917F\u4E2D",
  "Lời rượu": "\u9152\u8BDD",
  "Đáng ngờ": "\u53EF\u7591",
  "Có lẽ đáng tin": "\u6216\u8BB8\u53EF\u4FE1",
  "Lính tạp": "\u6742\u5175",
  "Tinh nhuệ": "\u7CBE\u9510",
  "Thủ lĩnh": "\u9996\u9886",
  "Lãnh chúa": "\u9886\u4E3B",
  "Thần Linh Chủng": "\u795E\u7075\u79CD",
  "Huyễn Tưởng Chủng": "\u5E7B\u60F3\u79CD",
  "Tinh Linh Chủng": "\u7CBE\u7075\u79CD",
  "Long Tinh Chủng": "\u9F99\u7CBE\u79CD",
  "Cự Nhân Chủng": "\u5DE8\u4EBA\u79CD",
  "Thiên Dực Chủng": "\u5929\u7FFC\u79CD",
  "Sâm Tinh Chủng": "\u68EE\u7CBE\u79CD",
  "Yêu Ma Chủng": "\u5996\u9B54\u79CD",
  "Yêu Tinh Chủng": "\u5996\u7CBE\u79CD",
  "Cơ Khải Chủng": "\u673A\u51EF\u79CD",
  "Địa Tinh Chủng": "\u5730\u7CBE\u79CD",
  "Hấp Huyết Chủng": "\u5438\u8840\u79CD",
  "Nguyệt Vịnh Chủng": "\u6708\u548F\u79CD",
  "Thú Nhân Chủng": "\u517D\u4EBA\u79CD",
  "Hải Tê Chủng": "\u6D77\u6816\u79CD",
  "Nhân Loại Chủng": "\u4EBA\u7C7B\u79CD",
  "Tuế Viễn": "\u5C81\u8FDC",
  "Hoang": "\u8352",
  "Trác Chiếu": "\u5353\u7167",
  "Phan Nam Quân": "\u6F58\u5357\u541B",
  "Bách Lý Uyên": "\u767E\u91CC\u6E0A",
  "Vạn Nghiệp Thi Tiên": "\u4E07\u4E1A\u5C38\u4ED9",
  "Hành lang Sáng thế": "\u521B\u4E16\u56DE\u5ECA",
  "Hành Lang Sáng Thế": "\u521B\u4E16\u56DE\u5ECA",
  "Sword Art Online": "\u5200\u5251\u795E\u57DF",
  "Hổ Phách Chi Kiếm": "\u7425\u73C0\u4E4B\u5251",
  "Đại Minh Chí Dị": "\u5927\u660E\u5FD7\u5F02",
  "Đồ Long Và Đô Thị Thường Nhật": "\u5C60\u9F99\u4E0E\u90FD\u5E02\u65E5\u5E38",
  "Giáng lâm toàn thể": "\u5B8C\u6574\u4F53\u964D\u4E34",
  "Giáng lâm chưa hoàn chỉnh": "\u4E0D\u5B8C\u6574\u4F53\u964D\u4E34"
};
    const CALC_ZH_TO_VI_VALUE_MAP = {
  "\u662F": "Có",
  "\u795E\u5668": "Thần khí",
  "\u666E\u901A": "Thường",
  "\u7CBE\u826F": "Tinh xảo",
  "\u7A00\u6709": "Hiếm",
  "\u5353\u8D8A": "Xuất sắc",
  "\u4F20\u8BF4": "Truyền thuyết",
  "\u53F2\u8BD7": "Sử thi",
  "\u795E\u8BDD": "Thần thoại",
  "\u57FA\u7840": "Cơ bản",
  "\u8F6C\u804C": "Chuyển chức",
  "\u8FDB\u9636": "Nâng cao",
  "\u5FC5\u6740": "Tuyệt sát",
  "\u5965\u4E49": "Áo nghĩa",
  "\u89C9\u9192\u4E00": "Thức tỉnh I",
  "\u89C9\u9192\u4E8C": "Thức tỉnh II",
  "\u89C9\u9192\u4E09": "Thức tỉnh III",
  "\u5B66\u5F92": "Học việc",
  "\u719F\u624B": "Thành thạo",
  "\u4E13\u5BB6": "Chuyên gia",
  "\u5927\u5E08": "Đại sư",
  "\u4F20\u5947": "Huyền thoại",
  "\u4E3B\u52A8": "Chủ động",
  "\u53EC\u5524": "Triệu hồi",
  "\u7279\u6B8A": "Đặc biệt",
  "\u804C\u4E1A\u7279\u6B8A": "Đặc biệt nghề nghiệp",
  "\u65E0": "Không",
  "\u6C38\u4E45": "Vĩnh viễn",
  "\u8FDB\u884C\u4E2D": "Đang tiến hành",
  "\u5DF2\u5B8C\u6210": "Đã hoàn thành",
  "\u6E05\u6668": "Sáng sớm",
  "\u4E0A\u5348": "Buổi sáng",
  "\u4E2D\u5348": "Buổi trưa",
  "\u4E0B\u5348": "Buổi chiều",
  "\u508D\u665A": "Chạng vạng",
  "\u5165\u591C": "Vào đêm",
  "\u6DF1\u591C": "Đêm khuya",
  "\u51CC\u6668": "Rạng sáng",
  "\u9ECE\u660E": "Bình minh",
  "\u7B80\u5355": "Dễ",
  "\u56F0\u96BE": "Khó",
  "\u738B\u8005": "Vương giả",
  "\u5669\u68A6": "Ác mộng",
  "\u81EA\u5B9A\u4E49": "Tùy chỉnh",
  "\u6B66\u5668": "Vũ khí",
  "\u9632\u5177": "Giáp",
  "\u9996\u9970": "Trang sức",
  "\u4E3B\u624B": "Tay chính",
  "\u526F\u624B": "Tay phụ",
  "\u62A4\u80A9": "Giáp vai",
  "\u4E0A\u8863": "Áo",
  "\u8170\u5E26": "Đai lưng",
  "\u4E0B\u88C5": "Quần",
  "\u978B\u5B50": "Giày",
  "\u6212\u6307": "Nhẫn",
  "\u624B\u956F": "Vòng tay",
  "\u9879\u94FE": "Dây chuyền",
  "\u5DF2\u88C5\u5907": "Đã trang bị",
  "\u672A\u88C5\u5907": "Chưa trang bị",
  "\u6D88\u8017\u54C1": "Vật phẩm tiêu hao",
  "\u6750\u6599": "Nguyên liệu",
  "\u6742\u7269": "Tạp vật",
  "\u4EFB\u52A1\u7269\u54C1": "Vật phẩm nhiệm vụ",
  "\u552F\u4E00\u7269\u54C1": "Vật phẩm duy nhất",
  "\u915D\u917F\u4E2D": "Đang ủ mầm",
  "\u9152\u8BDD": "Lời rượu",
  "\u53EF\u7591": "Đáng ngờ",
  "\u6216\u8BB8\u53EF\u4FE1": "Có lẽ đáng tin",
  "\u6742\u5175": "Lính tạp",
  "\u7CBE\u9510": "Tinh nhuệ",
  "\u9996\u9886": "Thủ lĩnh",
  "\u9886\u4E3B": "Lãnh chúa",
  "\u795E\u7075\u79CD": "Thần Linh Chủng",
  "\u5E7B\u60F3\u79CD": "Huyễn Tưởng Chủng",
  "\u7CBE\u7075\u79CD": "Tinh Linh Chủng",
  "\u9F99\u7CBE\u79CD": "Long Tinh Chủng",
  "\u5DE8\u4EBA\u79CD": "Cự Nhân Chủng",
  "\u5929\u7FFC\u79CD": "Thiên Dực Chủng",
  "\u68EE\u7CBE\u79CD": "Sâm Tinh Chủng",
  "\u5996\u9B54\u79CD": "Yêu Ma Chủng",
  "\u5996\u7CBE\u79CD": "Yêu Tinh Chủng",
  "\u673A\u51EF\u79CD": "Cơ Khải Chủng",
  "\u5730\u7CBE\u79CD": "Địa Tinh Chủng",
  "\u5438\u8840\u79CD": "Hấp Huyết Chủng",
  "\u6708\u548F\u79CD": "Nguyệt Vịnh Chủng",
  "\u517D\u4EBA\u79CD": "Thú Nhân Chủng",
  "\u6D77\u6816\u79CD": "Hải Tê Chủng",
  "\u4EBA\u7C7B\u79CD": "Nhân Loại Chủng",
  "\u5C81\u8FDC": "Tuế Viễn",
  "\u8352": "Hoang",
  "\u5353\u7167": "Trác Chiếu",
  "\u6F58\u5357\u541B": "Phan Nam Quân",
  "\u767E\u91CC\u6E0A": "Bách Lý Uyên",
  "\u4E07\u4E1A\u5C38\u4ED9": "Vạn Nghiệp Thi Tiên",
  "\u521B\u4E16\u56DE\u5ECA": "Hành lang Sáng thế",
  "\u521B\u4E16\u56DE\u5ECA5.0\u5148\u884C\u7248": "Hành lang Sáng thế",
  "\u5200\u5251\u795E\u57DF": "Sword Art Online",
  "\u7425\u73C0\u4E4B\u5251": "Hổ Phách Chi Kiếm",
  "\u5927\u660E\u5FD7\u5F02": "Đại Minh Chí Dị",
  "\u5C60\u9F99\u4E0E\u90FD\u5E02\u65E5\u5E38": "Đồ Long Và Đô Thị Thường Nhật",
  "\u5B8C\u6574\u4F53\u964D\u4E34": "Giáng lâm toàn thể",
  "\u4E0D\u5B8C\u6574\u4F53\u964D\u4E34": "Giáng lâm chưa hoàn chỉnh"
};
    const CALC_RUNTIME_TRANSLATIONS = [
  [
    "[\u54C1\u8D28\u8FC1\u79FB]",
    "[Di chuyển phẩm chất]"
  ],
  [
    "[\u80CC\u5305\u8D27\u5E01\u8FC1\u79FB]",
    "[Di chuyển tiền túi]"
  ],
  [
    "[\u53D8\u91CF\u5B88\u536B]",
    "[Bộ giám sát biến]"
  ],
  [
    "[\u526F\u624B\u5408\u5E76]",
    "[Gộp tay phụ]"
  ],
  [
    "[\u52A8\u4F5C\u8D44\u6E90]",
    "[Tài nguyên hành động]"
  ],
  [
    "[AC\u8BA1\u7B97]",
    "[Tính AC]"
  ],
  [
    "[\u6218\u6597\u8BA1\u7B97]",
    "[Tính chiến đấu]"
  ],
  [
    "[HP\u8BA1\u7B97]",
    "[Tính HP]"
  ],
  [
    "[\u54C1\u7EA7\u8C03\u8BD5]",
    "[Gỡ lỗi cấp phẩm]"
  ],
  [
    "[\u54C1\u7EA7\u4FEE\u6B63]",
    "[Hiệu chỉnh cấp phẩm]"
  ],
  [
    "[\u88C5\u5907\u8BA1\u7B97]",
    "[Tính trang bị]"
  ],
  [
    "[\u7ECF\u9A8C\u5206\u53D1]",
    "[Phân phát kinh nghiệm]"
  ],
  [
    "[\u7ECF\u9A8C\u8F85\u52A9]",
    "[Trợ lý kinh nghiệm]"
  ],
  [
    "[\u7EEF·\u7B49\u7EA7\u540C\u6B65]",
    "[Phi · đồng bộ cấp độ]"
  ],
  [
    "[\u7EEF·\u6210\u957F]",
    "[Phi · tăng trưởng]"
  ],
  [
    "[\u719F\u7EC3\u5EA6\u5B88\u536B]",
    "[Bộ giám sát độ thuần thục]"
  ],
  [
    "[\u719F\u7EC3\u5EA6\u6CE8\u518C]",
    "[Đăng ký độ thuần thục]"
  ],
  [
    "[\u719F\u7EC3\u5EA6\u8FDB\u9636]",
    "[Tiến bậc độ thuần thục]"
  ],
  [
    "[\u672B\u65E5\u65F6\u949F]",
    "[Đồng hồ tận thế]"
  ],
  [
    "[\u60CA\u609A\u4E50\u56ED\u5267\u672C]",
    "[Kịch bản Kinh Tủng Lạc Viên]"
  ],
  [
    "[\u60CA\u609A\u4E50\u56ED\u9632\u91CD]",
    "[Chống trùng Kinh Tủng Lạc Viên]"
  ],
  [
    "[\u8F85\u52A9\u811A\u672C]",
    "[Script phụ trợ]"
  ],
  [
    "[\u7EC4\u5408\u5207\u6362]",
    "[Chuyển đổi tổ hợp]"
  ],
  [
    "[\u4E34\u65F6HP]",
    "[HP tạm thời]"
  ],
  [
    "[\u51B7\u5374\u7CFB\u7EDF]",
    "[Hệ thống hồi chiêu]"
  ],
  [
    "[\u8F85\u52A9\u8BA1\u7B97\u811A\u672C]",
    "[Script phụ trợ tính toán]"
  ],
  [
    "\u9632\u91CD\u5165\u62E6\u622A，\u8DF3\u8FC7\u672C\u6B21\u5904\u7406",
    "chặn tái nhập, bỏ qua lần xử lý này"
  ],
  [
    "MVU \u53D8\u91CF\u8FDE\u63A5\u6210\u529F",
    "kết nối biến MVU thành công"
  ],
  [
    "\u811A\u672C\u5DF2\u52A0\u8F7D",
    "script đã tải"
  ],
  [
    "\u8BFB\u53D6\u4E16\u754C\u4E66\u5931\u8D25：",
    "Đọc sổ thế giới thất bại: "
  ],
  [
    "\u83B7\u53D6\u89D2\u8272\u5361\u4E16\u754C\u4E66\u5931\u8D25：",
    "Lấy sổ thế giới của thẻ nhân vật thất bại: "
  ],
  [
    "\u4E16\u754C\u4E66 API \u4E0D\u53EF\u7528，\u8DF3\u8FC7",
    "API sổ thế giới không khả dụng, bỏ qua"
  ],
  [
    "\u5DF2\u521B\u5EFA“\u968F\u673A\u526F\u672C\u5185\u5BB9”\u6761\u76EE\u5E76\u5199\u5165\u5267\u672C",
    "Đã tạo mục “Nội dung phụ bản ngẫu nhiên” và ghi vào kịch bản"
  ],
  [
    "\u5DF2\u66F4\u65B0“\u968F\u673A\u526F\u672C\u5185\u5BB9”\u6761\u76EE：",
    "Đã cập nhật mục “Nội dung phụ bản ngẫu nhiên”: "
  ],
  [
    "\u672A\u627E\u5230\u53EF\u5199\u5165\u7684\u4E16\u754C\u4E66，\u8DF3\u8FC7",
    "Không tìm thấy sổ thế giới có thể ghi, bỏ qua"
  ],
  [
    "\u5199\u5165\u4E16\u754C\u4E66\u5F02\u5E38：",
    "Ghi sổ thế giới gặp lỗi: "
  ],
  [
    "\u68C0\u6D4B\u5230\u591A\u4E2A\u8FDB\u884C\u4E2D\u526F\u672C，\u5DF2\u81EA\u52A8\u5C06",
    "phát hiện nhiều phụ bản đang tiến hành, đã tự động kết toán"
  ],
  [
    "\u7ED3\u6E05\u4E3A",
    "thành"
  ],
  [
    "\u4FDD\u7559\u5F53\u524D\u526F\u672C",
    "giữ phụ bản hiện tại"
  ],
  [
    "\u6355\u83B7\u6682\u5B58\u526F\u672C\u5267\u672C（\u957F\u5EA6=",
    "bắt được kịch bản phụ bản tạm lưu (độ dài="
  ],
  [
    "\u5DF2\u4ECE\u53D8\u91CF\u5265\u79BB",
    "đã bóc khỏi biến"
  ],
  [
    "\u5DF2\u5C06",
    "đã chuyển"
  ],
  [
    "\u68C0\u6D4B\u5230",
    "phát hiện"
  ],
  [
    "\u81EA\u52A8\u66F4\u65B0\u4E3A",
    "tự động cập nhật thành"
  ],
  [
    "\u5DF2\u8FC1\u79FB\u4E3A",
    "đã di chuyển thành"
  ],
  [
    "\u65E7\u5B57\u6BB5",
    "trường cũ"
  ],
  [
    "\u65B0\u589E\u88C5\u5907",
    "trang bị mới"
  ],
  [
    "\u672A\u547D\u4E2D\u89C4\u5219",
    "không khớp quy tắc"
  ],
  [
    "\u6309\u666E\u901A\u5904\u7406",
    "xử lý như Thường"
  ],
  [
    "\u516D\u7EF4\u70B9\u6570\u4E0A\u9650",
    "giới hạn điểm sáu thuộc tính"
  ],
  [
    "\u5355\u4E00\u516D\u7EF4\u4E0A\u9650",
    "giới hạn một thuộc tính"
  ],
  [
    "\u516D\u7EF4\u70B9\u6570\u4E0D\u8DB3，\u5DF2\u8865\u8DB3",
    "điểm sáu thuộc tính thiếu, đã bù đủ"
  ],
  [
    "\u516D\u7EF4\u5C5E\u6027\u5DF2\u4FEE\u590D",
    "sáu thuộc tính đã sửa"
  ],
  [
    "\u66B4\u51FB\u4F24\u5BB3\u8D85\u51FA\u54C1\u8D28\u4E0A\u9650，\u5DF2\u4FEE\u6B63",
    "sát thương chí mạng vượt giới hạn phẩm chất, đã sửa"
  ],
  [
    "\u9632\u5177\u4E0D\u5141\u8BB8\u66B4\u51FB\u4F24\u5BB3，\u5DF2\u8F6C\u4E3A\u6280\u80FD\u7B49\u7EA7",
    "giáp không cho phép sát thương chí mạng, đã chuyển thành cấp kỹ năng"
  ],
  [
    "\u5F53\u524D\u7C7B\u578B/\u54C1\u8D28\u65E0\u53EF\u7528\u6280\u80FD\u7B49\u7EA7\u66FF\u6362，\u66B4\u51FB\u4F24\u5BB3\u5DF2\u79FB\u9664",
    "loại/phẩm chất hiện tại không có cấp kỹ năng thay thế, đã gỡ sát thương chí mạng"
  ],
  [
    "\u4FEE\u6B63\u5C5E\u6027\u522B\u540D",
    "sửa bí danh thuộc tính"
  ],
  [
    "\u54C1\u7EA7\u7F3A\u5931\u6216\u4E3A0",
    "thiếu cấp phẩm hoặc bằng 0"
  ],
  [
    "\u751F\u6210\u968F\u673A\u54C1\u7EA7",
    "sinh cấp phẩm ngẫu nhiên"
  ],
  [
    "\u54C1\u7EA7\u8FC7\u4F4E",
    "cấp phẩm quá thấp"
  ],
  [
    "\u54C1\u7EA7\u8FC7\u9AD8",
    "cấp phẩm quá cao"
  ],
  [
    "\u5DF2\u4FEE\u6B63\u4E3A",
    "đã sửa thành"
  ],
  [
    "\u603B\u8FDB\u5EA6\u5012\u9000",
    "tổng tiến độ bị lùi"
  ],
  [
    "\u5DF2\u6309\u65E7\u8FDB\u5EA6\u4FEE\u6B63",
    "đã sửa theo tiến độ cũ"
  ],
  [
    "\u6570\u636E\u5DF2\u6821\u6B63",
    "dữ liệu đã hiệu chỉnh"
  ],
  [
    "\u5E74\u5386\u65E0\u6CD5\u89E3\u6790",
    "không phân tích được niên lịch"
  ],
  [
    "\u8DF3\u8FC7",
    "bỏ qua"
  ],
  [
    "\u6218\u6597\u7ED3\u675F，\u4E34\u65F6\u751F\u547D\u503C\u5DF2\u6E05\u96F6",
    "chiến đấu kết thúc, sinh lực tạm thời đã về 0"
  ],
  [
    "\u83B7\u5F97\u7ECF\u9A8C",
    "nhận kinh nghiệm"
  ],
  [
    "\u4E3B\u89D2\u7ECF\u9A8C\u53D8\u5316",
    "kinh nghiệm nhân vật chính thay đổi"
  ],
  [
    "\u4E0B\u6B21\u9608\u503C",
    "ngưỡng kế tiếp"
  ],
  [
    "\u5F53\u524D",
    "hiện tại"
  ],
  [
    "\u88C5\u5907",
    "trang bị"
  ],
  [
    "\u54C1\u8D28",
    "phẩm chất"
  ],
  [
    "\u54C1\u7EA7",
    "cấp phẩm"
  ],
  [
    "\u91D1\u5E01",
    "Tiền vàng"
  ],
  [
    "\u901A\u7528\u5E01",
    "Tiền chung"
  ],
  [
    "\u4F24\u5BB3\u500D\u7387",
    "bội suất sát thương"
  ],
  [
    "\u66B4\u51FB\u4F24\u5BB3",
    "sát thương chí mạng"
  ],
  [
    "\u8FDB\u884C\u4E2D",
    "Đang tiến hành"
  ],
  [
    "\u5DF2\u5B8C\u6210",
    "Đã hoàn thành"
  ],
  [
    "\u5B8C\u6574\u4F53\u964D\u4E34",
    "Giáng lâm toàn thể"
  ],
  [
    "\u4E0D\u5B8C\u6574\u4F53\u964D\u4E34",
    "Giáng lâm chưa hoàn chỉnh"
  ],
  [
    "\u915D\u917F\u4E2D",
    "Đang ủ mầm"
  ]
];

    function translateCalcRuntimeText(value) {
        if (typeof value !== 'string') return value;
        let out = value;
        for (const [from, to] of CALC_RUNTIME_TRANSLATIONS) {
            if (out.includes(from)) out = out.split(from).join(to);
        }
        for (const [from, to] of Object.entries(CALC_ZH_TO_VI_KEY_MAP)) {
            if (out.includes(from)) out = out.split(from).join(to);
        }
        for (const [from, to] of Object.entries(CALC_ZH_TO_VI_VALUE_MAP)) {
            if (out.includes(from)) out = out.split(from).join(to);
        }
        return out;
    }

    const __calcConsoleLog = console.log.bind(console);
    const __calcConsoleWarn = console.warn.bind(console);
    const __calcConsoleError = console.error.bind(console);

    function logCalc(...args) {
        __calcConsoleLog(...args.map(translateCalcRuntimeText));
    }

    function warnCalc(...args) {
        __calcConsoleWarn(...args.map(translateCalcRuntimeText));
    }

    function errorCalc(...args) {
        __calcConsoleError(...args.map(translateCalcRuntimeText));
    }

    function remapCalculatorData(root, keyMap, valueMap) {
        const seen = new WeakSet();
        const visit = (node) => {
            if (node === null || node === undefined) return node;
            if (typeof node === 'string') {
                return Object.prototype.hasOwnProperty.call(valueMap, node) ? valueMap[node] : node;
            }
            if (typeof node !== 'object') return node;
            if (seen.has(node)) return node;
            seen.add(node);
            if (Array.isArray(node)) {
                for (let i = 0; i < node.length; i++) node[i] = visit(node[i]);
                return node;
            }
            const entries = Object.entries(node);
            for (const [rawKey, rawVal] of entries) {
                const nextKey = Object.prototype.hasOwnProperty.call(keyMap, rawKey) ? keyMap[rawKey] : rawKey;
                const nextVal = visit(rawVal);
                if (nextKey !== rawKey) delete node[rawKey];
                node[nextKey] = nextVal;
            }
            return node;
        };
        return visit(root);
    }

    function prepareCalculatorRuntimeData(root) {
        return remapCalculatorData(root, CALC_VI_TO_ZH_KEY_MAP, CALC_VI_TO_ZH_VALUE_MAP);
    }

    function restoreCalculatorRuntimeData(root) {
        return remapCalculatorData(root, CALC_ZH_TO_VI_KEY_MAP, CALC_ZH_TO_VI_VALUE_MAP);
    }

    function normalizeLegacyQualityNames(root) {
        if (!root || typeof root !== 'object') return 0;

        const seen = new WeakSet();
        let migratedCount = 0;
        const visit = (value) => {
            if (!value || typeof value !== 'object' || seen.has(value)) return;
            seen.add(value);

            if (Array.isArray(value)) {
                value.forEach(visit);
                return;
            }

            Object.entries(value).forEach(([key, child]) => {
                if (key === '\u54C1\u8D28' && child === '\u795E\u5668') {
                    value[key] = normalizeQualityName(child);
                    migratedCount++;
                    return;
                }
                visit(child);
            });
        };

        visit(root);
        if (migratedCount > 0) {
            logCalc(`[Chuyển dữ liệu phẩm chất] Đã tự động cập nhật ${migratedCount} phẩm chất “Thần khí” cũ thành “Xuất sắc”`);
        }
        return migratedCount;
    }

    function migrateBagCurrency(statData) {
        const bag = statData?.\u4EBA\u7269?.\u80CC\u5305;
        if (!bag || typeof bag !== 'object' || Array.isArray(bag)) return false;
        if (!Object.prototype.hasOwnProperty.call(bag, '\u91D1\u5E01')) return false;

        const legacyGold = Math.max(0, Math.floor(safeParseFloat(bag.\u91D1\u5E01, 0)));
        const currentUniversalCurrency = Math.max(0, Math.floor(safeParseFloat(bag.\u901A\u7528\u5E01, 0)));
        const hasUniversalCurrency = Object.prototype.hasOwnProperty.call(bag, '\u901A\u7528\u5E01');

        // 若新旧字段同时存在，按合并处理，避免改名过渡期丢失货币。
        const nextUniversalCurrency = hasUniversalCurrency
            ? currentUniversalCurrency + legacyGold
            : legacyGold;

        bag.\u901A\u7528\u5E01 = nextUniversalCurrency;
        delete bag.\u91D1\u5E01;

        logCalc(
            `[Chuyển dữ liệu tiền trong túi] Phát hiện trường cũ "Tiền vàng", đã gộp sang "Tiền chung": ${currentUniversalCurrency} + ${legacyGold} => ${nextUniversalCurrency}`
        );
        return true;
    }

    function getLevelBaseTotalExp(level) {
        const lv = Math.max(1, safeParseInt(level, 1));
        return calculateDiabloThreshold(lv);
    }

    function isBondShareExpEnabled(bond) {
        if (!bond || typeof bond !== 'object') return false;
        const shareExp = bond.\u5206\u4EAB\u7ECF\u9A8C;
        return shareExp !== false &&
            shareExp !== '\u5426' &&
            shareExp !== 'false' &&
            shareExp !== 0 &&
            shareExp !== '0';
    }

    /**
     * 判断两个值是否有差异（用于变更检测）
     * 对对象做 JSON 序列化比较，对基本类型直接 ===
     */
    function hasChanged(oldVal, newVal) {
        if (oldVal === newVal) return false;
        if (typeof oldVal === 'object' && typeof newVal === 'object') {
            return JSON.stringify(oldVal) !== JSON.stringify(newVal);
        }
        return true;
    }

    // 仅对装备「六维属性」做规则校验（参照《装备与物品生成规则》）
    const CORE_ATTR_KEYS = ['\u529B\u91CF', '\u654F\u6377', '\u4F53\u8D28', '\u667A\u529B', '\u611F\u77E5', '\u9B45\u529B'];
    const CORE_ATTR_KEY_SET = new Set(CORE_ATTR_KEYS);
    const CORE_ATTR_ALIAS = {
        '\u4F53\u529B': '\u4F53\u8D28',
    };
    const QUALITY_CORE_ATTR_RULES = {
        '\u666E\u901A': { total: 0, single: 0 },
        '\u7CBE\u826F': { total: 1, single: 1 },
        '\u7A00\u6709': { total: 1, single: 1 },
        '\u5353\u8D8A': { total: 2, single: 1 },
        '\u4F20\u8BF4': { total: 2, single: 2 },
        '\u53F2\u8BD7': { total: 3, single: 2 },
        '\u795E\u8BDD': { total: 4, single: 3 }
    };
    const QUALITY_CRIT_DAMAGE_LIMITS = {
        '\u666E\u901A': 0.10,
        '\u7CBE\u826F': 0.15,
        '\u7A00\u6709': 0.30,
        '\u5353\u8D8A': 0.50,
        '\u4F20\u8BF4': 0.80,
        '\u53F2\u8BD7': 1.00,
        '\u795E\u8BDD': 1.50
    };
    const QUALITY_ARMOR_CRIT_TO_SKILL_RULES = {
        '\u7A00\u6709': { pick: ['\u57FA\u7840', '\u8FDB\u9636', '\u5FC5\u6740'], count: 1, value: 1 },
        '\u5353\u8D8A': { pick: ['\u57FA\u7840', '\u8F6C\u804C', '\u8FDB\u9636', '\u5FC5\u6740', '\u5965\u4E49'], count: 1, value: 1 },
        '\u4F20\u8BF4': { pick: ['\u57FA\u7840', '\u8F6C\u804C', '\u8FDB\u9636', '\u5FC5\u6740', '\u5965\u4E49'], count: 2, value: 1 },
        '\u53F2\u8BD7': { fixed: { '\u5168\u6280\u80FD': 2 } },
        '\u795E\u8BDD': { fixed: { '\u5168\u6280\u80FD': 2, '\u89C9\u9192\u4E09': 1 } }
    };
    const CRIT_TO_SKILL_FALLBACK_TIERS = ['\u57FA\u7840', '\u8F6C\u804C', '\u8FDB\u9636', '\u5FC5\u6740', '\u5965\u4E49'];
    const SPECIAL_EQUIP_SLOT = '\u7279\u6B8A\u88C5\u5907';
    const STANDARD_EQUIP_SLOTS = new Set(['\u4E3B\u624B', '\u526F\u624B', '\u62A4\u80A9', '\u4E0A\u8863', '\u8170\u5E26', '\u4E0B\u88C5', '\u978B\u5B50', '\u9879\u94FE', '\u624B\u956F', '\u6212\u6307']);
    const TITAN_GRIP_TRAIT_NAME = '\u6CF0\u5766\u4E4B\u63E1';
    const DUAL_ARMAMENT_TRAIT_NAME = '\u53CC\u6781\u6B66\u88C5';

    function getEquipStoredSlot(equipData) {
        return String(equipData?.\u90E8\u4F4D || '').trim();
    }

    function getEquipOriginSlot(equipData) {
        return String(equipData?.\u539F\u59CB\u90E8\u4F4D || equipData?.\u90E8\u4F4D || '').trim();
    }

    function getEquipType(equipData) {
        return String(equipData?.\u7C7B\u578B || '').trim();
    }

    function isStandardEquipSlot(slotName) {
        return STANDARD_EQUIP_SLOTS.has(String(slotName || '').trim());
    }

    function shouldUseSpecialEquipSlot(equipData) {
        const storedSlot = getEquipStoredSlot(equipData);
        if (isStandardEquipSlot(storedSlot)) return false;
        const originSlot = getEquipOriginSlot(equipData);
        return !!originSlot && !isStandardEquipSlot(originSlot);
    }

    function resolveEquipTargetSlot(equipData) {
        return shouldUseSpecialEquipSlot(equipData) ? SPECIAL_EQUIP_SLOT : getEquipStoredSlot(equipData);
    }

    function isSpecialEquippedItem(equipData) {
        return !!equipData && !equipData.\u88C5\u5907\u7BB1 && resolveEquipTargetSlot(equipData) === SPECIAL_EQUIP_SLOT;
    }

    function isShieldLikeEquip(equipData) {
        const equipType = getEquipType(equipData);
        const storedSlot = getEquipStoredSlot(equipData);
        const originSlot = getEquipOriginSlot(equipData);
        return equipType === '\u76FE\u724C' || storedSlot === '\u76FE\u724C' || originSlot === '\u76FE\u724C';
    }

    function getTraitNameSet(player) {
        return new Set(Object.keys(player?.\u7279\u8D28 || {}).map(name => String(name || '').trim()));
    }

    function getOffhandRuleState(player) {
        const traitSet = getTraitNameSet(player);
        const hasTitanGrip = String(player?.\u79CD\u65CF || '').trim() === '\u5DE8\u4EBA\u79CD' || traitSet.has(TITAN_GRIP_TRAIT_NAME);
        const hasDualArmament = traitSet.has(DUAL_ARMAMENT_TRAIT_NAME);
        return {
            hasTitanGrip,
            hasDualArmament,
            canUseOffhandWeapon: hasTitanGrip || hasDualArmament,
            canUseOffhandShield: hasDualArmament,
            hasSynergy: hasTitanGrip && hasDualArmament
        };
    }

    function normalizeCoreAttrKey(rawKey) {
        if (typeof rawKey !== 'string') return '';
        const key = rawKey.trim();
        return CORE_ATTR_ALIAS[key] || key;
    }

    function stableHash(text) {
        const seedText = String(text || '');
        let seed = 0;
        for (let i = 0; i < seedText.length; i++) {
            seed = (seed * 31 + seedText.charCodeAt(i)) >>> 0;
        }
        return seed;
    }

    function stableRandomDecimal(seedText, max, decimals = 2) {
        const cap = Math.max(0, safeParseFloat(max, 0));
        if (cap <= 0) return 0;
        const fraction = (stableHash(seedText) % 1000000) / 999999;
        const factor = Math.pow(10, decimals);
        return Math.round(fraction * cap * factor) / factor;
    }

    function stablePickList(options, count, seedText) {
        if (!Array.isArray(options) || options.length === 0 || count <= 0) return [];
        const start = stableHash(seedText) % options.length;
        const out = [];
        for (let i = 0; i < options.length && out.length < count; i++) {
            out.push(options[(start + i) % options.length]);
        }
        return out;
    }

    function sanitizeNewEquipCoreAttrBonuses(equipKey, equipVal) {
        if (!equipVal || typeof equipVal !== 'object') return;
        const bonuses = equipVal.\u5C5E\u6027\u52A0\u6210;
        if (!bonuses || typeof bonuses !== 'object' || Array.isArray(bonuses)) return;

        const quality = normalizeQualityName((typeof equipVal.\u54C1\u8D28 === 'string' && equipVal.\u54C1\u8D28.trim()) ? equipVal.\u54C1\u8D28.trim() : '\u666E\u901A');
        const hasKnownQuality = Object.prototype.hasOwnProperty.call(QUALITY_CORE_ATTR_RULES, quality);
        const qualityRule = hasKnownQuality ? QUALITY_CORE_ATTR_RULES[quality] : QUALITY_CORE_ATTR_RULES['\u666E\u901A'];
        const totalLimit = safeParseInt(qualityRule.total, 0);
        const singleLimit = safeParseInt(qualityRule.single, 0);

        const otherEntries = [];
        const coreOrder = [];
        const coreAccum = {};
        const aliasFixes = [];

        Object.entries(bonuses).forEach(([rawKey, rawVal]) => {
            const fixedKey = normalizeCoreAttrKey(rawKey);
            if (!CORE_ATTR_KEY_SET.has(fixedKey)) {
                otherEntries.push([rawKey, rawVal]);
                return;
            }

            if (fixedKey !== rawKey) {
                aliasFixes.push(`${rawKey}→${fixedKey}`);
            }

            // 六维加成按整数处理，负数和无效值清理为 0
            const parsed = safeParseFloat(rawVal, 0);
            const positiveInt = Math.max(0, Math.floor(parsed));
            if (positiveInt <= 0) return;

            if (!Object.prototype.hasOwnProperty.call(coreAccum, fixedKey)) {
                coreAccum[fixedKey] = 0;
                coreOrder.push(fixedKey);
            }
            coreAccum[fixedKey] += positiveInt;
        });

        // 先执行单一六维上限，再执行六维总点数上限
        const singleCapped = [];
        const cappedEntries = coreOrder.map(key => {
            const raw = safeParseInt(coreAccum[key], 0);
            const capped = clamp(raw, 0, singleLimit);
            if (capped < raw) {
                singleCapped.push(`${key}:${raw}→${capped}`);
            }
            return { key, value: capped };
        }).filter(entry => entry.value > 0);

        // 严格限制六维总和不超过品质点数，按出现顺序保留
        let remain = totalLimit;
        const limitedEntries = [];
        const totalTrimmed = [];
        for (const entry of cappedEntries) {
            if (remain <= 0) {
                totalTrimmed.push(`${entry.key}:${entry.value}→0`);
                continue;
            }
            const keep = Math.min(entry.value, remain);
            if (keep < entry.value) {
                totalTrimmed.push(`${entry.key}:${entry.value}→${keep}`);
            }
            if (keep > 0) {
                limitedEntries.push({ key: entry.key, value: keep });
                remain -= keep;
            }
        }

        // 合并同键（例如“体力+体质”归一后同键）
        const mergedByKey = [];
        for (const entry of limitedEntries) {
            const idx = mergedByKey.findIndex(x => x.key === entry.key);
            if (idx < 0) {
                mergedByKey.push({ key: entry.key, value: entry.value });
            } else {
                mergedByKey[idx].value = clamp(mergedByKey[idx].value + entry.value, 0, singleLimit);
            }
        }

        // 裁剪后若低于品质应有的六维总点数，回填到其它未达单项上限的六维。
        // 例如卓越要求总点数2、单项上限1，敏捷+2 会被修正为 敏捷+1，并补1点到另一六维。
        const refillAdded = [];
        const getMergedEntry = (key) => mergedByKey.find(x => x.key === key);
        const addRefillPoint = (key) => {
            const entry = getMergedEntry(key);
            if (entry) {
                if (entry.value >= singleLimit) return false;
                entry.value += 1;
            } else {
                mergedByKey.push({ key, value: 1 });
            }
            refillAdded.push(key);
            return true;
        };

        let coreTotal = mergedByKey.reduce((sum, x) => sum + x.value, 0);
        if (totalLimit > 0 && singleLimit > 0 && coreTotal < totalLimit) {
            const seedText = `${equipKey}|${equipVal.\u540D\u79F0 || ''}|${quality}`;
            const seed = stableHash(seedText);
            const rotatedAttrs = CORE_ATTR_KEYS.map((_, idx) => CORE_ATTR_KEYS[(idx + seed) % CORE_ATTR_KEYS.length]);
            const fillOrder = [...new Set([...coreOrder, ...rotatedAttrs])];
            let guard = CORE_ATTR_KEYS.length * Math.max(1, singleLimit);
            while (coreTotal < totalLimit && guard-- > 0) {
                let filled = false;
                for (const key of fillOrder) {
                    if (coreTotal >= totalLimit) break;
                    if (addRefillPoint(key)) {
                        coreTotal += 1;
                        filled = true;
                    }
                }
                if (!filled) break;
            }
        }

        const equipType = getEquipType(equipVal);
        const canKeepCritDamage = equipType === '\u6B66\u5668' || equipType === '\u9996\u9970';
        const isArmorLike = equipType === '\u9632\u5177' || isShieldLikeEquip(equipVal);
        const critDamageFixes = [];
        const critDamageConversions = [];
        const illegalCritDamageRemoved = [];
        const addOtherEntry = (entries, key, value) => {
            const existing = entries.find(entry => entry[0] === key);
            if (existing) {
                const oldVal = safeParseFloat(existing[1], 0);
                const addVal = safeParseFloat(value, 0);
                existing[1] = Math.round((oldVal + addVal) * 100) / 100;
            } else {
                entries.push([key, value]);
            }
        };
        const getOtherValue = (entries, key) => {
            const existing = entries.find(entry => entry[0] === key);
            return existing ? safeParseFloat(existing[1], 0) : 0;
        };
        const isNonStackingSkillKey = (skillKey) => skillKey === '\u5168\u6280\u80FD' || String(skillKey || '').startsWith('\u89C9\u9192');
        const addConvertedSkillEntry = (entries, skillKey, value, seedText) => {
            const addValue = safeParseFloat(value, 0);
            if (addValue <= 0) return false;

            let targetKey = skillKey;
            if (isNonStackingSkillKey(skillKey) && getOtherValue(entries, skillKey) > 0) {
                const fallbackOrder = stablePickList(CRIT_TO_SKILL_FALLBACK_TIERS, CRIT_TO_SKILL_FALLBACK_TIERS.length, seedText);
                targetKey = fallbackOrder.find(candidate => candidate !== skillKey) || CRIT_TO_SKILL_FALLBACK_TIERS[0];
            }

            addOtherEntry(entries, targetKey, addValue);
            critDamageConversions.push(`${targetKey}+${Math.round(addValue * 100) / 100}`);
            return true;
        };
        const sanitizedOtherEntries = [];
        otherEntries.forEach(([key, rawVal]) => {
            if (key !== '\u66B4\u51FB\u4F24\u5BB3') {
                addOtherEntry(sanitizedOtherEntries, key, rawVal);
                return;
            }

            if (!canKeepCritDamage) {
                if (isArmorLike) {
                    const rule = QUALITY_ARMOR_CRIT_TO_SKILL_RULES[quality];
                    if (rule?.fixed) {
                        Object.entries(rule.fixed).forEach(([skillKey, value]) => {
                            addConvertedSkillEntry(sanitizedOtherEntries, skillKey, value, `${equipKey}|${equipVal.\u540D\u79F0 || ''}|${quality}|${skillKey}|\u66B4\u51FB\u4F24\u5BB3\u8F6C\u6280\u80FD`);
                        });
                    } else if (rule?.pick) {
                        const targetCount = rule.count || 1;
                        const targetValue = rule.value || 1;
                        stablePickList(rule.pick, targetCount, `${equipKey}|${equipVal.\u540D\u79F0 || ''}|${quality}|\u66B4\u51FB\u4F24\u5BB3\u8F6C\u6280\u80FD`).forEach(skillKey => {
                            addConvertedSkillEntry(sanitizedOtherEntries, skillKey, targetValue, `${equipKey}|${equipVal.\u540D\u79F0 || ''}|${quality}|${skillKey}|\u66B4\u51FB\u4F24\u5BB3\u8F6C\u6280\u80FD`);
                        });
                    } else {
                        illegalCritDamageRemoved.push(`${equipType || 'Loại chưa rõ'}:${quality}`);
                    }
                } else {
                    illegalCritDamageRemoved.push(`${equipType || 'Loại chưa rõ'}:${quality}`);
                }
                return;
            }

            const cap = QUALITY_CRIT_DAMAGE_LIMITS[quality] ?? QUALITY_CRIT_DAMAGE_LIMITS['\u666E\u901A'];
            const parsed = safeParseFloat(rawVal, 0);
            let normalized = parsed > 1 ? parsed / 100 : parsed;
            normalized = Math.max(0, normalized);
            let nextVal = normalized;
            if (normalized > cap) {
                nextVal = stableRandomDecimal(`${equipKey}|${equipVal.\u540D\u79F0 || ''}|${quality}|\u66B4\u51FB\u4F24\u5BB3`, cap, 2);
                critDamageFixes.push(`${parsed}→${nextVal}`);
            } else if (parsed !== normalized) {
                critDamageFixes.push(`${parsed}→${normalized}`);
            }
            if (nextVal > 0) {
                addOtherEntry(sanitizedOtherEntries, key, nextVal);
            }
        });

        const sanitizedBonuses = {};
        sanitizedOtherEntries.forEach(([k, v]) => { sanitizedBonuses[k] = v; });
        mergedByKey.forEach(({ key, value }) => {
            if (value > 0) sanitizedBonuses[key] = value;
        });

        if (!hasChanged(bonuses, sanitizedBonuses)) return;

        equipVal.\u5C5E\u6027\u52A0\u6210 = sanitizedBonuses;

        if (!hasKnownQuality) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" có phẩm chất="${quality}" không khớp quy tắc, xử lý như Thường (điểm sáu thuộc tính=0, giới hạn một thuộc tính=0)`);
        }
        if (aliasFixes.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" đã sửa bí danh thuộc tính: ${aliasFixes.join(', ')}`);
        }
        if (singleCapped.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" bị cắt theo giới hạn một thuộc tính (${singleLimit}): ${singleCapped.join(', ')}`);
        }
        if (totalTrimmed.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" bị cắt theo giới hạn tổng điểm sáu thuộc tính (${totalLimit}): ${totalTrimmed.join(', ')}`);
        }
        if (refillAdded.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" thiếu điểm sáu thuộc tính, đã bù: ${refillAdded.join(', ')}`);
        }
        if (critDamageFixes.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" có sát thương chí mạng vượt giới hạn phẩm chất, đã sửa: ${critDamageFixes.join(', ')}`);
        }
        if (critDamageConversions.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" là giáp nên không cho phép sát thương chí mạng, đã chuyển thành cấp kỹ năng: ${critDamageConversions.join(', ')}`);
        }
        if (illegalCritDamageRemoved.length > 0) {
            warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" không có cấp kỹ năng thay thế phù hợp với loại/phẩm chất hiện tại, đã gỡ sát thương chí mạng: ${illegalCritDamageRemoved.join(', ')}`);
        }
        warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" đã sửa sáu thuộc tính: phẩm chất=${quality}, giới hạn tổng điểm sáu thuộc tính=${totalLimit}, giới hạn một thuộc tính=${singleLimit}, tổng sau sửa=${coreTotal}`);
    }

    // ==========================================
    // AC 计算
    // ==========================================

    const qualityToAC = {
        '\u666E\u901A': 1, '\u7CBE\u826F': 2, '\u7A00\u6709': 3, '\u5353\u8D8A': 4,
        '\u4F20\u8BF4': 5, '\u53F2\u8BD7': 6, '\u795E\u8BDD': 7
    };

    const qualityToDamageDice = {
        '\u666E\u901A': '1d6', '\u7CBE\u826F': '1d8', '\u7A00\u6709': '2d8', '\u5353\u8D8A': '3d10',
        '\u4F20\u8BF4': '3d12', '\u53F2\u8BD7': '4d10', '\u795E\u8BDD': '4d12'
    };

    // ==========================================
    // 泰坦之握 - 伤害骰合并计算
    // ==========================================

    const diceExpectation = {
        '1d4': 2.5, '1d6': 3.5, '1d8': 4.5, '1d10': 5.5, '1d12': 6.5,
        '2d6': 7, '2d8': 9, '2d10': 11, '2d12': 13,
        '3d6': 10.5, '3d8': 13.5, '3d10': 16.5, '3d12': 19.5,
        '4d6': 14, '4d8': 18, '4d10': 22, '4d12': 26,
        '5d10': 27.5, '5d12': 32.5,
        '6d10': 33, '6d12': 39
    };

    const sortedDice = Object.entries(diceExpectation).sort((a, b) => a[1] - b[1]);

    const diceDowngradeMap = {
        '4d12': '4d10', '4d10': '3d12', '3d12': '3d10', '3d10': '2d8',
        '2d8': '1d8', '1d8': '1d6', '1d6': '1d4', '1d4': '1d4'
    };
    const diceUpgradeMap = {
        '1d4': '1d6', '1d6': '1d8', '1d8': '2d8', '2d8': '3d10',
        '3d10': '3d12', '3d12': '4d10', '4d10': '4d12', '4d12': '4d12'
    };

    function downgradeDice(dice, levels = 2) {
        let result = dice;
        for (let i = 0; i < levels; i++) {
            result = diceDowngradeMap[result] || result;
        }
        return result;
    }

    function upgradeDice(dice, levels = 1) {
        let result = dice;
        for (let i = 0; i < levels; i++) {
            result = diceUpgradeMap[result] || result;
        }
        return result;
    }

    function findClosestDice(expectation) {
        let closest = '1d4';
        let minDiff = Infinity;
        for (const [dice, exp] of sortedDice) {
            const diff = Math.abs(exp - expectation);
            if (diff < minDiff) {
                minDiff = diff;
                closest = dice;
            }
        }
        return closest;
    }

    function mergeMainOffhandDice(mainDice, offhandDice, offhandDowngradeLevels = 2) {
        const mainExp = diceExpectation[mainDice] || 3.5;
        const downgradedOffhand = downgradeDice(offhandDice, offhandDowngradeLevels);
        const offExp = diceExpectation[downgradedOffhand] || 2.5;
        const totalExp = mainExp + offExp;
        const mergedDice = findClosestDice(totalExp);
        logCalc(`[Gộp tay phụ] Chính ${mainDice}(${mainExp}) + phụ ${offhandDice}→${downgradedOffhand}(${offExp}) = ${totalExp} ≈ ${mergedDice}`);
        return mergedDice;
    }

    const qualityMultiplier = {
        '\u666E\u901A': 1.0, '\u7CBE\u826F': 1.5, '\u7A00\u6709': 2.0, '\u5353\u8D8A': 2.5,
        '\u4F20\u8BF4': 3.5, '\u53F2\u8BD7': 4.0, '\u795E\u8BDD': 5.0
    };

    const DEFAULT_COMBAT_VALUE_MODE = 'classic';

    function normalizeCombatValueMode(mode) {
        return (mode === 'new' || mode === '\u65B0\u7248') ? 'new' : DEFAULT_COMBAT_VALUE_MODE;
    }

    function getCombatValueMode(rootData) {
        return normalizeCombatValueMode(rootData?.\u7CFB\u7EDF\u914D\u7F6E?.\u6218\u6597\u6570\u503C\u6A21\u5F0F);
    }

    function isNewCombatValueMode(rootData) {
        return getCombatValueMode(rootData) === 'new';
    }

    function calcAttackCountByLevel(level) {
        const lv = safeParseInt(level, 1);
        if (lv >= 50) return 3;
        if (lv >= 20) return 2;
        return 1;
    }

    function calcHpByMode(actor, rootData, equipHpBonus = 0) {
        const level = Math.max(1, safeParseInt(actor?.\u7B49\u7EA7, 1));
        const constitution = Math.max(1, safeParseInt(actor?.\u5C5E\u6027?.\u4F53\u8D28, 10));
        if (isNewCombatValueMode(rootData)) {
            // 每级成长 = 体质/2 + max(0, 体质-10)/2；最终总成长向下取整。
            const growthTimesTwo = constitution + Math.max(0, constitution - 10);
            const levelGrowth = Math.floor(growthTimesTwo * Math.max(0, level - 1) / 2);
            return Math.max(1, constitution + levelGrowth + equipHpBonus);
        }
        if ((actor?.\u79CD\u65CF || '') === '\u5DE8\u4EBA\u79CD') {
            return Math.max(1, level * constitution * 3 + equipHpBonus);
        }
        return Math.max(1, level * constitution * 2 + equipHpBonus);
    }

    function syncPlayerActionResources(player) {
        if (!player || typeof player !== 'object') return;
        ensureCombatAttrContainer(player);

        const next = {
            \u4E3B\u52A8\u4F5C: 1,
            \u9644\u8D60\u52A8\u4F5C: 1,
            \u79FB\u52A8: 1,
            \u53CD\u5E94\u52A8\u4F5C: 1,
            \u7B80\u77ED\u4EA4\u4E92: 1,
            \u653B\u51FB\u6B21\u6570: calcAttackCountByLevel(player.\u7B49\u7EA7)
        };
        if (!_.isEqual(player.\u6218\u6597\u5C5E\u6027.\u6BCF\u56DE\u5408\u52A8\u4F5C\u8D44\u6E90, next)) {
            player.\u6218\u6597\u5C5E\u6027.\u6BCF\u56DE\u5408\u52A8\u4F5C\u8D44\u6E90 = next;
            logCalc(`[Tài nguyên hành động] Đã đồng bộ tài nguyên hành động mỗi lượt của người chơi, số lần tấn công=${next.\u653B\u51FB\u6B21\u6570}`);
        }
    }

    const armorSlotCoef = { '\u4E0A\u8863': 1.5, '\u4E0B\u88C5': 1.3, '\u62A4\u80A9': 1.1, '\u978B\u5B50': 1.1, '\u8170\u5E26': 1.0, '\u76FE\u724C': 1.5 };
    const accessorySlotCoef = { '\u9879\u94FE': 4.0, '\u624B\u956F': 3.0, '\u6212\u6307': 3.0 };
    const DAMAGE_REDUCTION_CAP = 50;
    const DAMAGE_REDUCTION_ALPHA = 16;
    const DAMAGE_REDUCTION_LOG_DEN = Math.log(1 + DAMAGE_REDUCTION_ALPHA); // ln(17)
    const PHYS_DEF_FULL_SCALE = 3300; // 100级神话+10满5件防具理论值
    const MAG_DEF_FULL_SCALE = 5500;  // 100级神话+10满3件首饰理论值

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function defenseToReductionPercent(totalDefense, fullScaleDefense) {
        const defense = Math.max(0, safeParseFloat(totalDefense, 0));
        const scale = fullScaleDefense > 0 ? (defense / fullScaleDefense) : 0;
        const raw = DAMAGE_REDUCTION_CAP * Math.log(1 + DAMAGE_REDUCTION_ALPHA * scale) / DAMAGE_REDUCTION_LOG_DEN;
        return clamp(Math.round(raw), 0, DAMAGE_REDUCTION_CAP);
    }

    function calculateAC(variables) {
        const player = variables.\u4EBA\u7269;
        if (!player) return;

        if (player.\u79CD\u65CF === '\u9F99\u7CBE\u79CD') {
            const currentAC = safeParseInt(player.AC, 0);
            if (currentAC < 18) {
                player.AC = 18;
                logCalc(`[Tính AC] AC tối thiểu của Long Tinh Chủng: ${currentAC} → 18`);
            }
            return;
        }

        const \u88C5\u5907\u5217\u8868 = player.\u88C5\u5907\u5217\u8868 || {};
        let \u6700\u9AD8AC\u52A0\u503C = 0;
        Object.values(\u88C5\u5907\u5217\u8868).forEach(item => {
            if (!item || !item.\u540D\u79F0 || item.\u88C5\u5907\u7BB1 || isSpecialEquippedItem(item)) return;
            if (item.\u7C7B\u578B !== '\u9632\u5177' && !isShieldLikeEquip(item)) return;
            const bonus = qualityToAC[normalizeQualityName(item.\u54C1\u8D28)] || 0;
            if (bonus > \u6700\u9AD8AC\u52A0\u503C) \u6700\u9AD8AC\u52A0\u503C = bonus;
        });

        const newAC = 10 + \u6700\u9AD8AC\u52A0\u503C;
        if (player.AC !== newAC) {
            logCalc(`[Tính AC] Cập nhật AC: ${player.AC} → ${newAC}`);
            player.AC = newAC;
        }
    }

    // ==========================================
    // 战斗属性计算
    // ==========================================
    function calculateCombatStats(player) {
        if (!player.\u6218\u6597\u5C5E\u6027) return;
        const combat = player.\u6218\u6597\u5C5E\u6027;
        const rate = safeParseFloat(combat.\u66B4\u51FB\u7387, 0);
        let offset = Math.floor(rate / 10);
        if (offset < 0) offset = 0;
        if (offset > 10) offset = 10;
        const computedThreshold = 10 - offset;

        if (combat.\u66B4\u51FB\u9608\u503C !== computedThreshold) {
            logCalc(`[Tính chiến đấu] Ngưỡng chí mạng: ${combat.\u66B4\u51FB\u9608\u503C} → ${computedThreshold} (tỷ lệ chí mạng ${rate}%)`);
            combat.\u66B4\u51FB\u9608\u503C = computedThreshold;
        }
    }

    // ==========================================
    // 生命值上限计算
    // ==========================================
    function calculateMaxHP(player, rootData) {
        if (!player.\u5C5E\u6027) return;

        let equipHpBonus = 0;
        const \u88C5\u5907\u5217\u8868 = player.\u88C5\u5907\u5217\u8868 || {};
        Object.values(\u88C5\u5907\u5217\u8868).forEach(item => {
            if (!item || !item.\u540D\u79F0 || item.\u88C5\u5907\u7BB1) return;
            const bonuses = item.\u5C5E\u6027\u52A0\u6210 || {};
            equipHpBonus += safeParseInt(bonuses['\u751F\u547D\u503C\u4E0A\u9650'], 0);
        });

        const newMaxHP = calcHpByMode(player, rootData, equipHpBonus);

        if (player.\u751F\u547D\u503C\u4E0A\u9650 !== newMaxHP) {
            const oldMaxHP = player.\u751F\u547D\u503C\u4E0A\u9650 || 0;
            const oldCurrentHP = safeParseInt(player.\u5F53\u524D\u751F\u547D\u503C, 0);
            player.\u751F\u547D\u503C\u4E0A\u9650 = newMaxHP;
            logCalc(`[Tính HP] Giới hạn sinh lực ${oldMaxHP} → ${newMaxHP}`);

            if (oldMaxHP > 0 && oldCurrentHP > 0) {
                const hpRatio = oldCurrentHP / oldMaxHP;
                const newCurrentHP = Math.max(1, Math.round(hpRatio * newMaxHP));
                player.\u5F53\u524D\u751F\u547D\u503C = Math.min(newCurrentHP, newMaxHP);
                logCalc(`[Tính HP] Sửa theo tỷ lệ: ${oldCurrentHP} → ${player.\u5F53\u524D\u751F\u547D\u503C} (${Math.round(hpRatio * 100)}%)`);
            } else if (oldCurrentHP > newMaxHP) {
                player.\u5F53\u524D\u751F\u547D\u503C = newMaxHP;
            }
        }
    }

    // ==========================================
    // 装备数值自动计算
    // ==========================================

    function generateRandomGrade() {
        return Math.floor(Math.random() * 21) - 10;
    }

    function ensureGrade(item) {
        logCalc(`[Gỡ lỗi cấp phẩm] "${item.\u540D\u79F0}" vào ensureGrade, cấp phẩm hiện tại=${item.\u54C1\u7EA7}, kiểu=${typeof item.\u54C1\u7EA7}`);
        
        const currentGrade = safeParseInt(item.\u54C1\u7EA7, null);
        
        // 情况1：品级缺失或为0，生成随机品级
        if (currentGrade === null || currentGrade === 0) {
            const newGrade = generateRandomGrade();
            logCalc(`[Gỡ lỗi cấp phẩm] "${item.\u540D\u79F0}" thiếu cấp phẩm hoặc bằng 0, sinh cấp phẩm ngẫu nhiên ${newGrade}`);
            item.\u54C1\u7EA7 = newGrade;
            logCalc(`[Gỡ lỗi cấp phẩm] "${item.\u540D\u79F0}" cấp phẩm sau khi gán=${item.\u54C1\u7EA7}`);
            return;
        }
        
        // 情况2：品级超出范围 [-10, 10]，修正到边界
        if (currentGrade < -10) {
            logCalc(`[Hiệu chỉnh cấp phẩm] "${item.\u540D\u79F0}" cấp phẩm quá thấp (${currentGrade}), đã sửa thành -10`);
            item.\u54C1\u7EA7 = -10;
        } else if (currentGrade > 10) {
            logCalc(`[Hiệu chỉnh cấp phẩm] "${item.\u540D\u79F0}" cấp phẩm quá cao (${currentGrade}), đã sửa thành 10`);
            item.\u54C1\u7EA7 = 10;
        }
    }

    function getCurrentWorldView(variables) {
        return String(variables?.\u7CFB\u7EDF\u914D\u7F6E?.\u4E16\u754C\u89C2 || '').trim();
    }

    function isAmberSwordWorldView(variables) {
        return getCurrentWorldView(variables) === '\u7425\u73C0\u4E4B\u5251';
    }

    function getWeaponCalcLevel(weapon, player, variables) {
        if (isAmberSwordWorldView(variables)) {
            return safeParseInt(player?.\u7B49\u7EA7, 1);
        }
        return safeParseInt(weapon?.\u7B49\u7EA7, 1);
    }

    function calculateWeaponStats(weapon, player, variables) {
        if (!weapon || !weapon.\u540D\u79F0) return false;
        ensureGrade(weapon);

        const \u54C1\u8D28 = normalizeQualityName(weapon.\u54C1\u8D28 || '\u666E\u901A');
        const \u7B49\u7EA7 = getWeaponCalcLevel(weapon, player, variables);
        const \u54C1\u7EA7 = safeParseInt(weapon.\u54C1\u7EA7, 0);
        const \u5F3A\u5316\u7B49\u7EA7 = safeParseInt(weapon.\u5F3A\u5316\u7B49\u7EA7, 0);
        const newMode = isNewCombatValueMode(variables);

        const newDamageDice = qualityToDamageDice[\u54C1\u8D28] || '1d6';
        const newLevelCoef = newMode ? 1 : Math.floor(\u7B49\u7EA7 / 10) + 1;
        const newFixedDmg = newMode
            ? Math.max(0, Math.floor(\u7B49\u7EA7 / 4) + \u5F3A\u5316\u7B49\u7EA7)
            : Math.max(1, Math.floor(\u7B49\u7EA7 * (1 + \u5F3A\u5316\u7B49\u7EA7 * 0.1) * (1 + \u54C1\u7EA7 / 100)));

        const changed = weapon.\u4F24\u5BB3\u9AB0 !== newDamageDice || weapon.\u7B49\u7EA7\u7CFB\u6570 !== newLevelCoef || weapon.\u56FA\u5B9A\u4F24\u5BB3 !== newFixedDmg;
        weapon.\u4F24\u5BB3\u9AB0 = newDamageDice;
        weapon.\u7B49\u7EA7\u7CFB\u6570 = newLevelCoef;
        weapon.\u56FA\u5B9A\u4F24\u5BB3 = newFixedDmg;

        if (changed) {
            logCalc(`[Tính trang bị] Vũ khí "${weapon.\u540D\u79F0}": ${newLevelCoef}×${newDamageDice}+${newFixedDmg}`);
        }
        return changed;
    }

    function collectEquippedCoreAttrBonuses(\u88C5\u5907\u5217\u8868) {
        const out = {};
        CORE_ATTR_KEYS.forEach(k => { out[k] = 0; });
        Object.values(\u88C5\u5907\u5217\u8868 || {}).forEach(item => {
            if (!item || !item.\u540D\u79F0 || item.\u88C5\u5907\u7BB1) return;
            const bonuses = item.\u5C5E\u6027\u52A0\u6210 || {};
            CORE_ATTR_KEYS.forEach(k => {
                out[k] += safeParseInt(bonuses[k], 0);
            });
        });
        return out;
    }

    function ensureCombatAttrContainer(actor) {
        if (!actor || typeof actor !== 'object') return;
        if (!actor.\u6218\u6597\u5C5E\u6027 || typeof actor.\u6218\u6597\u5C5E\u6027 !== 'object') actor.\u6218\u6597\u5C5E\u6027 = {};
        const combat = actor.\u6218\u6597\u5C5E\u6027;
        if (combat.\u66B4\u51FB\u7387 === undefined) combat.\u66B4\u51FB\u7387 = 0;
        if (combat.\u66B4\u51FB\u4F24\u5BB3 === undefined) combat.\u66B4\u51FB\u4F24\u5BB3 = 1.5;
        if (combat.\u66B4\u51FB\u9608\u503C === undefined) combat.\u66B4\u51FB\u9608\u503C = 10;
        if (combat.\u7269\u7406\u51CF\u4F24 === undefined) combat.\u7269\u7406\u51CF\u4F24 = 0;
        if (combat.\u9B54\u6CD5\u51CF\u4F24 === undefined) combat.\u9B54\u6CD5\u51CF\u4F24 = 0;
    }

    function hasActorCoreAttrChanged(actor, actorBefore) {
        if (!actor?.\u5C5E\u6027 && !actorBefore?.\u5C5E\u6027) return false;
        return CORE_ATTR_KEYS.some(attrName =>
            safeParseInt(actor?.\u5C5E\u6027?.[attrName], 10) !== safeParseInt(actorBefore?.\u5C5E\u6027?.[attrName], 10)
        );
    }

    // 装备变化后，将六维同步为最终面板值（含体质）
    function syncCoreAttrsOnEquipChange(actor, actorBefore, actorName = 'Nhân vật') {
        if (!actor?.\u5C5E\u6027 || !actorBefore?.\u5C5E\u6027) return;
        const prevBonuses = collectEquippedCoreAttrBonuses(actorBefore.\u88C5\u5907\u5217\u8868 || {});
        const newBonuses = collectEquippedCoreAttrBonuses(actor.\u88C5\u5907\u5217\u8868 || {});
        const syncAttrs = ['\u529B\u91CF', '\u654F\u6377', '\u4F53\u8D28', '\u667A\u529B', '\u611F\u77E5', '\u9B45\u529B'];
        syncAttrs.forEach(attrName => {
            const beforeVal = safeParseInt(actorBefore.\u5C5E\u6027?.[attrName], 10);
            const prevBonus = safeParseInt(prevBonuses[attrName], 0);
            const newBonus = safeParseInt(newBonuses[attrName], 0);
            const baseVal = beforeVal - prevBonus;
            const nextVal = baseVal + newBonus;
            const currentVal = safeParseInt(actor.\u5C5E\u6027?.[attrName], 10);
            if (currentVal !== nextVal) {
                actor.\u5C5E\u6027[attrName] = nextVal;
                logCalc(`[Đồng bộ thuộc tính] ${actorName} ${attrName}: ${currentVal} → ${nextVal} (cộng từ trang bị ${prevBonus} → ${newBonus})`);
            }
        });
    }

    function buildWeaponAttrSnapshot(actor) {
        const raw = actor?.\u5C5E\u6027 || {};
        const snapshot = {};
        CORE_ATTR_KEYS.forEach(attrName => {
            snapshot[attrName] = safeParseInt(raw[attrName], 10);
        });
        return snapshot;
    }

    function calcAttrFixedDmg(\u5C5E\u6027, \u4EBA\u7269\u7B49\u7EA7, rootData) {
        let maxVal = 0;
        CORE_ATTR_KEYS.forEach(attrName => {
            const v = safeParseInt(\u5C5E\u6027?.[attrName], 10);
            if (v > maxVal) maxVal = v;
        });
        const capped = Math.min(maxVal, 40);
        const modifier = capped > 10 ? Math.floor((capped - 10) / 2) : 0;
        if (isNewCombatValueMode(rootData)) return modifier;
        const levelCoef = Math.floor(safeParseInt(\u4EBA\u7269\u7B49\u7EA7, 1) / 10) + 1;
        return modifier * levelCoef;
    }

    function buildUnarmedWeaponPanel(actor, rootData) {
        const level = safeParseInt(actor?.\u7B49\u7EA7, 1);
        const newMode = isNewCombatValueMode(rootData);
        const levelCoef = newMode ? 1 : Math.floor(level / 10) + 1;
        const baseFixed = newMode ? 0 : Math.max(1, level);
        const attrSnapshot = buildWeaponAttrSnapshot(actor);
        const attrFixedDmg = calcAttrFixedDmg(attrSnapshot, level, rootData);
        return {
            \u4F24\u5BB3\u9AB0: '1d4',
            \u7B49\u7EA7\u7CFB\u6570: levelCoef,
            \u56FA\u5B9A\u4F24\u5BB3: baseFixed + attrFixedDmg
        };
    }

    function getArmorDefenseValue(armor, slotName) {
        if (!armor || !armor.\u540D\u79F0) return 0;
        const \u54C1\u8D28 = normalizeQualityName(armor.\u54C1\u8D28 || '\u666E\u901A');
        const \u7B49\u7EA7 = safeParseInt(armor.\u7B49\u7EA7, 1);
        const \u54C1\u7EA7 = safeParseInt(armor.\u54C1\u7EA7, 0);
        const slotCoef = armorSlotCoef[slotName] || 1.0;
        const qualityMult = qualityMultiplier[\u54C1\u8D28] || 1.0;
        const gradeMultiplier = 1 + (\u54C1\u7EA7 / 100);
        return Math.floor(\u7B49\u7EA7 * slotCoef * qualityMult * gradeMultiplier);
    }

    function getAccessoryDefenseValue(accessory, slotName) {
        if (!accessory || !accessory.\u540D\u79F0) return 0;
        const \u54C1\u8D28 = normalizeQualityName(accessory.\u54C1\u8D28 || '\u666E\u901A');
        const \u7B49\u7EA7 = safeParseInt(accessory.\u7B49\u7EA7, 1);
        const \u54C1\u7EA7 = safeParseInt(accessory.\u54C1\u7EA7, 0);
        const slotCoef = accessorySlotCoef[slotName] || 3.0;
        const qualityMult = qualityMultiplier[\u54C1\u8D28] || 1.0;
        const gradeMultiplier = 1 + (\u54C1\u7EA7 / 100);
        return Math.floor(\u7B49\u7EA7 * slotCoef * qualityMult * gradeMultiplier);
    }

    function calculateArmorStats(armor, slotName) {
        if (!armor || !armor.\u540D\u79F0) return false;
        ensureGrade(armor);
        const newDefense = getArmorDefenseValue(armor, slotName);

        if (armor.\u9632\u5FA1\u529B !== newDefense) {
            armor.\u9632\u5FA1\u529B = newDefense;
            logCalc(`[Tính trang bị] Giáp "${armor.\u540D\u79F0}" (${slotName}): phòng ngự=${newDefense}`);
            return true;
        }
        return false;
    }

    function calculateAccessoryStats(accessory, slotName) {
        if (!accessory || !accessory.\u540D\u79F0) return false;
        ensureGrade(accessory);
        const newDefense = getAccessoryDefenseValue(accessory, slotName);

        if (accessory.\u9632\u5FA1\u529B !== newDefense) {
            accessory.\u9632\u5FA1\u529B = newDefense;
            logCalc(`[Tính trang bị] Trang sức "${accessory.\u540D\u79F0}" (${slotName}): phòng ngự=${newDefense}`);
            return true;
        }
        return false;
    }

    /**
     * 计算所有装备数值 (统一装备列表版)
     * @param {object} variables - stat_data
     * @param {object|null} variablesBefore - stat_data (before)，用于判断装备是否变化
     */
    function calculateEquipmentStatsForActor(actor, variables, actorName = 'Nhân vật') {
        if (!actor) {
            logCalc(`[Gỡ lỗi tính trang bị] Không tồn tại ${actorName}, bỏ qua`);
            return;
        }
        const \u88C5\u5907\u5217\u8868 = actor.\u88C5\u5907\u5217\u8868;
        const offhandRule = getOffhandRuleState(actor);
        logCalc(`[Gỡ lỗi tính trang bị] Danh sách trang bị=${\u88C5\u5907\u5217\u8868}, kiểu=${typeof \u88C5\u5907\u5217\u8868}, keys=${\u88C5\u5907\u5217\u8868 ? Object.keys(\u88C5\u5907\u5217\u8868) : 'N/A'}`);
        if (!\u88C5\u5907\u5217\u8868) { logCalc('[Gỡ lỗi tính trang bị] Không tồn tại danh sách trang bị, bỏ qua'); return; }

        let mainWeapon = null;
        let offWeapon = null;

        Object.entries(\u88C5\u5907\u5217\u8868).forEach(([key, item]) => {
            if (!item || !item.\u540D\u79F0) return;
            const isEquipped = !item.\u88C5\u5907\u7BB1;
            const isSpecialEquipped = isSpecialEquippedItem(item);
            const slotName = getEquipStoredSlot(item);

            if (item.\u7C7B\u578B === '\u6B66\u5668') {
                if (!(isEquipped && isSpecialEquipped)) {
                    calculateWeaponStats(item, actor, variables);
                }
                if (isEquipped && !isSpecialEquipped) {
                    if (slotName === '\u4E3B\u624B') mainWeapon = item;
                    if (slotName === '\u526F\u624B' && offhandRule.canUseOffhandWeapon) offWeapon = item;
                }
            } else if (item.\u7C7B\u578B === '\u9632\u5177' || isShieldLikeEquip(item)) {
                if (!(isEquipped && isSpecialEquipped)) {
                    const armorSlot = isShieldLikeEquip(item) ? '\u76FE\u724C' : (slotName || item.\u90E8\u4F4D);
                    calculateArmorStats(item, armorSlot);
                }
            } else if (item.\u7C7B\u578B === '\u9996\u9970') {
                if (!(isEquipped && isSpecialEquipped)) {
                    calculateAccessoryStats(item, slotName || item.\u90E8\u4F4D);
                }
            }
        });

        // 副手合并：泰坦之握/双极武装生效时，主副武器进行合并
        if (mainWeapon && offWeapon && offhandRule.canUseOffhandWeapon) {
            const mainDice = qualityToDamageDice[normalizeQualityName(mainWeapon.\u54C1\u8D28)] || '1d6';
            const offDice = qualityToDamageDice[normalizeQualityName(offWeapon.\u54C1\u8D28)] || '1d6';
            const mainDiceForMerge = offhandRule.hasSynergy ? upgradeDice(mainDice, 1) : mainDice;
            const offhandDowngradeLevels = offhandRule.hasSynergy ? 0 : 2;
            const mergedDice = mergeMainOffhandDice(mainDiceForMerge, offDice, offhandDowngradeLevels);

            if (mainWeapon.\u4F24\u5BB3\u9AB0 !== mergedDice) {
                mainWeapon.\u4F24\u5BB3\u9AB0 = mergedDice;
                logCalc(`[Gộp tay phụ] Đã cập nhật xúc xắc sát thương của vũ khí chính thành: ${mergedDice}`);
            }

            const mainFixedDmg = safeParseInt(mainWeapon.\u56FA\u5B9A\u4F24\u5BB3, 0);
            const offFixedDmg = safeParseInt(offWeapon.\u56FA\u5B9A\u4F24\u5BB3, 0);
            const mergedFixedDmg = mainFixedDmg + Math.floor(offFixedDmg / 2);
            if (mainWeapon.\u56FA\u5B9A\u4F24\u5BB3 !== mergedFixedDmg) {
                mainWeapon.\u56FA\u5B9A\u4F24\u5BB3 = mergedFixedDmg;
                logCalc(`[Gộp tay phụ] Đã cập nhật sát thương cố định của vũ khí chính thành: ${mergedFixedDmg}`);
            }
        }

        // 生成武器面板
        if (mainWeapon) {
            const attrSnapshot = buildWeaponAttrSnapshot(actor);
            const attrFixedDmg = calcAttrFixedDmg(attrSnapshot, actor.\u7B49\u7EA7, variables);
            const panelFixedDmg = safeParseInt(mainWeapon.\u56FA\u5B9A\u4F24\u5BB3, 0) + attrFixedDmg;
            const newPanel = {
                \u4F24\u5BB3\u9AB0: mainWeapon.\u4F24\u5BB3\u9AB0 || '',
                \u7B49\u7EA7\u7CFB\u6570: mainWeapon.\u7B49\u7EA7\u7CFB\u6570 || 1,
                \u56FA\u5B9A\u4F24\u5BB3: panelFixedDmg
            };
            ensureCombatAttrContainer(actor);
            if (!_.isEqual(actor.\u6218\u6597\u5C5E\u6027.\u6B66\u5668\u9762\u677F, newPanel)) {
                actor.\u6218\u6597\u5C5E\u6027.\u6B66\u5668\u9762\u677F = newPanel;
                logCalc(`[Bảng vũ khí] ${actorName} đã cập nhật: ${newPanel.\u7B49\u7EA7\u7CFB\u6570}×${newPanel.\u4F24\u5BB3\u9AB0}+${newPanel.\u56FA\u5B9A\u4F24\u5BB3} (sát thương cố định vũ khí ${safeParseInt(mainWeapon.\u56FA\u5B9A\u4F24\u5BB3, 0)} + sát thương cố định thuộc tính ${attrFixedDmg})`);
            }
        } else {
            ensureCombatAttrContainer(actor);
            const unarmedPanel = buildUnarmedWeaponPanel(actor, variables);
            if (!_.isEqual(actor.\u6218\u6597\u5C5E\u6027.\u6B66\u5668\u9762\u677F, unarmedPanel)) {
                actor.\u6218\u6597\u5C5E\u6027.\u6B66\u5668\u9762\u677F = unarmedPanel;
                logCalc(`[Bảng vũ khí] ${actorName} không có vũ khí chính, đã ghi bảng vũ khí tay không: ${unarmedPanel.\u7B49\u7EA7\u7CFB\u6570}×${unarmedPanel.\u4F24\u5BB3\u9AB0}+${unarmedPanel.\u56FA\u5B9A\u4F24\u5BB3}`);
            }
        }
    }

    function calculateAllEquipmentStats(variables) {
        const player = variables.\u4EBA\u7269;
        if (!player) { logCalc('[Gỡ lỗi tính trang bị] Không tồn tại player, bỏ qua'); return; }
        calculateEquipmentStatsForActor(player, variables, 'Nhân vật chính');
    }

    // ==========================================
    // 技能冷却管理系统（MVU 变量版）
    // ==========================================

    const DEFAULT_SKILL_SYSTEM_MODE = 'classic';
    const COMBO_STATE_DEFAULT = {
        \u5F53\u524D\u9AD8\u7EA7\u7EC4: 'alpha',
        \u5F53\u524D\u663E\u793A\u69FD: 'advanced'
    };
    const COMBO_ADVANCED_GROUP_ORDER = ['alpha', 'beta', 'gamma'];
    const COMBO_GROUP_ORDER = [...COMBO_ADVANCED_GROUP_ORDER, 'ultimate'];
    const COMBO_GROUP_SLOT_RULES = {
        alpha: [['\u8FDB\u9636'], ['\u8FDB\u9636'], ['\u5FC5\u6740']],
        beta: [['\u8FDB\u9636'], ['\u8FDB\u9636'], ['\u5FC5\u6740']],
        gamma: [['\u8FDB\u9636'], ['\u8FDB\u9636'], ['\u5FC5\u6740']],
        ultimate: [['\u5965\u4E49'], ['\u5965\u4E49'], ['\u5965\u4E49']]
    };
    const COMBO_BASE_SLOT_RULES = [['\u57FA\u7840'], ['\u57FA\u7840'], ['\u57FA\u7840']];
    const COMBO_CLASS_SLOT_RULES = [['\u8F6C\u804C'], ['\u8F6C\u804C'], ['\u8F6C\u804C']];
    const SKILL_TIER_KEYS = ['\u57FA\u7840', '\u8F6C\u804C', '\u8FDB\u9636', '\u5FC5\u6740', '\u5965\u4E49', '\u89C9\u9192\u4E00', '\u89C9\u9192\u4E8C', '\u89C9\u9192\u4E09'];
    const ALL_SKILL_TIERS = ['\u57FA\u7840', '\u8F6C\u804C', '\u8FDB\u9636', '\u5FC5\u6740', '\u5965\u4E49'];
    const SKILL_TIER_CONFIG_BY_MODE = {
        classic: {
            \u57FA\u7840: { \u51B7\u5374: 0, \u4F24\u5BB3: { \u57FA\u7840: 150, \u6210\u957F: 15 } },
            \u8F6C\u804C: { \u51B7\u5374: 0, \u4F24\u5BB3: { \u57FA\u7840: 210, \u6210\u957F: 35 } },
            \u8FDB\u9636: { \u51B7\u5374: 1, \u4F24\u5BB3: { \u57FA\u7840: 420, \u6210\u957F: 70 } },
            \u5FC5\u6740: { \u51B7\u5374: 2, \u4F24\u5BB3: { \u57FA\u7840: 980, \u6210\u957F: 90 } },
            \u5965\u4E49: { \u51B7\u5374: 3, \u4F24\u5BB3: { \u57FA\u7840: 1680, \u6210\u957F: 140 } },
            \u89C9\u9192\u4E00: { \u51B7\u5374: 3, \u4F24\u5BB3: { \u57FA\u7840: 3150, \u6210\u957F: 350 } },
            \u89C9\u9192\u4E8C: { \u51B7\u5374: 4, \u4F24\u5BB3: { \u57FA\u7840: 4200, \u6210\u957F: 700 } },
            \u89C9\u9192\u4E09: { \u51B7\u5374: 5, \u4F24\u5BB3: { \u57FA\u7840: 5600, \u6210\u957F: 0 } }
        },
        new: {
            \u57FA\u7840: { \u51B7\u5374: 1, \u4F24\u5BB3: { \u57FA\u7840: 130, \u6210\u957F: 5 } },
            \u8F6C\u804C: { \u51B7\u5374: 1, \u4F24\u5BB3: { \u57FA\u7840: 150, \u6210\u957F: 5 } },
            \u8FDB\u9636: { \u51B7\u5374: 1, \u4F24\u5BB3: { \u57FA\u7840: 200, \u6210\u957F: 10 } },
            \u5FC5\u6740: { \u51B7\u5374: 2, \u4F24\u5BB3: { \u57FA\u7840: 300, \u6210\u957F: 20 } },
            \u5965\u4E49: { \u51B7\u5374: 3, \u4F24\u5BB3: { \u57FA\u7840: 400, \u6210\u957F: 25 } },
            \u89C9\u9192\u4E00: { \u51B7\u5374: 3, \u4F24\u5BB3: { \u57FA\u7840: 500, \u6210\u957F: 50 } },
            \u89C9\u9192\u4E8C: { \u51B7\u5374: 4, \u4F24\u5BB3: { \u57FA\u7840: 650, \u6210\u957F: 50 } },
            \u89C9\u9192\u4E09: { \u51B7\u5374: 5, \u4F24\u5BB3: { \u57FA\u7840: 800, \u6210\u957F: 0 } }
        }
    };
    const TIER_CONFIG = SKILL_TIER_CONFIG_BY_MODE.classic;
    const DAMAGE_VERSION = 5;
    const LEGACY_SUMMON_CONFIG = {
        \u57FA\u7840: { \u57FA\u7840: 110, \u6210\u957F: 10 },
        \u8F6C\u804C: { \u57FA\u7840: 150, \u6210\u957F: 25 },
        \u8FDB\u9636: { \u57FA\u7840: 210, \u6210\u957F: 35 },
        \u5FC5\u6740: { \u57FA\u7840: 350, \u6210\u957F: 30 },
        \u5965\u4E49: { \u57FA\u7840: 420, \u6210\u957F: 45 }
    };
    const SUMMON_DAMAGE_RATIO_BY_TIER = {
        \u57FA\u7840: 1.0,
        \u8F6C\u804C: 1.0,
        \u8FDB\u9636: 0.8,
        \u5FC5\u6740: 0.65,
        \u5965\u4E49: 0.5
    };

    function collectSkillTierEquipBonuses(\u88C5\u5907\u5217\u8868) {
        const totals = {};
        Object.values(\u88C5\u5907\u5217\u8868 || {}).forEach(eq => {
            if (!eq || !eq.\u540D\u79F0 || eq.\u88C5\u5907\u7BB1) return;
            const bonus = eq.\u5C5E\u6027\u52A0\u6210 || {};
            Object.entries(bonus).forEach(([key, val]) => {
                const parsed = safeParseFloat(val, 0);
                if (parsed === 0) return;
                if (key === '\u5168\u6280\u80FD') {
                    ALL_SKILL_TIERS.forEach(tier => {
                        totals[tier] = safeParseFloat(totals[tier], 0) + parsed;
                    });
                    return;
                }
                if (!SKILL_TIER_KEYS.includes(key)) return;
                totals[key] = safeParseFloat(totals[key], 0) + parsed;
            });
        });
        return totals;
    }

    function getLegacySummonDamageRatioByCooldown(cooldown = 0) {
        if (cooldown <= 0) return 1;
        return Math.max(0.5, 0.8 - cooldown * 0.1);
    }

    function getSummonDamageRatioByTier(tierName = '', modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        if (normalizeCombatValueMode(typeof modeOrData === 'string' ? modeOrData : getCombatValueMode(modeOrData)) === 'new') {
            return 0.6;
        }
        return SUMMON_DAMAGE_RATIO_BY_TIER[tierName] ?? 0.5;
    }

    function getSkillTierConfig(modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        const mode = typeof modeOrData === 'string'
            ? normalizeCombatValueMode(modeOrData)
            : getCombatValueMode(modeOrData);
        return SKILL_TIER_CONFIG_BY_MODE[mode] || SKILL_TIER_CONFIG_BY_MODE.classic;
    }

    function getSkillBaseDamage(skill, modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        const tier = getSkillTierConfig(modeOrData)[skill?.\u9636\u4F4D];
        if (!tier) return 0;
        if (skill?.\u7C7B\u578B === '\u7279\u6B8A' || skill?.\u7C7B\u578B === '\u804C\u4E1A\u7279\u6B8A') return 0;
        const level = safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0);
        if (level <= 0) return 0;

        const activeBase = tier.\u4F24\u5BB3.\u57FA\u7840 + tier.\u4F24\u5BB3.\u6210\u957F * (level - 1);
        if (skill?.\u7C7B\u578B !== '\u53EC\u5524') {
            return activeBase;
        }

        const ratio = getSummonDamageRatioByTier(skill?.\u9636\u4F4D, modeOrData);
        return Math.round(activeBase * ratio);
    }

    function getLegacySummonBaseDamage(skill) {
        if (skill?.\u7C7B\u578B !== '\u53EC\u5524') {
            return getSkillBaseDamage(skill, DEFAULT_COMBAT_VALUE_MODE);
        }
        const legacy = LEGACY_SUMMON_CONFIG[skill?.\u9636\u4F4D];
        const level = safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0);
        if (!legacy || level <= 0) return 0;
        return legacy.\u57FA\u7840 + legacy.\u6210\u957F * (level - 1);
    }

    function getSummonBaseDamageByVersion(skill, damageVersion = 0, modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        if (skill?.\u7C7B\u578B !== '\u53EC\u5524') {
            return getSkillBaseDamage(skill, modeOrData);
        }

        const parsedVersion = Number(damageVersion || 0);
        if (parsedVersion >= 2) {
            const tier = getSkillTierConfig(modeOrData)[skill?.\u9636\u4F4D];
            if (!tier) return 0;
            const level = safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0);
            if (level <= 0) return 0;
            const activeBase = tier.\u4F24\u5BB3.\u57FA\u7840 + tier.\u4F24\u5BB3.\u6210\u957F * (level - 1);
            const ratio = normalizeCombatValueMode(typeof modeOrData === 'string' ? modeOrData : getCombatValueMode(modeOrData)) === 'new'
                ? 0.6
                : getLegacySummonDamageRatioByCooldown(tier.\u51B7\u5374 || 0);
            return Math.round(activeBase * ratio);
        }

        return getLegacySummonBaseDamage(skill);
    }

    function calcSkillDamage(skill, modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        const base = getSkillBaseDamage(skill, modeOrData);
        if (base <= 0) return 0;
        const floatRatio = 1 - Math.random() * 0.10;
        return Math.round(base * floatRatio / 10) * 10;
    }

    function getSkillBaseDamageByVersion(skill, level, damageVersion = DAMAGE_VERSION, modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        const normalizedLevel = Math.max(1, safeParseInt(level, 1));
        if (skill?.\u7C7B\u578B === '\u53EC\u5524') {
            return getSummonBaseDamageByVersion({ ...skill, \u5F53\u524D\u7B49\u7EA7: normalizedLevel }, damageVersion, modeOrData);
        }
        return getSkillBaseDamage({ ...skill, \u5F53\u524D\u7B49\u7EA7: normalizedLevel }, modeOrData);
    }

    function calcFixedSkillDamageStep(skill, currentDmg, currentLevel, damageVersion = DAMAGE_VERSION, modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        if (!skill || skill.\u7C7B\u578B === '\u7279\u6B8A' || skill.\u7C7B\u578B === '\u804C\u4E1A\u7279\u6B8A') return 0;

        const normalizedLevel = Math.max(1, safeParseInt(currentLevel, 1));
        const currentBase = getSkillBaseDamageByVersion(skill, normalizedLevel, damageVersion, modeOrData);
        const nextBase = getSkillBaseDamageByVersion(skill, normalizedLevel + 1, damageVersion, modeOrData);
        const rawGrowth = Math.max(0, nextBase - currentBase);
        if (rawGrowth <= 0 || !Number.isFinite(currentDmg) || currentDmg <= 0 || currentBase <= 0) {
            return 0;
        }

        const floatRatio = currentDmg / currentBase;
        const fixedStep = Math.floor((rawGrowth * floatRatio) / 10) * 10;
        return Math.max(10, fixedStep);
    }

    function getSkillCurrentLevel(skill) {
        const lv = Number(skill?.\u5F53\u524D\u7B49\u7EA7 ?? skill?.\u6280\u80FD\u7B49\u7EA7 ?? 0);
        if (!Number.isFinite(lv)) return 0;
        return Math.max(0, Math.floor(lv));
    }

    function resolveSpecialEffectEntry(specialEffect, currentLevel) {
        if (!specialEffect) return null;
        const lv = Math.max(1, Math.floor(Number(currentLevel) || 1));

        if (typeof specialEffect === 'string') {
            const text = specialEffect.trim();
            if (!text) return null;
            return { key: String(lv), value: text };
        }

        if (typeof specialEffect !== 'object' || Array.isArray(specialEffect)) return null;

        const exactKey = String(lv);
        if (typeof specialEffect[exactKey] === 'string' && specialEffect[exactKey].trim()) {
            return { key: exactKey, value: specialEffect[exactKey] };
        }

        const numericKeys = Object.keys(specialEffect)
            .map(key => safeParseInt(key, NaN))
            .filter(key => Number.isFinite(key))
            .sort((a, b) => a - b);

        if (numericKeys.length > 0) {
            const lowerOrEqual = numericKeys.filter(key => key <= lv);
            if (lowerOrEqual.length > 0) {
                const nearest = String(lowerOrEqual[lowerOrEqual.length - 1]);
                const val = specialEffect[nearest];
                if (typeof val === 'string' && val.trim()) {
                    return { key: nearest, value: val };
                }
            }

            const smallest = String(numericKeys[0]);
            const smallestVal = specialEffect[smallest];
            if (typeof smallestVal === 'string' && smallestVal.trim()) {
                return { key: smallest, value: smallestVal };
            }
        }

        if (typeof specialEffect['\u65E0'] === 'string' && specialEffect['\u65E0'].trim()) {
            return { key: '\u65E0', value: specialEffect['\u65E0'] };
        }

        return null;
    }

    function getSpecialEffectObj(skill) {
        const currentLevel = getSkillCurrentLevel(skill);
        if (currentLevel === 0) return { '1': '\u65E0' };

        if (typeof skill?.\u7279\u6B8A\u6548\u679C === 'string') {
            const text = String(skill.\u7279\u6B8A\u6548\u679C || '').trim();
            return { '1': text || '\u65E0' };
        }

        const resolved = resolveSpecialEffectEntry(skill?.\u7279\u6B8A\u6548\u679C, currentLevel);
        if (!resolved) return { '1': '\u65E0' };
        const resolvedKey = String(resolved.key || '').trim();
        const resolvedVal = String(resolved.value || '').trim() || '\u65E0';
        if (!/^\d+$/.test(resolvedKey)) return { '1': resolvedVal };
        return { [resolvedKey]: resolvedVal };
    }

    function getEffectiveSkillLevel(skill, equipBonuses = {}) {
        const baseLevel = safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0);
        if (baseLevel <= 0) return 0;
        const tier = skill?.\u9636\u4F4D || '';
        const tierBonus = safeParseInt(equipBonuses[tier], 0);
        const effectiveLevel = baseLevel + tierBonus;
        if (tier.includes('\u89C9\u9192')) {
            return Math.min(effectiveLevel, 3);
        }
        return effectiveLevel;
    }

    function resolveComboSlotDamageState(skill, existingSlot, level, statData, options = {}) {
        const currentMode = getCombatValueMode(statData);
        const legacySlotMode = existingSlot?.\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F ? normalizeCombatValueMode(existingSlot.\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F) : null;
        const previousMode = options.previousCombatValueMode
            ? normalizeCombatValueMode(options.previousCombatValueMode)
            : (legacySlotMode || currentMode);
        const modeChanged = previousMode !== currentMode;
        if (!skill || skill.\u7C7B\u578B === '\u7279\u6B8A' || skill.\u7C7B\u578B === '\u804C\u4E1A\u7279\u6B8A') {
            return {
                \u4F24\u5BB3\u500D\u7387: 0,
                \u4F24\u5BB3\u6210\u957F\u503C: 0,
                \u4F24\u5BB3\u500D\u7387\u7248\u672C: DAMAGE_VERSION
            };
        }

        const normalizedLevel = Math.max(1, safeParseInt(level, 1));
        const previousLevel = Math.max(1, safeParseInt(existingSlot?.\u6280\u80FD\u7B49\u7EA7, normalizedLevel));
        const previousDamage = safeParseFloat(existingSlot?.\u4F24\u5BB3\u500D\u7387, 0);
        const rawPreviousVersion = Number(existingSlot?.\u4F24\u5BB3\u500D\u7387\u7248\u672C);
        const previousVersion = Number.isFinite(rawPreviousVersion) ? rawPreviousVersion : 0;

        if (previousDamage > 0) {
            const modeOrVersionChanged = previousVersion !== DAMAGE_VERSION || modeChanged;
            if (modeOrVersionChanged) {
                const previousBase = getSkillBaseDamageByVersion(skill, previousLevel, previousVersion || DAMAGE_VERSION, previousMode);
                const floatRatio = previousBase > 0 ? previousDamage / previousBase : 0.95;
                const nextBase = getSkillBaseDamageByVersion(skill, normalizedLevel, DAMAGE_VERSION, currentMode);
                const nextDamage = Math.max(0, Math.round(nextBase * floatRatio / 10) * 10);
                return {
                    \u4F24\u5BB3\u500D\u7387: nextDamage,
                    \u4F24\u5BB3\u6210\u957F\u503C: calcFixedSkillDamageStep(skill, nextDamage, normalizedLevel, DAMAGE_VERSION, currentMode),
                    \u4F24\u5BB3\u500D\u7387\u7248\u672C: DAMAGE_VERSION
                };
            }
            const needsMigration = !Number.isFinite(Number(existingSlot?.\u4F24\u5BB3\u6210\u957F\u503C));
            let damageStep = Number(existingSlot?.\u4F24\u5BB3\u6210\u957F\u503C);
            if (!Number.isFinite(damageStep) || damageStep < 0 || needsMigration) {
                damageStep = calcFixedSkillDamageStep(
                    skill,
                    previousDamage,
                    previousLevel,
                    previousVersion || DAMAGE_VERSION,
                    currentMode
                );
            }
            const levelDiff = normalizedLevel - previousLevel;
            return {
                \u4F24\u5BB3\u500D\u7387: levelDiff === 0 ? previousDamage : Math.max(0, previousDamage + damageStep * levelDiff),
                \u4F24\u5BB3\u6210\u957F\u503C: damageStep,
                \u4F24\u5BB3\u500D\u7387\u7248\u672C: DAMAGE_VERSION
            };
        }

        const initialDamage = calcSkillDamage({ ...skill, \u5F53\u524D\u7B49\u7EA7: normalizedLevel }, currentMode);
        return {
            \u4F24\u5BB3\u500D\u7387: initialDamage,
            \u4F24\u5BB3\u6210\u957F\u503C: calcFixedSkillDamageStep(skill, initialDamage, normalizedLevel, DAMAGE_VERSION, currentMode),
            \u4F24\u5BB3\u500D\u7387\u7248\u672C: DAMAGE_VERSION
        };
    }

    function normalizeSkillSystemMode(mode) {
        return mode === 'combo' ? 'combo' : DEFAULT_SKILL_SYSTEM_MODE;
    }

    function getSkillSystemMode(statData) {
        return normalizeSkillSystemMode(statData?.\u7CFB\u7EDF\u914D\u7F6E?.\u6280\u80FD\u7CFB\u7EDF\u6A21\u5F0F);
    }

    function createFixedSlotArray(values, size = 3) {
        return Array.from({ length: size }, (_, index) => (values && values[index]) || '');
    }

    function getComboSkillState(statData) {
        const raw = statData?.\u7CFB\u7EDF\u914D\u7F6E?.\u7EC4\u5408\u6280\u80FD\u72B6\u6001 || {};
        return {
            \u5F53\u524D\u9AD8\u7EA7\u7EC4: COMBO_ADVANCED_GROUP_ORDER.includes(raw.\u5F53\u524D\u9AD8\u7EA7\u7EC4) ? raw.\u5F53\u524D\u9AD8\u7EA7\u7EC4 : COMBO_STATE_DEFAULT.\u5F53\u524D\u9AD8\u7EA7\u7EC4,
            \u5F53\u524D\u663E\u793A\u69FD: raw.\u5F53\u524D\u663E\u793A\u69FD === 'ultimate' ? 'ultimate' : COMBO_STATE_DEFAULT.\u5F53\u524D\u663E\u793A\u69FD,
            custom: raw.custom === true
        };
    }

    function getLearnedSkillNamesByTier(statData, tierName) {
        const \u6280\u80FD\u5217\u8868 = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        return Object.entries(\u6280\u80FD\u5217\u8868)
            .filter(([_, skill]) => skill?.\u9636\u4F4D === tierName && safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0) > 0)
            .map(([name]) => name);
    }

    function sanitizeComboSlotSkillName(skillList, skillName, allowedTiers) {
        if (!skillName) return '';
        const skill = skillList ? skillList[skillName] : null;
        if (!skill || safeParseInt(skill?.\u5F53\u524D\u7B49\u7EA7, 0) <= 0) return '';
        if (Array.isArray(allowedTiers) && allowedTiers.length > 0 && !allowedTiers.includes(skill.\u9636\u4F4D)) return '';
        return skillName;
    }

    function normalizeComboSlotArray(skillList, rawSlots, slotRules) {
        return slotRules.map((allowedTiers, index) => sanitizeComboSlotSkillName(skillList, rawSlots ? rawSlots[index] : '', allowedTiers));
    }

    function getDefaultComboEquipState(statData) {
        const comboState = getComboSkillState(statData);
        const \u57FA\u7840 = getLearnedSkillNamesByTier(statData, '\u57FA\u7840');
        const \u8F6C\u804C = getLearnedSkillNamesByTier(statData, '\u8F6C\u804C');
        const \u8FDB\u9636 = getLearnedSkillNamesByTier(statData, '\u8FDB\u9636');
        const \u5FC5\u6740 = getLearnedSkillNamesByTier(statData, '\u5FC5\u6740');
        const \u5965\u4E49 = getLearnedSkillNamesByTier(statData, '\u5965\u4E49');
        return {
            \u5F53\u524D\u9AD8\u7EA7\u7EC4: comboState.\u5F53\u524D\u9AD8\u7EA7\u7EC4,
            \u5F53\u524D\u663E\u793A\u69FD: comboState.\u5F53\u524D\u663E\u793A\u69FD,
            custom: comboState.custom === true,
            \u57FA\u7840\u6280\u80FD\u69FD: createFixedSlotArray(\u57FA\u7840.slice(0, 3)),
            \u8F6C\u804C\u6280\u80FD\u69FD: createFixedSlotArray(\u8F6C\u804C.slice(0, 3)),
            \u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E: {
                alpha: createFixedSlotArray([\u8FDB\u9636[0], \u8FDB\u9636[1], \u5FC5\u6740[0]]),
                beta: createFixedSlotArray([\u8FDB\u9636[1], \u8FDB\u9636[2], \u5FC5\u6740[1]]),
                gamma: createFixedSlotArray([\u8FDB\u9636[2], \u8FDB\u9636[0], \u5FC5\u6740[2]]),
                ultimate: createFixedSlotArray(\u5965\u4E49.slice(0, 3))
            }
        };
    }

    function getComboEquipState(statData, stateOverride = null) {
        const skillList = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        const rawState = statData?.\u7CFB\u7EDF\u914D\u7F6E?.\u7EC4\u5408\u6280\u80FD\u72B6\u6001 || {};
        const mergedState = stateOverride ? {
            ...rawState,
            ...stateOverride,
            \u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E: {
                ...(rawState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E || {}),
                ...((stateOverride && stateOverride.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E) || {})
            }
        } : rawState;
        const defaults = getDefaultComboEquipState(statData);
        const currentGroup = COMBO_ADVANCED_GROUP_ORDER.includes(mergedState.\u5F53\u524D\u9AD8\u7EA7\u7EC4)
            ? mergedState.\u5F53\u524D\u9AD8\u7EA7\u7EC4
            : defaults.\u5F53\u524D\u9AD8\u7EA7\u7EC4;
        return {
            \u5F53\u524D\u9AD8\u7EA7\u7EC4: currentGroup,
            \u5F53\u524D\u663E\u793A\u69FD: mergedState.\u5F53\u524D\u663E\u793A\u69FD === 'ultimate' ? 'ultimate' : defaults.\u5F53\u524D\u663E\u793A\u69FD,
            custom: mergedState.custom === true,
            \u57FA\u7840\u6280\u80FD\u69FD: normalizeComboSlotArray(skillList, mergedState.\u57FA\u7840\u6280\u80FD\u69FD || defaults.\u57FA\u7840\u6280\u80FD\u69FD, COMBO_BASE_SLOT_RULES),
            \u8F6C\u804C\u6280\u80FD\u69FD: normalizeComboSlotArray(skillList, mergedState.\u8F6C\u804C\u6280\u80FD\u69FD || defaults.\u8F6C\u804C\u6280\u80FD\u69FD, COMBO_CLASS_SLOT_RULES),
            \u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E: {
                alpha: normalizeComboSlotArray(skillList, (mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E && mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.alpha) || defaults.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.alpha, COMBO_GROUP_SLOT_RULES.alpha),
                beta: normalizeComboSlotArray(skillList, (mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E && mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.beta) || defaults.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.beta, COMBO_GROUP_SLOT_RULES.beta),
                gamma: normalizeComboSlotArray(skillList, (mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E && mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.gamma) || defaults.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.gamma, COMBO_GROUP_SLOT_RULES.gamma),
                ultimate: normalizeComboSlotArray(skillList, (mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E && mergedState.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.ultimate) || defaults.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E.ultimate, COMBO_GROUP_SLOT_RULES.ultimate)
            }
        };
    }

    function ensureComboSkillState(statData) {
        if (!statData.\u7CFB\u7EDF\u914D\u7F6E) statData.\u7CFB\u7EDF\u914D\u7F6E = {};
        const next = getComboEquipState(statData);
        statData.\u7CFB\u7EDF\u914D\u7F6E.\u7EC4\u5408\u6280\u80FD\u72B6\u6001 = next;
        return next;
    }

    function getComboSlotPlan(statData, stateOverride = null) {
        const \u6280\u80FD\u5217\u8868 = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        const state = getComboEquipState(statData, stateOverride);
        const toEntry = (skillName) => skillName ? [skillName, \u6280\u80FD\u5217\u8868[skillName] || {}] : null;
        const advancedGroups = Object.fromEntries(COMBO_GROUP_ORDER.map((groupKey) => [
            groupKey,
            (state.\u9AD8\u7EA7\u6280\u80FD\u7EC4\u914D\u7F6E[groupKey] || []).map(toEntry).filter(Boolean)
        ]));
        const advancedSlots = advancedGroups[state.\u5F53\u524D\u9AD8\u7EA7\u7EC4] || [];
        const ultimateSlots = advancedGroups.ultimate || [];
        return {
            state,
            baseSlots: [...state.\u57FA\u7840\u6280\u80FD\u69FD.map(toEntry), ...state.\u8F6C\u804C\u6280\u80FD\u69FD.map(toEntry)],
            advancedGroups,
            advancedSlots,
            ultimateSlots,
            displaySlots: state.\u5F53\u524D\u663E\u793A\u69FD === 'ultimate' ? ultimateSlots : advancedSlots
        };
    }

    function buildComboSlotSkillData(skillName, skill, existingSlot, equipBonuses = {}, statData = null) {
        const nextSlot = existingSlot ? { ...existingSlot } : {};
        const effectiveLevel = Math.max(1, getEffectiveSkillLevel(skill, equipBonuses) || safeParseInt(nextSlot.\u6280\u80FD\u7B49\u7EA7, 1));
        const damageState = resolveComboSlotDamageState(skill, existingSlot, effectiveLevel, statData);
        nextSlot.\u540D\u79F0 = skillName;
        nextSlot.\u7C7B\u578B = skill?.\u7C7B\u578B || nextSlot.\u7C7B\u578B || '\u4E3B\u52A8';
        nextSlot.\u6280\u80FD\u7B49\u7EA7 = effectiveLevel;
        nextSlot.\u51B7\u5374\u4E2D = nextSlot.\u51B7\u5374\u4E2D === true || safeParseInt(skill?.\u51B7\u5374\u8BA1\u6570, 0) > 0;
        nextSlot.\u4F24\u5BB3\u500D\u7387 = damageState.\u4F24\u5BB3\u500D\u7387;
        nextSlot.\u4F24\u5BB3\u6210\u957F\u503C = damageState.\u4F24\u5BB3\u6210\u957F\u503C;
        nextSlot.\u4F24\u5BB3\u500D\u7387\u7248\u672C = damageState.\u4F24\u5BB3\u500D\u7387\u7248\u672C;
        if (Object.prototype.hasOwnProperty.call(nextSlot, '\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F')) delete nextSlot.\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F;
        nextSlot.\u9636\u4F4D = skill?.\u9636\u4F4D || nextSlot.\u9636\u4F4D || '\u57FA\u7840';
        nextSlot.\u63CF\u8FF0 = skill?.\u63CF\u8FF0 || nextSlot.\u63CF\u8FF0 || '';
        nextSlot.\u7279\u6B8A\u6548\u679C = getSpecialEffectObj({ ...skill, \u5F53\u524D\u7B49\u7EA7: effectiveLevel });
        if (skill?.\u53EC\u5524\u7269\u540D\u79F0) nextSlot.\u53EC\u5524\u7269\u540D\u79F0 = skill.\u53EC\u5524\u7269\u540D\u79F0;
        else if (nextSlot.\u53EC\u5524\u7269\u540D\u79F0) delete nextSlot.\u53EC\u5524\u7269\u540D\u79F0;
        return nextSlot;
    }

    function syncComboActiveSlots(statData) {
        if (getSkillSystemMode(statData) !== 'combo') return;
        const \u4EBA\u7269 = statData?.\u4EBA\u7269;
        if (!\u4EBA\u7269) return;
        const \u6280\u80FD\u5217\u8868 = \u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        const currentSlots = \u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD || {};
        const equipBonuses = collectSkillTierEquipBonuses(\u4EBA\u7269?.\u88C5\u5907\u5217\u8868 || {});
        const plan = getComboSlotPlan(statData);
        const nextSlots = {};
        logCalc(`[Chuyển đổi tổ hợp] Trước sync ô kỹ năng currentKeys=[${Object.keys(currentSlots).join(', ')}] currentCooling=[${Object.entries(currentSlots).filter(([_, slot]) => slot?.\u51B7\u5374\u4E2D === true).map(([name]) => name).join(', ')}]`);
        logCalc(`[Chuyển đổi tổ hợp] Kế hoạch sync ô kỹ năng base=[${plan.baseSlots.map(entry => entry?.[0] || '').join(', ')}] display=[${plan.displaySlots.map(entry => entry?.[0] || '').join(', ')}]`);
        [...plan.baseSlots, ...plan.displaySlots].forEach(entry => {
            if (!entry) return;
            const [skillName, skill] = entry;
            const treeSkill = \u6280\u80FD\u5217\u8868[skillName] || skill;
            nextSlots[skillName] = buildComboSlotSkillData(skillName, treeSkill, currentSlots[skillName], equipBonuses, statData);
        });
        logCalc(`[Chuyển đổi tổ hợp] Ứng viên sau sync nextKeys=[${Object.keys(nextSlots).join(', ')}] nextCooling=[${Object.entries(nextSlots).filter(([_, slot]) => slot?.\u51B7\u5374\u4E2D === true).map(([name]) => name).join(', ')}]`);
        if (!_.isEqual(currentSlots, nextSlots)) {
            \u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD = nextSlots;
            logCalc(`[Chuyển đổi tổ hợp] Sync đã ghi vào ô kỹ năng chủ động`);
        } else {
            logCalc(`[Chuyển đổi tổ hợp] Sync không cần đổi ô kỹ năng chủ động`);
        }
    }

    function clearComboActiveSlots(statData) {
        const \u4EBA\u7269 = statData?.\u4EBA\u7269;
        if (!\u4EBA\u7269) return;
        \u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD = {};
        \u4EBA\u7269.\u89C9\u9192\u6280\u80FD\u69FD = {};
    }

    function handleComboBattleEntry(statData, statDataBefore) {
        if (getSkillSystemMode(statData) !== 'combo') return false;
        const \u6218\u6597\u4E2D = statData?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D === true;
        const \u6218\u6597\u524D = statDataBefore?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D === true;
        if (!\u6218\u6597\u4E2D || \u6218\u6597\u524D) return false;
        const currentState = ensureComboSkillState(statData);
        if (currentState.custom === true) {
            logCalc('[Chuyển đổi tổ hợp] custom=true, khi vào chiến đấu không đặt lại nhóm cao cấp/ô hiển thị');
            return false;
        }
        currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 = 'alpha';
        currentState.\u5F53\u524D\u663E\u793A\u69FD = 'advanced';
        return true;
    }

    function syncSkillSlotsByMode(statData, statDataBefore, opts = {}) {
        const { syncComboSlots = false } = opts;
        const \u4EBA\u7269 = statData?.\u4EBA\u7269;
        if (!\u4EBA\u7269) return;
        if (!\u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD) \u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD = {};
        if (!\u4EBA\u7269.\u89C9\u9192\u6280\u80FD\u69FD) \u4EBA\u7269.\u89C9\u9192\u6280\u80FD\u69FD = {};

        const currentMode = getSkillSystemMode(statData);
        const prevMode = getSkillSystemMode(statDataBefore || {});
        const comboState = currentMode === 'combo' ? ensureComboSkillState(statData) : null;
        const shouldSyncCustomComboSlots = currentMode === 'combo' && comboState?.custom === true;

        if (currentMode === 'combo') {
            if (syncComboSlots || shouldSyncCustomComboSlots) syncComboActiveSlots(statData);
            else if (prevMode !== 'combo') clearComboActiveSlots(statData);
            return;
        }

        if (prevMode === 'combo') {
            clearComboActiveSlots(statData);
        }
    }

    function syncEquippedSkillSlotDamageState(statData, options = {}) {
        const \u4EBA\u7269 = statData?.\u4EBA\u7269;
        const \u6280\u80FD\u5217\u8868 = \u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        if (!\u4EBA\u7269 || !\u6280\u80FD\u5217\u8868) return;
        const equipBonuses = collectSkillTierEquipBonuses(\u4EBA\u7269?.\u88C5\u5907\u5217\u8868 || {});
        ['\u4E3B\u52A8\u6280\u80FD\u69FD', '\u89C9\u9192\u6280\u80FD\u69FD'].forEach(slotKey => {
            const slots = \u4EBA\u7269?.[slotKey];
            if (!slots || typeof slots !== 'object') return;
            Object.entries(slots).forEach(([skillName, slotData]) => {
                if (!slotData || typeof slotData !== 'object') return;
                const skill = \u6280\u80FD\u5217\u8868[skillName];
                if (!skill) return;
                const effectiveLevel = Math.max(1, getEffectiveSkillLevel(skill, equipBonuses) || safeParseInt(slotData.\u6280\u80FD\u7B49\u7EA7, 1));
                const damageState = resolveComboSlotDamageState(skill, slotData, effectiveLevel, statData, options);
                slotData.\u540D\u79F0 = skillName;
                slotData.\u7C7B\u578B = skill?.\u7C7B\u578B || slotData.\u7C7B\u578B || '\u4E3B\u52A8';
                slotData.\u6280\u80FD\u7B49\u7EA7 = effectiveLevel;
                slotData.\u4F24\u5BB3\u500D\u7387 = damageState.\u4F24\u5BB3\u500D\u7387;
                slotData.\u4F24\u5BB3\u6210\u957F\u503C = damageState.\u4F24\u5BB3\u6210\u957F\u503C;
                slotData.\u4F24\u5BB3\u500D\u7387\u7248\u672C = damageState.\u4F24\u5BB3\u500D\u7387\u7248\u672C;
                if (Object.prototype.hasOwnProperty.call(slotData, '\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F')) delete slotData.\u4F24\u5BB3\u500D\u7387\u6A21\u5F0F;
                slotData.\u9636\u4F4D = skill?.\u9636\u4F4D || slotData.\u9636\u4F4D || '\u57FA\u7840';
                slotData.\u63CF\u8FF0 = skill?.\u63CF\u8FF0 || slotData.\u63CF\u8FF0 || '';
                slotData.\u7279\u6B8A\u6548\u679C = getSpecialEffectObj({ ...skill, \u5F53\u524D\u7B49\u7EA7: effectiveLevel });
                if (skill?.\u53EC\u5524\u7269\u540D\u79F0) slotData.\u53EC\u5524\u7269\u540D\u79F0 = skill.\u53EC\u5524\u7269\u540D\u79F0;
                else if (slotData.\u53EC\u5524\u7269\u540D\u79F0) delete slotData.\u53EC\u5524\u7269\u540D\u79F0;
            });
        });
    }

    function collectComboRoundUsage(statData, statDataBefore) {
        if (getSkillSystemMode(statData) !== 'combo') return;
        const currentSlots = statData?.\u4EBA\u7269?.\u4E3B\u52A8\u6280\u80FD\u69FD || {};
        const prevSlots = statDataBefore?.\u4EBA\u7269?.\u4E3B\u52A8\u6280\u80FD\u69FD || {};
        const usedSet = new Set();
        Object.entries(currentSlots).forEach(([skillName, slot]) => {
            if (slot?.\u51B7\u5374\u4E2D === true && prevSlots?.[skillName]?.\u51B7\u5374\u4E2D !== true) {
                usedSet.add(skillName);
            }
        });
        logCalc(`[Chuyển đổi tổ hợp] Phát hiện kỹ năng đã dùng trong lượt này current=[${Object.entries(currentSlots).filter(([_, slot]) => slot?.\u51B7\u5374\u4E2D === true).map(([name]) => name).join(', ')}] prev=[${Object.entries(prevSlots).filter(([_, slot]) => slot?.\u51B7\u5374\u4E2D === true).map(([name]) => name).join(', ')}] used=[${Array.from(usedSet).join(', ')}]`);
        return Array.from(usedSet);
    }

    function advanceComboSkillState(statData, statDataBefore, roundUsedSkillNames = []) {
        if (getSkillSystemMode(statData) !== 'combo') return false;
        const currentState = ensureComboSkillState(statData);
        if (currentState.custom === true) {
            logCalc('[Chuyển đổi tổ hợp] custom=true, bỏ qua tự động chuyển của script phụ trợ');
            return false;
        }
        const prevGroup = currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4;
        const prevDisplay = currentState.\u5F53\u524D\u663E\u793A\u69FD;
        const \u6218\u6597\u4E2D = statData?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D === true;
        logCalc(`[Chuyển đổi tổ hợp] Bắt đầu tiến trạng thái, đang chiến đấu=${\u6218\u6597\u4E2D} prevGroup=${prevGroup} prevDisplay=${prevDisplay} used=[${roundUsedSkillNames.join(', ')}]`);

        if (!\u6218\u6597\u4E2D) {
            currentState.\u5F53\u524D\u663E\u793A\u69FD = 'advanced';
            logCalc(`[Chuyển đổi tổ hợp] Không trong chiến đấu, đặt lại ô hiển thị thành advanced`);
            return prevGroup !== currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 || prevDisplay !== currentState.\u5F53\u524D\u663E\u793A\u69FD;
        }

        if (roundUsedSkillNames.length <= 0) {
            logCalc(`[Chuyển đổi tổ hợp] Bỏ qua tiến trạng thái: lần này không phát hiện kỹ năng mới vào hồi chiêu`);
            return false;
        }

        const finishedRoundState = {
            \u5F53\u524D\u9AD8\u7EA7\u7EC4: ['alpha', 'beta', 'gamma'].includes(currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4) ? currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 : 'alpha',
            \u5F53\u524D\u663E\u793A\u69FD: currentState.\u5F53\u524D\u663E\u793A\u69FD === 'ultimate' ? 'ultimate' : 'advanced'
        };
        const finishedRoundPlan = getComboSlotPlan(statData, finishedRoundState);
        const usedSet = new Set(roundUsedSkillNames);
        const baseNames = finishedRoundPlan.baseSlots.map(entry => entry?.[0] || '');
        const finishedRoundGroup = finishedRoundState.\u5F53\u524D\u9AD8\u7EA7\u7EC4;
        let targetGroup = finishedRoundGroup;
        logCalc(`[Chuyển đổi tổ hợp] Ô cơ bản/chuyển chức baseNames=${JSON.stringify(baseNames)} finishedRoundGroup=${finishedRoundGroup}`);
        logCalc(`[Chuyển đổi tổ hợp] Phán định kích hoạt alpha=${!!(baseNames[0] && baseNames[1] && usedSet.has(baseNames[0]) && usedSet.has(baseNames[1]))} beta=${!!(baseNames[2] && baseNames[3] && usedSet.has(baseNames[2]) && usedSet.has(baseNames[3]))} gamma=${!!(baseNames[4] && baseNames[5] && usedSet.has(baseNames[4]) && usedSet.has(baseNames[5]))}`);

        if (baseNames[0] && baseNames[1] && usedSet.has(baseNames[0]) && usedSet.has(baseNames[1])) targetGroup = 'alpha';
        else if (baseNames[2] && baseNames[3] && usedSet.has(baseNames[2]) && usedSet.has(baseNames[3])) targetGroup = 'beta';
        else if (baseNames[4] && baseNames[5] && usedSet.has(baseNames[4]) && usedSet.has(baseNames[5])) targetGroup = 'gamma';

        const targetAdvancedEntries = finishedRoundPlan.advancedGroups[targetGroup] || [];
        const hasConfiguredAdvancedGroup = targetAdvancedEntries.length > 0;
        currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 = hasConfiguredAdvancedGroup ? targetGroup : finishedRoundGroup;
        if (!hasConfiguredAdvancedGroup && targetGroup !== finishedRoundGroup) {
            logCalc(`[Chuyển đổi tổ hợp] Nhóm cao cấp mục tiêu ${targetGroup} chưa cấu hình kỹ năng nào, giữ nhóm hiện tại ${finishedRoundGroup}`);
        }
        logCalc(`[Chuyển đổi tổ hợp] Kết quả chuyển nhóm cao cấp nextGroup=${currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4}`);

        if (finishedRoundState.\u5F53\u524D\u663E\u793A\u69FD === 'ultimate') {
            const ultimateEntries = finishedRoundPlan.ultimateSlots;
            const hasConfiguredUltimate = ultimateEntries.length > 0;
            const allUltimateCooling = hasConfiguredUltimate && ultimateEntries.every(([skillName]) => {
                const treeSkill = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868?.[skillName];
                const slotSkill = statData?.\u4EBA\u7269?.\u4E3B\u52A8\u6280\u80FD\u69FD?.[skillName];
                return slotSkill?.\u51B7\u5374\u4E2D === true || safeParseInt(treeSkill?.\u51B7\u5374\u8BA1\u6570, 0) > 0;
            });
            currentState.\u5F53\u524D\u663E\u793A\u69FD = (!hasConfiguredUltimate || allUltimateCooling) ? 'advanced' : 'ultimate';
            logCalc(`[Chuyển đổi tổ hợp] Ô hiển thị hiện tại vốn là ultimate, hasConfiguredUltimate=${hasConfiguredUltimate} allUltimateCooling=${allUltimateCooling} -> nextDisplay=${currentState.\u5F53\u524D\u663E\u793A\u69FD}`);
        } else {
            const finishedRoundAdvancedEntries = finishedRoundPlan.advancedGroups[currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4] || [];
            const justCoolingCount = finishedRoundAdvancedEntries.reduce((count, [skillName]) => {
                return count + (usedSet.has(skillName) ? 1 : 0);
            }, 0);
            const hasConfiguredUltimate = finishedRoundPlan.ultimateSlots.length > 0;
            const hasReadyUltimate = hasConfiguredUltimate && finishedRoundPlan.ultimateSlots.some(([skillName]) => {
                const treeSkill = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868?.[skillName];
                return safeParseInt(treeSkill?.\u51B7\u5374\u8BA1\u6570, 0) <= 0;
            });
            currentState.\u5F53\u524D\u663E\u793A\u69FD = (justCoolingCount >= 2 && hasReadyUltimate) ? 'ultimate' : 'advanced';
            logCalc(`[Chuyển đổi tổ hợp] Phán định nhóm kết liễu justCoolingCount=${justCoolingCount} hasConfiguredUltimate=${hasConfiguredUltimate} hasReadyUltimate=${hasReadyUltimate} -> nextDisplay=${currentState.\u5F53\u524D\u663E\u793A\u69FD}`);
        }
        logCalc(`[Chuyển đổi tổ hợp] Kết thúc tiến trạng thái changed=${prevGroup !== currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 || prevDisplay !== currentState.\u5F53\u524D\u663E\u793A\u69FD} finalGroup=${currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4} finalDisplay=${currentState.\u5F53\u524D\u663E\u793A\u69FD}`);
        return prevGroup !== currentState.\u5F53\u524D\u9AD8\u7EA7\u7EC4 || prevDisplay !== currentState.\u5F53\u524D\u663E\u793A\u69FD;
    }

    function getSkillCooldownByTier(tierName = '', modeOrData = DEFAULT_COMBAT_VALUE_MODE) {
        const config = getSkillTierConfig(modeOrData);
        return Math.max(0, safeParseInt(config?.[tierName]?.\u51B7\u5374, 0));
    }

    function getAllSlotSkills(statData) {
        const \u4EBA\u7269 = statData?.\u4EBA\u7269;
        if (!\u4EBA\u7269) return {};
        return {
            ...(\u4EBA\u7269.\u4E3B\u52A8\u6280\u80FD\u69FD || {}),
            ...(\u4EBA\u7269.\u89C9\u9192\u6280\u80FD\u69FD || {})
        };
    }

    function detectPhaseShift(statData, statDataBefore) {
        const newEffects = statData?.\u4EBA\u7269?.\u72B6\u6001\u6548\u679C || {};
        const oldEffects = statDataBefore?.\u4EBA\u7269?.\u72B6\u6001\u6548\u679C || {};

        for (const name of Object.keys(newEffects)) {
            if (name.includes('\u76F8\u4F4D\u8F6C\u79FB') && name.includes('\u51B7\u5374')) {
                if (!oldEffects[name] || JSON.stringify(oldEffects[name]) !== JSON.stringify(newEffects[name])) {
                    logCalc(`[Hệ thống hồi chiêu] Phát hiện chuyển pha: "${name}"`);
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 处理技能冷却逻辑（MVU 变量版）
     *
     * 冷却规则：释放回合不算入冷却。
     *   冷却N 的含义：释放后需再等 N 个回合才可用。
     *   例：冷却1(进阶) → 释放回合后等1轮可用
     *       冷却2(必杀) → 释放回合后等2轮可用
     *       冷却3(奥义) → 释放回合后等3轮可用
     *
     * 冷却计数 存在技能树上，表示"还需等待的轮数"：
     *   进入冷却时按当前战斗数值模式写入阶位冷却
     *   每轮推进 -1，降到 0 时清除 冷却中
     *   释放回合轮次不变，所以不会被递减
     */
    let _lastRound = -1;

    function handleSkillCooldowns(statData, statDataBefore) {
        const allSlotSkills = getAllSlotSkills(statData);
        const \u6280\u80FD\u5217\u8868 = statData?.\u4EBA\u7269?.\u6280\u80FD\u6811?.\u6280\u80FD\u5217\u8868 || {};
        const \u5F53\u524D\u8F6E\u6B21 = statData?.\u6218\u6597?.\u5F53\u524D\u8F6E\u6B21 || 0;
        const \u4E0A\u6B21\u8F6E\u6B21 = statDataBefore?.\u6218\u6597?.\u5F53\u524D\u8F6E\u6B21 ?? _lastRound;

        // 无条件诊断日志：确认函数被调用
        const slotNames = Object.keys(allSlotSkills);
        const coolingSkills = Object.entries(allSlotSkills)
            .filter(([_, s]) => s.\u51B7\u5374\u4E2D === true)
            .map(([n]) => {
                const treeSkill = \u6280\u80FD\u5217\u8868[n];
                return `${n}(${treeSkill?.\u51B7\u5374\u8BA1\u6570 || 0})`;
            });
        logCalc(`[Hệ thống hồi chiêu] Vòng=${\u5F53\u524D\u8F6E\u6B21}(lần trước=${\u4E0A\u6B21\u8F6E\u6B21}), _lastRound=${_lastRound}, số ô kỹ năng=${slotNames.length}, đang hồi chiêu: [${coolingSkills.join(', ')}]`);

        // 1. 轮次推进 → 已有冷却计数的技能递减
        const justExpired = new Set(); // 记录本帧刚递减到0的技能
        if (\u5F53\u524D\u8F6E\u6B21 > \u4E0A\u6B21\u8F6E\u6B21 && \u4E0A\u6B21\u8F6E\u6B21 >= 0) {
            const delta = \u5F53\u524D\u8F6E\u6B21 - \u4E0A\u6B21\u8F6E\u6B21;
            for (const [name, treeSkill] of Object.entries(\u6280\u80FD\u5217\u8868)) {
                if (treeSkill.\u51B7\u5374\u8BA1\u6570 > 0) {
                    const before = treeSkill.\u51B7\u5374\u8BA1\u6570;
                    treeSkill.\u51B7\u5374\u8BA1\u6570 = Math.max(0, treeSkill.\u51B7\u5374\u8BA1\u6570 - delta);
                    logCalc(`[Hệ thống hồi chiêu] Vòng tiến (+${delta}): "${name}" bộ đếm hồi chiêu ${before}→${treeSkill.\u51B7\u5374\u8BA1\u6570}`);
                    if (treeSkill.\u51B7\u5374\u8BA1\u6570 <= 0) {
                        justExpired.add(name);
                    }
                }
            }
        }

        // 2. 相位转移 → 额外 -1
        const phaseShift = detectPhaseShift(statData, statDataBefore);
        if (phaseShift) {
            for (const [name, treeSkill] of Object.entries(\u6280\u80FD\u5217\u8868)) {
                if (treeSkill.\u51B7\u5374\u8BA1\u6570 > 0) {
                    treeSkill.\u51B7\u5374\u8BA1\u6570 = Math.max(0, treeSkill.\u51B7\u5374\u8BA1\u6570 - 1);
                    logCalc(`[Hệ thống hồi chiêu] Chuyển pha: "${name}" bộ đếm hồi chiêu→${treeSkill.\u51B7\u5374\u8BA1\u6570}`);
                    if (treeSkill.\u51B7\u5374\u8BA1\u6570 <= 0) {
                        justExpired.add(name);
                    }
                }
            }
        }

        // 3. 新进入冷却检测
        //    条件：冷却中=true 且 冷却计数<=0 且 不是本帧刚递减到0的（那些是冷却结束，不是新冷却）
        for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
            if (slotSkill.\u51B7\u5374\u4E2D !== true) continue;
            if (justExpired.has(name)) continue; // 本帧刚递减到0，是冷却结束不是新冷却

            const treeSkill = \u6280\u80FD\u5217\u8868[name];
            if (!treeSkill) continue;
            if (treeSkill.\u51B7\u5374\u8BA1\u6570 > 0) continue; // 已在倒计时中

            const tier = slotSkill.\u9636\u4F4D || treeSkill.\u9636\u4F4D || '\u57FA\u7840';
            const tierCD = getSkillCooldownByTier(tier, statData);
            if (tierCD <= 0) {
                // 基础/转职：无冷却，立即恢复
                slotSkill.\u51B7\u5374\u4E2D = false;
                treeSkill.\u51B7\u5374\u8BA1\u6570 = 0;
                logCalc(`[Hệ thống hồi chiêu] Kỹ năng "${name}" cấp bậc=${tier}, không có hồi chiêu, khôi phục ngay`);
            } else {
                treeSkill.\u51B7\u5374\u8BA1\u6570 = tierCD;
                logCalc(`[Hệ thống hồi chiêu] Kỹ năng "${name}" vào hồi chiêu, cấp bậc=${tier}, số vòng chờ=${tierCD}`);
            }
        }

        // 4. 冷却计数归零 → 恢复可用
        for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
            const treeSkill = \u6280\u80FD\u5217\u8868[name];
            if (slotSkill.\u51B7\u5374\u4E2D === true && treeSkill && treeSkill.\u51B7\u5374\u8BA1\u6570 <= 0) {
                slotSkill.\u51B7\u5374\u4E2D = false;
                treeSkill.\u51B7\u5374\u8BA1\u6570 = 0;
                logCalc(`[Hệ thống hồi chiêu] "${name}" kết thúc hồi chiêu, đã khôi phục khả dụng`);
            }
        }

        // 5. 战斗结束 → 清空所有冷却
        if (\u5F53\u524D\u8F6E\u6B21 === 0 && !statData?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D) {
            for (const [name, slotSkill] of Object.entries(allSlotSkills)) {
                if (slotSkill.\u51B7\u5374\u4E2D === true) {
                    slotSkill.\u51B7\u5374\u4E2D = false;
                }
            }
            for (const [name, treeSkill] of Object.entries(\u6280\u80FD\u5217\u8868)) {
                if (treeSkill.\u51B7\u5374\u8BA1\u6570 > 0) {
                    treeSkill.\u51B7\u5374\u8BA1\u6570 = 0;
                    logCalc(`[Hệ thống hồi chiêu] Chiến đấu kết thúc: đã xóa hồi chiêu của "${name}"`);
                }
            }
        }

        _lastRound = \u5F53\u524D\u8F6E\u6B21;
    }

    function hasEquippedComboSkill(player) {
        const comboSlot = player?.\u8FDE\u643A\u5965\u4E49\u69FD;
        if (!comboSlot || typeof comboSlot !== 'object') return false;
        return String(comboSlot.\u6280\u80FD\u540D || '').trim().length > 0;
    }

    function handleComboCpRecovery(statData, statDataBefore) {
        const player = statData?.\u4EBA\u7269;
        if (!player) return;
        if (statData?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D !== true) return;
        if (statDataBefore?.\u6218\u6597?.\u662F\u5426\u6218\u6597\u4E2D !== true) return;
        if (!hasEquippedComboSkill(player)) return;

        const \u5F53\u524D\u8F6E\u6B21 = safeParseInt(statData?.\u6218\u6597?.\u5F53\u524D\u8F6E\u6B21, 0);
        const \u4E0A\u6B21\u8F6E\u6B21 = safeParseInt(statDataBefore?.\u6218\u6597?.\u5F53\u524D\u8F6E\u6B21, \u5F53\u524D\u8F6E\u6B21);
        const \u8F6E\u6B21\u5DEE = \u5F53\u524D\u8F6E\u6B21 - \u4E0A\u6B21\u8F6E\u6B21;
        if (\u8F6E\u6B21\u5DEE <= 0) return;

        const beforeCP = clamp(safeParseFloat(player.CP, 0), 0, 100);
        const nextCP = clamp(beforeCP + 20 * \u8F6E\u6B21\u5DEE, 0, 100);
        if (player.CP !== nextCP) {
            player.CP = nextCP;
        }
        if (nextCP > beforeCP) {
            const comboName = String(player.\u8FDE\u643A\u5965\u4E49\u69FD?.\u6280\u80FD\u540D || '').trim();
                logCalc(`[CP liên kết] Vòng chiến đấu tiến (+${\u8F6E\u6B21\u5DEE}), áo nghĩa liên kết đã trang bị "${comboName}", CP ${beforeCP}→${nextCP}`);
        }
    }

    // ==========================================
    // 变量守卫：拦截 AI 对受保护字段的非法修改
    // ==========================================

    const PROTECTED_PATHS = [
        '\u4EBA\u7269.\u7B49\u7EA7',
        '\u4EBA\u7269.\u5347\u7EA7\u9608\u503C',
    ];

    function getByPath(obj, path) {
        return path.split('.').reduce((o, k) => o?.[k], obj);
    }

    function setByPath(obj, path, value) {
        const keys = path.split('.');
        let cur = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            if (cur[keys[i]] === undefined) return;
            cur = cur[keys[i]];
        }
        cur[keys[keys.length - 1]] = value;
    }

    const BOND_BRIEF_PATH_PREFIX = '/\u7F81\u7ECA\u5217\u8868/';

    function clonePlainValue(value) {
        if (value === undefined) return undefined;
        if (typeof _ !== 'undefined' && _?.cloneDeep) return _.cloneDeep(value);
        return JSON.parse(JSON.stringify(value));
    }

    function selectStarterModeEffect(source, mode) {
        if (!source || typeof source !== 'object') return undefined;
        const effectKey = normalizeCombatValueMode(mode) === 'new' ? '\u65B0\u7248\u6548\u679C' : '\u7ECF\u5178\u6548\u679C';
        if (source[effectKey] !== undefined) return clonePlainValue(source[effectKey]);
        if (source.\u6548\u679C !== undefined) return clonePlainValue(source.\u6548\u679C);
        return undefined;
    }

    function applyStarterTemplateEffectsByMode(value, mode) {
        if (!value || typeof value !== 'object') return value;
        if (Array.isArray(value)) {
            value.forEach(item => applyStarterTemplateEffectsByMode(item, mode));
            return value;
        }

        const selectedEffect = selectStarterModeEffect(value, mode);
        if (selectedEffect !== undefined) {
            value.\u6548\u679C = selectedEffect;
        }
        delete value.\u7ECF\u5178\u6548\u679C;
        delete value.\u65B0\u7248\u6548\u679C;

        Object.entries(value).forEach(([key, child]) => {
            if (key === '\u6548\u679C') return;
            if (child && typeof child === 'object') {
                applyStarterTemplateEffectsByMode(child, mode);
            }
        });

        return value;
    }

    const STARTER_TEAMMATE_TEMPLATE_MAP = {
                            'Forte': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Huyễn Tưởng Chủng',
                                \u7B49\u7EA7: 95,
                                \u5C5E\u6027: { \u529B\u91CF: 28, \u654F\u6377: 24, \u4F53\u8D28: 26, \u667A\u529B: 14, \u611F\u77E5: 18, \u9B45\u529B: 26 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Hắc Ám Long Thương': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Hắc Ám Long Thương', \u54C1\u8D28: 'Sử thi', \u7B49\u7EA7: 95, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u529B\u91CF: 2, \u4F53\u8D28: 2 },
                                        \u6548\u679C: '[Thiên ân] Khi ở ngoài trời hoặc trên không, kiểm định toàn thuộc tính +2;[Long uy] Khi gây sát thương cho [Long tộc] hoặc [quái vật không phải Huyền thoại], mục tiêu phải thực hiện kiểm định ý chí, thất bại thì rơi vào [Run sợ](AC-2);[Tuyệt kỹ · Thương rơi sao] chỉ có thể dùng khi đang bay hoặc ở nơi cao. Phát động cú bổ nhào hủy diệt, xúc xắc sát thương của công kích lần này gấp đôi. Nếu giết mục tiêu, lập tức làm mới hành động vòng này, có thể hành động lần nữa.',
                                        \u63CF\u8FF0: 'Thương yêu của Forte, cây kỵ thương khổng lồ hai màu đen trắng. Nghe nói mũi thương không chỉ từng nhuộm máu vô số cự long, mà còn từng xuyên thủng lưu tinh nơi vòm trời. Người cầm cây thương này xem mặt đất là bãi săn.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Trọng giáp Hắc Kim': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Trọng giáp Hắc Kim', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 95, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u4F53\u8D28: 8, \u7269\u7406\u51CF\u4F24: 15, \u751F\u547D\u503C\u4E0A\u9650: 500 },
                                        \u6548\u679C: '[Bất động] Là trọng giáp nhưng được xem như giáp nhẹ, không ảnh hưởng kiểm định linh hoạt. Miễn nhiễm hiệu ứng [Đẩy lùi], [Ngã xuống];[Nghịch lân] Bất kỳ kẻ tấn công cận chiến nào gây sát thương cho người mặc đều chịu sát thương phản lại bằng (điều chỉnh Thể chất của người mặc)d6;[Chủ động · Khiên long ngữ] 1 lần/ngày, khi HP về 0 thì chuyển từ 0 thành 1, đồng thời nhận trạng thái [Vô địch] kéo dài 1 vòng.',
                                        \u63CF\u8FF0: 'Bộ trọng giáp màu đen vàng với giáp vai và giáp ngực tạo hình hoa lệ. Nói là hộ cụ thì không bằng nói là phần kéo dài của da hắc long, sẽ theo chiến ý của chủ nhân mà dao động như hô hấp.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Hắc Ám Long Kỵ': { \u54C1\u8D28: 'Sử thi', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Cưỡi ma long từ trên cao bổ nhào oanh kích khu vực mặt đất, công kích gây [1000% + 25% × (Cấp độ - 1)] sát thương vật lý; kẻ địch trúng đòn phải thực hiện một lần kiểm định ý chí, thất bại thì rơi vào [Run sợ](AC-2) trong 1 vòng.', \u65B0\u7248\u6548\u679C: 'Cưỡi ma long từ trên cao bổ nhào oanh kích khu vực mặt đất, công kích gây [280% + 4% × (Cấp độ - 1)] sát thương vật lý; kẻ địch trúng đòn phải thực hiện một lần kiểm định ý chí, thất bại thì rơi vào [Run sợ](AC-2) trong 1 vòng.', \u63CF\u8FF0: 'Triệu hồi tọa kỵ hắc long từ trời giáng xuống, song thương xuyên thủng mặt đất, nơi long uy chạm tới vạn vật đều run sợ.' },
                                    'Phóng thích long uy': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Đặc biệt', \u7ECF\u5178\u6548\u679C: 'Phóng thích đấu khí của bá chủ bầu trời; kẻ địch có cấp thấp hơn bản thân từ 20 cấp trở lên tự động rơi vào [Sợ hãi], không thể hành động 1 vòng; các kẻ địch còn lại bị -2 vào kiểm định công kích đầu tiên trong vòng này.', \u65B0\u7248\u6548\u679C: 'Phóng thích đấu khí của bá chủ bầu trời; kẻ địch có cấp thấp hơn bản thân từ 20 cấp trở lên tự động rơi vào [Sợ hãi], không thể hành động 1 vòng; các kẻ địch còn lại bị -2 vào kiểm định công kích đầu tiên trong vòng này.', \u63CF\u8FF0: 'Chỉ bằng khí thế đã khiến kẻ yếu quỳ gối; đây là uy nghi vương giả bẩm sinh của bá chủ thống ngự bầu trời.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ sừng rồng tóc dài đen nhánh, hai mắt đỏ máu; trên đầu có một đôi sừng rồng đen uốn cong về sau, gốc sừng có vòng trang sức màu vàng, lông mày thường hơi nhíu để giữ uy nghi.',
                                \u7740\u88C5: 'Trọng giáp đen vàng phối váy ngắn xếp ly, giáp vai hoa lệ như cánh rồng, cổ áo buộc dải lụa đỏ, giày giáp đen quá gối gắn hộ giáp hoa văn rồng.',
                                \u597D\u611F\u5EA6: 20,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Hồng Liên': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 16, \u654F\u6377: 20, \u4F53\u8D28: 15, \u667A\u529B: 10, \u611F\u77E5: 16, \u9B45\u529B: 14 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Hoa không đỏ quá mười ngày': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Hoa không đỏ quá mười ngày', \u54C1\u8D28: 'Sử thi', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 2, \u611F\u77E5: 1, \u5168\u6280\u80FD: 2 },
                                        \u7ECF\u5178\u6548\u679C: '[Tàng hoa] Kích hoạt khi bạn phát động công kích cận chiến bằng tư thế iaido, rút đao hoặc truy kích; kiểm định công kích lần này +4, đồng thời ngưỡng chí mạng xem như giảm 2;[Huyết chấn] Kích hoạt khi công kích cận chiến của bạn trúng đích, nhận 1 tầng [Huyết chấn], kéo dài đến hết chiến đấu, tối đa 5 tầng; mỗi tầng khiến sát thương cuối của công kích cận chiến +6%, sau mỗi lần nhận [Huyết chấn] mất 1% sinh lực hiện tại;[Hồng hoa tận] Khi bạn phát động công kích cận chiến bằng hành động độc lập thứ 2 hoặc thứ 3 trong vòng này, có thể tiêu hao 1 tầng [Huyết chấn] để triệt tiêu 3 điểm giảm độ trúng liên kích; nếu bội suất trúng đích của công kích đó lớn hơn 0, mục tiêu nhận [Chảy máu] 2 vòng;[Mười ngày đỏ] 1 lần/mỗi trận, có thể phát động khi HP không cao hơn 25% hoặc [Huyết chấn] đạt 5 tầng. Thực hiện một nhát chém thẳng 15 yard, gây [1000% + 25% × (Cấp độ - 1)] sát thương vật lý, chắc chắn trúng đích; sau kết toán xóa sạch [Huyết chấn], đồng thời mất 25% sinh lực hiện tại, tối thiểu giữ lại 1 điểm.',
                                        \u65B0\u7248\u6548\u679C: '[Tàng hoa] Kích hoạt khi bạn phát động công kích cận chiến bằng tư thế iaido, rút đao hoặc truy kích; kiểm định công kích lần này +4, đồng thời ngưỡng chí mạng xem như giảm 2;[Huyết chấn] Kích hoạt khi công kích cận chiến của bạn trúng đích, nhận 1 tầng [Huyết chấn], kéo dài đến hết chiến đấu, tối đa 5 tầng; mỗi tầng khiến sát thương cuối của công kích cận chiến +6%, sau mỗi lần nhận [Huyết chấn] mất 1% sinh lực hiện tại;[Hồng hoa tận] Khi bạn phát động công kích cận chiến bằng hành động độc lập thứ 2 hoặc thứ 3 trong vòng này, có thể tiêu hao 1 tầng [Huyết chấn] để triệt tiêu 3 điểm giảm độ trúng liên kích; nếu bội suất trúng đích của công kích đó lớn hơn 0, mục tiêu nhận [Chảy máu] 2 vòng;[Mười ngày đỏ] 1 lần/mỗi trận, có thể phát động khi HP không cao hơn 25% hoặc [Huyết chấn] đạt 5 tầng. Thực hiện một nhát chém thẳng 15 yard, gây [280% + 4% × (Cấp độ - 1)] sát thương vật lý, chắc chắn trúng đích; sau kết toán xóa sạch [Huyết chấn], đồng thời mất 25% sinh lực hiện tại, tối thiểu giữ lại 1 điểm.',
                                        \u63CF\u8FF0: 'Thanh thái đao vỏ đen thừa kế từ chị gái Tường Hoa, thân đao cực mảnh. Khi hoa nở đến độ rực rỡ nhất cũng là khởi đầu của tàn phai.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Chiến y wafuu đỏ trắng': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Chiến y wafuu đỏ trắng', \u54C1\u8D28: 'Tinh xảo', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 2 },
                                        \u6548\u679C: 'Nhẹ nhàng linh hoạt, tăng nhẹ tỷ lệ né tránh.',
                                        \u63CF\u8FF0: 'Chiến y tay rộng phong cách wafuu lấy màu trắng làm chủ, cổ áo và cổ tay áo có viền đỏ, thuận tiện vung đao.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Hoa không đỏ quá mười ngày': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Rút đao iaido chém ra kiếm khí siêu tốc, công kích gây [800% + 20% × (Cấp độ - 1)] sát thương vật lý; nếu trong vòng này đã liên tục phát động công kích, sát thương cuối của lần này thêm +20%, bản thân mất 5% sinh lực hiện tại.', \u65B0\u7248\u6548\u679C: 'Rút đao iaido chém ra kiếm khí siêu tốc, công kích gây [240% + 3% × (Cấp độ - 1)] sát thương vật lý; nếu trong vòng này đã liên tục phát động công kích, sát thương cuối của lần này thêm +20%, bản thân mất 5% sinh lực hiện tại.', \u63CF\u8FF0: 'Ánh đao lóe lên, nhát chém đã tới. Trong thời đại đạn bay tán loạn mà vẫn chiến đấu bằng đao kiếm, dùng kỹ lượng thuần túy nghiền ép tất cả.' },
                                    'Kiếm ý trăm năm': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Đặc biệt', \u7ECF\u5178\u6548\u679C: 'Vào tư thế iaido, công kích kế tiếp chắc chắn chí mạng, chắc chắn trúng đích và bỏ qua giáp mục tiêu.', \u65B0\u7248\u6548\u679C: 'Vào tư thế iaido, công kích kế tiếp chắc chắn chí mạng, chắc chắn trúng đích và bỏ qua giáp mục tiêu.', \u63CF\u8FF0: 'Trăm năm mài giũa ngưng tụ trong một đao; khoảnh khắc vỏ đao khẽ vang, ngay cả không khí cũng bị chém đứt.' }
                                },
                                \u5916\u8C8C: 'Nữ kiếm khách phong cách wafuu với tóc dài vừa màu xám bạc rẽ lệch và đôi mắt hổ phách ôn nhuận; trên tóc cài hoa trà đỏ, đeo khuyên tai đỏ, đầu ngón tay sơn móng đỏ. Trong vẻ lười biếng vẫn lộ ra khí chất lẫm liệt.',
                                \u7740\u88C5: 'Chiến y wafuu tay rộng màu trắng viền đỏ, vạt áo rộng để lộ xương quai xanh, đai lưng đỏ sẫm bó eo, giáp váy đỏ trắng xẻ cao để lộ đôi chân thon dài. Đeo thái đao vỏ đen sau lưng.',
                                \u597D\u611F\u5EA6: 30,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Stephanie': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 6, \u654F\u6377: 12, \u4F53\u8D28: 10, \u667A\u529B: 20, \u611F\u77E5: 16, \u9B45\u529B: 20 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Ấn nhẫn của Ngu Vương': {
                                        \u7C7B\u578B: 'Trang sức', \u90E8\u4F4D: 'Nhẫn', \u540D\u79F0: 'Ấn nhẫn của Ngu Vương', \u54C1\u8D28: 'Truyền thuyết', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 1, \u9B45\u529B: 2, \u5168\u6280\u80FD: 1 },
                                        \u6548\u679C: '[Điều phối hậu cần] Stephanie không thể tấn công. Nhưng mỗi vòng cô có thể thực hiện một lần điều phối hậu cần: tiến hành kiểm định D20 cộng Mị lực, khiến một đồng đội hồi HP hoặc CP tối đa theo phần trăm bằng kết quả kiểm định (ví dụ kết quả kiểm định là 5 thì hồi 5% sinh lực tối đa), đồng thời khiến kiểm định hành động bất kỳ kế tiếp của người đó +3.[Ngu Vương] Chỉ định một phe bạn, thực hiện một lần kiểm định DC10 không cộng bất kỳ trị số nào; thành công thì kỹ năng kế tiếp của người đó sau khi sử dụng sẽ không vào hồi chiêu, thất bại thì thêm một kỹ năng ngẫu nhiên có thể vào hồi chiêu của người đó cũng bị đưa vào hồi chiêu.',
                                        \u63CF\u8FF0: 'Một chiếc ấn nhẫn vương thất cũ kỹ, không ẩn chứa ma pháp hủy thiên diệt địa nào. Nhưng đối với cô, đây là lời phó thác của người ông đã mất, cũng là tôn nghiêm vương gia mà cô dù dốc hết sức cũng phải rửa sạch nhục danh. Khi cô nắm chặt chiếc nhẫn này, cô gái dù yếu đuối đến đâu cũng có thể thể hiện quyết ý không lùi bước.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Váy dài được hoa sớm mai chúc phúc': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Váy dài được hoa sớm mai chúc phúc', \u54C1\u8D28: 'Hiếm', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u4F53\u8D28: 1, \u9B54\u6CD5\u51CF\u4F24: 10 },
                                        \u6548\u679C: '[Tiên vương che chở] Lần đầu tiên trong mỗi trận chiến chịu sát thương chí tử, chắc chắn cưỡng chế giữ lại 1 điểm HP và xóa sạch giá trị thù hận của phe địch đối với bản thân.',
                                        \u63CF\u8FF0: 'Bộ váy phương Tây hở vai truyền thống, dấu hiệu nổi bật là chiếc nơ bướm đỏ lớn ở cổ áo. Dù trong mắt một vài người nó có vẻ mát mẻ và thiếu phòng bị.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Hỗ trợ nội chính của vương nữ': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Hỗ trợ',
                                        \u7ECF\u5178\u6548\u679C: 'Khi có mặt trong đội, 【kiểm định chiến lợi phẩm】 của đội rơi thêm một món trang bị có phẩm chất phù hợp khoảng cấp, khi kết toán ghi chú là 【đặc sản Stephanie】. Ngoài ra, khi đội kết toán lợi ích đến từ bất kỳ nguồn nào (vàng/thiện cảm/danh vọng/kinh nghiệm), nhận thêm +50%; khi đàm phán với mục tiêu thân thiện và thu thập tình báo, kiểm định có lợi thế.',
                                        \u65B0\u7248\u6548\u679C: 'Khi có mặt trong đội, 【kiểm định chiến lợi phẩm】 của đội rơi thêm một món trang bị có phẩm chất phù hợp khoảng cấp, khi kết toán ghi chú là 【đặc sản Stephanie】. Ngoài ra, khi đội kết toán lợi ích đến từ bất kỳ nguồn nào (vàng/thiện cảm/danh vọng/kinh nghiệm), nhận thêm +50%; khi đàm phán với mục tiêu thân thiện và thu thập tình báo, kiểm định có lợi thế.',
                                        \u63CF\u8FF0: 'Chỉ cần có cô ở đó, đội vĩnh viễn không cần lo phá sản.'
                                    },
                                    'Lời kháng nghị liều mạng của Steph': {
                                        \u54C1\u8D28: 'Hiếm',
                                        \u7C7B\u578B: 'Khống chế',
                                        \u7ECF\u5178\u6548\u679C: 'Vừa rưng rưng nước mắt vừa kháng nghị cực kỳ dữ dội. Thu hút sự chú ý của toàn bộ kẻ địch trên sân (cưỡng chế khiêu khích tất cả kẻ địch 1 vòng); trong thời gian đó, kiểm định né tránh của bản thân có lợi thế (vì hoảng hốt chạy loạn khắp nơi); đồng thời khiến công kích kế tiếp của đồng đội kèm hiệu ứng [Thừa cơ xông vào], sát thương cuối cùng tăng thêm +30%.',
                                        \u65B0\u7248\u6548\u679C: 'Vừa rưng rưng nước mắt vừa kháng nghị cực kỳ dữ dội. Thu hút sự chú ý của toàn bộ kẻ địch trên sân (cưỡng chế khiêu khích tất cả kẻ địch 1 vòng); trong thời gian đó, kiểm định né tránh của bản thân có lợi thế (vì hoảng hốt chạy loạn khắp nơi); đồng thời khiến công kích kế tiếp của đồng đội kèm hiệu ứng [Thừa cơ xông vào], sát thương cuối cùng tăng thêm +30%.',
                                        \u63CF\u8FF0: '“Đừng coi tôi là đồ ngốc nữa!” Tuy bản thân cô rất nghiêm túc, dáng vẻ hoảng hốt ấy lại luôn kỳ diệu thu hút ánh mắt của mọi người, tạo ra sơ hở tuyệt hảo cho đồng đội.'
                                    }
                                },
                                \u5916\u8C8C: 'Mái tóc ngắn đỏ mềm mại xõa ngang vai, đôi mắt xanh nước trong veo. Khi đối nhân xử thế luôn mang nụ cười chân thành; tuy trước mặt đồng đội cô thường vì không theo kịp những lối suy nghĩ như đánh từ chiều không gian cao hơn mà gấp đến mức khóe mắt rưng rưng, biểu cảm vỡ trận, nhưng vào thời khắc then chốt, trong đôi mắt ấy sẽ bùng lên ánh sáng tuyệt không khuất phục.',
                                \u7740\u88C5: 'Váy phương Tây hở vai phối hồng trắng, chiếc nơ bướm đỏ lớn được thắt ngay ngắn trước ngực. Dưới vạt váy là tất ngắn trắng thuần khiết và giày da nhỏ màu sẫm.',
                                \u597D\u611F\u5EA6: 30,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Nhân danh Nhân Loại Chủng (All In)': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Tiêu hao 100CP. Stephanie cùng người chơi All in; cho đến trước khi vòng này kết thúc, AC của Stephanie và người chơi đều được xem là 0. Toàn bộ phe địch phải thực hiện một lần miễn trừ ý chí cực khó; thất bại thì giáp (AC) và toàn bộ kháng tính của họ bị cưỡng chế hạ xuống 0 trong 1 vòng, đồng thời công kích kế tiếp của <user> gây [800% + 20% × (Cấp độ - 1)] sát thương. Nếu nhờ vậy giết mục tiêu, toàn đội hồi 50% sinh lực tối đa.',
                                        \u65B0\u7248\u6548\u679C: 'Tiêu hao 100CP. Stephanie cùng người chơi All in; cho đến trước khi vòng này kết thúc, AC của Stephanie và người chơi đều được xem là 0. Toàn bộ phe địch phải thực hiện một lần miễn trừ ý chí cực khó; thất bại thì giáp (AC) và toàn bộ kháng tính của họ bị cưỡng chế hạ xuống 0 trong 1 vòng, đồng thời công kích kế tiếp của <user> gây [240% + 3% × (Cấp độ - 1)] sát thương. Nếu nhờ vậy giết mục tiêu, toàn đội hồi 50% sinh lực tối đa.',
                                        \u63CF\u8FF0: 'Chúng ta sẽ đặt cược tất cả những gì mình có!'
                                    }
                                }
                            },
                            'Jibril': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Thiên Dực Chủng',
                                \u7B49\u7EA7: 75,
                                \u5C5E\u6027: { \u529B\u91CF: 18, \u654F\u6377: 24, \u4F53\u8D28: 20, \u667A\u529B: 26, \u611F\u77E5: 20, \u9B45\u529B: 24 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Vòng sáng tinh văn': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Vòng sáng tinh văn', \u54C1\u8D28: 'Sử thi', \u7B49\u7EA7: 75, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 2, \u654F\u6377: 1, \u66B4\u51FB\u4F24\u5BB3: 20 },
                                        \u7ECF\u5178\u6548\u679C: '[Tinh Linh Hồi Lang] Kiểm định công kích pháp thuật của bạn +2;[Sum la vạn tượng] mỗi trận 1 lần, chỉ định số lượng mục tiêu bất kỳ; mục tiêu cần thực hiện miễn trừ Trí lực DC20, thất bại thì một kháng tính cao nhất của họ về 0 cho đến khi chiến đấu kết thúc;[Giải cấu thuật thức] kích hoạt khi kẻ địch trong tầm nhìn thi triển pháp thuật, bạn có thể tiêu hao phản ứng để thực hiện một lần kiểm định đối kháng Trí lực; nếu thắng thì cưỡng chế xua tan pháp thuật đó, đồng thời nhận lá chắn tạm thời tương đương phần trăm sinh lực tối đa (tùy theo cường độ pháp thuật);[Chuyển vị không gian] Mỗi trận 3 lần, dịch chuyển tới vị trí bất kỳ trong tầm nhìn, đồng thời để lại tại chỗ một tàn ảnh gây sụp đổ không gian vi mô, gây 【Cầm cố】 kéo dài 2 vòng cho kẻ truy kích và gây [500% + 20% × (Cấp độ - 1)] sát thương',
                                        \u65B0\u7248\u6548\u679C: '[Tinh Linh Hồi Lang] Kiểm định công kích pháp thuật của bạn +2;[Sum la vạn tượng] mỗi trận 1 lần, chỉ định số lượng mục tiêu bất kỳ; mục tiêu cần thực hiện miễn trừ Trí lực DC20, thất bại thì một kháng tính cao nhất của họ về 0 cho đến khi chiến đấu kết thúc;[Giải cấu thuật thức] kích hoạt khi kẻ địch trong tầm nhìn thi triển pháp thuật, bạn có thể tiêu hao phản ứng để thực hiện một lần kiểm định đối kháng Trí lực; nếu thắng thì cưỡng chế xua tan pháp thuật đó, đồng thời nhận lá chắn tạm thời tương đương phần trăm sinh lực tối đa (tùy theo cường độ pháp thuật);[Chuyển vị không gian] Mỗi trận 3 lần, dịch chuyển tới vị trí bất kỳ trong tầm nhìn, đồng thời để lại tại chỗ một tàn ảnh gây sụp đổ không gian vi mô, gây 【Cầm cố】 kéo dài 2 vòng cho kẻ truy kích và gây [200% + 2.5% × (Cấp độ - 1)] sát thương',
                                        \u63CF\u8FF0: 'Vòng sáng hình học lơ lửng trên đỉnh đầu là môi giới để Thiên Dực Chủng kết nối Tinh Linh Hồi Lang và cấu trúc ma pháp bậc cao.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Chiến trang Thiên Dực Chủng': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Chiến trang Thiên Dực Chủng', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 75, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 2, \u9B54\u6CD5\u51CF\u4F24: 15 },
                                        \u6548\u679C: '[Thân hòa tinh linh] Khi mỗi vòng kết thúc hồi 10% sinh lực tối đa.',
                                        \u63CF\u8FF0: 'Trang phục có độ hở rất cao. Đối với Thiên Dực Chủng, quần áo không hẳn là phòng cụ, mà gần như chỉ là trang sức thuần túy.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Thiên kích': {
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Phát động sau khi ngâm xướng ba vòng. Rút cạn toàn bộ tinh linh lực xung quanh, nén lại rồi phóng thích luồng sáng hủy thiên diệt địa. Gây [3500% + 25% × (Cấp độ - 1)] sát thương ma pháp không phân biệt trong phạm vi 5000 yard; công kích lần này chắc chắn chí mạng. Sau khi phóng thích kỹ năng này, Jibril thoái hóa thành [dạng ấu niên]: trong thời gian đó, toàn bộ thuộc tính khi kiểm định cố định xem là 6, cơ thể biến thành bé gái, kéo dài một tuần.',
                                        \u65B0\u7248\u6548\u679C: 'Phát động sau khi ngâm xướng ba vòng. Rút cạn toàn bộ tinh linh lực xung quanh, nén lại rồi phóng thích luồng sáng hủy thiên diệt địa. Gây [280% + 4% × (Cấp độ - 1)] sát thương ma pháp không phân biệt trong phạm vi 5000 yard; công kích lần này chắc chắn chí mạng. Sau khi phóng thích kỹ năng này, Jibril thoái hóa thành [dạng ấu niên]: trong thời gian đó, toàn bộ thuộc tính khi kiểm định cố định xem là 6, cơ thể biến thành bé gái, kéo dài một tuần.',
                                        \u63CF\u8FF0: 'Ma pháp cấp chiến lược từng chẻ đôi biển lớn và biến thủ đô của Sâm Tinh Chủng thành đất cháy. Cái giá là tạm thời mất toàn bộ sức mạnh, trong một tuần biến thành dạng ấu niên hoàn toàn thiếu tự vệ.'
                                    },
                                    'Binh trang thí thần': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Là quyến thuộc của Chiến Thần, Jibril sở hữu đặc quyền tuyệt đối để kết nối Tinh Linh Hồi Lang. Mỗi vòng một lần, cô có thể phóng thích tùy ý một 【pháp thuật tương ứng với pháp biểu pháp sư từ vòng 8 trở xuống theo quy tắc DND 5e】 (DC miễn trừ đặt là 22). Hành vi này không chiếm hành động công kích chính của cô. Phải ý thức rằng Jibril có năng lực thi pháp vạn năng tương đương pháp sư DND cấp 18. Trong chiến đấu hoặc sinh hoạt thường ngày, AI phải chủ động và thường xuyên vận dụng pháp thuật bậc cao cụ thể. Hãy gói hiệu ứng thị giác của các pháp thuật DND này thành “Ngôn Linh” của Thiên Dực Chủng hoặc “thi pháp qua Tinh Linh Hồi Lang” khi miêu tả (cô không cần niệm chú, chỉ cần ý niệm khẽ động là có thể thi pháp vô thanh. Ví dụ, gặp công kích vật lý, cô sẽ triển khai Shield hoặc Wall of Force; đối mặt pháp thuật, cô sẽ dùng Counterspell hoặc Absorb Elements; dùng Dominate Monster, Maze để đùa bỡn kẻ địch, hoặc dùng Meteor Swarm, Delayed Blast Fireball v.v. để càn quét diện rộng. Các ví dụ trên chỉ là ví dụ, bạn cần suy rộng và thi pháp linh hoạt, không được lặp lại máy móc giống hệt).',
                                        \u65B0\u7248\u6548\u679C: 'Là quyến thuộc của Chiến Thần, Jibril sở hữu đặc quyền tuyệt đối để kết nối Tinh Linh Hồi Lang. Mỗi vòng một lần, cô có thể phóng thích tùy ý một 【pháp thuật tương ứng với pháp biểu pháp sư từ vòng 8 trở xuống theo quy tắc DND 5e】 (DC miễn trừ đặt là 22). Hành vi này không chiếm hành động công kích chính của cô. Phải ý thức rằng Jibril có năng lực thi pháp vạn năng tương đương pháp sư DND cấp 18. Trong chiến đấu hoặc sinh hoạt thường ngày, AI phải chủ động và thường xuyên vận dụng pháp thuật bậc cao cụ thể. Hãy gói hiệu ứng thị giác của các pháp thuật DND này thành “Ngôn Linh” của Thiên Dực Chủng hoặc “thi pháp qua Tinh Linh Hồi Lang” khi miêu tả (cô không cần niệm chú, chỉ cần ý niệm khẽ động là có thể thi pháp vô thanh. Ví dụ, gặp công kích vật lý, cô sẽ triển khai Shield hoặc Wall of Force; đối mặt pháp thuật, cô sẽ dùng Counterspell hoặc Absorb Elements; dùng Dominate Monster, Maze để đùa bỡn kẻ địch, hoặc dùng Meteor Swarm, Delayed Blast Fireball v.v. để càn quét diện rộng. Các ví dụ trên chỉ là ví dụ, bạn cần suy rộng và thi pháp linh hoạt, không được lặp lại máy móc giống hệt).',
                                        \u63CF\u8FF0: 'Điều huyền áo mà phàm nhân truy cầu suốt cả đời đối với cô chỉ là bản năng tự nhiên như hô hấp.'
                                    }
                                },
                                \u5916\u8C8C: 'Mái tóc dài tới gối lưu chuyển sắc cầu vồng, đôi đồng tử hổ phách hình sao chữ thập. Hai bên eo mọc đôi cánh thiên sứ trắng muốt, trên đầu lơ lửng vòng sáng rực rỡ sắc màu. Khi thoái hóa thành dạng ấu niên, cô sẽ biến thành một bé gái chỉ cao chưa đến nửa người trưởng thành, mắt ngấn nước.',
                                \u7740\u88C5: 'Thân trên chỉ dùng rất ít vải che ngực, để lộ mảng lớn làn da trắng như tuyết và vòng eo thon mảnh; thân dưới là váy ngắn bất đối xứng cùng tất dài tới gối. Dưới dạng ấu niên, bộ đồ vốn vừa người sẽ phủ lỏng lẻo trên thân.',
                                \u597D\u611F\u5EA6: 30,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Tinh Cực': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 10, \u654F\u6377: 14, \u4F53\u8D28: 10, \u667A\u529B: 18, \u611F\u77E5: 16, \u9B45\u529B: 18 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Tinh kiếm Originium': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Tinh kiếm Originium', \u54C1\u8D28: 'Hiếm', \u7B49\u7EA7: 10, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 4, \u9B54\u6CD5\u51CF\u4F24: 5 },
                                        \u6548\u679C: 'Công kích kèm sát thương ma pháp thuộc tính tinh tú; đối với mục tiêu có kháng ma pháp thấp, sát thương tăng thêm +15%.',
                                        \u63CF\u8FF0: 'Vũ khí Originium dạng kiếm Tây phương thanh mảnh; khi chiến đấu, thân kiếm ánh lên vi quang tinh tú, dung hợp sức mạnh của nghi thức tinh tượng học, vừa là vũ khí vừa là môi giới thi pháp.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Thiên cầu nghi cầm tay': {
                                        \u7C7B\u578B: 'Trang sức', \u90E8\u4F4D: 'Tay phụ', \u540D\u79F0: 'Thiên cầu nghi cầm tay', \u54C1\u8D28: 'Đặc biệt', \u7B49\u7EA7: 10, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u611F\u77E5: 3 },
                                        \u6548\u679C: 'Hỗ trợ chiêm tinh, có thể cảm nhận chỉ dẫn của các vì sao rõ ràng hơn. Khi chiêm tinh, ảo ảnh tinh tú hiện lên quanh người; trong chiến đấu có thể dự phán quỹ tích công kích của phe địch, kiểm định né tránh +2.',
                                        \u63CF\u8FF0: 'Thiên cầu nghi cỡ nhỏ Tinh Cực luôn mang bên mình, là đạo cụ quan trọng để cô quan sát trời sao và thi triển nghi thức kiếm tinh tú.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Nghi thức kiếm tinh tú': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Dùng nghi thức kiếm ánh sao cắt mở mục tiêu, công kích gây [300% + 12% × (Cấp độ - 1)] sát thương hỗn hợp; nếu kháng ma pháp của mục tiêu thấp hơn kháng vật lý, sát thương cuối cùng của lần này tăng thêm +15%.', \u65B0\u7248\u6548\u679C: 'Dùng nghi thức kiếm ánh sao cắt mở mục tiêu, công kích gây [170% + 2% × (Cấp độ - 1)] sát thương hỗn hợp; nếu kháng ma pháp của mục tiêu thấp hơn kháng vật lý, sát thương cuối cùng của lần này tăng thêm +15%.', \u63CF\u8FF0: 'Nghi thức chiến đấu ưu nhã và thần bí, dung hợp kiếm thuật truyền thừa gia tộc với tri thức tinh tượng.' },
                                    'Dự ngôn tinh tượng': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Thông qua chiêm tinh cung cấp dự phán chiến thuật cho đội; kiểm định trúng đích của toàn đội trong vòng kế tiếp +2, kéo dài 2 vòng. Nếu mục tiêu đã bị đánh dấu hoặc khống chế, sát thương cuối cùng của công kích đầu tiên tăng thêm +15%. Lúc bình thường cũng có thể dự báo cát hung tương lai và giải đọc bí ẩn chưa biết.', \u65B0\u7248\u6548\u679C: 'Thông qua chiêm tinh cung cấp dự phán chiến thuật cho đội; kiểm định trúng đích của toàn đội trong vòng kế tiếp +2, kéo dài 2 vòng. Nếu mục tiêu đã bị đánh dấu hoặc khống chế, sát thương cuối cùng của công kích đầu tiên tăng thêm +15%. Lúc bình thường cũng có thể dự báo cát hung tương lai và giải đọc bí ẩn chưa biết.', \u63CF\u8FF0: 'Thiên cầu nghi xoay nhanh, trật tự tinh tú hé lộ xu hướng của tương lai gần, soi sáng con đường phía trước cho đồng đội.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ trí thức có mái tóc dài tới eo màu xanh thẫm và đôi mắt xanh trong vắt; giữa tóc điểm trang sức hình sao, khi cười đôi mắt cong như trăng non, khí chất trầm tĩnh mà sáng rõ như bầu trời đêm.',
                                \u7740\u88C5: 'Áo sơ mi tay phồng màu trắng thắt dây nhỏ màu đen, váy bồng cạp cao xanh thẫm thêu hoa văn tinh tú màu vàng, eo buộc dây chéo đen, chân đi giày dây đen.',
                                \u597D\u611F\u5EA6: 20,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Ecclesia': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 18, \u654F\u6377: 12, \u4F53\u8D28: 16, \u667A\u529B: 12, \u611F\u77E5: 14, \u9B45\u529B: 18 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Cự chùy xương rồng · Sprigans': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Cự chùy xương rồng · Sprigans', \u54C1\u8D28: 'Hiếm', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u529B\u91CF: 4 },
                                        \u6548\u679C: 'Lực xung kích vật lý cực cao, có xác suất kích hoạt bắn nổ phá.',
                                        \u63CF\u8FF0: 'Cây chùy cơ giới khổng lồ cải tạo từ hộp sọ rồng không rõ nguồn gốc, bên trong ẩn một pháo yêu giữ báu rất hoạt bát.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Trang phục du hành Dogmatika': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Trang phục du hành Dogmatika', \u54C1\u8D28: 'Thường', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1 },
                                        \u6548\u679C: 'Tiện cho đường dài bôn ba, bền mài mòn và khó bẩn.',
                                        \u63CF\u8FF0: 'Áo ba lỗ trắng phối áo choàng ngắn xanh rêu và quần short đen, là trang phục du hành tràn đầy sức sống.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Cự chùy mãnh kích': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Vung cự chùy xương rồng đánh một đòn toàn lực, công kích gây [300% + 12% × (Cấp độ - 1)] sát thương vật lý; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Sức mạnh, thất bại thì bị [Hất bay] và [Ngã xuống].', \u65B0\u7248\u6548\u679C: 'Vung cự chùy xương rồng đánh một đòn toàn lực, công kích gây [170% + 2% × (Cấp độ - 1)] sát thương vật lý; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Sức mạnh, thất bại thì bị [Hất bay] và [Ngã xuống].', \u63CF\u8FF0: 'Một chùy thế lớn lực nặng, ngay cả mặt đất cũng bị đập nứt; tuy không có chương pháp gì, bạo lực thẳng thắn ấy lại khiến người ta an tâm.' },
                                    'Sức ăn của Thánh nữ': { \u54C1\u8D28: 'Tinh xảo', \u7C7B\u578B: 'Đặc biệt', \u7ECF\u5178\u6548\u679C: 'Sau khi ăn sẽ nhanh chóng khôi phục thể lực và thương thế, lập tức hồi 20% sinh lực tối đa, đồng thời xóa 1 tầng [Mệt mỏi] hoặc trạng thái xấu nhẹ.', \u65B0\u7248\u6548\u679C: 'Sau khi ăn sẽ nhanh chóng khôi phục thể lực và thương thế, lập tức hồi 20% sinh lực tối đa, đồng thời xóa 1 tầng [Mệt mỏi] hoặc trạng thái xấu nhẹ.', \u63CF\u8FF0: 'Thể chất kỳ diệu chỉ cần ăn no là có thể hồi sinh đầy máu.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ đầy sức sống có mái tóc xoăn dài màu bạch kim buộc đuôi ngựa, trên đầu dựng một lọn tóc ngố, đôi mắt bạc trắng; trước trán cài trang sức hình thoi màu tím, luôn mang nụ cười rạng rỡ.',
                                \u7740\u88C5: 'Áo ba lỗ trắng khoác áo choàng ngắn xanh rêu bên ngoài, quần short đen thắt dây lưng nâu, găng hở ngón màu nâu, đeo túi đồ ăn vặt chéo vai, vác cây cự chùy xương rồng còn lớn hơn cả bản thân.',
                                \u597D\u611F\u5EA6: 10,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Nyarly': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Huyễn Tưởng Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 14, \u654F\u6377: 16, \u4F53\u8D28: 14, \u667A\u529B: 20, \u611F\u77E5: 16, \u9B45\u529B: 20 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Roi gai hỗn độn': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Roi gai hỗn độn', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 5, \u9B54\u6CD5\u51CF\u4F24: 5 },
                                        \u6548\u679C: 'Khi công kích có xác suất quấn lấy mục tiêu, khiến hành động vòng sau của mục tiêu -1.',
                                        \u63CF\u8FF0: 'Chiếc roi dài đen nhánh quấn gai sống, đầu roi thỉnh thoảng tự ngọ nguậy.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Shining Trapezohedron': {
                                        \u7C7B\u578B: 'Trang sức', \u90E8\u4F4D: 'Dây chuyền', \u540D\u79F0: 'Shining Trapezohedron', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 3, \u611F\u77E5: 2 },
                                        \u6548\u679C: 'Môi giới khế ước, duy trì thực thể hóa của Nyarly ở hiện thế; thậm chí có thể dùng nó làm môi giới kết nối tới bờ bên kia thứ nguyên, triệu hồi “bạn bè” của Nyarly. Mỗi ngày một lần, xé mở thứ nguyên, triệu hồi một sinh vật lệch pha có cấp độ ngang với <user> để hỗ trợ chiến đấu, kéo dài 10 phút.',
                                        \u63CF\u8FF0: 'Khối kết tinh đa diện tỏa ánh cầu vồng bất quy tắc, là neo khế ước kết nối tới bờ bên kia thứ nguyên; nhiệt độ vĩnh viễn hơi lạnh.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Lệch pha · Cấm kỵ': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Gọi sức mạnh hỗn độn từ dị thứ nguyên oanh kích kẻ địch, công kích gây [500% + 15% × (Cấp độ - 1)] sát thương ma pháp; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Cảm nhận, thất bại thì rơi vào [Ô nhiễm tinh thần] 2 vòng.', \u65B0\u7248\u6548\u679C: 'Gọi sức mạnh hỗn độn từ dị thứ nguyên oanh kích kẻ địch, công kích gây [200% + 2.5% × (Cấp độ - 1)] sát thương ma pháp; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Cảm nhận, thất bại thì rơi vào [Ô nhiễm tinh thần] 2 vòng.', \u63CF\u8FF0: 'Là một phần nhỏ sức mạnh của hóa thân Ngoại Thần, mang hiệu quả ô nhiễm tinh thần và vặn xoắn không gian mãnh liệt.' },
                                    'Giờ trà nghỉ': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Đặc biệt', \u7ECF\u5178\u6548\u679C: 'Cưỡng chế tạm dừng nhịp chiến đấu để uống trà nghỉ ngơi, hồi cho bản thân và khế ước giả mỗi người 25% sinh lực tối đa, đồng thời xóa 1 trạng thái xấu; kiểm định hành động đầu tiên của phe địch trong vòng này -2.', \u65B0\u7248\u6548\u679C: 'Cưỡng chế tạm dừng nhịp chiến đấu để uống trà nghỉ ngơi, hồi cho bản thân và khế ước giả mỗi người 25% sinh lực tối đa, đồng thời xóa 1 trạng thái xấu; kiểm định hành động đầu tiên của phe địch trong vòng này -2.', \u63CF\u8FF0: 'So với chiến đấu, uống trà chiều cùng khế ước giả vẫn quan trọng hơn.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ yêu diễm với tóc hai bím bạc trắng, sừng ác ma kiểu cừu núi và đôi mắt tím thủy tinh; tai tinh linh nhọn dài, khóe mắt vẽ hoa văn mị ma màu tím đỏ.',
                                \u7740\u88C5: 'Bộ bodysuit bó sát bóng màu tím đen, phần ngực khoét rỗng diện tích lớn, sau lưng mở ra đôi cánh ác ma, tất đen quá gối phối giày cao gót.',
                                \u597D\u611F\u5EA6: 40,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Orchis': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Sự sống nhân tạo',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 10, \u654F\u6377: 16, \u4F53\u8D28: 12, \u667A\u529B: 18, \u611F\u77E5: 16, \u9B45\u529B: 14 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Găng tay tơ bạc': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Găng tay tơ bạc', \u54C1\u8D28: 'Hiếm', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 2, \u667A\u529B: 2, \u611F\u77E5: 1 },
                                        \u6548\u679C: 'Đầu ngón tay có thể phóng ra những sợi tơ gần như vô hình, dùng để điều khiển búp bê, trói buộc mục tiêu và bố trí lưới bẫy.',
                                        \u63CF\u8FF0: 'Găng tay đen mỏng như cánh ve, đầu ngón gắn vòng dẫn tơ tinh vi; quỹ tích sợi tơ gần như không thể bắt được bằng mắt thường.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Búp bê Lloyd': {
                                        \u7C7B\u578B: 'Đặc biệt', \u90E8\u4F4D: 'Tùy tùng', \u540D\u79F0: 'Búp bê Lloyd', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u529B\u91CF: 3, \u4F53\u8D28: 2 },
                                        \u6548\u679C: 'Trong chiến đấu có thể được Orchis điều khiển từ xa để áp chế kẻ địch áp sát. Có thể chấp hành mệnh lệnh chặn đánh, hộ vệ và xung kích.',
                                        \u63CF\u8FF0: 'Búp bê cao lớn đội mũ lễ và mặt nạ trắng, dưới áo khoác dài đen giấu móng vuốt kim loại sắc bén; là người đồng hành đáng tin cậy nhất của Orchis.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Thao tơ thuật · Lloyd đột kích': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Điều khiển Lloyd lao tới tốc độ cao xé rách mục tiêu, công kích gây [500% + 15% × (Cấp độ - 1)] sát thương vật lý; nếu mục tiêu đang ở trạng thái [Trói buộc] hoặc trong phạm vi áp sát, sát thương cuối cùng của lần này tăng thêm +20%.', \u65B0\u7248\u6548\u679C: 'Điều khiển Lloyd lao tới tốc độ cao xé rách mục tiêu, công kích gây [200% + 2.5% × (Cấp độ - 1)] sát thương vật lý; nếu mục tiêu đang ở trạng thái [Trói buộc] hoặc trong phạm vi áp sát, sát thương cuối cùng của lần này tăng thêm +20%.', \u63CF\u8FF0: 'Dưới sợi tơ bạc kéo dẫn, búp bê lao ra như dã thú vô thanh, hoàn thành áp chế trước khi kẻ địch kịp phản ứng.' },
                                    'Lưới trói tơ bạc': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Bố trí lưới tơ trong khu vực chỉ định; mục tiêu trúng sẽ bị hạn chế hành động và giảm né tránh. Kẻ địch vượt qua miễn trừ Nhanh nhẹn thất bại vẫn chịu [Giảm tốc] 1 vòng.', \u65B0\u7248\u6548\u679C: 'Bố trí lưới tơ trong khu vực chỉ định; mục tiêu trúng sẽ bị hạn chế hành động và giảm né tránh. Kẻ địch vượt qua miễn trừ Nhanh nhẹn thất bại vẫn chịu [Giảm tốc] 1 vòng.', \u63CF\u8FF0: 'Sợi tơ dưới ánh sáng gần như vô hình; đến khi con mồi va phải mới hiểu mình đã sớm bị khoanh vào lưới.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ nhỏ nhắn với tóc dài bạc trắng và đôi mắt đỏ như bảo thạch, thần sắc bình tĩnh kiềm chế, ánh nhìn thường dừng giữa nơi xa và búp bê.',
                                \u7740\u88C5: 'Váy quây phong cách gothic màu đen, trước ngực điểm hoa hồng xanh, phối găng tơ bạc và bốt ngắn; tổng thể lạnh lùng mà tinh xảo.',
                                \u597D\u611F\u5EA6: 50,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Ung thư': {
                                \u6027\u522B: 'Không',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Huyễn Tưởng Chủng (Kẻ lặn sao)',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 8, \u654F\u6377: 14, \u4F53\u8D28: 20, \u667A\u529B: 16, \u611F\u77E5: 18, \u9B45\u529B: 10 },
                                \u88C5\u5907\u5217\u8868: {},
                                \u6280\u80FD: {
                                    'Giáp ký sinh': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Ung thư lan dọc bề mặt cơ thể kỵ sĩ, hình thành ngoại cốt cách kitin; căn cứ theo phần trăm sinh lực hiện tại của kỵ sĩ để cung cấp hình thái khác nhau: khi HP>50% là chế độ giáp nhẹ (AC+2, không ảnh hưởng Nhanh nhẹn); khi HP≤50% tự động chuyển sang chế độ trọng giáp (AC+4, giảm sát thương vật lý +10%, tốc độ di chuyển -5 feet).', \u65B0\u7248\u6548\u679C: 'Ung thư lan dọc bề mặt cơ thể kỵ sĩ, hình thành ngoại cốt cách kitin; căn cứ theo phần trăm sinh lực hiện tại của kỵ sĩ để cung cấp hình thái khác nhau: khi HP>50% là chế độ giáp nhẹ (AC+2, không ảnh hưởng Nhanh nhẹn); khi HP≤50% tự động chuyển sang chế độ trọng giáp (AC+4, giảm sát thương vật lý +10%, tốc độ di chuyển -5 feet).', \u63CF\u8FF0: 'Nó đọc cơ thể kỵ sĩ còn rõ hơn chính kỵ sĩ; trước khi bạn ý thức được nguy hiểm, lớp giáp đã mọc xong.' },
                                    'Bắn mô sống': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Ung thư bắn một phần mô cơ thể với tốc độ cao, ghim vào bề mặt mục tiêu; công kích gây [500% + 15% × (Cấp độ - 1)] sát thương thuộc tính acid. Sau khi trúng đòn kèm [Ăn mòn acid] kéo dài 3 vòng; mục tiêu có thể dùng hành động thực hiện kiểm định Sức mạnh DC13 để nhổ nó ra.', \u65B0\u7248\u6548\u679C: 'Ung thư bắn một phần mô cơ thể với tốc độ cao, ghim vào bề mặt mục tiêu; công kích gây [200% + 2.5% × (Cấp độ - 1)] sát thương thuộc tính acid. Sau khi trúng đòn kèm [Ăn mòn acid] kéo dài 3 vòng; mục tiêu có thể dùng hành động thực hiện kiểm định Sức mạnh DC13 để nhổ nó ra.', \u63CF\u8FF0: 'Một cục gì đó màu hồng dính lên người bạn rồi bắt đầu chui vào trong — đây đại khái là công kích tầm xa buồn nôn nhất trên đời.' }
                                },
                                \u5916\u8C8C: 'Sinh vật tròn trịa màu hồng, kích cỡ từ nắm tay tới bóng chuyền, hơi trong suốt, có một con mắt lớn có thể du chuyển trên bề mặt cơ thể và vài xúc tu nhỏ.',
                                \u7740\u88C5: 'Không (ký sinh trên vai phải của kỵ sĩ)',
                                \u597D\u611F\u5EA6: 100,
                                \u540C\u884C\u8A93\u7EA6: true,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Ghép chi': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Ung thư bạo tẩu phình lớn và phát động thôn phệ lên mục tiêu hấp hối; công kích gây [800% + 20% × (Cấp độ - 1)] sát thương vật lý. Nếu mục tiêu bị giết hoặc trên sân tồn tại thi thể có thể thôn phệ, trong 5 hiệp nhận được 1 kỹ năng của mục tiêu và cộng thêm một nửa thuộc tính cao nhất của mục tiêu. Sau khi kết thúc, Ung thư cưỡng chế đào thải, kỵ sĩ mất 10% HP tối đa và nhận 1 tầng [Mệt mỏi].', \u65B0\u7248\u6548\u679C: 'Ung thư bạo tẩu phình lớn và phát động thôn phệ lên mục tiêu hấp hối; công kích gây [240% + 3% × (Cấp độ - 1)] sát thương vật lý. Nếu mục tiêu bị giết hoặc trên sân tồn tại thi thể có thể thôn phệ, trong 5 hiệp nhận được 1 kỹ năng của mục tiêu và cộng thêm một nửa thuộc tính cao nhất của mục tiêu. Sau khi kết thúc, Ung thư cưỡng chế đào thải, kỵ sĩ mất 10% HP tối đa và nhận 1 tầng [Mệt mỏi].', \u63CF\u8FF0: 'Xúc tu xé mở xác chết, xương thịt gân cơ bị kéo vào trong cơ thể kỵ sĩ, cánh tay thứ ba chống mở từ dưới xương sườn, nắm lấy vũ khí vẫn còn nhỏ máu.' }
                                }
                            },
                            'Hiiro': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Linh thể (Thần khí)',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 16, \u654F\u6377: 20, \u4F53\u8D28: 12, \u667A\u529B: 10, \u611F\u77E5: 14, \u9B45\u529B: 16 },
                                \u88C5\u5907\u5217\u8868: {},
                                \u6280\u80FD: {
                                    'Thủy thuật': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Tạo khiên nước quanh bản thân và Yato, hấp thu lượng sát thương tương đương 20% sinh lực tối đa của người thi thuật; trong thời gian khiên nước tồn tại, có thể phóng thích [Thủy lao] giam cầm 1 mục tiêu trong 1 vòng.', \u65B0\u7248\u6548\u679C: 'Tạo khiên nước quanh bản thân và Yato, hấp thu lượng sát thương tương đương 20% sinh lực tối đa của người thi thuật; trong thời gian khiên nước tồn tại, có thể phóng thích [Thủy lao] giam cầm 1 mục tiêu trong 1 vòng.', \u63CF\u8FF0: 'Hiiro điều khiển dòng nước ngưng tụ thành hộ thuẫn, tích tụ tới ngưỡng rồi hóa thành thủy lao nuốt trọn mọi thứ.' },
                                    'Triệu hồi Diện yêu': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Triệu hồi bầy sói Diện yêu hỗ trợ chiến đấu; mỗi vòng Diện yêu lang công kích gây [500% + 15% × (Cấp độ - 1)] × 60% sát thương thuộc tính bóng tối; mục tiêu trúng đòn kèm [Nguyền rủa] 2 vòng.', \u65B0\u7248\u6548\u679C: 'Triệu hồi bầy sói Diện yêu hỗ trợ chiến đấu; mỗi vòng Diện yêu lang công kích gây [200% + 2.5% × (Cấp độ - 1)] × 60% sát thương thuộc tính bóng tối; mục tiêu trúng đòn kèm [Nguyền rủa] 2 vòng.', \u63CF\u8FF0: 'Quyến thuộc do Hiiro gọi ra, bầy sói đen kịt trào lên từ hư không.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ tóc ngắn đen, da trắng, mắt đỏ; thần sắc bình tĩnh, giỏi vô tình khơi động lòng người, nhìn như thuần khiết vô tội nhưng lại mang sức dụ hoặc thần bí và phi nhân.',
                                \u7740\u88C5: 'Khi hóa thành Thần khí là một thanh thái đao đen nhánh không tsuba, không vỏ; thân đao lưu chuyển vi quang đỏ thắm. Khi ở hình người mặc kimono đen.',
                                \u597D\u611F\u5EA6: 95,
                                \u540C\u884C\u8A93\u7EA6: true,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Chém!': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Hiiro dùng xích thủy lao trói buộc mục tiêu, Yato tức thời dịch chuyển tới sau lưng mục tiêu và chém xuống một đòn thanh tẩy; công kích gây [800% + 20% × (Cấp độ - 1)] sát thương vật lý. Đòn này bỏ qua AC và chắc chắn trúng đích. Nếu nhờ vậy giết mục tiêu, lập tức hồi 50 điểm CP.', \u65B0\u7248\u6548\u679C: 'Hiiro dùng xích thủy lao trói buộc mục tiêu, Yato tức thời dịch chuyển tới sau lưng mục tiêu và chém xuống một đòn thanh tẩy; công kích gây [240% + 3% × (Cấp độ - 1)] sát thương vật lý. Đòn này bỏ qua AC và chắc chắn trúng đích. Nếu nhờ vậy giết mục tiêu, lập tức hồi 50 điểm CP.', \u63CF\u8FF0: 'Thủy xích quấn thân, chúc từ định xuống, một đao đoạn đôi.' }
                                }
                            },
                            'Asuna': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 12, \u654F\u6377: 18, \u4F53\u8D28: 12, \u667A\u529B: 12, \u611F\u77E5: 16, \u9B45\u529B: 18 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Kiếm Phong Hoa': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Kiếm Phong Hoa', \u54C1\u8D28: 'Hiếm', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 2, \u66B4\u51FB\u4F24\u5BB3: 5 },
                                        \u6548\u679C: 'Khi công kích có xác suất khiến kiểm định Nhanh nhẹn kế tiếp +1.',
                                        \u63CF\u8FF0: 'Thân kiếm nhẹ và sắc bén, thích hợp tung ra những đòn đâm tốc độ cao như vũ điệu.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Đồng phục người mới': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Đồng phục người mới', \u54C1\u8D28: 'Tinh xảo', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1 },
                                        \u6548\u679C: 'Tăng mạnh độ linh hoạt khi hành động, đồng thời kèm kháng tinh thần rất nhẹ.',
                                        \u63CF\u8FF0: 'Trang bị sơ cấp dùng chung cho người mới.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Star Splash': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Vung tế kiếm tốc độ cao thực hiện năm đòn đâm liên tiếp, tổng cộng gây [300% + 12% × (Cấp độ - 1)] sát thương vật lý; nếu công kích lần này trúng, kiểm định công kích kế tiếp của bản thân +2.', \u65B0\u7248\u6548\u679C: 'Vung tế kiếm tốc độ cao thực hiện năm đòn đâm liên tiếp, tổng cộng gây [170% + 2% × (Cấp độ - 1)] sát thương vật lý; nếu công kích lần này trúng, kiểm định công kích kế tiếp của bản thân +2.', \u63CF\u8FF0: 'Năm liên kích như sao băng, là tuyệt kỹ nhanh nhẹn phát động bằng tốc độ phản xạ thần kinh vượt xa người thường.' },
                                    'Pha lê hồi phục': { \u54C1\u8D28: 'Tinh xảo', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Tiêu hao đạo cụ, nhanh chóng hồi cho bản thân hoặc 1 đồng đội 30% sinh lực tối đa; nếu sinh lực mục tiêu thấp hơn 50%, xóa thêm 1 trạng thái xấu nhẹ.', \u65B0\u7248\u6548\u679C: 'Tiêu hao đạo cụ, nhanh chóng hồi cho bản thân hoặc 1 đồng đội 30% sinh lực tối đa; nếu sinh lực mục tiêu thấp hơn 50%, xóa thêm 1 trạng thái xấu nhẹ.', \u63CF\u8FF0: 'Pha lê hồi phục được chuẩn bị để ứng phó tình huống đột phát, thể hiện sự cẩn trọng và tinh tế của cô dưới thân phận kép: tiểu thư nhà giàu và người lãnh đạo.' }
                                },
                                \u5916\u8C8C: 'Mái tóc dài màu hạt dẻ xõa qua vai như thác nước, gương mặt tinh xảo xinh đẹp toát lên giáo dưỡng và sự giữ kẽ đặc hữu của đại tiểu thư nhà Yuuki; đôi mắt hổ phách khi chiến đấu sẽ lóe ánh sáng lẫm liệt.',
                                \u7740\u88C5: 'Mặc áo bó eo đỏ sẫm và váy xếp ly ngắn, bên ngoài khoác giáp ngực da nhẹ và áo choàng vải thô có mũ trùm lớn. Chỉ là phòng cụ giản dị ở giai đoạn tân thủ.',
                                \u597D\u611F\u5EA6: 20,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Shiro': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 6, \u654F\u6377: 12, \u4F53\u8D28: 6, \u667A\u529B: 25, \u611F\u77E5: 14, \u9B45\u529B: 18 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Bàn cờ Kuuhaku': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Bàn cờ Kuuhaku', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 1, \u611F\u77E5: 1, \u57FA\u7840: 1 },
                                        \u6548\u679C: '[Đọc trước nước cờ] Khi Shiro chưa bị thương trong vòng này, kiểm định trúng đích lần đầu phát động kỹ năng sát thương hoặc khống chế +1;[Tháo giải tàn cục] Khi mục tiêu ở trạng thái [Chiếu tướng], [Mất cân bằng] hoặc [Trói buộc], sát thương cuối cùng do Shiro gây ra +15%;[Hiệu chỉnh đường cờ] Khi Shiro thực hiện kiểm định liên quan đến Cảm nhận (Thấu hiểu), Trí lực (Điều tra) và tiên công, +1.',
                                        \u63CF\u8FF0: 'Bàn cờ gấp mỏng nhẹ hai màu đen trắng, góc cạnh khảm hoa văn bạc tinh tế. Khi mở ra sẽ tự động phóng chiếu ô cờ trong suốt và quỹ tích hành động, là môi giới tính toán để Shiro tháo giải chiến trường như một ván cờ.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Đồng phục thủy thủ': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Đồng phục thủy thủ', \u54C1\u8D28: 'Tinh xảo', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1 },
                                        \u6548\u679C: '[Bước lặng] Khi Shiro ở trong nhà, trong thành trấn hoặc môi trường chưa bị bao vây, kiểm định liên quan đến ẩn nấp và né tránh +1.',
                                        \u63CF\u8FF0: 'Đồng phục kiểu thủy thủ, phom dáng rộng và hơi ngắn, cổ áo cùng cổ tay áo viền đường sáng màu. Phối với tất quá gối và giày da nhỏ, vừa giữ nét non trẻ của đồng phục học sinh vừa mang vẻ tinh xảo quý phái không thể xem nhẹ.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Vương miện nhỏ Elchea': {
                                        \u7C7B\u578B: 'Trang sức', \u90E8\u4F4D: 'Trang sức đầu', \u540D\u79F0: 'Vương miện nhỏ Elchea', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u611F\u77E5: 1, \u5965\u4E49: 1 },
                                        \u6548\u679C: '[Tuyên cáo chiếu tướng] Mỗi trận 1 lần (hành động phụ), chỉ định một kẻ địch trong 30 feet và áp [Chiếu tướng] 2 vòng: kiểm định trúng đích công kích đầu tiên của phe ta đối với mục tiêu đó +2; nếu mục tiêu đó đã hành động, sát thương cuối cùng gây lên mục tiêu tăng thêm +20%;[Cộng hưởng ỷ lại] Khi trong phạm vi 10 feet cạnh Shiro có đồng đội đáng tin cậy, kiểm định ý chí của Shiro +2, miễn nhiễm [Sợ hãi] thông thường.',
                                        \u63CF\u8FF0: 'Vương miện kích thước nhỏ xinh nhưng chế tác cực tinh, như phụ kiện vương thất chuẩn bị cho búp bê Tây phương. Khi đội trên đầu Shiro, nó không hề buồn cười, ngược lại càng làm khí chất nữ vương yên tĩnh ấy trở nên rõ nét.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Khóa bước': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Thông qua dự phán, phong kín trước điểm rơi và lộ tuyến né tránh của kẻ địch, gây [500% + 15% × (Cấp độ - 1)] sát thương ma pháp lên kẻ địch trong khu vực; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Nhanh nhẹn, thất bại thì rơi vào [Mất cân bằng] (AC-2, kiểm định trúng đích kế tiếp -1) 1 vòng.', \u65B0\u7248\u6548\u679C: 'Thông qua dự phán, phong kín trước điểm rơi và lộ tuyến né tránh của kẻ địch, gây [200% + 2.5% × (Cấp độ - 1)] sát thương ma pháp lên kẻ địch trong khu vực; kẻ địch trúng đòn cần thực hiện một lần miễn trừ Nhanh nhẹn, thất bại thì rơi vào [Mất cân bằng] (AC-2, kiểm định trúng đích kế tiếp -1) 1 vòng.', \u63CF\u8FF0: 'Kẻ địch sẽ phát hiện tất cả “vị trí an toàn” của mình đều đã bị tính hết từ trước.' },
                                    'Dự phán của Shiro': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Chỉ định 1 đồng đội bước vào trạng thái [Hiệp đồng], kéo dài 2 vòng: kiểm định trúng đích của người đó +2, ngưỡng chí mạng -1; nếu công kích trúng mục tiêu đang ở trạng thái [Chiếu tướng], [Mất cân bằng] hoặc [Trói buộc], sát thương cuối cùng của công kích lần đó tăng thêm +40%.', \u65B0\u7248\u6548\u679C: 'Chỉ định 1 đồng đội bước vào trạng thái [Hiệp đồng], kéo dài 2 vòng: kiểm định trúng đích của người đó +2, ngưỡng chí mạng -1; nếu công kích trúng mục tiêu đang ở trạng thái [Chiếu tướng], [Mất cân bằng] hoặc [Trói buộc], sát thương cuối cùng của công kích lần đó tăng thêm +40%.', \u63CF\u8FF0: 'Dưới quy hoạch của cô, mỗi bước đi của đồng đội đều như đang tiến lên theo lộ tuyến thắng lợi đã được viết sẵn.' }
                                },
                                \u5916\u8C8C: 'Nước da trắng, vóc người nhỏ nhắn. Mái tóc trắng siêu dài gần như buông tới bên chân, một bên buộc thành đuôi ngựa lệch xõa vai; trước trán rủ xuống lọn mái mảnh dài và một lọn tóc ngố bướng bỉnh.',
                                \u7740\u88C5: 'Đồng phục thủy thủ cải biên màu sẫm phối tất quá gối và giày da mũi tròn; giữa vạt váy và miệng tất giữ lại vùng tuyệt đối rõ rệt. Trên đầu đội một vương miện nhỏ tinh xảo, tổng thể như một nữ vương nhỏ quý phái mà xa cách.',
                                \u597D\u611F\u5EA6: 35,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Chiếu hết': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Shiro chỉ định một kẻ địch và áp [Chiếu hết] cho đến khi vòng này kết thúc: <user> và Shiro mỗi người lập tức phát động 1 lần công kích hiệp đồng không chịu phạt liên kích lên mục tiêu đó; trong đó truy kích của Shiro gây [800% + 20% × (Cấp độ - 1)] sát thương ma pháp. Nếu đòn đầu không trúng, đòn thứ hai bỏ qua kiểm định trúng đích, cưỡng chế trúng và chắc chắn chí mạng; nếu đòn đầu trúng, sát thương cuối cùng của đòn thứ hai gấp đôi, đồng thời sau kết toán xử quyết kẻ địch có sinh lực dưới 20%.', \u65B0\u7248\u6548\u679C: 'Shiro chỉ định một kẻ địch và áp [Chiếu hết] cho đến khi vòng này kết thúc: <user> và Shiro mỗi người lập tức phát động 1 lần công kích hiệp đồng không chịu phạt liên kích lên mục tiêu đó; trong đó truy kích của Shiro gây [240% + 3% × (Cấp độ - 1)] sát thương ma pháp. Nếu đòn đầu không trúng, đòn thứ hai bỏ qua kiểm định trúng đích, cưỡng chế trúng và chắc chắn chí mạng; nếu đòn đầu trúng, sát thương cuối cùng của đòn thứ hai gấp đôi, đồng thời sau kết toán xử quyết kẻ địch có sinh lực dưới 20%.', \u63CF\u8FF0: '“checkmate.” Khi cô thốt ra kết luận, thắng bại thường đã được quyết định trước cả bản thân đòn công kích.' }
                                }
                            },
                            'Luluca': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 10, \u654F\u6377: 16, \u4F53\u8D28: 14, \u667A\u529B: 18, \u611F\u77E5: 16, \u9B45\u529B: 18 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Quyền trượng bí mật của Nước Mắt': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Quyền trượng bí mật của Nước Mắt', \u54C1\u8D28: 'Sử thi', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 4, \u9B54\u6CD5\u51CF\u4F24: 10 },
                                        \u6548\u679C: 'Khi phóng thích ma pháp kèm hiệu ứng dòng sáng bóng tối, sát thương ma pháp loại quang pháo tăng 15%.',
                                        \u63CF\u8FF0: 'Pháp trượng chuyên dụng khi Luluca biến thân thành Precure; ngày thường hóa thành một dây chuyền mặt treo mang hình dạng quyền trượng thu nhỏ đeo trước ngực.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Chiến y Người Chữa Lành Bóng Tối': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Chiến y Người Chữa Lành Bóng Tối', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1, \u4F53\u8D28: 1, \u9B45\u529B: 1 },
                                        \u6548\u679C: 'Lần đầu bị đánh trong mỗi trận chiến sẽ giảm miễn một lượng sát thương nhất định, đồng thời dễ ẩn mình trong bóng tối hơn.',
                                        \u63CF\u8FF0: 'Váy dài quây ngực xẻ cao lấy màu đen làm chủ đạo, điểm rất nhiều trang sức hình giọt nước màu tím và trâm cài ngôi sao. Vừa có vẻ lộng lẫy của Precure, vừa dung hợp nét thần bí của quái đạo.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Pháo sáng bóng tối': { \u54C1\u8D28: 'Xuất sắc', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Ngưng tụ ma lực của ánh sáng và bóng tối vào quyền trượng, bắn ra chùm sáng hủy diệt, gây [500% + 15% × (Cấp độ - 1)] sát thương ma pháp lên kẻ địch trong phạm vi đường thẳng. Nếu mục tiêu đang ở [Bóng tối] hoặc môi trường ánh sáng yếu, sát thương cuối cùng của lần này tăng thêm +20%.', \u65B0\u7248\u6548\u679C: 'Ngưng tụ ma lực của ánh sáng và bóng tối vào quyền trượng, bắn ra chùm sáng hủy diệt, gây [200% + 2.5% × (Cấp độ - 1)] sát thương ma pháp lên kẻ địch trong phạm vi đường thẳng. Nếu mục tiêu đang ở [Bóng tối] hoặc môi trường ánh sáng yếu, sát thương cuối cùng của lần này tăng thêm +20%.', \u63CF\u8FF0: 'Tuy nói là Precure, nhưng đây hoàn toàn là oanh tạc quang pháo ma pháp không hề nương tay, uy lực trái ngược hẳn với thân hình nhỏ nhắn ấy.' },
                                    'Ma pháp chữa trị: Bóng': { \u54C1\u8D28: 'Hiếm', \u7C7B\u578B: 'Hỗ trợ', \u7ECF\u5178\u6548\u679C: 'Lợi dụng ma lực bóng tối trị liệu bản thân và đồng đội xung quanh, hồi 25% sinh lực tối đa; nếu mục tiêu gần đây từng chịu sát thương thuộc tính ánh sáng, hồi thêm 10% sinh lực tối đa.', \u65B0\u7248\u6548\u679C: 'Lợi dụng ma lực bóng tối trị liệu bản thân và đồng đội xung quanh, hồi 25% sinh lực tối đa; nếu mục tiêu gần đây từng chịu sát thương thuộc tính ánh sáng, hồi thêm 10% sinh lực tối đa.', \u63CF\u8FF0: 'Ai nói bóng tối không thể dùng để chữa trị? Đây là sự dịu dàng và ma pháp tương phản chỉ thuộc về quái đạo Precure.' }
                                },
                                \u5916\u8C8C: 'Thiếu nữ kín tiếng có thể im lặng ăn kem liên tục; trên tay luôn ôm bạn đồng hành yêu tinh hình cáo tím tròn vo tên Miên Đường Thám. Sau khi biến thân, tóc đột ngột chuyển thành mái tóc siêu dài màu vàng pha chuyển sắc hồng.',
                                \u7740\u88C5: 'Ngày thường mặc váy liền đen có váy ngắn viền ren trắng phối áo choàng dài màu đen; sau khi biến thân sẽ hóa thành váy dài xẻ tà hoa lệ tông đen, điểm rất nhiều trang sức tím nhạt, tỏa ra sức hấp dẫn sâu thẳm khó tin.',
                                \u597D\u611F\u5EA6: 20,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {}
                            },
                            'Catissia': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: {
                                    \u529B\u91CF: 14,
                                    \u654F\u6377: 20,
                                    \u4F53\u8D28: 24,
                                    \u667A\u529B: 14,
                                    \u611F\u77E5: 16,
                                    \u9B45\u529B: 22
                                },
                                \u88C5\u5907\u5217\u8868: {
                                    'Vương miện vận mệnh bất khuất': {
                                        \u7C7B\u578B: 'Vũ khí',
                                        \u90E8\u4F4D: 'Tay chính',
                                        \u540D\u79F0: 'Vương miện vận mệnh bất khuất',
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7B49\u7EA7: 1,
                                        \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: {
                                            \u9B45\u529B: 2,
                                            \u4F53\u8D28: 2,
                                            \u66B4\u51FB\u4F24\u5BB3: 15
                                        },
                                        \u6548\u679C: '[Cộng hưởng thủy triều] Khi công kích trúng đích, kèm [Phong thực] lên mục tiêu: mỗi tầng khiến AC mục tiêu -1, tối đa chồng 3 tầng, kéo dài đến khi chiến đấu kết thúc;[Song sinh chi kiếm] Có thể chuyển đổi giữa hình thái thiếu nữ và hình thái Thánh nữ (hình tượng biến thành mỹ nhân trưởng thành ngực lớn). Dưới hình thái Thánh nữ, phạm vi đánh thường mở rộng, loại sát thương chuyển thành sát thương khí động, nhưng khi mỗi vòng kết thúc mất 5% sinh lực hiện tại.',
                                        \u63CF\u8FF0: 'Thánh vật tấn đao của Rinascita, kiếm cách có hình như vương miện gai, thân kiếm đồng thời khắc minh văn cầu nguyện Tuế Chủ và hoa văn Minh thức. Nó sẽ chuyển đổi hình thái theo tâm ý người nắm giữ: ngày thường trong tay hình thái thiếu nữ là lưỡi chém mảnh mai nhanh nhẹn, nhẹ như lông vũ; khi giải phóng sức mạnh hóa thân thành hình thái Thánh nữ, tự động biến thành cự kiếm nặng như núi.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Lễ trang dải lụa của Thánh nữ tuẫn đạo': {
                                        \u7C7B\u578B: 'Giáp',
                                        \u90E8\u4F4D: 'Áo',
                                        \u540D\u79F0: 'Lễ trang dải lụa của Thánh nữ tuẫn đạo',
                                        \u54C1\u8D28: 'Xuất sắc',
                                        \u7B49\u7EA7: 1,
                                        \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: {
                                            \u4F53\u8D28: 1,
                                            \u9B45\u529B: 1,
                                            \u7269\u7406\u51CF\u4F24: 10,
                                            \u9B54\u6CD5\u51CF\u4F24: 10
                                        },
                                        \u6548\u679C: '[Vũ bước cuối cùng] Khi chịu sát thương, nếu sát thương đó sẽ khiến HP hạ xuống 0, đổi thành khóa HP ở 1 và nhận [Vô địch] 1 vòng, mỗi trận chiến chỉ kích hoạt 1 lần;[Dư âm gió triều] Dưới hình thái Thánh nữ, sát thương khí động +20%.',
                                        \u63CF\u8FF0: 'Lễ trang cải chế từ bộ đồ mặc trong điệu múa cuối cùng trước khi nhận thánh danh. Khi dải lụa mở ra trong gió, nó tựa mặt biển đêm trải rộng.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Thanh kiếm này nhân danh con người': {
                                        \u54C1\u8D28: 'Xuất sắc',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Dưới hình thái thiếu nữ, nhảy lên hất bay kẻ địch rồi nện xuống mặt đất, gây [500% + 15% × (Cấp độ - 1)] sát thương vật lý và kèm 2 tầng [Phong thực]. Dưới hình thái Thánh nữ, dùng cự kiếm quét ngang phía trước, gây [600% + 18% × (Cấp độ - 1)] sát thương khí động và lập tức kết toán 1 lần hiệu ứng Phong thực (số tầng chỉ -1).',
                                        \u65B0\u7248\u6548\u679C: 'Dưới hình thái thiếu nữ, nhảy lên hất bay kẻ địch rồi nện xuống mặt đất, gây [200% + 2.5% × (Cấp độ - 1)] sát thương vật lý và kèm 2 tầng [Phong thực]. Dưới hình thái Thánh nữ, dùng cự kiếm quét ngang phía trước, gây [200% + 2.5% × (Cấp độ - 1)] sát thương khí động và lập tức kết toán 1 lần hiệu ứng Phong thực (số tầng chỉ -1).',
                                        \u63CF\u8FF0: '\'Thanh kiếm này không vung lên vì thánh danh.\' Thiếu nữ nhảy lên như đang múa, Thánh nữ vung kiếm như triều rút — bất kể ở tư thái nào, mũi kiếm luôn hướng về người cô muốn bảo vệ.'
                                    },
                                    'Lưỡi kiếm nhìn triều, gió giận gào': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Chỉ có thể dùng dưới hình thái Thánh nữ (mỹ nhân trưởng thành ngực lớn). Giải phóng cộng hưởng kép của Tuế Chủ và Minh thức, chém ra một đòn toàn lực, gây [800% + 20% × (Cấp độ - 1)] sát thương khí động. Mỗi khi tiêu hao 1 tầng [Phong thực], sát thương cuối cùng của lần này tăng thêm +10% (tối đa +50%). Đòn này chắc chắn trúng đích. Sau khi phóng thích, trở về hình thái thiếu nữ và hồi 40% sinh lực tối đa.',
                                        \u65B0\u7248\u6548\u679C: 'Chỉ có thể dùng dưới hình thái Thánh nữ (mỹ nhân trưởng thành ngực lớn). Giải phóng cộng hưởng kép của Tuế Chủ và Minh thức, chém ra một đòn toàn lực, gây [240% + 3% × (Cấp độ - 1)] sát thương khí động. Mỗi khi tiêu hao 1 tầng [Phong thực], sát thương cuối cùng của lần này tăng thêm +10% (tối đa +50%). Đòn này chắc chắn trúng đích. Sau khi phóng thích, trở về hình thái thiếu nữ và hồi 40% sinh lực tối đa.',
                                        \u63CF\u8FF0: 'Hào quang Tuế Chủ và vực sâu Minh thức hợp lưu nơi mũi kiếm. Khoảnh khắc cự kiếm chém xuống, màn trời nứt mở, cuồng phong gào thét như triều phán quyết nuốt trọn tất cả — đây là nhát kiếm nặng nề nhất cũng tự do nhất trong hai mươi năm của cô.'
                                    }
                                },
                                \u5916\u8C8C: 'Mái tóc dài màu vàng như ánh trăng xõa tới eo, đôi mắt xanh trong trẻo yên tĩnh. Trên trán đeo tiểu quan nhành leo giọt nước, tai hơi nhọn. Khi ở hình thái Thánh nữ (mỹ nhân trưởng thành ngực lớn), tóc dài hoàn toàn buông xõa, vạt áo trải ra như thủy triều, xanh thẫm và bạc trắng đan thành đường nét thánh khiết mà sắc bén.',
                                \u7740\u88C5: 'Lễ trang dải lụa mỏng nhẹ lấy trắng và xanh nhạt làm chủ đạo; hình thái thiếu nữ mảnh mai nhẹ nhàng, hình thái Thánh nữ trang nghiêm thẳng tắp. Sandal dây mảnh và dải lụa bán trong suốt khiến mỗi bước đi như sắp được gió cuốn lên.',
                                \u597D\u611F\u5EA6: 35,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Lời đồng cầu nguyện của thủy triều và tinh tú': {
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Catissia chuyển sang hình thái Thánh nữ, giơ cao thánh kiếm; Kẻ phiêu bạt rót sức mạnh cộng hưởng vào thân kiếm. Hai người hợp lực chém ra một đòn dung hợp hào quang Tuế Chủ và vực sâu Minh thức, gây [1000% + 25% × (Cấp độ - 1)] sát thương khí động. Mỗi tầng [Phong thực] mục tiêu đang giữ khiến ngưỡng chí mạng giảm thêm -1 (tối đa -5); đòn này chắc chắn trúng, đồng thời sau khi trúng không xóa số tầng Phong thực. Khi giết mục tiêu, Catissia giữ hình thái Thánh nữ và tiếp tục hành động 1 vòng. Tiêu hao 100 CP.',
                                        \u65B0\u7248\u6548\u679C: 'Catissia chuyển sang hình thái Thánh nữ, giơ cao thánh kiếm; Kẻ phiêu bạt rót sức mạnh cộng hưởng vào thân kiếm. Hai người hợp lực chém ra một đòn dung hợp hào quang Tuế Chủ và vực sâu Minh thức, gây [280% + 4% × (Cấp độ - 1)] sát thương khí động. Mỗi tầng [Phong thực] mục tiêu đang giữ khiến ngưỡng chí mạng giảm thêm -1 (tối đa -5); đòn này chắc chắn trúng, đồng thời sau khi trúng không xóa số tầng Phong thực. Khi giết mục tiêu, Catissia giữ hình thái Thánh nữ và tiếp tục hành động 1 vòng. Tiêu hao 100 CP.',
                                        \u63CF\u8FF0: 'Thánh kiếm giơ cao, cộng hưởng của Kẻ phiêu bạt như ánh sao rót vào mũi kiếm. Khi cô mở mắt, trong đôi mắt xanh đồng thời phản chiếu vực sâu thủy triều và hào quang tinh tú: \'Lần này, chúng ta cùng nhau.\''
                                    }
                                }
                            },
                            'Aemis': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân Loại Chủng',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: {
                                    \u529B\u91CF: 12,
                                    \u654F\u6377: 22,
                                    \u4F53\u8D28: 18,
                                    \u667A\u529B: 22,
                                    \u611F\u77E5: 16,
                                    \u9B45\u529B: 20
                                },
                                \u88C5\u5907\u5217\u8868: {
                                    'Sao Mai vĩnh hằng': {
                                        \u7C7B\u578B: 'Vũ khí',
                                        \u90E8\u4F4D: 'Tay chính',
                                        \u540D\u79F0: 'Sao Mai vĩnh hằng',
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7B49\u7EA7: 1,
                                        \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: {
                                            \u654F\u6377: 2,
                                            \u667A\u529B: 1,
                                            \u5168\u6280\u80FD: 2,
                                            \u66B4\u51FB\u4F24\u5BB3: 30
                                        },
                                        \u7ECF\u5178\u6548\u679C: 'Kiểm định công kích +2;[Ấn khắc ánh sao] Khi thanh kiếm này trúng mục tiêu sẽ kích hoạt, khắc lên người mục tiêu [Tầng lưu quang]: mỗi tầng khiến mục tiêu không thể ẩn nấp trước Aemis, đồng thời ngưỡng chí mạng của Aemis khi công kích mục tiêu đó -1, tối đa chồng 3 tầng (ngưỡng chí mạng tối đa -3), kéo dài đến khi chiến đấu kết thúc;[Lưu quang thừa khải] Khi người nắm giữ chuyển đổi hình thái chiến đấu sẽ kích hoạt, thân kiếm tái cấu trúc theo đó — hình người hóa thành trọng thích kiếm lưu quang, hình thái cơ binh hóa thành trường mâu nặng xuyên qua màn trời — và lập tức thanh toán [Tầng lưu quang] tích lũy trên mục tiêu chính: tiêu hao N tầng gây [1000% + 25% × (Cấp độ-1)] × N÷3 sát thương thuộc tính ánh sáng (làm tròn tới 10 gần nhất, đủ 3 tầng là đủ định mức), sau khi kích hoạt số tầng lưu quang của mục tiêu đó về 0;[Tinh hải quy hàng] Hành động phụ, phát ra một vệt lưu quang khóa một quân bạn trong tầm nhìn, lập tức truyền tống người đó tới vị trí liền kề bên cạnh Aemis; quá trình truyền tống không kích hoạt công kích mượn cơ hội và bẫy.',
                                        \u65B0\u7248\u6548\u679C: 'Kiểm định công kích +2;[Ấn khắc ánh sao] Khi thanh kiếm này trúng mục tiêu sẽ kích hoạt, khắc lên người mục tiêu [Tầng lưu quang]: mỗi tầng khiến mục tiêu không thể ẩn nấp trước Aemis, đồng thời ngưỡng chí mạng của Aemis khi công kích mục tiêu đó -1, tối đa chồng 3 tầng (ngưỡng chí mạng tối đa -3), kéo dài đến khi chiến đấu kết thúc;[Lưu quang thừa khải] Khi người nắm giữ chuyển đổi hình thái chiến đấu sẽ kích hoạt, thân kiếm tái cấu trúc theo đó — hình người hóa thành trọng thích kiếm lưu quang, hình thái cơ binh hóa thành trường mâu nặng xuyên qua màn trời — và lập tức thanh toán [Tầng lưu quang] tích lũy trên mục tiêu chính: tiêu hao N tầng gây [280% + 4% × (Cấp độ - 1)] × N÷3 sát thương thuộc tính ánh sáng (làm tròn tới 10 gần nhất, đủ 3 tầng là đủ định mức), sau khi kích hoạt số tầng lưu quang của mục tiêu đó về 0;[Tinh hải quy hàng] Hành động phụ, phát ra một vệt lưu quang khóa một quân bạn trong tầm nhìn, lập tức truyền tống người đó tới vị trí liền kề bên cạnh Aemis; quá trình truyền tống không kích hoạt công kích mượn cơ hội và bẫy.',
                                        \u63CF\u8FF0: 'Kiếm tên "Sao Mai", là kết tinh Aemis dùng chấp niệm tái tạo từ dòng dữ liệu vỡ nát khi một mình phiêu bạt mười năm sâu trong không gian hư chất. Thân kiếm quấn quanh ánh sao vụn vĩnh viễn không tắt, lưu chuyển theo cảm xúc người nắm giữ — khi bình tĩnh như dải ngân hà chảy chậm, khi kịch chiến như sao băng bắn nổ; tồn tại hiểu được "tần số" có thể đọc ra chấp niệm sâu nhất từ trong đó. Nó sẽ tự động biến đổi theo hình thái chiến đấu của người nắm giữ: khi ở hình người là trọng thích kiếm lưu quang, sau khi khởi động binh trang Ẩn Giả biến thành cơ binh thì hóa thành trường mâu nặng xuyên qua màn trời. Khi trong lòng cô hiện lên ý niệm "muốn thắp sáng đường về cho một người nào đó", ánh kiếm cũng không tắt giữa đêm đen sâu nhất — đây là lời hứa vô thanh của cô dành cho Kẻ phiêu bạt.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Bay tới khoảnh khắc Sao Mai': {
                                        \u54C1\u8D28: 'Xuất sắc',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Có hình thức công kích khác nhau theo hình thái. Hình người: sau khi tụ lực, xông tới mục tiêu chém một nhát, gây [500% + 15% × (Cấp độ - 1)] sát thương vật lý và kèm 2 tầng [Dấu ấn lưu quang]. Hình thái cơ binh: nâng tay dẫn lưu quang từ dưới lên hóa thành lưỡi kiếm bay lên, lưỡi kiếm sau đó phá không nện xuống, gây [600% + 18% × (Cấp độ - 1)] sát thương thuộc tính lửa và kèm 3 tầng [Dấu ấn lưu quang].',
                                        \u65B0\u7248\u6548\u679C: 'Có hình thức công kích khác nhau theo hình thái. Hình người: sau khi tụ lực, xông tới mục tiêu chém một nhát, gây [200% + 2.5% × (Cấp độ - 1)] sát thương vật lý và kèm 2 tầng [Dấu ấn lưu quang]. Hình thái cơ binh: nâng tay dẫn lưu quang từ dưới lên hóa thành lưỡi kiếm bay lên, lưỡi kiếm sau đó phá không nện xuống, gây [200% + 2.5% × (Cấp độ - 1)] sát thương thuộc tính lửa và kèm 3 tầng [Dấu ấn lưu quang].',
                                        \u63CF\u8FF0: 'Kiếm quang cắt đêm, san phẳng ách nạn!'
                                    },
                                    'Ánh sao phá giới mà đến': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Chỉ có thể dùng sau khi "Bay tới khoảnh khắc Sao Mai" đã được phóng thích hai lần trong trận chiến này. Triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) phá mở màn trời, cắm xuống cự kiếm cơ giới như núi để hủy diệt kẻ địch, gây [800% + 20% × (Cấp độ - 1)] sát thương thuộc tính lửa. Mỗi khi tiêu hao 1 tầng [Dấu ấn lưu quang], sát thương cuối cùng của lần này tăng thêm +10% (tối đa +50%). Đòn này chắc chắn trúng đích.',
                                        \u65B0\u7248\u6548\u679C: 'Chỉ có thể dùng sau khi "Bay tới khoảnh khắc Sao Mai" đã được phóng thích hai lần trong trận chiến này. Triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) phá mở màn trời, cắm xuống cự kiếm cơ giới như núi để hủy diệt kẻ địch, gây [240% + 3% × (Cấp độ - 1)] sát thương thuộc tính lửa. Mỗi khi tiêu hao 1 tầng [Dấu ấn lưu quang], sát thương cuối cùng của lần này tăng thêm +10% (tối đa +50%). Đòn này chắc chắn trúng đích.',
                                        \u63CF\u8FF0: 'Hình chiếu Ẩn Giả khổng lồ giáng xuống từ thiên khung, cự kiếm cơ giới rơi như núi. Binh trang Ẩn Giả: triển khai chế độ cánh ánh sáng. Aemis: đêm này biển sao sáng trong!'
                                    }
                                },
                                \u5916\u8C8C: 'Mái tóc dài hồng nhạt buộc đuôi ngựa cao, giữa tóc có vòng sáng công nghệ lơ lửng. Đồng tử vàng hổ phách hình sao chữ thập, khi cười đôi mắt cong cong. Vai trái điểm một nốt ruồi đen. Khi ở hình thái cơ binh, toàn thân bạc trắng, lưng mọc cánh cơ giới, tựa một pháo đài trên không nhẹ nhàng.',
                                \u7740\u88C5: 'Bộ đồ chiến đấu bó sát trắng tinh phong cách idol cải biên, vai cổ để hở phóng khoáng; áo quây da bóng trắng tinh siết ra đường ngực đầy đặn, chính giữa ngực mở rộng lộ khe ngực, lưng gần như hở hoàn toàn. Thân dưới là bodysuit xẻ cao quấn váy đuôi én bất đối xứng; hai chân bất đối xứng — chân trái mang bốt tất dài trắng kéo tới gốc đùi, chân phải chỉ bị vòng chân vàng ràng buộc, đi bốt cao gót cổ ngắn màu trắng. Hai tay đeo găng chiến thuật dài màu trắng, quá khuỷu tay.',
                                \u597D\u611F\u5EA6: 35,
                                \u540C\u884C\u8A93\u7EA6: true,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Lái tới vì sao chưa được thắp sáng': {
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Tiêu hao 100CP. Aemis triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) lên trên chiến trường, cùng <user> hóa thành lưu quang tiến vào buồng lái Ẩn Giả và cùng điều khiển. Trong thời gian này, hai người miễn nhiễm toàn bộ công kích và khống chế của kẻ địch, tối đa duy trì 2 vòng; nếu trong thời gian đó dùng Ẩn Giả phát động tổng cộng 3 lần công kích thì lập tức giải trừ. Mỗi công kích của Ẩn Giả gây [1000% + 20% × (Cấp độ-1)] sát thương thuộc tính lửa, chắc chắn trúng đích.',
                                        \u65B0\u7248\u6548\u679C: 'Tiêu hao 100CP. Aemis triệu hồi hình chiếu Ẩn Giả (Gundam khổng lồ) lên trên chiến trường, cùng <user> hóa thành lưu quang tiến vào buồng lái Ẩn Giả và cùng điều khiển. Trong thời gian này, hai người miễn nhiễm toàn bộ công kích và khống chế của kẻ địch, tối đa duy trì 2 vòng; nếu trong thời gian đó dùng Ẩn Giả phát động tổng cộng 3 lần công kích thì lập tức giải trừ. Mỗi công kích của Ẩn Giả gây [280% + 4% × (Cấp độ - 1)] sát thương thuộc tính lửa, chắc chắn trúng đích.',
                                        \u63CF\u8FF0: 'Giải trừ giới hạn cơ thể máy, thời khắc cứu thế đã tới!'
                                    }
                                }
                            },
                            'Lumiore': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Long tộc',
                                \u7B49\u7EA7: 85,
                                \u5C5E\u6027: { \u529B\u91CF: 20, \u654F\u6377: 26, \u4F53\u8D28: 24, \u667A\u529B: 22, \u611F\u77E5: 16, \u9B45\u529B: 26 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Uy tín vàng của Xích Dực': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Uy tín vàng của Xích Dực', \u54C1\u8D28: 'Sử thi', \u7B49\u7EA7: 85, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u9B45\u529B: 2, \u4F53\u8D28: 1, \u5168\u6280\u80FD: 2, \u66B4\u51FB\u4F24\u5BB3: 40 },
                                        \u7ECF\u5178\u6548\u679C: 'Kiểm định công kích +2;[Kiêu ngạo bỏ vảy] Khi Lumiore chủ động bỏ trạng thái tăng ích của bản thân hoặc trừ 10% sinh lực hiện tại sẽ kích hoạt, đổi công kích bất kỳ thành công kích phạm vi, đồng thời khiến mục tiêu trúng đòn nhận [Uy áp]: kiểm định công kích kế tiếp -2;[Hãy vang lên, sắc vàng] Hành động phụ, mỗi trận 1 lần, Lumiore tuyên cáo danh xưng Uy tín vàng, chọn một trong ba mục dưới đây để kích hoạt và kéo dài đến khi trận này kết thúc (không thể đổi):「Xích Dực phá trận」mỗi vòng chắc chắn tiên công, kiểm định công kích +3;「Kim Dực lồng hộ」giảm sát thương vật lý/ma pháp của bản thân +15%, khi mỗi hiệp bắt đầu hồi cho phe bạn gần nhất lượng sinh lực bằng HP tối đa của Lumiore ×10%;「Độc Dực khảm vàng」ngưỡng chí mạng -3, sau mỗi lần chí mạng, công kích kế tiếp chắc chắn trúng đích;[Long tức gầm vang] Hành động phụ, mỗi ngày 1 lần, xóa toàn bộ trạng thái tăng ích của bản thân, kích nổ long mạch cuồng bạo đan xen vàng đỏ, gây [1000% + 25% × (Cấp độ-1)] sát thương AOE thuộc tính lửa lên toàn bộ kẻ địch trong tầm nhìn.',
                                        \u65B0\u7248\u6548\u679C: 'Kiểm định công kích +2;[Kiêu ngạo bỏ vảy] Khi Lumiore chủ động bỏ trạng thái tăng ích của bản thân hoặc trừ 10% sinh lực hiện tại sẽ kích hoạt, đổi công kích bất kỳ thành công kích phạm vi, đồng thời khiến mục tiêu trúng đòn nhận [Uy áp]: kiểm định công kích kế tiếp -2;[Hãy vang lên, sắc vàng] Hành động phụ, mỗi trận 1 lần, Lumiore tuyên cáo danh xưng Uy tín vàng, chọn một trong ba mục dưới đây để kích hoạt và kéo dài đến khi trận này kết thúc (không thể đổi):「Xích Dực phá trận」mỗi vòng chắc chắn tiên công, kiểm định công kích +3;「Kim Dực lồng hộ」giảm sát thương vật lý/ma pháp của bản thân +15%, khi mỗi hiệp bắt đầu hồi cho phe bạn gần nhất lượng sinh lực bằng HP tối đa của Lumiore ×10%;「Độc Dực khảm vàng」ngưỡng chí mạng -3, sau mỗi lần chí mạng, công kích kế tiếp chắc chắn trúng đích;[Long tức gầm vang] Hành động phụ, mỗi ngày 1 lần, xóa toàn bộ trạng thái tăng ích của bản thân, kích nổ long mạch cuồng bạo đan xen vàng đỏ, gây [280% + 4% × (Cấp độ - 1)] sát thương AOE thuộc tính lửa lên toàn bộ kẻ địch trong tầm nhìn.',
                                        \u63CF\u8FF0: 'Ban đầu là một đoạn kết tinh vảy rồng đỏ thẫm rụng xuống khi trưởng nữ Long tộc độc dực ra đời, về sau được cô mài thành chiến nhận tượng trưng thân phận. Ngoại hình như lưỡi chém thon dài đan xen đỏ thẫm và vàng sẫm, sống kiếm chảy ánh hồng chuyển sắc.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Hãy gầm vang, sắc vàng': { \u54C1\u8D28: 'Sử thi', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Thể hiện tư thái của "Uy tín vàng", cuốn lên bão long tức đan xen vàng đỏ quét sạch toàn trường. Phải tiêu hao 10% HP hoặc 1 trạng thái tăng ích để phát động, gây [1000% + 25% × (Cấp độ - 1)] sát thương thuộc tính lửa lên toàn bộ kẻ địch. Mỗi lần phóng thích kỹ năng này chỉ một lần; nếu kỹ năng này giết bất kỳ kẻ địch nào, Lumiore được hành động thêm một lần.', \u65B0\u7248\u6548\u679C: 'Thể hiện tư thái của "Uy tín vàng", cuốn lên bão long tức đan xen vàng đỏ quét sạch toàn trường. Phải tiêu hao 10% HP hoặc 1 trạng thái tăng ích để phát động, gây [280% + 4% × (Cấp độ - 1)] sát thương thuộc tính lửa lên toàn bộ kẻ địch. Mỗi lần phóng thích kỹ năng này chỉ một lần; nếu kỹ năng này giết bất kỳ kẻ địch nào, Lumiore được hành động thêm một lần.', \u63CF\u8FF0: '「Hãy vang lên, sắc vàng — hãy khắc ghi tên ta」.' },
                                    'Đòn lóe sáng của Độc Dực': { \u54C1\u8D28: 'Truyền thuyết', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Mở ra chiếc cánh đơn đỏ thẫm bán trong suốt bay lên không, thực hiện một đòn chùm sáng lấp lánh từ trên cao đánh xuống. Gây [800% + 20% × (Cấp độ - 1)] sát thương thuộc tính ánh sáng lên toàn bộ kẻ địch trong phạm vi. Sau khi trúng, thêm cho toàn thể phe bạn lá chắn tương đương 25% HP tối đa của Lumiore, đồng thời xóa trạng thái giảm ích trên người phe bạn.', \u65B0\u7248\u6548\u679C: 'Mở ra chiếc cánh đơn đỏ thẫm bán trong suốt bay lên không, thực hiện một đòn chùm sáng lấp lánh từ trên cao đánh xuống. Gây [240% + 3% × (Cấp độ - 1)] sát thương thuộc tính ánh sáng lên toàn bộ kẻ địch trong phạm vi. Sau khi trúng, thêm cho toàn thể phe bạn lá chắn tương đương 25% HP tối đa của Lumiore, đồng thời xóa trạng thái giảm ích trên người phe bạn.', \u63CF\u8FF0: 'Tuy chỉ có một cánh, cô vẫn có thể nhẹ nhàng nhảy lên trời cao, để ánh mặt trời xuyên qua màng cánh đỏ thẫm, rắc ánh huy hoàng ấm áp xuống cho tất cả những người được cô che chở.' }
                                },
                                \u5916\u8C8C: 'Long nương cánh đỏ với tóc xoăn dài màu vàng, đuôi tóc chuyển sắc hồng đậm, mắt vàng hổ phách; dáng vẻ ấu thái nhỏ nhắn đến mức thấp nhất nhà. Bên phải lưng mọc một cánh đơn đỏ thẫm bán trong suốt, trên đầu có sừng rồng đỏ thẫm dạng cành cây, đuôi rồng chuyển sắc vàng đỏ thường cuộn bên người; khi cảm xúc dao động, chóp đuôi sẽ vô thức lắc lư.',
                                \u7740\u88C5: 'Bodysuit trắng bó sát bên ngoài phủ giáp ngực đen khảm ruby, viền vàng phối hoa văn caro đen, vai khoác áo choàng ren nhỏ màu trắng, găng tay dài đen in hoa văn vảy rồng hình thoi, chân đi bốt cao gót vàng trang trí pha lê.',
                                \u597D\u611F\u5EA6: 35,
                                \u540C\u884C\u8A93\u7EA6: true,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Xích Dực và Diệu Kim cùng múa': { \u54C1\u8D28: 'Sử thi', \u7C7B\u578B: 'Sát thương', \u7ECF\u5178\u6548\u679C: 'Tiêu hao 100CP. Người chơi ôm Lumiore từ phía sau, ma lực hóa thành một cánh ánh sáng khác áp sát và bù đắp cho cánh đơn đỏ thẫm của cô. Hai người hợp lực kích nổ năng lượng long mạch áp đảo, gây [1200% + 35% × (Cấp độ-1)] sát thương hỗn hợp thuộc tính (lửa/ánh sáng) lên toàn bộ kẻ địch. Đòn này chắc chắn trúng đích, đồng thời khiến toàn bộ kháng tính của toàn thể phe địch giảm 20%, kéo dài đến khi chiến đấu kết thúc. Sau khi phóng thích, Lumiore nhận hiệu quả miễn nhiễm khống chế kéo dài 3 vòng.', \u65B0\u7248\u6548\u679C: 'Tiêu hao 100CP. Người chơi ôm Lumiore từ phía sau, ma lực hóa thành một cánh ánh sáng khác áp sát và bù đắp cho cánh đơn đỏ thẫm của cô. Hai người hợp lực kích nổ năng lượng long mạch áp đảo, gây [280% + 4% × (Cấp độ - 1)] sát thương hỗn hợp thuộc tính (lửa/ánh sáng) lên toàn bộ kẻ địch. Đòn này chắc chắn trúng đích, đồng thời khiến toàn bộ kháng tính của toàn thể phe địch giảm 20%, kéo dài đến khi chiến đấu kết thúc. Sau khi phóng thích, Lumiore nhận hiệu quả miễn nhiễm khống chế kéo dài 3 vòng.', \u63CF\u8FF0: '「Hãy nhìn đi, đây chính là ánh sáng vượt khỏi thường lý!」.' }
                                }
                            },
                            'Dania': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Nhân loại',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 10, \u654F\u6377: 10, \u4F53\u8D28: 12, \u667A\u529B: 20, \u611F\u77E5: 18, \u9B45\u529B: 20 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Sao lùn ngụy tạo': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Sao lùn ngụy tạo', \u54C1\u8D28: 'Truyền thuyết', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u667A\u529B: 1, \u9B45\u529B: 1, \u66B4\u51FB\u7387: 10, },
                                        \u7ECF\u5178\u6548\u679C: '[Sắc ảo đêm sao] Kiểm định công kích +2.[Dẫn kéo hư chất] Mỗi trận/1 lần, kéo toàn bộ kẻ địch trong phạm vi lớn, gây [800% + 25% × (Cấp độ - 1)] sát thương; mục tiêu cần thực hiện một lần miễn trừ Sức mạnh DC15, miễn trừ thành công thì chỉ chịu một nửa sát thương và vô hiệu hiệu ứng kéo.[Bọt điểm trang loang lổ] Kích hoạt khi đồng đội bất kỳ chịu sát thương chí tử, tiêu hao phản ứng, hủy sát thương này và khiến đồng đội đó miễn nhiễm toàn bộ sát thương trong 2 vòng kế tiếp. Sau khi 2 vòng kết thúc, sinh lực Dania cưỡng chế đổi thành 1, cho đến trước khi chiến đấu kết thúc không thể nhận bất kỳ trị liệu hoặc lá chắn nào.',
                                        \u65B0\u7248\u6548\u679C: '[Sắc ảo đêm sao] Kiểm định công kích +2.[Dẫn kéo hư chất] Mỗi trận/1 lần, kéo toàn bộ kẻ địch trong phạm vi lớn, gây [240% + 3% × (Cấp độ - 1)] sát thương; mục tiêu cần thực hiện một lần miễn trừ Sức mạnh DC15, miễn trừ thành công thì chỉ chịu một nửa sát thương và vô hiệu hiệu ứng kéo.[Bọt điểm trang loang lổ] Kích hoạt khi đồng đội bất kỳ chịu sát thương chí tử, tiêu hao phản ứng, hủy sát thương này và khiến đồng đội đó miễn nhiễm toàn bộ sát thương trong 2 vòng kế tiếp. Sau khi 2 vòng kết thúc, sinh lực Dania cưỡng chế đổi thành 1, cho đến trước khi chiến đấu kết thúc không thể nhận bất kỳ trị liệu hoặc lá chắn nào.',
                                        \u63CF\u8FF0: 'Đầu pháp trượng khảm thiết bị như máy chiếu trời sao. Như bọt nước tan đi, ảo mộng phai mất, chỉ còn sao lùn tĩnh lặng. Nhưng dù vậy, hào quang từng thắp sáng vũ trụ vẫn chưa hề biến mất.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Gấu bông đen': {
                                        \u7C7B\u578B: 'Trang sức', \u90E8\u4F4D: 'Đặc biệt', \u540D\u79F0: 'Gấu bông đen', \u54C1\u8D28: 'Truyền thuyết', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u5C5E\u6027\u52A0\u6210: { \u611F\u77E5: 2, \u66B4\u51FB\u4F24\u5BB3: 0.3 },
                                        \u6548\u679C: '[Gõ nhẹ cánh cửa] Chỉ có thể phát động khi tiêu hao ít nhất 1 viên 【Ám Hạch】, chỉ định 1 đồng đội; mỗi khi tiêu hao 1 viên 【Ám Hạch】, hành động bất kỳ kế tiếp của người đó vang vọng thêm một lần (phóng thích lại không tiêu hao, kiểm định liên quan tiến hành độc lập lần nữa; ví dụ tiêu hao 2 viên Ám Hạch thì vang vọng 2 lần).[Nếu có thể khâu vá trái tim bằng lời dối] Kích hoạt khi sinh lực Dania hạ xuống 1 hoặc thấp hơn, nhận 2 viên 【Ám Hạch】. Khi mỗi trận chiến bắt đầu và kết thúc, xóa sạch toàn bộ 【Ám Hạch】.',
                                        \u63CF\u8FF0: 'Gấu bông đen, qua khe nứt trước ngực có thể thấy vi quang xanh thẳm sâu hun hút; thường được treo bên hông phải, là niềm an ủi khi thiếu cảm giác an toàn.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Yến tiệc dệt mộng': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Vung pháp trượng sinh ra những bong bóng như mộng ảo, kéo mục tiêu xung quanh tụ lại, làm vỡ bong bóng và gây [800% + 20% × (Cấp độ - 1)] sát thương thuộc tính lửa; hoặc chọn chuyển hóa hư chất thành phòng hộ và trị liệu, tạo khiên bong bóng tăng cho đồng đội lá chắn tạm thời bằng 25% sinh lực tối đa, đồng thời mỗi vòng trị liệu 5% sinh lực tối đa (không thể tác dụng lên bản thân).',
                                        \u65B0\u7248\u6548\u679C: 'Vung pháp trượng sinh ra những bong bóng như mộng ảo, kéo mục tiêu xung quanh tụ lại, làm vỡ bong bóng và gây [240% + 3% × (Cấp độ - 1)] sát thương thuộc tính lửa; hoặc chọn chuyển hóa hư chất thành phòng hộ và trị liệu, tạo khiên bong bóng tăng cho đồng đội lá chắn tạm thời bằng 25% sinh lực tối đa, đồng thời mỗi vòng trị liệu 5% sinh lực tối đa (không thể tác dụng lên bản thân).',
                                        \u63CF\u8FF0: 'Giấu hư chất chí mạng trong bong bóng rực rỡ sắc màu; đây là lời dối dịu dàng cô dệt nên để duy trì ảo tượng tốt đẹp.'
                                    },
                                    'Cảnh cuối sau màn': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Bình thường Dania kháng cự việc chủ động sử dụng, chỉ phóng thích khi nguy hiểm. Mỗi trận chỉ giới hạn 1 lần, giải phóng sức mạnh Minh thức “Aleph-One” trong cơ thể, tiến vào 【hắc hóa/trạng thái giải phóng】. Dưới trạng thái này không thể dùng 【Yến tiệc dệt mộng】 nữa, toàn bộ bong bóng đổi thành cự thủ hư chất đen kịt và hố đen cỡ nhỏ để nghiền ép công kích. Dưới trạng thái này, sát thương cuối cùng của đánh thường tăng thêm 50%, đồng thời mở khóa kỹ năng 【Cảnh cuối · Dạng phông nền】.',
                                        \u65B0\u7248\u6548\u679C: 'Bình thường Dania kháng cự việc chủ động sử dụng, chỉ phóng thích khi nguy hiểm. Mỗi trận chỉ giới hạn 1 lần, giải phóng sức mạnh Minh thức “Aleph-One” trong cơ thể, tiến vào 【hắc hóa/trạng thái giải phóng】. Dưới trạng thái này không thể dùng 【Yến tiệc dệt mộng】 nữa, toàn bộ bong bóng đổi thành cự thủ hư chất đen kịt và hố đen cỡ nhỏ để nghiền ép công kích. Dưới trạng thái này, sát thương cuối cùng của đánh thường tăng thêm 50%, đồng thời mở khóa kỹ năng 【Cảnh cuối · Dạng phông nền】.',
                                        \u63CF\u8FF0: 'Váy áo lan thành sắc đêm sâu không thấy đáy, vòng sáng lạnh màu xanh ngưng tụ trên đỉnh đầu. Trong đôi mắt tím không còn nụ cười lười biếng, chỉ còn sự ghét bỏ lạnh băng và cáu kỉnh. Đây là tư thái cuối cùng khi cô tháo bỏ mọi ngụy trang, bước về phía hủy diệt.'
                                    },
                                    'Cảnh cuối · Dạng phông nền': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Chỉ có thể phóng thích dưới trạng thái giải phóng của 【Cảnh cuối sau màn】, mỗi trận 1 lần. Sức mạnh hư chất bao phủ toàn trường, che khuất màn trời, hình thành hiệu quả sân đấu như bầu trời đêm vũ trụ lạnh băng, kéo dài 3 vòng. Trong thời gian sân đấu tồn tại, toàn thể phe ta có lợi thế kiểm định công kích, sát thương cuối cùng của mọi công kích tăng thêm 30% (tính gộp với Cảnh cuối sau màn, đánh thường của Dania tổng cộng tăng thêm 80%), đồng thời mở khóa kỹ năng 【Cảnh cuối · Dạng huyễn diệt】.',
                                        \u65B0\u7248\u6548\u679C: 'Chỉ có thể phóng thích dưới trạng thái giải phóng của 【Cảnh cuối sau màn】, mỗi trận 1 lần. Sức mạnh hư chất bao phủ toàn trường, che khuất màn trời, hình thành hiệu quả sân đấu như bầu trời đêm vũ trụ lạnh băng, kéo dài 3 vòng. Trong thời gian sân đấu tồn tại, toàn thể phe ta có lợi thế kiểm định công kích, sát thương cuối cùng của mọi công kích tăng thêm 30% (tính gộp với Cảnh cuối sau màn, đánh thường của Dania tổng cộng tăng thêm 80%), đồng thời mở khóa kỹ năng 【Cảnh cuối · Dạng huyễn diệt】.',
                                        \u63CF\u8FF0: 'Khi cô cho rằng tất cả đều là hư vô, ngay cả chính cô cũng chỉ là tồn tại không có ý nghĩa, mảnh trời sao sâu thẳm này chính là sân khấu cuối cùng cô dựng lên cho bi kịch.'
                                    },
                                    'Cảnh cuối · Dạng huyễn diệt': {
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Chỉ có thể phóng thích trong thời gian 【Cảnh cuối · Dạng phông nền】 duy trì. Chủ động phá vỡ phông nền sao trời (toàn đội lập tức mất cộng thêm), đồng thời thoát khỏi trạng thái 【hắc hóa/giải phóng】. Giáng xuống đòn đánh hủy diệt, gây [1000% + 25% × (Cấp độ - 1)] sát thương thuộc tính lửa lên toàn bộ kẻ địch diện rộng, đồng thời biến sân đấu lấy bản thân làm trung tâm thành 【Vùng thực】 cho đến khi chiến đấu kết thúc. Bất kỳ ai ở trong Vùng thực (không phân địch ta, bao gồm cả bản thân và đồng đội), trước mỗi vòng hành động cần thực hiện miễn trừ Thể chất 【DC10+điều chỉnh Trí lực của Dania】; thất bại thì chịu sát thương chuẩn bằng 5% sinh lực tối đa của chính mình.',
                                        \u65B0\u7248\u6548\u679C: 'Chỉ có thể phóng thích trong thời gian 【Cảnh cuối · Dạng phông nền】 duy trì. Chủ động phá vỡ phông nền sao trời (toàn đội lập tức mất cộng thêm), đồng thời thoát khỏi trạng thái 【hắc hóa/giải phóng】. Giáng xuống đòn đánh hủy diệt, gây [280% + 4% × (Cấp độ - 1)] sát thương thuộc tính lửa lên toàn bộ kẻ địch diện rộng, đồng thời biến sân đấu lấy bản thân làm trung tâm thành 【Vùng thực】 cho đến khi chiến đấu kết thúc. Bất kỳ ai ở trong Vùng thực (không phân địch ta, bao gồm cả bản thân và đồng đội), trước mỗi vòng hành động cần thực hiện miễn trừ Thể chất 【DC10+điều chỉnh Trí lực của Dania】; thất bại thì chịu sát thương chuẩn bằng 5% sinh lực tối đa của chính mình.',
                                        \u63CF\u8FF0: 'Phông nền sụp đổ, cô kéo cả bản thân lẫn kẻ địch vào vực sâu hư chất. “Dù rơi vào hư vô cũng không cần sợ, bởi trong mảnh hư vô ấy, sẽ có ta ở đó.”'
                                    }
                                },
                                \u5916\u8C8C: 'Nhỏ nhắn đầy đặn, trắng trẻo mềm mại. Tóc dài chuyển sắc từ hồng nhạt sang xanh nhạt, bên trái tết bím, trên đầu dựng tóc ngố. Khi ở trạng thái giải phóng, ánh mắt hóa thành sự ghét bỏ lạnh băng, tay chân bị vật bám dạng tinh vân tím đậm phủ kín.',
                                \u7740\u88C5: 'Váy liền quây ngực hở vai màu xanh nhạt, váy hai lớp ngoài trắng trong đen. Cổ đeo vòng cổ dây xích, dưới xương quai xanh cố định một viên sapphire lớn để che dấu âm. Hai chân để trần, đi giày Mary Jane đen quai chéo. Bên hông phải treo gấu bông đen.',
                                \u597D\u611F\u5EA6: 30,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Nguyện em trong lặng im, nhận được mặt trời': {
                                        \u54C1\u8D28: 'Sử thi',
                                        \u7C7B\u578B: 'Đặc biệt',
                                        \u7ECF\u5178\u6548\u679C: 'Tiêu hao 100CP. Giải trừ trạng thái xấu 【sinh lực bị khóa ở 1】 và 【không thể nhận trị liệu hoặc lá chắn】 của Dania, hồi về đầy máu. Toàn thể đồng đội nhận trạng thái tăng ích, kiểm định công kích tăng thêm bằng điều chỉnh Trí lực của Dania, đồng thời khiến mọi xúc xắc phe ta thấp hơn 10 khi kết toán đều đổi thành 10, kéo dài 3 vòng.',
                                        \u65B0\u7248\u6548\u679C: 'Tiêu hao 100CP. Giải trừ trạng thái xấu 【sinh lực bị khóa ở 1】 và 【không thể nhận trị liệu hoặc lá chắn】 của Dania, hồi về đầy máu. Toàn thể đồng đội nhận trạng thái tăng ích, kiểm định công kích tăng thêm bằng điều chỉnh Trí lực của Dania, đồng thời khiến mọi xúc xắc phe ta thấp hơn 10 khi kết toán đều đổi thành 10, kéo dài 3 vòng.',
                                        \u63CF\u8FF0: 'Cô lặng lẽ chờ đợi khoảnh khắc trả lại thứ ánh sáng vay mượn ấy cho sao dãy chính.'
                                    }
                                }
                            },
                            'Roxie': {
                                \u6027\u522B: 'Nữ',
                                \u9644\u8FD1: true,
                                \u79CD\u65CF: 'Lupo',
                                \u7B49\u7EA7: 1,
                                \u5C5E\u6027: { \u529B\u91CF: 14, \u654F\u6377: 20, \u4F53\u8D28: 12, \u667A\u529B: 10, \u611F\u77E5: 18, \u9B45\u529B: 16 },
                                \u88C5\u5907\u5217\u8868: {
                                    'Sắc đỏ của sói': {
                                        \u7C7B\u578B: 'Vũ khí', \u90E8\u4F4D: 'Tay chính', \u540D\u79F0: 'Sắc đỏ của sói', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u6807\u7B7E: ['Kiếm một tay', 'Hợp kim', 'Cải tạo công nghiệp', 'Kẻ Nứt Đất'],
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1, \u611F\u77E5: 1, \u66B4\u51FB\u7387: 5, \u5FC5\u6740: 1 },
                                        \u6548\u679C: '[Săn trước] Kiểm định công kích +1;[Bầy sói cắn nuốt] Kích hoạt khi chí mạng trúng đích, sát thương cuối cùng lần này tăng thêm +20%; khi công kích mục tiêu đang ở trạng thái [Vết chém móng vuốt], kiểm định công kích tăng thêm +3.',
                                        \u63CF\u8FF0: 'Trường kiếm bán chạy của Raythean Industry, thân kiếm đỏ sẫm, sống kiếm khảm mô-đun tản nhiệt và cổng cải tạo.',
                                        \u88C5\u5907\u7BB1: false
                                    },
                                    'Áo choàng đỏ thẫm': {
                                        \u7C7B\u578B: 'Giáp', \u90E8\u4F4D: 'Áo', \u540D\u79F0: 'Áo choàng đỏ thẫm', \u54C1\u8D28: 'Xuất sắc', \u7B49\u7EA7: 1, \u5F3A\u5316\u7B49\u7EA7: 0,
                                        \u6807\u7B7E: ['Áo choàng', 'Vải da thú', 'Nhuốm máu', 'Di vật'],
                                        \u5C5E\u6027\u52A0\u6210: { \u654F\u6377: 1, \u8FDB\u9636: 1 },
                                        \u6548\u679C: '[Huyết mạch bất diệt] Kích hoạt khi HP thấp hơn 25%, miễn nhiễm [Sợ hãi], sát thương cuối cùng của công kích kế tiếp +30%;[Dư dả ứng biến] Kiểm định liên quan đến né tránh và tiên công +2.',
                                        \u63CF\u8FF0: 'Áo choàng trùm đầu đỏ sẫm nhuốm máu tộc nhân, chạm vào như được người nhà ôm lấy.',
                                        \u88C5\u5907\u7BB1: false
                                    }
                                },
                                \u6280\u80FD: {
                                    'Bóng đỏ máu': {
                                        \u54C1\u8D28: 'Xuất sắc',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Đột tiến tốc độ cao chém mục tiêu, gây [500% + 15% × (Cấp độ - 1)] sát thương vật lý và áp [Vết chém móng vuốt] 2 vòng; mục tiêu cần thực hiện miễn trừ Sức mạnh DC15, thất bại thì bị [Hất bay] và bị đẩy lùi một nấc khoảng cách. Nếu mục tiêu đã ở trạng thái [Vết chém móng vuốt], phóng thích thêm truy kích Sói Hổ Phách, thêm [300% + 10% × (Cấp độ - 1)] sát thương bỏng rát.',
                                        \u65B0\u7248\u6548\u679C: 'Đột tiến tốc độ cao chém mục tiêu, gây [200% + 2.5% × (Cấp độ - 1)] sát thương vật lý và áp [Vết chém móng vuốt] 2 vòng; mục tiêu cần thực hiện miễn trừ Sức mạnh DC15, thất bại thì bị [Hất bay] và bị đẩy lùi một nấc khoảng cách. Nếu mục tiêu đã ở trạng thái [Vết chém móng vuốt], phóng thích thêm truy kích Sói Hổ Phách, thêm [170% + 2% × (Cấp độ - 1)] sát thương bỏng rát.',
                                        \u63CF\u8FF0: 'Bóng đỏ lướt đất lóe lên là tới, móng vuốt thứ hai đã đánh tới từ góc chết.'
                                    },
                                    'Móng vuốt kỳ tập': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Sau khi áo choàng che khuất tầm nhìn, song nhận luân phiên đâm kích, gây [800% + 20% × (Cấp độ - 1)] sát thương bỏng rát; khi công kích lần này chí mạng, sát thương cuối cùng tăng thêm +50%. Sau khi trúng, áp [Vết chém móng vuốt] lên mục tiêu 2 vòng. Phe bạn có thể tiêu hao phản ứng để thêm một đòn đánh thường chắc chắn trúng đích và chí mạng lên mục tiêu có [Vết chém móng vuốt], sau đó loại bỏ Vết chém móng vuốt.',
                                        \u65B0\u7248\u6548\u679C: 'Sau khi áo choàng che khuất tầm nhìn, song nhận luân phiên đâm kích, gây [240% + 3% × (Cấp độ - 1)] sát thương bỏng rát; khi công kích lần này chí mạng, sát thương cuối cùng tăng thêm +50%. Sau khi trúng, áp [Vết chém móng vuốt] lên mục tiêu 2 vòng. Phe bạn có thể tiêu hao phản ứng để thêm một đòn đánh thường chắc chắn trúng đích và chí mạng lên mục tiêu có [Vết chém móng vuốt], sau đó loại bỏ Vết chém móng vuốt.',
                                        \u63CF\u8FF0: 'Chuỗi đâm liên miên như bầy sói xé cắn; khi hai nhát cuối hạ xuống, con mồi đã không còn đường thoát.'
                                    }
                                },
                                \u5916\u8C8C: 'Mái tóc dài vàng buộc thành tóc mai lệch, đồng tử hình thoi màu vàng, tai sói và đuôi sói bông xù; gương mặt non nớt nhưng ánh mắt sắc bén, vóc người cực kỳ nhỏ nhắn.',
                                \u7740\u88C5: 'Áo choàng trùm đầu đỏ sẫm phối váy liền không tay và bốt lửng, trang phục nhẹ tiện hành động, bên hông đeo kiếm một tay và dao găm.',
                                \u597D\u611F\u5EA6: 25,
                                \u540C\u884C\u8A93\u7EA6: false,
                                \u8FDE\u643A\u5965\u4E49: {
                                    'Cuộc vây săn của bầy sói': {
                                        \u54C1\u8D28: 'Truyền thuyết',
                                        \u7C7B\u578B: 'Sát thương',
                                        \u7ECF\u5178\u6548\u679C: 'Tiêu hao 100CP. Roxie gọi bầy sói, triệu hồi 3 con Sói Huyết Thiêu có lượng máu ngang Roxie tham chiến; chúng hành động độc lập, không chiếm cơ hội hành động của Roxie, có các đặc điểm sau: 1. Mỗi vòng chủ động gây tổng cộng [800% + 20% × (Cấp độ - 1)] x 60% sát thương bỏng rát. 2. Khi kẻ địch vượt qua kiểm định trúng đích, <user> hoặc Roxie sắp chịu đòn, mỗi con sói có thể tự tiêu hao phản ứng để chịu sát thương thay. 3. Triệu hồi kéo dài đến khi chiến đấu kết thúc. Khi máu kẻ địch ở dưới 25% và còn ít nhất 2 con sói sống sót, có thể chủ động kích hoạt: tiêu hao hành động chính của <user> và hành động chính của Roxie, liên hợp toàn bộ bầy sói cùng [Xử quyết] kẻ địch, khiến kẻ địch dưới 25% máu chết ngay, sau đó bầy sói được triệu hồi biến mất.',
                                        \u65B0\u7248\u6548\u679C: 'Tiêu hao 100CP. Roxie gọi bầy sói, triệu hồi 3 con Sói Huyết Thiêu có lượng máu ngang Roxie tham chiến; chúng hành động độc lập, không chiếm cơ hội hành động của Roxie, có các đặc điểm sau: 1. Mỗi vòng chủ động gây tổng cộng [240% + 3% × (Cấp độ - 1)] x 60% sát thương bỏng rát. 2. Khi kẻ địch vượt qua kiểm định trúng đích, <user> hoặc Roxie sắp chịu đòn, mỗi con sói có thể tự tiêu hao phản ứng để chịu sát thương thay. 3. Triệu hồi kéo dài đến khi chiến đấu kết thúc. Khi máu kẻ địch ở dưới 25% và còn ít nhất 2 con sói sống sót, có thể chủ động kích hoạt: tiêu hao hành động chính của <user> và hành động chính của Roxie, liên hợp toàn bộ bầy sói cùng [Xử quyết] kẻ địch, khiến kẻ địch dưới 25% máu chết ngay, sau đó bầy sói được triệu hồi biến mất.',
                                        \u63CF\u8FF0: 'Khoảnh khắc chính diện ép lùi đường thoát của con mồi, răng sói đã cắn xuyên yết hầu từ góc chết.'
                                    }
                                },
                                \u5F53\u524D\u60F3\u6CD5: ''
                            }
                        };

    const STARTER_TEAMMATE_LEGACY_NAME_MAP = {
        '\u6cd5\u9732\u7279': 'Forte',
        '\u7ea2\u83b2': 'Hồng Liên',
        '\u53f2\u8482\u82ac\u59ae': 'Stephanie',
        '\u5409\u666e\u8389\u5c14': 'Jibril',
        '\u661f\u6781': 'Tinh Cực',
        '\u827e\u514b\u8389\u897f\u5a05': 'Ecclesia',
        '\u5948\u96c5\u4e3d': 'Nyarly',
        '\u5965\u5951\u4e1d': 'Orchis',
        '\u764c': 'Ung thư',
        '\u7eef': 'Hiiro',
        '\u4e9a\u4e1d\u5a1c': 'Asuna',
        '\u767d': 'Shiro',
        '\u9732\u9732\u5361': 'Luluca',
        '\u5361\u63d0\u5e0c\u5a05': 'Catissia',
        '\u5361\u63d0\u5e0c\u4e9a': 'Catissia',
        '\u5361\u8482\u5e0c\u5a05': 'Catissia',
        '\u7231\u5f25\u65af': 'Aemis',
        '\u7490\u7c73\u6b27\u513f': 'Lumiore',
        '\u8fbe\u59ae\u5a05': 'Dania',
        '\u6d1b\u831c': 'Roxie',
        'Catisia': 'Catissia'
    };

    function getStarterTeammateTemplate(bondName) {
        const rawName = String(bondName || '').trim();
        const normalizedName = STARTER_TEAMMATE_LEGACY_NAME_MAP[rawName] || rawName;
        return STARTER_TEAMMATE_TEMPLATE_MAP[normalizedName] || null;
    }

    function syncStarterTeammateEquipLevels(equipList, level) {
        Object.values(equipList || {}).forEach(item => {
            if (!item || typeof item !== 'object') return;
            item.\u7B49\u7EA7 = level;
            if (item.\u5F3A\u5316\u7B49\u7EA7 === undefined || item.\u5F3A\u5316\u7B49\u7EA7 === null) item.\u5F3A\u5316\u7B49\u7EA7 = 0;
            if (item.\u88C5\u5907\u7BB1 === undefined) item.\u88C5\u5907\u7BB1 = false;
        });
    }

    function applyStarterTeammateTemplateToBond(bondName, bond, statData = null) {
        const template = getStarterTeammateTemplate(bondName);
        if (!template || !bond || typeof bond !== 'object') return false;

        const currentLevel = Math.max(1, safeParseInt(bond.\u7B49\u7EA7, safeParseInt(template.\u7B49\u7EA7, 1)));
        const combatMode = getCombatValueMode(statData);
        const equippedList = clonePlainValue(template.\u88C5\u5907\u5217\u8868 || {});
        const skills = clonePlainValue(template.\u6280\u80FD || {});
        const comboSkills = clonePlainValue(template.\u8FDE\u643A\u5965\u4E49 || {});
        syncStarterTeammateEquipLevels(equippedList, currentLevel);
        applyStarterTemplateEffectsByMode(equippedList, combatMode);
        applyStarterTemplateEffectsByMode(skills, combatMode);
        applyStarterTemplateEffectsByMode(comboSkills, combatMode);

        bond.\u6027\u522B = template.\u6027\u522B ?? bond.\u6027\u522B;
        bond.\u9644\u8FD1 = template.\u9644\u8FD1 !== false;
        bond.\u79CD\u65CF = template.\u79CD\u65CF ?? bond.\u79CD\u65CF;
        bond.\u7B49\u7EA7 = currentLevel;
        bond.\u5C5E\u6027 = clonePlainValue(template.\u5C5E\u6027 || {});
        bond.\u88C5\u5907\u5217\u8868 = equippedList;
        bond.\u6280\u80FD = skills;
        bond.\u5916\u8C8C = template.\u5916\u8C8C || '';
        bond.\u7740\u88C5 = template.\u7740\u88C5 || '';
        if (template.\u597D\u611F\u5EA6 !== undefined) bond.\u597D\u611F\u5EA6 = safeParseInt(template.\u597D\u611F\u5EA6, safeParseInt(bond.\u597D\u611F\u5EA6, 0));
        if (template.\u540C\u884C\u8A93\u7EA6 !== undefined) bond.\u540C\u884C\u8A93\u7EA6 = template.\u540C\u884C\u8A93\u7EA6 === true;
        if (template.\u8FDE\u643A\u5965\u4E49 && typeof template.\u8FDE\u643A\u5965\u4E49 === 'object') {
            bond.\u8FDE\u643A\u5965\u4E49 = comboSkills;
        }
        return true;
    }

    function applyStarterTeammateTemplatesOnNewBonds(statData, statDataBefore) {
        const bonds = statData?.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;

        const beforeMap = (statDataBefore?.\u7F81\u7ECA\u5217\u8868 && typeof statDataBefore.\u7F81\u7ECA\u5217\u8868 === 'object')
            ? statDataBefore.\u7F81\u7ECA\u5217\u8868
            : {};

        Object.entries(bonds).forEach(([bondName, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (beforeMap[bondName] !== undefined) return;
            if (!getStarterTeammateTemplate(bondName)) return;
            if (applyStarterTeammateTemplateToBond(bondName, bond, statData)) {
                logCalc(`[Chặn đồng đội mở đầu] ${bondName} vừa đăng ký, đã ghi đè theo mẫu mở đầu và đồng bộ cấp độ ${bond.\u7B49\u7EA7}`);
            }
        });
    }

    function getBriefDisplayPathList(statData) {
        const paths = statData?.\u7CFB\u7EDF\u914D\u7F6E?.\u7B80\u8BE6\u663E\u793A?.\u7B80\u8981\u663E\u793A\u8DEF\u5F84;
        return Array.isArray(paths) ? paths.filter(path => typeof path === 'string' && path.trim()) : [];
    }

    function getBriefBondNameSet(statData) {
        const names = new Set();
        getBriefDisplayPathList(statData).forEach(path => {
            const normalized = path.trim();
            if (!normalized.startsWith(BOND_BRIEF_PATH_PREFIX)) return;
            const name = normalized.slice(BOND_BRIEF_PATH_PREFIX.length).trim();
            if (name) names.add(name);
        });
        return names;
    }

    function isBondBriefDisplay(statData, bondName) {
        return getBriefBondNameSet(statData).has(String(bondName || '').trim());
    }

    function guardBriefDisplayBonds(statData, statDataBefore) {
        if (!statDataBefore) return;
        const frozenBondNames = getBriefBondNameSet(statData);
        if (frozenBondNames.size <= 0) return;

        const bonds = statData?.\u7F81\u7ECA\u5217\u8868;
        const oldBonds = statDataBefore?.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;
        if (!oldBonds || typeof oldBonds !== 'object') return;

        frozenBondNames.forEach(name => {
            const oldBond = oldBonds[name];
            const newBond = bonds[name];
            if (oldBond === undefined) {
                if (newBond !== undefined) {
                    delete bonds[name];
                    warnCalc(`[Bộ giám sát biến] ⚠️ Gắn kết hiển thị rút gọn "${name}" không tồn tại ở frame trước, đã xóa dữ liệu mới thêm`);
                }
                return;
            }
            if (hasChanged(oldBond, newBond)) {
                bonds[name] = clonePlainValue(oldBond);
                warnCalc(`[Bộ giám sát biến] ⚠️ Gắn kết hiển thị rút gọn "${name}" đã bị sửa, đã rollback toàn bộ và đóng băng`);
            }
        });
    }

    // 位于「当前事件」下、只允许合并不允许整体丢失的对象键。
    // 典型隐患：AI 结算/进入新副本时用 { "op":"add", "path":"/当前事件/惊悚乐园副本", "value": { 单个副本 } }
    // 会把之前已完成副本的记录整体冲掉；或直接 remove 整个对象/整个「当前事件」导致进度丢失。
    // 如需保护更多进度对象，在此追加键名即可。
    const MERGE_PROTECTED_EVENT_KEYS = ['\u60ca\u609a\u4e50\u56ed\u526f\u672c', '\u60ca\u609a\u4e50\u56ed\u526f\u672c\u8bc4\u4ef7', '\u9f99\u65cf\u526f\u672c'];

    function isPlainObject(value) {
        return !!value && typeof value === 'object' && !Array.isArray(value);
    }

    // 以新对象为基础，补回旧对象中缺失的子键；同名子键保留新值
    // （允许「进行中→已完成」、评价刷新等合法更新），只防止旧子键被整体抹掉。
    function mergePreserveOldChildKeys(oldObj, newObj) {
        const merged = isPlainObject(newObj) ? clonePlainValue(newObj) : {};
        if (isPlainObject(oldObj)) {
            for (const [key, oldChild] of Object.entries(oldObj)) {
                if (!Object.prototype.hasOwnProperty.call(merged, key)) {
                    merged[key] = clonePlainValue(oldChild);
                }
            }
        }
        return merged;
    }

    function guardMergeProtectedEvents(statData, statDataBefore) {
        const oldEvents = statDataBefore?.\u5F53\u524D\u4E8B\u4EF6;
        if (!isPlainObject(oldEvents)) return;

        // 收集旧数据中真实存在、且非空的受保护对象
        const protectedOldObjs = {};
        for (const key of MERGE_PROTECTED_EVENT_KEYS) {
            const oldObj = oldEvents[key];
            if (isPlainObject(oldObj) && Object.keys(oldObj).length > 0) {
                protectedOldObjs[key] = oldObj;
            }
        }
        if (Object.keys(protectedOldObjs).length === 0) return;

        // 情况A：整个「当前事件」被删除或置空 → 重建容器，仅放回受保护对象，其余照常删除
        if (!isPlainObject(statData.\u5F53\u524D\u4E8B\u4EF6)) {
            statData.\u5F53\u524D\u4E8B\u4EF6 = {};
            for (const [key, oldObj] of Object.entries(protectedOldObjs)) {
                statData.\u5F53\u524D\u4E8B\u4EF6[key] = clonePlainValue(oldObj);
                warnCalc(`[Bộ giám sát biến] ⚠️ "Sự kiện hiện tại" bị xóa toàn bộ, đã giữ lại "${key}" để tránh mất tiến độ phụ bản`);
            }
            return;
        }

        // 情况B：容器仍在，但受保护对象被整体删除或被 add 覆盖导致旧子键丢失 → 合并补回
        const newEvents = statData.\u5F53\u524D\u4E8B\u4EF6;
        for (const [key, oldObj] of Object.entries(protectedOldObjs)) {
            const newObj = newEvents[key];
            const merged = mergePreserveOldChildKeys(oldObj, newObj);
            if (!hasChanged(newObj, merged)) continue;

            const lostKeys = Object.keys(oldObj).filter(k => !isPlainObject(newObj) || !Object.prototype.hasOwnProperty.call(newObj, k));
            newEvents[key] = merged;
            if (!isPlainObject(newObj)) {
                warnCalc(`[Bộ giám sát biến] ⚠️ "Sự kiện hiện tại/${key}" bị xóa toàn bộ, đã khôi phục mục con: ${lostKeys.join('、') || '(không có)'}`);
            } else {
                warnCalc(`[Bộ giám sát biến] ⚠️ "Sự kiện hiện tại/${key}" bị ghi đè toàn bộ, đã bù lại mục con bị mất: ${lostKeys.join('、') || '(không có)'}`);
            }
        }
    }

    function guardProtectedFields(statData, statDataBefore) {
        if (!statDataBefore) return;
        logCalc(`[Gỡ lỗi bộ giám sát biến] Bắt đầu kiểm tra, PROTECTED_PATHS=${JSON.stringify(PROTECTED_PATHS)}`);
        for (const path of PROTECTED_PATHS) {
            const oldVal = getByPath(statDataBefore, path);
            const newVal = getByPath(statData, path);
            logCalc(`[Gỡ lỗi bộ giám sát biến] ${path}: old=${JSON.stringify(oldVal)}, new=${JSON.stringify(newVal)}, changed=${hasChanged(oldVal, newVal)}`);
            if (oldVal !== undefined && hasChanged(oldVal, newVal)) {
                warnCalc(`[Bộ giám sát biến] ⚠️ Trường được bảo vệ bị bên ngoài sửa: ${path} (${JSON.stringify(oldVal)} → ${JSON.stringify(newVal)}), đã rollback`);
                setByPath(statData, path, oldVal);
            }
        }

        guardMergeProtectedEvents(statData, statDataBefore);
        guardBriefDisplayBonds(statData, statDataBefore);
        applyStarterTeammateTemplatesOnNewBonds(statData, statDataBefore);

        // 装备新增守卫：仅拦截“新加装备”默认落位错误的情况
        // 规则：新增装备若装备箱=false，自动修正为 true；
        // 不处理已有装备，避免影响老装备在后续更新时的合法改动。
        const oldEquipList = statDataBefore?.\u4EBA\u7269?.\u88C5\u5907\u5217\u8868 || {};
        const newEquipList = statData?.\u4EBA\u7269?.\u88C5\u5907\u5217\u8868 || {};
        for (const [equipKey, equipVal] of Object.entries(newEquipList)) {
            if (!equipVal || typeof equipVal !== 'object') continue;
            const isNewEquip = oldEquipList[equipKey] === undefined;
            if (isNewEquip) {
                const equipName = (typeof equipVal.\u540D\u79F0 === 'string') ? equipVal.\u540D\u79F0.trim() : '';
                if (!equipName) {
                    equipVal.\u540D\u79F0 = equipKey;
                    warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" có tên rỗng, đã tự động điền bằng tên khóa`);
                }
                sanitizeNewEquipCoreAttrBonuses(equipKey, equipVal);
            }
            if (isNewEquip && equipVal.\u88C5\u5907\u7BB1 === false) {
                equipVal.\u88C5\u5907\u7BB1 = true;
                warnCalc(`[Bộ giám sát biến] ⚠️ Trang bị mới "${equipKey}" có hòm trang bị là false, đã tự động sửa thành true`);
            }
        }
    }

    function collectEquippedReductionContrib(player) {
        const \u88C5\u5907\u5217\u8868 = player?.\u88C5\u5907\u5217\u8868 || {};
        let physDefense = 0;
        let magDefense = 0;
        let physBonus = 0;
        let magBonus = 0;

        Object.values(\u88C5\u5907\u5217\u8868).forEach(item => {
            if (!item || !item.\u540D\u79F0 || item.\u88C5\u5907\u7BB1) return;

            const bonuses = item.\u5C5E\u6027\u52A0\u6210 || {};
            physBonus += safeParseFloat(bonuses['\u7269\u7406\u51CF\u4F24'], 0);
            magBonus += safeParseFloat(bonuses['\u9B54\u6CD5\u51CF\u4F24'], 0);

            if ((item.\u7C7B\u578B === '\u9632\u5177' || isShieldLikeEquip(item)) && !isSpecialEquippedItem(item)) {
                const armorSlot = isShieldLikeEquip(item) ? '\u76FE\u724C' : getEquipStoredSlot(item);
                physDefense += getArmorDefenseValue(item, armorSlot || item.\u90E8\u4F4D);
            } else if (item.\u7C7B\u578B === '\u9996\u9970') {
                if (!isSpecialEquippedItem(item)) {
                    magDefense += getAccessoryDefenseValue(item, getEquipStoredSlot(item) || item.\u90E8\u4F4D);
                }
            }
        });

        const physFromDefense = defenseToReductionPercent(physDefense, PHYS_DEF_FULL_SCALE);
        const magFromDefense = defenseToReductionPercent(magDefense, MAG_DEF_FULL_SCALE);

        return {
            physDefense,
            magDefense,
            physBonus,
            magBonus,
            physFromDefense,
            magFromDefense
        };
    }

    // 仅在装备变化时写回减伤，避免覆盖非装备来源的临时Buff改动
    function calculateDamageReductions(player, playerBefore) {
        if (!player) return;
        if (!player.\u6218\u6597\u5C5E\u6027) player.\u6218\u6597\u5C5E\u6027 = {};
        const combat = player.\u6218\u6597\u5C5E\u6027;

        const curr = collectEquippedReductionContrib(player);
        const currEquipPhys = curr.physBonus + curr.physFromDefense;
        const currEquipMag = curr.magBonus + curr.magFromDefense;

        let basePhys = 0;
        let baseMag = 0;

        if (playerBefore) {
            const prevCombat = playerBefore.\u6218\u6597\u5C5E\u6027 || {};
            const prev = collectEquippedReductionContrib(playerBefore);
            const prevEquipPhys = prev.physBonus + prev.physFromDefense;
            const prevEquipMag = prev.magBonus + prev.magFromDefense;
            basePhys = safeParseFloat(prevCombat.\u7269\u7406\u51CF\u4F24, 0) - prevEquipPhys;
            baseMag = safeParseFloat(prevCombat.\u9B54\u6CD5\u51CF\u4F24, 0) - prevEquipMag;
        } else {
            // 首次兜底：尽量从当前值反推“非装备基础减伤”
            basePhys = safeParseFloat(combat.\u7269\u7406\u51CF\u4F24, 0) - currEquipPhys;
            baseMag = safeParseFloat(combat.\u9B54\u6CD5\u51CF\u4F24, 0) - currEquipMag;
        }

        basePhys = clamp(basePhys, 0, DAMAGE_REDUCTION_CAP);
        baseMag = clamp(baseMag, 0, DAMAGE_REDUCTION_CAP);

        const newPhys = clamp(Math.round(basePhys + currEquipPhys), 0, DAMAGE_REDUCTION_CAP);
        const newMag = clamp(Math.round(baseMag + currEquipMag), 0, DAMAGE_REDUCTION_CAP);

        if (safeParseFloat(combat.\u7269\u7406\u51CF\u4F24, 0) !== newPhys) {
            logCalc(`[Tính giảm sát thương] Giảm sát thương vật lý: ${combat.\u7269\u7406\u51CF\u4F24} → ${newPhys} (nền ${basePhys.toFixed(2)} + dòng thuộc tính ${curr.physBonus.toFixed(2)} + ánh xạ phòng ngự ${curr.physFromDefense})`);
            combat.\u7269\u7406\u51CF\u4F24 = newPhys;
        }
        if (safeParseFloat(combat.\u9B54\u6CD5\u51CF\u4F24, 0) !== newMag) {
            logCalc(`[Tính giảm sát thương] Giảm sát thương ma pháp: ${combat.\u9B54\u6CD5\u51CF\u4F24} → ${newMag} (nền ${baseMag.toFixed(2)} + dòng thuộc tính ${curr.magBonus.toFixed(2)} + ánh xạ phòng ngự ${curr.magFromDefense})`);
            combat.\u9B54\u6CD5\u51CF\u4F24 = newMag;
        }
    }

    function calculateBondMaxHP(bond, bondName, options = {}) {
        if (!bond) return;
        const initMissingCurrentHp = options.initMissingCurrentHp === true;
        const rootData = options.rootData || null;

        let equipHpBonus = 0;
        const \u88C5\u5907\u5217\u8868 = bond.\u88C5\u5907\u5217\u8868 || {};
        Object.values(\u88C5\u5907\u5217\u8868).forEach(item => {
            if (!item || !item.\u540D\u79F0 || item.\u88C5\u5907\u7BB1) return;
            const bonuses = item.\u5C5E\u6027\u52A0\u6210 || {};
            equipHpBonus += safeParseInt(bonuses['\u751F\u547D\u503C\u4E0A\u9650'], 0);
        });

        const newMaxHP = calcHpByMode(bond, rootData, equipHpBonus);

        const oldMaxHP = safeParseInt(bond.\u751F\u547D\u503C\u4E0A\u9650, 0);
        const oldCurrentHP = safeParseInt(bond.\u5F53\u524D\u751F\u547D\u503C, 0);

        if (oldMaxHP !== newMaxHP) {
            bond.\u751F\u547D\u503C\u4E0A\u9650 = newMaxHP;
            logCalc(`[HP gắn kết] ${bondName} giới hạn sinh lực ${oldMaxHP} → ${newMaxHP}`);

            if (oldMaxHP > 0 && oldCurrentHP > 0) {
                const hpRatio = oldCurrentHP / oldMaxHP;
                const newCurrentHP = Math.max(1, Math.round(hpRatio * newMaxHP));
                bond.\u5F53\u524D\u751F\u547D\u503C = Math.min(newCurrentHP, newMaxHP);
                logCalc(`[HP gắn kết] ${bondName} sửa theo tỷ lệ: ${oldCurrentHP} → ${bond.\u5F53\u524D\u751F\u547D\u503C} (${Math.round(hpRatio * 100)}%)`);
            } else if (initMissingCurrentHp && (bond.\u5F53\u524D\u751F\u547D\u503C === undefined || bond.\u5F53\u524D\u751F\u547D\u503C === null)) {
                bond.\u5F53\u524D\u751F\u547D\u503C = newMaxHP;
                logCalc(`[HP gắn kết] ${bondName} thiếu sinh lực hiện tại, đã khởi tạo thành ${newMaxHP}`);
            } else if (oldCurrentHP > newMaxHP) {
                bond.\u5F53\u524D\u751F\u547D\u503C = newMaxHP;
            }
            return;
        }

        // 生命上限未变化时，仅兜底缺失字段
        if (initMissingCurrentHp && (bond.\u5F53\u524D\u751F\u547D\u503C === undefined || bond.\u5F53\u524D\u751F\u547D\u503C === null)) {
            bond.\u5F53\u524D\u751F\u547D\u503C = newMaxHP;
            logCalc(`[HP gắn kết] ${bondName} thiếu sinh lực hiện tại, đã khởi tạo thành ${newMaxHP}`);
        }
    }

    function ensureAllBondsThresholdCorrect(statData, playerName) {
        const bonds = statData?.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;
            if (!isBondShareExpEnabled(bond)) return;

            const bondLevel = safeParseInt(bond.\u7B49\u7EA7, 1);
            const levelBaseExp = getLevelBaseTotalExp(bondLevel);
            const parsedExp = parseFloat(bond.\u5F53\u524D\u603B\u7ECF\u9A8C);
            
            // 修正当前总经验
            if (bond.\u5F53\u524D\u603B\u7ECF\u9A8C === undefined || bond.\u5F53\u524D\u603B\u7ECF\u9A8C === null || isNaN(parsedExp)) {
                bond.\u5F53\u524D\u603B\u7ECF\u9A8C = levelBaseExp;
                logCalc(`[Sửa gắn kết] ${name} thiếu tổng kinh nghiệm hiện tại, đã khởi tạo theo Lv.${bondLevel} thành ${levelBaseExp}`);
            } else if (parsedExp < levelBaseExp) {
                bond.\u5F53\u524D\u603B\u7ECF\u9A8C = levelBaseExp;
                logCalc(`[Sửa gắn kết] ${name} có tổng kinh nghiệm hiện tại quá thấp (${parsedExp}), đã sửa theo Lv.${bondLevel} thành ${levelBaseExp}`);
            }

            // 修正升级阈值（关键：检查阈值是否与等级匹配）
            const correctThreshold = calculateDiabloThreshold(bondLevel + 1);
            const parsedThreshold = safeParseFloat(bond.\u5347\u7EA7\u9608\u503C, 0);
            if (bond.\u5347\u7EA7\u9608\u503C === undefined || bond.\u5347\u7EA7\u9608\u503C === null || parsedThreshold !== correctThreshold) {
                const oldThreshold = parsedThreshold || 'Thiếu';
                bond.\u5347\u7EA7\u9608\u503C = correctThreshold;
                logCalc(`[Sửa gắn kết] ${name} Lv.${bondLevel} sai ngưỡng lên cấp (${oldThreshold}), đã sửa thành ${correctThreshold}`);
            }
        });
    }

    function ensureNearbyBondCompatFields(statData, playerName) {
        const bonds = statData?.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (bond.\u9644\u8FD1 !== true) return;
            if (name === playerName) return;

            const missingHp = bond.\u751F\u547D\u503C\u4E0A\u9650 === undefined || bond.\u751F\u547D\u503C\u4E0A\u9650 === null ||
                safeParseInt(bond.\u751F\u547D\u503C\u4E0A\u9650, 0) <= 0 ||
                bond.\u5F53\u524D\u751F\u547D\u503C === undefined || bond.\u5F53\u524D\u751F\u547D\u503C === null;
            if (missingHp) {
                calculateBondMaxHP(bond, name, { initMissingCurrentHp: true, rootData: statData });
            }
        });
    }

    function ensureNewBondHpInitialized(statData, statDataBefore, playerName) {
        const bonds = statData?.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;

        const bondsBefore = statDataBefore?.\u7F81\u7ECA\u5217\u8868;
        const beforeMap = (bondsBefore && typeof bondsBefore === 'object') ? bondsBefore : {};

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;

            const existedBefore = beforeMap[name] && typeof beforeMap[name] === 'object';
            if (existedBefore) return;

            const hpLooksLikeSchemaDefault =
                safeParseInt(bond.\u751F\u547D\u503C\u4E0A\u9650, 0) <= 1 &&
                safeParseInt(bond.\u5F53\u524D\u751F\u547D\u503C, 0) <= 0;

            calculateBondMaxHP(bond, name, { initMissingCurrentHp: true, rootData: statData });
            if (hpLooksLikeSchemaDefault && safeParseInt(bond.\u5F53\u524D\u751F\u547D\u503C, 0) <= 0) {
                bond.\u5F53\u524D\u751F\u547D\u503C = Math.max(safeParseInt(bond.\u751F\u547D\u503C\u4E0A\u9650, 1), 1);
                logCalc(`[Đăng ký gắn kết] ${name} phát hiện HP mặc định, đã khởi tạo đầy máu ${bond.\u5F53\u524D\u751F\u547D\u503C}/${bond.\u751F\u547D\u503C\u4E0A\u9650}`);
            }

            const bondLevel = safeParseInt(bond.\u7B49\u7EA7, 1);
            const levelBaseExp = getLevelBaseTotalExp(bondLevel);
            const parsedExp = parseFloat(bond.\u5F53\u524D\u603B\u7ECF\u9A8C);
            if (bond.\u5F53\u524D\u603B\u7ECF\u9A8C === undefined || bond.\u5F53\u524D\u603B\u7ECF\u9A8C === null || isNaN(parsedExp) || parsedExp < levelBaseExp) {
                const oldExpText = (bond.\u5F53\u524D\u603B\u7ECF\u9A8C === undefined || bond.\u5F53\u524D\u603B\u7ECF\u9A8C === null || isNaN(parsedExp))
                    ? 'Thiếu'
                    : parsedExp;
                bond.\u5F53\u524D\u603B\u7ECF\u9A8C = levelBaseExp;
                logCalc(`[Đăng ký gắn kết] ${name} tổng kinh nghiệm hiện tại (${oldExpText}) đã được khởi tạo theo Lv.${bondLevel} thành ${levelBaseExp}`);
            }

            const parsedThreshold = safeParseFloat(bond.\u5347\u7EA7\u9608\u503C, 0);
            if (bond.\u5347\u7EA7\u9608\u503C === undefined || bond.\u5347\u7EA7\u9608\u503C === null || parsedThreshold <= 0) {
                bond.\u5347\u7EA7\u9608\u503C = calculateDiabloThreshold(bondLevel + 1);
                logCalc(`[Đăng ký gắn kết] ${name} thiếu ngưỡng lên cấp, đã khởi tạo thành ${bond.\u5347\u7EA7\u9608\u503C}`);
            }
            logCalc(`[Đăng ký gắn kết] ${name} vừa đăng ký, đã hoàn tất khởi tạo cơ bản`);
        });
    }

    // ==========================================
    // 经营产出日期检查与待办推送
    // ==========================================

    const CALENDAR_DATE_REGEX = /^(.*?)(\d+)\s*(?:\u5E74|năm)\s*(\d+)\s*(?:\u6708|tháng)\s*(\d+)\s*(?:\u65E5|ngày)$/i;
    const DAY_MS = 24 * 60 * 60 * 1000;

    function parseCalendarDate(text) {
        if (typeof text !== 'string') return null;
        const raw = text.trim();
        if (!raw) return null;
        const m = raw.match(CALENDAR_DATE_REGEX);
        if (!m) return null;

        let prefix = (m[1] || '').trim() || 'Lịch Arad';
        if (prefix === '\u963F\u62C9\u5FB7\u5386') prefix = 'Lịch Arad';
        const year = safeParseInt(m[2], NaN);
        const month = safeParseInt(m[3], NaN);
        const day = safeParseInt(m[4], NaN);
        if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) return null;
        if (month < 1 || month > 12 || day < 1 || day > 31) return null;

        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() !== year || date.getUTCMonth() !== (month - 1) || date.getUTCDate() !== day) {
            return null;
        }
        return { prefix, date, year, month, day };
    }

    function formatCalendarDate(prefix, date) {
        const y = date.getUTCFullYear();
        const m = date.getUTCMonth() + 1;
        const d = date.getUTCDate();
        return `${prefix || 'Lịch Arad'} ${y} năm ${m} tháng ${d} ngày`;
    }

    function addDaysToCalendarDate(date, days) {
        const next = new Date(date.getTime());
        next.setUTCDate(next.getUTCDate() + days);
        return next;
    }

    function getCalendarDayDiff(laterDate, earlierDate) {
        const left = Date.UTC(laterDate.getUTCFullYear(), laterDate.getUTCMonth(), laterDate.getUTCDate());
        const right = Date.UTC(earlierDate.getUTCFullYear(), earlierDate.getUTCMonth(), earlierDate.getUTCDate());
        return Math.floor((left - right) / DAY_MS);
    }

    function hasEffectiveProduction(outputText) {
        if (typeof outputText !== 'string') return false;
        const text = outputText.trim();
        if (!text) return false;
        const normalized = text.replace(/\s+/g, '');
        const emptyWords = new Set(['\u65E0', '\u6682\u65E0', '\u65E0\u4EA7\u51FA', '\u7A7A', 'none', 'null', '\u65E0\u6536\u76CA', '\u6682\u65E0\u6536\u76CA', 'không', 'chưacó', 'khôngcósảnlượng', 'rỗng', 'khôngcóthunhập', 'chưacóthunhập']);
        return !emptyWords.has(normalized.toLowerCase());
    }

    function detectProductionCycleDays(outputText) {
        const text = (outputText || '').toString();
        if (/\u6BCF\u65E5|\u6BCF\u5929|\u65E5\u4EA7|\u65E5\u7ED3|\u6BCF1\u5929|mỗi\s*ngày|hằng\s*ngày|hàng\s*ngày|ngày\s*kết|sản\s*lượng\s*ngày/i.test(text)) return 1;
        if (/\u6BCF\u6708|\u6708\u4EA7|\u6708\u7ED3|\u6BCF30\u5929|\u6BCF\u4E2A\u6708|mỗi\s*tháng|hằng\s*tháng|hàng\s*tháng|tháng\s*kết|sản\s*lượng\s*tháng|mỗi\s*30\s*ngày/i.test(text)) return 30;
        if (/\u6BCF\u5468|\u5468\u4EA7|\u5468\u7ED3|\u6BCF7\u5929|\u6BCF\u661F\u671F|\u6BCF\u793C\u62DC|mỗi\s*tuần|hằng\s*tuần|hàng\s*tuần|tuần\s*kết|sản\s*lượng\s*tuần|mỗi\s*7\s*ngày/i.test(text)) return 7;
        return 7;
    }

    function syncAssetProductionSchedules(statData) {
        const assets = statData?.\u6838\u5FC3\u8D44\u4EA7;
        if (!assets || typeof assets !== 'object') return;

        const worldCalendar = statData?.\u4E16\u754C\u4FE1\u606F?.\u5E74\u5386;
        const nowParsed = parseCalendarDate(worldCalendar);
        if (!nowParsed) {
            warnCalc(`[Kết toán kinh doanh] Không phân tích được định dạng niên lịch hiện tại: ${worldCalendar}`);
            return;
        }
        const nowDate = nowParsed.date;
        const datePrefix = nowParsed.prefix || 'Lịch Arad';

        Object.entries(assets).forEach(([assetName, asset]) => {
            if (!asset || typeof asset !== 'object') return;

            if (!Array.isArray(asset.\u5F85\u529E\u4E8B\u4EF6)) {
                asset.\u5F85\u529E\u4E8B\u4EF6 = [];
            }

            const seqMap = asset.\u5EFA\u8BBE\u5E8F\u5217;
            if (!seqMap || typeof seqMap !== 'object') return;

            const overdueLines = [];
            Object.entries(seqMap).forEach(([seqName, seq]) => {
                if (!seq || typeof seq !== 'object') return;

                const outputText = (typeof seq.\u4EA7\u51FA === 'string') ? seq.\u4EA7\u51FA.trim() : '';
                const hasOutput = hasEffectiveProduction(outputText);
                const cycleDays = detectProductionCycleDays(outputText);
                const nextDateRaw = (typeof seq.\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F === 'string') ? seq.\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F.trim() : '';
                const nextDateParsed = parseCalendarDate(nextDateRaw);

                if (!nextDateParsed) {
                    if (hasOutput) {
                        seq.\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F = formatCalendarDate(datePrefix, addDaysToCalendarDate(nowDate, cycleDays));
                    }
                    return;
                }

                const overdueDays = getCalendarDayDiff(nowDate, nextDateParsed.date);
                // 仅处理“过期至少2天”且仍未被AI刷新日期的条目，避免冲突
                if (overdueDays < 2) return;
                if (!hasOutput) return;

                overdueLines.push(`${seqName}→${outputText}`);
                seq.\u4E0B\u6B21\u4EA7\u51FA\u65E5\u671F = formatCalendarDate(datePrefix, addDaysToCalendarDate(nowDate, cycleDays));
            });

            if (overdueLines.length > 0) {
                const location = (typeof asset.\u6240\u5728\u5730 === 'string' && asset.\u6240\u5728\u5730.trim()) ? asset.\u6240\u5728\u5730.trim() : 'Địa điểm chưa rõ';
                const todoText = `【Kết toán kinh doanh đến hạn】${assetName}（${location}）：${overdueLines.join('；')}`;
                const exists = asset.\u5F85\u529E\u4E8B\u4EF6.some(v => typeof v === 'string' && v === todoText);
                if (!exists) {
                    asset.\u5F85\u529E\u4E8B\u4EF6.push(todoText);
                    logCalc(`[Kết toán kinh doanh] ${assetName} phát hiện ${overdueLines.length} sản lượng quá hạn, đã đẩy vào việc chờ xử lý và làm mới ngày sản lượng kế tiếp`);
                }
            }
        });
    }

    // ==========================================
    // 主逻辑
    // ==========================================

    let is_initialized_log = false;

    /**
     * 防重入标志：防止脚本修改 stat_data 后触发 schema reconciliation
     * 再次进入 VARIABLE_UPDATE_ENDED 导致无限循环
     */
    let isProcessing = false;

    function handleExperienceProcessing(rawVariables, rawVariablesBefore) {
        // 防重入：如果 đang xử lý thì bỏ qua để tránh lặp vô hạn
        if (isProcessing) {
            logCalc('[Script phụ trợ] ⚠️ Chặn tái nhập, bỏ qua lần xử lý này');
            return;
        }
        isProcessing = true;

        let statData = null;
        let statDataBefore = null;
        try {
            statData = rawVariables?.stat_data;
            statDataBefore = rawVariablesBefore?.stat_data;

            if (!statData) return;

            prepareCalculatorRuntimeData(statData);
            if (statDataBefore && statDataBefore !== statData) prepareCalculatorRuntimeData(statDataBefore);

            const player = statData.\u4EBA\u7269;
            if (!player) return;

            // ★ 先迁移旧品质名，避免新增装备守卫把“神器”误判为未知品质
            normalizeLegacyQualityNames(statData);
            guardProtectedFields(statData, statDataBefore);
            migrateBagCurrency(statData);

            // 初始化日志（只打印一次）
            if (!is_initialized_log) {
                logCalc('[Script phụ trợ] Kết nối biến MVU thành công');
                is_initialized_log = true;
            }

            // ---- 变更检测：只处理实际变化的模块 ----

            const playerBefore = statDataBefore?.\u4EBA\u7269;
            const combatValueModeChanged = getCombatValueMode(statData) !== getCombatValueMode(statDataBefore || {});
            
            // 先修正所有羁绊的升级阈值（无论是否附近、是否新注册）
            ensureAllBondsThresholdCorrect(statData, player?.\u540D\u79F0 || '');
            ensureNewBondHpInitialized(statData, statDataBefore, player?.\u540D\u79F0 || '');
            ensureNearbyBondCompatFields(statData, player?.\u540D\u79F0 || '');
            // 经营产出到期检查（仅处理过期>=2天条目，避免与AI实时更新冲突）
            syncAssetProductionSchedules(statData);
            const playerExpBefore = safeParseFloat(playerBefore?.\u5F53\u524D\u603B\u7ECF\u9A8C, 0);
            const playerExpNow = safeParseFloat(player.\u5F53\u524D\u603B\u7ECF\u9A8C, 0);
            const playerExpDelta = playerExpNow - playerExpBefore;

            if (playerBefore && playerExpDelta !== 0) {
                logCalc(`[Phân phát kinh nghiệm] Kinh nghiệm nhân vật chính thay đổi: ${playerExpBefore} → ${playerExpNow} (Δ${playerExpDelta})`);
            }

            // 经验值/等级变化 → 升级逻辑
            if (!playerBefore ||
                player.\u5F53\u524D\u603B\u7ECF\u9A8C !== playerBefore.\u5F53\u524D\u603B\u7ECF\u9A8C ||
                player.\u7B49\u7EA7 !== playerBefore.\u7B49\u7EA7) {
                processLevelUp(player);
            }
            syncPlayerActionResources(player);

            // 每次变量更新都校正一次绯等级，修复历史脏数据并保证与玩家等级一致
            upgradeHiWeaponQuality(player);

            // 主角获得经验后，给符合条件的羁绊队友同步经验：
            // 60级及以下全羁绊共享，60级以上仍只限附近队友
            if (playerBefore && playerExpDelta > 0) {
                shareExpToEligibleBonds(statData, playerExpDelta, player);
            }

            const equipChanged = !playerBefore || hasChanged(player.\u88C5\u5907\u5217\u8868, playerBefore.\u88C5\u5907\u5217\u8868);
            if (equipChanged && playerBefore) {
                syncCoreAttrsOnEquipChange(player, playerBefore, 'Nhân vật chính');
            }

            // 幂等校正HP上限：除响应等级/体质/装备变化外，也让旧存档自动迁移到最新公式。
            calculateMaxHP(player, statData);

            // 装备列表变化 → 装备数值重算
            calculateAllEquipmentStats(statData);

            const bonds = statData.\u7F81\u7ECA\u5217\u8868;
            const bondsBefore = statDataBefore?.\u7F81\u7ECA\u5217\u8868;
            if (bonds && typeof bonds === 'object') {
                Object.entries(bonds).forEach(([name, bond]) => {
                    if (!bond || typeof bond !== 'object') return;
                    const bondBefore = bondsBefore && typeof bondsBefore === 'object' ? bondsBefore[name] : null;
                    const bondEquipChanged = !bondBefore || hasChanged(bond.\u88C5\u5907\u5217\u8868, bondBefore.\u88C5\u5907\u5217\u8868);
                    const bondAttrChanged = !bondBefore || hasActorCoreAttrChanged(bond, bondBefore);

                    if (bondEquipChanged && bondBefore) {
                        syncCoreAttrsOnEquipChange(bond, bondBefore, `Gắn kết ${name}`);
                    }

                    // 同步迁移羁绊旧HP；函数仅在结果变化时写入并按比例修正当前生命。
                    calculateBondMaxHP(bond, name, { initMissingCurrentHp: true, rootData: statData });

                    if (!bondBefore ||
                        bond.\u7B49\u7EA7 !== bondBefore.\u7B49\u7EA7 ||
                        bondEquipChanged ||
                        bondAttrChanged ||
                        combatValueModeChanged) {
                        calculateEquipmentStatsForActor(bond, statData, `Gắn kết ${name}`);
                    }
                });
            }
            // 装备/种族变化 → AC重算
            if (!playerBefore ||
                equipChanged ||
                player.\u79CD\u65CF !== playerBefore.\u79CD\u65CF) {
                calculateAC(statData);
            }

            // 装备变化/历史数据 → 按防御曲线写回百分比减伤（上限50%）
            calculateDamageReductions(player, playerBefore);

            // 暴击率变化/阈值异常 → 战斗属性重算
            calculateCombatStats(player);

            // 熟练度自动进阶 & AI阶位回滚
            handleProficiency(statData, statDataBefore);

            // 末日时钟（仅"大明志异"世界观，内部自带世界观判断）
            handleDoomClock(statData, statDataBefore);

            // 惊悚乐园：原创随机副本剧本落库 + 副本防重（内部自带惊悚乐园判断）
            handleFrightParadiseScript(statData, statDataBefore);

            const comboEnteredBattle = handleComboBattleEntry(statData, statDataBefore);
            logCalc(`[Chuyển đổi tổ hợp] Vòng chính comboEnteredBattle=${comboEnteredBattle}`);
            const previousCombatValueMode = getCombatValueMode(statDataBefore);
            const currentCombatValueMode = getCombatValueMode(statData);
            const damageSyncOptions = previousCombatValueMode !== currentCombatValueMode
                ? { previousCombatValueMode }
                : {};

            // 按技能系统模式同步槽位（classic恢复手配槽位，combo仅在自动切换时重建6+3主动槽）
            syncSkillSlotsByMode(statData, statDataBefore, { syncComboSlots: comboEnteredBattle });
            syncEquippedSkillSlotDamageState(statData, damageSyncOptions);

            // combo模式直接从本次更新的槽位diff提取“本回合用了哪些技能”
            const comboRoundUsedSkills = collectComboRoundUsage(statData, statDataBefore) || [];

            // 技能冷却管理
            handleSkillCooldowns(statData, statDataBefore);

            // 战斗中且已装备连携奥义时，每轮结束后恢复CP
            handleComboCpRecovery(statData, statDataBefore);

            // combo模式在冷却结算后推进显示状态，并仅在自动切换后重建当前6+3槽位
            const comboAutoSwitched = advanceComboSkillState(statData, statDataBefore, comboRoundUsedSkills);
            logCalc(`[Chuyển đổi tổ hợp] Vòng chính comboAutoSwitched=${comboAutoSwitched}`);
            syncSkillSlotsByMode(statData, statDataBefore, { syncComboSlots: comboAutoSwitched });

            // 战斗结束时清零临时生命值
            const \u6218\u6597 = statData.\u6218\u6597 || {};
            const \u6218\u6597Before = statDataBefore?.\u6218\u6597 || {};
            if (\u6218\u6597Before.\u662F\u5426\u6218\u6597\u4E2D === true && \u6218\u6597.\u662F\u5426\u6218\u6597\u4E2D === false) {
                if (player.\u4E34\u65F6\u751F\u547D\u503C > 0) {
                    player.\u4E34\u65F6\u751F\u547D\u503C = 0;
                    logCalc('[HP tạm thời] Chiến đấu kết thúc, sinh lực tạm thời đã về 0');
                }
            }
        } finally {
            if (statData) restoreCalculatorRuntimeData(statData);
            if (statDataBefore && statDataBefore !== statData) restoreCalculatorRuntimeData(statDataBefore);
            isProcessing = false;
        }
    }

    function processLevelUp(player) {
        let currentLevel = safeParseInt(player.\u7B49\u7EA7, 1);
        let currentExp = safeParseFloat(player.\u5F53\u524D\u603B\u7ECF\u9A8C, 0);
        let requiredExp = safeParseFloat(player.\u5347\u7EA7\u9608\u503C, 0);

        if (requiredExp <= 0) {
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            player.\u5347\u7EA7\u9608\u503C = requiredExp;
        }

        while (currentExp >= requiredExp && requiredExp > 0) {
            currentLevel++;
            player.\u7B49\u7EA7 = currentLevel;

            if (!player.\u5C5E\u6027) player.\u5C5E\u6027 = {};
            if (currentLevel % 10 === 0) {
                player.\u5C5E\u6027.\u5C5E\u6027\u70B9 = safeParseInt(player.\u5C5E\u6027.\u5C5E\u6027\u70B9) + 1;
            }
            const spPerLevel = (player.\u79CD\u65CF === '\u68EE\u7CBE\u79CD') ? 30 : 25;
            const oldSP = safeParseInt(player.SP);
            const oldRP = safeParseInt(player.RP);
            player.SP = safeParseInt(player.SP) + spPerLevel;
            if (player.\u6280\u80FD\u6811) {
                player.\u6280\u80FD\u6811.\u603BSP = safeParseInt(player.\u6280\u80FD\u6811.\u603BSP) + spPerLevel;
            }
            player.RP = safeParseInt(player.RP) + 1;

            logCalc(`[Trợ lý kinh nghiệm] Lên cấp! Lv.${currentLevel} | SP: ${oldSP}→${player.SP}(+${spPerLevel}) | RP: ${oldRP}→${player.RP}(+1)`);

            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            player.\u5347\u7EA7\u9608\u503C = requiredExp;
        }

        upgradeHiWeaponQuality(player);
    }

    function processBondLevelUp(bond, bondName, statData = null) {
        if (!bond) return;

        let currentLevel = safeParseInt(bond.\u7B49\u7EA7, 1);
        const levelBaseExp = getLevelBaseTotalExp(currentLevel);
        const parsedExp = parseFloat(bond.\u5F53\u524D\u603B\u7ECF\u9A8C);
        if (bond.\u5F53\u524D\u603B\u7ECF\u9A8C === undefined || bond.\u5F53\u524D\u603B\u7ECF\u9A8C === null || isNaN(parsedExp)) {
            bond.\u5F53\u524D\u603B\u7ECF\u9A8C = levelBaseExp;
        } else if (parsedExp < levelBaseExp) {
            bond.\u5F53\u524D\u603B\u7ECF\u9A8C = levelBaseExp;
        }

        let currentExp = safeParseFloat(bond.\u5F53\u524D\u603B\u7ECF\u9A8C, levelBaseExp);
        let requiredExp = safeParseFloat(bond.\u5347\u7EA7\u9608\u503C, 0);

        if (requiredExp <= 0) {
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            bond.\u5347\u7EA7\u9608\u503C = requiredExp;
        }

        let levelUps = 0;
        while (currentExp >= requiredExp && requiredExp > 0) {
            currentLevel++;
            levelUps++;
            bond.\u7B49\u7EA7 = currentLevel;
            requiredExp = calculateDiabloThreshold(currentLevel + 1);
            bond.\u5347\u7EA7\u9608\u503C = requiredExp;
        }

        if (levelUps > 0) {
            logCalc(`[Gắn kết lên cấp] ${bondName} lên cấp ${levelUps} lần, hiện tại Lv.${currentLevel}, ngưỡng kế tiếp=${requiredExp}`);
        }

        const needRecalcBondHp = levelUps > 0 ||
            bond.\u751F\u547D\u503C\u4E0A\u9650 === undefined || bond.\u751F\u547D\u503C\u4E0A\u9650 === null ||
            safeParseInt(bond.\u751F\u547D\u503C\u4E0A\u9650, 0) <= 0 ||
            bond.\u5F53\u524D\u751F\u547D\u503C === undefined || bond.\u5F53\u524D\u751F\u547D\u503C === null;
        if (needRecalcBondHp) {
            calculateBondMaxHP(bond, bondName, { initMissingCurrentHp: true, rootData: statData });
        }
    }

    function shareExpToEligibleBonds(statData, gainedExp, player) {
        if (!statData || gainedExp <= 0) return;

        const bonds = statData.\u7F81\u7ECA\u5217\u8868;
        if (!bonds || typeof bonds !== 'object') return;

        const playerLevel = safeParseInt(player?.\u7B49\u7EA7, 1);
        const playerName = player?.\u540D\u79F0 || '';
        const nonNearbyShareLevelCap = 60;
        const nonNearbyShareExpCap = calculateDiabloThreshold(nonNearbyShareLevelCap + 1) - 1;

        Object.entries(bonds).forEach(([name, bond]) => {
            if (!bond || typeof bond !== 'object') return;
            if (name === playerName) return;
            if (!isBondShareExpEnabled(bond)) return;

            const bondLevel = safeParseInt(bond.\u7B49\u7EA7, 1);
            if (bondLevel >= playerLevel) return;
            if (bond.\u9644\u8FD1 !== true && bondLevel > nonNearbyShareLevelCap) return;

            const oldExp = safeParseFloat(bond.\u5F53\u524D\u603B\u7ECF\u9A8C, 0);
            const uncappedExp = oldExp + gainedExp;
            const newExp = bond.\u9644\u8FD1 === true
                ? uncappedExp
                : Math.min(uncappedExp, nonNearbyShareExpCap);
            if (newExp <= oldExp) return;
            const actualGainedExp = newExp - oldExp;
            bond.\u5F53\u524D\u603B\u7ECF\u9A8C = newExp;

            logCalc(`[Phân phát kinh nghiệm] ${name} nhận kinh nghiệm +${actualGainedExp} (${oldExp} → ${newExp})`);
            processBondLevelUp(bond, name, statData);
        });
    }

    function upgradeHiWeaponQuality(player) {
        if (!player.\u88C5\u5907\u5217\u8868) return;
        const weapon = Object.values(player.\u88C5\u5907\u5217\u8868).find(w => w && ((w.\u540D\u79F0 || '').trim() === '\u7EEF'));
        if (!weapon) return;

        const lv = safeParseInt(player.\u7B49\u7EA7, 1);
        const oldWeaponLevel = safeParseInt(weapon.\u7B49\u7EA7, 1);
        if (oldWeaponLevel !== lv) {
            weapon.\u7B49\u7EA7 = lv;
            logCalc(`[Hiiro · đồng bộ cấp độ] ${oldWeaponLevel} → ${lv}`);
        }

        // 绯品质成长梯度：
        // Lv1-4 普通，Lv5+ 精良，Lv10+ 稀有，Lv20+ 卓越，Lv30+ 传说，Lv45+ 史诗，Lv70+ 神话
        let qualityIndex = 0;
        if (lv >= 70) qualityIndex = 6;
        else if (lv >= 45) qualityIndex = 5;
        else if (lv >= 30) qualityIndex = 4;
        else if (lv >= 20) qualityIndex = 3;
        else if (lv >= 10) qualityIndex = 2;
        else if (lv >= 5) qualityIndex = 1;

        const qualityTiers = ['\u666E\u901A','\u7CBE\u826F','\u7A00\u6709','\u5353\u8D8A','\u4F20\u8BF4','\u53F2\u8BD7','\u795E\u8BDD'];
        const newQuality = qualityTiers[qualityIndex];

        const hiEffects = [
            '[Cộng minh thần khí] Hiiro có ý thức tự ngã, không thể bị người khác nhặt, trộm hoặc cưỡng chế tháo trang bị. Khi Hiiro bị đánh rơi, nó tự động quay về tay Yato (hành động phụ).',
            '[Biến hình lưu thể] Thân đao hóa thành dòng lưu thể cao áp có thể tự do co duỗi; đòn đánh thường bỏ qua cộng thêm AC do vật che chắn và khiên cung cấp. Tầm công kích +5 feet.',
            '[Vết thương không lành] Vết thương do Hiiro gây ra không thể được chữa bằng phương thức trị liệu thông thường (thuốc, trị liệu thuật cấp thấp); phải thông qua kiểm định y tế DC15 hoặc trị liệu cấp cao mới có thể cầm máu. Khi đánh trúng, thêm trạng thái [Vết rách] (sát thương chảy máu mỗi vòng = cấp độ của Yato).',
            '[Triệu hồi Diện Yêu] 1 lần/ngày (hành động phụ): triệu hồi 2 sói Diện Yêu hỗ trợ chiến đấu, kéo dài 5 vòng. Đòn đánh của sói Diện Yêu kèm hiệu ứng [Nguyền rủa] (toàn thuộc tính mục tiêu -1, có thể cộng dồn). Khi chết, sói Diện Yêu phát nổ, gây sát thương thuộc tính bóng tối phạm vi nhỏ.',
            '[Lưỡi đao thủy thần] Mọi công kích của Hiiro kèm sát thương thuộc tính nước (sát thương thêm = cấp độ × 0.5). Khi ở địa hình [Tích nước] hoặc [Ẩm ướt], sát thương thêm gấp đôi. Hiiro có thể chủ động tạo địa hình [Tích nước] phạm vi 5 feet (hành động phụ, 1 lần/nghỉ ngắn).',
            '[Hiiro · Giải phóng chân danh] 1 lần/ngày (hành động): Hiiro hóa thành hình thái lưu thể hoàn toàn, kéo dài 3 vòng. Trong thời gian này, công kích biến thành phạm vi nón 15 feet, xúc xắc sát thương gấp đôi, và mỗi lần đánh trúng khiến mục tiêu [Ẩm ướt]. Sau khi giải phóng kết thúc, Yato nhận 1 tầng [Mệt mỏi].',
            '[Chung yên đỏ thẫm] Công kích của Hiiro kèm hiệu ứng [Xâm thực]: mỗi lần đánh trúng vĩnh viễn giảm 1 AC của mục tiêu (giới hạn 5 tầng trên một mục tiêu). Mục tiêu bị Hiiro giết không thể hồi sinh bằng bất kỳ thủ đoạn nào.'
        ];

        const hiAttrByQuality = [
            { \u654F\u6377: 0 },
            { \u654F\u6377: 1 },
            { \u654F\u6377: 1, \u529B\u91CF: 1 },
            { \u654F\u6377: 2, \u529B\u91CF: 1 },
            { \u654F\u6377: 3, \u529B\u91CF: 1 },
            { \u654F\u6377: 4, \u529B\u91CF: 2 },
            { \u654F\u6377: 5, \u529B\u91CF: 3 }
        ];

        if (weapon.\u54C1\u8D28 !== newQuality) {
            const oldQuality = weapon.\u54C1\u8D28;
            weapon.\u54C1\u8D28 = newQuality;
            weapon.\u54C1\u7EA7 = 10;
            weapon.\u6548\u679C = hiEffects.slice(0, qualityIndex + 1).join(';');
            weapon.\u5C5E\u6027\u52A0\u6210 = hiAttrByQuality[qualityIndex];
            logCalc(`[Hiiro · tăng trưởng] ${oldQuality} → ${newQuality} (Lv.${lv})`);
        }
    }

    // ==========================================
    // 熟练度自动进阶 & AI回滚
    // ==========================================

    const PROF_TIERS = ['\u5B66\u5F92', '\u719F\u624B', '\u4E13\u5BB6', '\u5927\u5E08', '\u4F20\u5947'];
    const PROF_THRESHOLDS = { '\u5B66\u5F92': 25, '\u719F\u624B': 50, '\u4E13\u5BB6': 100, '\u5927\u5E08': 200, '\u4F20\u5947': Infinity };
    const PROF_TIER_BONUS = { '\u5B66\u5F92': 0, '\u719F\u624B': 1, '\u4E13\u5BB6': 2, '\u5927\u5E08': 4, '\u4F20\u5947': 6 };
    const PROF_TIER_START_TOTALS = PROF_TIERS.reduce((acc, tier, index) => {
        if (index === 0) {
            acc[tier] = 0;
            return acc;
        }
        const prevTier = PROF_TIERS[index - 1];
        const prevStart = acc[prevTier] || 0;
        const prevThreshold = PROF_THRESHOLDS[prevTier];
        acc[tier] = prevStart + (prevThreshold === Infinity ? 0 : safeParseInt(prevThreshold, 0));
        return acc;
    }, {});

    function getProfEffect(key, tier) {
        const bonus = PROF_TIER_BONUS[tier] ?? 0;
        return `Kiểm định liên quan đến ${key} +${bonus}`;
    }

    function getProfTierThreshold(tier) {
        const threshold = PROF_THRESHOLDS[tier];
        return threshold === Infinity ? 0 : safeParseInt(threshold, 0);
    }

    function getProfTierStartTotal(tier) {
        return PROF_TIER_START_TOTALS[tier] || 0;
    }

    function getProfTotalProgress(entry) {
        const tier = PROF_TIERS.includes(entry?.\u9636\u4F4D) ? entry.\u9636\u4F4D : '\u5B66\u5F92';
        const progress = Math.max(0, safeParseInt(entry?.\u8FDB\u5EA6, 0));
        return getProfTierStartTotal(tier) + progress;
    }

    function normalizeProfState(key, totalProgress) {
        let remain = Math.max(0, safeParseInt(totalProgress, 0));

        for (let i = 0; i < PROF_TIERS.length - 1; i++) {
            const tier = PROF_TIERS[i];
            const threshold = getProfTierThreshold(tier);
            if (remain < threshold) {
                return {
                    tier,
                    progress: remain,
                    threshold,
                    effect: getProfEffect(key, tier),
                    totalProgress
                };
            }
            remain -= threshold;
        }

        const finalTier = PROF_TIERS[PROF_TIERS.length - 1];
        return {
            tier: finalTier,
            progress: 0,
            threshold: 0,
            effect: getProfEffect(key, finalTier),
            totalProgress: getProfTierStartTotal(finalTier)
        };
    }

    function processProficiencyBlock(block, blockBefore, label) {
        if (!block || typeof block !== 'object') return;
        Object.entries(block).forEach(([key, entry]) => {
            if (!entry || typeof entry !== 'object') return;
            const oldEntry = blockBefore?.[key];
            const oldState = oldEntry ? normalizeProfState(key, getProfTotalProgress(oldEntry)) : null;
            const originalTier = entry.\u9636\u4F4D || '\u5B66\u5F92';
            const originalProgress = Math.max(0, safeParseInt(entry.\u8FDB\u5EA6, 0));
            const originalThreshold = safeParseInt(entry.\u5347\u9636\u9608\u503C, 0);
            const originalEffect = String(entry.\u6548\u679C || '');

            let resolvedTotal = getProfTotalProgress(entry);
            if (oldState && resolvedTotal < oldState.totalProgress) {
                warnCalc(`[Bộ giám sát độ thuần thục] ⚠️ ${label}/${key} tổng tiến độ bị lùi ${resolvedTotal}→${oldState.totalProgress}, đã sửa theo tiến độ cũ`);
                resolvedTotal = oldState.totalProgress;
            }

            const normalized = normalizeProfState(key, resolvedTotal);
            const changes = [];

            if (originalTier !== normalized.tier) {
                changes.push(`bậc ${originalTier}→${normalized.tier}`);
            }
            if (originalProgress !== normalized.progress) {
                changes.push(`tiến độ ${originalProgress}→${normalized.progress}`);
            }
            if (originalThreshold !== normalized.threshold) {
                changes.push(`ngưỡng thăng bậc ${originalThreshold}→${normalized.threshold}`);
            }
            if (originalEffect !== normalized.effect) {
                changes.push(`hiệu quả "${originalEffect}"→"${normalized.effect}"`);
            }

            entry.\u9636\u4F4D = normalized.tier;
            entry.\u8FDB\u5EA6 = normalized.progress;
            entry.\u5347\u9636\u9608\u503C = normalized.threshold;
            entry.\u6548\u679C = normalized.effect;

            if (!oldEntry) {
                logCalc(`[Đăng ký độ thuần thục] ${label}/${key}: bậc=${normalized.tier}, ngưỡng=${normalized.threshold}, tiến độ=${normalized.progress}, hiệu quả="${normalized.effect}"`);
                return;
            }

            if (oldState && normalized.tier !== oldState.tier) {
                logCalc(`[Tiến bậc độ thuần thục] ${label}/${key}: ${oldState.tier} → ${normalized.tier}, tiến độ hiện tại=${normalized.progress}, hiệu quả="${normalized.effect}"`);
            }

            if (changes.length > 0) {
                warnCalc(`[Bộ giám sát độ thuần thục] ⚠️ ${label}/${key} dữ liệu đã hiệu chỉnh: ${changes.join(', ')}`);
            }
        });
    }

    function handleProficiency(statData, statDataBefore) {
        const prof = statData?.\u4EBA\u7269?.\u719F\u7EC3\u5EA6;
        const profBefore = statDataBefore?.\u4EBA\u7269?.\u719F\u7EC3\u5EA6;
        if (!prof) return;
        processProficiencyBlock(prof.\u6218\u6597, profBefore?.\u6218\u6597, 'Chiến đấu');
        processProficiencyBlock(prof.\u751F\u6D3B, profBefore?.\u751F\u6D3B, 'Sinh hoạt');
    }

    // ==========================================
    // 末日时钟（仅"大明志异"世界观）
    // 模型：每日涨幅 第1/2/3年 = 1/2/4，再 ×(存活六生五世/5)；
    //       AI每push一条已镇功业 → 伪随机扣 1~3 点；满1000=完整体提前降临，
    //       熬过三年(1095天)未满1000=不完整体降临。
    // 所有数值由本脚本计算，AI只负责 push已镇功业 与 翻缴清布尔。
    // ==========================================
    const DOOM_RAMP = [1, 2, 4];        // 第1/2/3年 每日基础涨幅
    const DOOM_YEAR_DAYS = 365;
    const DOOM_DEADLINE_DAYS = 1095;    // 三年期限
    const DOOM_MAX = 1000;
    const DOOM_HISTORY_CAP = 10;        // 已镇功业最多保留条数
    const DOOM_KILL_FLAT = 150;         // 每缴清一世，额外直接扣减点数（并降低后续涨速）
    const LIUSHENG_NAMES = ['\u5C81\u8FDC', '\u8352', '\u5353\u7167', '\u6F58\u5357\u541B', '\u767E\u91CC\u6E0A'];

    function doomDayRate(dayIndex) {
        if (dayIndex <= DOOM_YEAR_DAYS) return DOOM_RAMP[0];
        if (dayIndex <= DOOM_YEAR_DAYS * 2) return DOOM_RAMP[1];
        return DOOM_RAMP[2];
    }

    function handleDoomClock(statData, statDataBefore) {
        if (getCurrentWorldView(statData) !== '\u5927\u660E\u5FD7\u5F02') return;
        let clock = statData.\u672B\u65E5\u65F6\u949F;
        if (!clock || typeof clock !== 'object') {
            clock = {};
            statData.\u672B\u65E5\u65F6\u949F = clock; // 脚本自建结构，不依赖初始化文件
        }

        clock.\u529F\u4E1A\u6B21\u6570 = safeParseInt(clock.\u529F\u4E1A\u6B21\u6570, 0);

        // 起始年历缺失/不可解析时，以当前年历初始化
        const worldCalendar = statData?.\u4E16\u754C\u4FE1\u606F?.\u5E74\u5386;
        if (!clock.\u8D77\u59CB\u5E74\u5386 || !parseCalendarDate(clock.\u8D77\u59CB\u5E74\u5386)) {
            if (parseCalendarDate(worldCalendar)) clock.\u8D77\u59CB\u5E74\u5386 = worldCalendar;
        }
        const startParsed = parseCalendarDate(clock.\u8D77\u59CB\u5E74\u5386);
        const nowParsed = parseCalendarDate(worldCalendar);
        if (!startParsed || !nowParsed) {
            warnCalc(`[Đồng hồ tận thế] Không phân tích được niên lịch (khởi đầu=${clock.\u8D77\u59CB\u5E74\u5386}, hiện tại=${worldCalendar}), bỏ qua`);
            return;
        }
        let elapsedDays = getCalendarDayDiff(nowParsed.date, startParsed.date);
        if (elapsedDays < 0) elapsedDays = 0;

        // 1) 缴清：补齐五世布尔；首次发现某世=true时锚定击杀天数（用于按时间降低后续涨速）
        if (!clock.\u7F34\u6E05 || typeof clock.\u7F34\u6E05 !== 'object') clock.\u7F34\u6E05 = {};
        if (!clock.\u7F34\u6E05\u65E5 || typeof clock.\u7F34\u6E05\u65E5 !== 'object') clock.\u7F34\u6E05\u65E5 = {};
        LIUSHENG_NAMES.forEach(name => {
            if (typeof clock.\u7F34\u6E05[name] !== 'boolean') clock.\u7F34\u6E05[name] = false;
            if (clock.\u7F34\u6E05[name] === true && typeof clock.\u7F34\u6E05\u65E5[name] !== 'number') {
                clock.\u7F34\u6E05\u65E5[name] = elapsedDays;
                logCalc(`[Đồng hồ tận thế] Đã thanh trừ "${name}" vào ngày thứ ${elapsedDays}, tốc độ tăng sau đó giảm một nấc`);
            } else if (clock.\u7F34\u6E05[name] !== true && typeof clock.\u7F34\u6E05\u65E5[name] === 'number') {
                delete clock.\u7F34\u6E05\u65E5[name]; // 理论不可回退，被改回则清锚
            }
        });

        // 2) 已镇功业：检测AI新push条数，累加功业次数，再裁剪到最近10条
        if (!Array.isArray(clock.\u5DF2\u9547\u529F\u4E1A)) clock.\u5DF2\u9547\u529F\u4E1A = [];
        const prevArr = Array.isArray(statDataBefore?.\u672B\u65E5\u65F6\u949F?.\u5DF2\u9547\u529F\u4E1A)
            ? statDataBefore.\u672B\u65E5\u65F6\u949F.\u5DF2\u9547\u529F\u4E1A : [];
        let newCount = clock.\u5DF2\u9547\u529F\u4E1A.length - prevArr.length;
        if (newCount < 0) newCount = 0;
        if (newCount > 5) newCount = 5; // 防一回合异常狂刷
        if (newCount > 0) {
            clock.\u529F\u4E1A\u6B21\u6570 += newCount;
        }
        if (clock.\u5DF2\u9547\u529F\u4E1A.length > DOOM_HISTORY_CAP) {
            clock.\u5DF2\u9547\u529F\u4E1A = clock.\u5DF2\u9547\u529F\u4E1A.slice(clock.\u5DF2\u9547\u529F\u4E1A.length - DOOM_HISTORY_CAP);
        }

        // 3) 功业伪随机扣减：以功业次数为序号种子，每件 1~3 点，可重算且只增
        let gongyeReduce = 0;
        const seedBase = String(clock.\u8D77\u59CB\u5E74\u5386 || '\u672B\u65E5\u65F6\u949F');
        const gongyeCount = safeParseInt(clock.\u529F\u4E1A\u6B21\u6570, 0);
        for (let i = 1; i <= gongyeCount; i++) {
            gongyeReduce += 1 + (stableHash(seedBase + ':\u529F\u4E1A:' + i) % 3);
        }

        // 4) 累计涨幅：逐日积分；某世被缴清后，其后每天涨速 ×(存活/5)
        const killDays = LIUSHENG_NAMES
            .map(n => clock.\u7F34\u6E05\u65E5?.[n])
            .filter(v => typeof v === 'number');
        let rise = 0;
        for (let d = 1; d <= elapsedDays; d++) {
            const killedByDay = killDays.filter(kd => kd < d).length;
            const factor = (5 - killedByDay) / 5;
            rise += doomDayRate(d) * factor;
        }

        // 5) 当前点数 = 涨幅 - 功业扣减 - 缴清直接扣减，clamp[0,1000]（不能为负）
        const killFlatReduce = killDays.length * DOOM_KILL_FLAT;
        const points = clamp(Math.round(rise - gongyeReduce - killFlatReduce), 0, DOOM_MAX);
        clock.\u5F53\u524D\u70B9\u6570 = points;
        clock.\u5B58\u6D3B\u4E16\u6570 = 5 - killDays.length;

        // 6) 状态判定
        if (points >= DOOM_MAX) {
            clock.\u72B6\u6001 = '\u5B8C\u6574\u4F53\u964D\u4E34';
        } else if (elapsedDays >= DOOM_DEADLINE_DAYS) {
            clock.\u72B6\u6001 = '\u4E0D\u5B8C\u6574\u4F53\u964D\u4E34';
        } else {
            clock.\u72B6\u6001 = '\u915D\u917F\u4E2D';
        }
    }

    // ==========================================
    // 惊悚乐园：原创随机副本剧本落库 + 副本防重
    // ----------------------------------------------------------------
    // 设计：
    // 1) AI 在“玩家选随机/原创”那轮，把整份剧本写进
    //    /当前事件/惊悚乐园副本/暂存副本 （单字段，天然防重）。
    // 2) 本脚本每轮同步读取该暂存字段：若有内容，拷出后立即从变量删除
    //    （变量不残留剧本），并异步全量覆盖主世界书里固定名条目
    //    “随机副本内容”。
    // 3) 每轮同步判定“当前是否有原创随机副本进行中”：
    //    - 有 → “随机副本内容”条目启用并保留剧本（在暂存搬运时写入）；
    //    - 无（固定副本进行中/已完成/无副本）→ 异步把该条目禁用并清空，
    //      确保只有原创副本进行中时剧本才注入给 AI。
    // 4) 副本防重：若同时存在多个“进行中”，把除“本轮新开的那个”以外的
    //    旧进行中副本自动改为“已完成”，固定副本与原创副本同样适用。
    // 世界书写入为异步副作用，不阻塞主流程、不参与 isProcessing。
    // ==========================================
    const FRIGHT_STATE_PATH_KEY = '\u60ca\u609a\u4e50\u56ed\u526f\u672c';
    const FRIGHT_DRAFT_KEY = '\u6682\u5b58\u526f\u672c';
    const FRIGHT_WORLDBOOK_ENTRY_NAME = 'Nội dung phụ bản ngẫu nhiên';
    const FRIGHT_LEGACY_WORLDBOOK_ENTRY_NAME = '\u968f\u673a\u526f\u672c\u5185\u5bb9';
    // 固定副本索引：用于判断“当前进行中副本”是固定还是原创
    const FRIGHT_FIXED_MODULES = new Set([
        'Hướng dẫn Tân thủ', 'Tình Trạng Nguy Kịch Ở Bệnh Viện', 'Quỷ Ảnh Mê Thành', 'Chương Nhà Ma Bên Hồ Núi',
        'Chương Vô Song Tỏi', 'Bảy điều kỳ bí trong trường học', 'Chương Đảo Thợ Săn', 'Sấm Sét Giáng Lâm',
        'Hỏi Đáp Tử Vong', 'Chương Địa Cầu Hoang Thổ', 'Nhân Vật Chính Tiến Kích', 'Kẻ Bỉ Ổi Là Ta',
        'Thương Linh Luận Kiếm', 'Đặc biệt · Trinh thám', 'Huynh Đệ', 'Tranh Đoạt Áo Choàng',
        'Xâm Nhập Tế Bào Não', 'Chương South Park', 'Điên Phong Tranh Bá S1 · Trận Côn Trùng', 'Điên Phong Tranh Bá S1 · Trận Kén',
        'Điên Phong Tranh Bá S1 · Trận Bướm', 'Điên Phong Tranh Bá S1 · Chung Kết', 'Bệnh Viện Bị Nguyền Rủa', 'Đảo Ju Ma',
        'Chương Cao Thủ Tuyệt Thế', 'Ta, Joker', 'Công Ty Điện Lực Mãnh Quỷ', 'Lý Thế Giới',
        'Hoang Dã Cầu Độc', 'Đồng Dao Kinh Dị Và Cổ Thần Giữ Ma', 'Chương Hậu Cung', 'Bưu Tá Ma',
        'Giải Cứu Chung Cực', 'Điên Phong Tranh Bá S2 · Anh Kiệt Tụ Hội', 'Điên Phong Tranh Bá S2 · Huyết Chiến Tứ Giới', 'Điên Phong Tranh Bá S2 · Chư Thần Hoàng Hôn',
        'Thí Nghiệm Cực Hạn', 'Liên Minh Vũ Trụ Siêu Anh Hùng', 'Canh Bạc Tàu Nhã Ca', 'Ký Ức Mùa Hè',
        'Thế Giới Không Có Trò Chơi', 'Trở Lại Đảo Ju Ma', 'Kiếm Thần Mỉm Cười', '\u65b0\u624b\u6559\u7a0b',
        '\u533b\u9662\u5371\u60c5', '\u8be1\u5f71\u8ff7\u57ce', '\u5c71\u6c60\u9b3c\u5c4b\u7bc7', '\u5927\u849c\u65e0\u53cc\u7bc7',
        '\u6821\u56ed\u4e03\u4e0d\u601d\u8bae', '\u730e\u4eba\u5c9b\u7bc7', '\u9739\u96f3\u521d\u4e34', '\u6b7b\u4ea1\u95ee\u7b54',
        '\u5730\u7403\u5e9f\u571f\u7bc7', '\u8fdb\u51fb\u7684\u4e3b\u89d2', '\u5351\u9119\u7684\u6211', '\u82cd\u7075\u8bba\u5251',
        '\u7279\u522b\u7bc7\u00b7\u4fa6\u63a2', '\u5144\u5f1f', '\u62ab\u98ce\u4e89\u593a\u6218', '\u5165\u4fb5\u8111\u7ec6\u80de',
        '\u5357\u65b9\u516c\u56ed\u7bc7', '\u5dc5\u5cf0\u4e89\u9738\u6218S1\u00b7\u866b\u4e4b\u6218', '\u5dc5\u5cf0\u4e89\u9738\u6218S1\u00b7\u8327\u4e4b\u6218', '\u5dc5\u5cf0\u4e89\u9738\u6218S1\u00b7\u8776\u4e4b\u6218',
        '\u5dc5\u5cf0\u4e89\u9738\u6218S1\u00b7\u51b3\u8d5b\u7bc7', '\u88ab\u8bc5\u5492\u7684\u533b\u9662', '\u5480\u9b54\u5c9b', '\u7edd\u4e16\u9ad8\u624b\u7bc7',
        '\u6211\uff0c\u5c0f\u4e11', '\u731b\u9b3c\u7535\u529b\u516c\u53f8', '\u91cc\u4e16\u754c', '\u8352\u91ce\u6c42\u6bd2',
        '\u6050\u6016\u7ae5\u8c23\u4e0e\u4e0a\u53e4\u5b88\u9b54', '\u540e\u5bab\u7bc7', '\u5e7d\u7075\u90ae\u5dee', '\u7ec8\u6781\u8425\u6551',
        '\u5dc5\u5cf0\u4e89\u9738\u6218S2\u00b7\u82f1\u6770\u805a\u9996', '\u5dc5\u5cf0\u4e89\u9738\u6218S2\u00b7\u93d6\u6218\u56db\u754c', '\u5dc5\u5cf0\u4e89\u9738\u6218S2\u00b7\u8bf8\u795e\u7684\u9ec4\u660f', '\u6781\u9650\u5b9e\u9a8c',
        '\u5b87\u8d85\u8054', '\u96c5\u6b4c\u53f7\u8d4c\u5c40', '\u590f\u65e5\u7684\u56de\u5fc6', '\u6ca1\u6709\u6e38\u620f\u7684\u4e16\u754c',
        '\u91cd\u8fd4\u5480\u9b54\u5c9b', '\u5251\u795e\u4e00\u7b11'
    ]);

    // 解析酒馆助手全局函数：优先 TavernHelper.xxx，回退到 iframe 注入的裸全局
    function resolveHostFn(name) {
        try {
            const host = (window.parent && window.parent.TavernHelper) || window.TavernHelper || null;
            if (host && typeof host[name] === 'function') return host[name].bind(host);
        } catch (_) {}
        try {
            const g = (window.parent || window);
            if (g && typeof g[name] === 'function') return g[name].bind(g);
        } catch (_) {}
        if (typeof window !== 'undefined' && typeof window[name] === 'function') return window[name].bind(window);
        return null;
    }

    // 取当前角色卡主世界书名（原创剧本条目与总控制器同处一本，getWorldInfo 单参才能读到）
    async function frightResolveWorldbookName() {
        const getCharWorldbookNames = resolveHostFn('getCharWorldbookNames');
        if (getCharWorldbookNames) {
            try {
                const cw = await getCharWorldbookNames('current');
                const primary = cw && (cw.primary || (Array.isArray(cw.additional) ? cw.additional[0] : ''));
                if (primary) return primary;
            } catch (e) {
                warnCalc('[Kịch bản Kinh Tủng Lạc Viên] Lấy worldbook của thẻ nhân vật thất bại: ', e);
            }
        }
        // 回退：聊天世界书
        const getChatWorldbookName = resolveHostFn('getChatWorldbookName');
        if (getChatWorldbookName) {
            try {
                const chatBook = await getChatWorldbookName('current');
                if (chatBook) return chatBook;
            } catch (_) {}
        }
        return '';
    }

    // 全量写入/更新“随机副本内容”条目：存在则覆盖内容与启用状态，不存在则新建
    // enabled=true 时写入剧本正文并启用；enabled=false 时禁用并清空，避免注入
    let frightWorldbookBusy = false;
    async function frightWriteWorldbookEntry(scriptText, enabled) {
        if (frightWorldbookBusy) return;
        frightWorldbookBusy = true;
        try {
            const bookName = await frightResolveWorldbookName();
            if (!bookName) {
                warnCalc('[Kịch bản Kinh Tủng Lạc Viên] Không tìm thấy worldbook có thể ghi, bỏ qua');
                return;
            }
            const getWorldbook = resolveHostFn('getWorldbook');
            const updateWorldbookWith = resolveHostFn('updateWorldbookWith');
            const createWorldbookEntries = resolveHostFn('createWorldbookEntries');
            if (!getWorldbook || !updateWorldbookWith || !createWorldbookEntries) {
                warnCalc('[Kịch bản Kinh Tủng Lạc Viên] API worldbook không khả dụng, bỏ qua');
                return;
            }

            const content = enabled ? String(scriptText || '') : '';
            let entries = [];
            try { entries = await getWorldbook(bookName) || []; } catch (e) {
                warnCalc('[Kịch bản Kinh Tủng Lạc Viên] Đọc worldbook thất bại: ', e);
                return;
            }
            const existing = entries.find(e => e && (e.name === FRIGHT_WORLDBOOK_ENTRY_NAME || e.name === FRIGHT_LEGACY_WORLDBOOK_ENTRY_NAME));

            if (!existing) {
                // 仅在需要启用时才创建；不需要启用又不存在，则无需创建空条目
                if (!enabled) return;
                await createWorldbookEntries(bookName, [{
                    name: FRIGHT_WORLDBOOK_ENTRY_NAME,
                    enabled: true,
                    strategy: { type: 'constant', keys: [], keys_secondary: { logic: 'and_any', keys: [] }, scan_depth: 'same_as_global' },
                    position: { type: 'at_depth', role: 'system', depth: 4, order: 100 },
                    content
                }]);
                logCalc('[Kịch bản Kinh Tủng Lạc Viên] Đã tạo entry “Nội dung phụ bản ngẫu nhiên” và ghi kịch bản');
                return;
            }

            // 幂等：已是目标状态则跳过，避免固定副本每轮触发多余的世界书写入与重渲染
            if (!!existing.enabled === !!enabled && String(existing.content || '') === content) {
                return;
            }

            await updateWorldbookWith(bookName, (list) => list.map(e => {
                if (!e || (e.name !== FRIGHT_WORLDBOOK_ENTRY_NAME && e.name !== FRIGHT_LEGACY_WORLDBOOK_ENTRY_NAME)) return e;
                return { ...e, name: FRIGHT_WORLDBOOK_ENTRY_NAME, enabled: !!enabled, content };
            }));
            logCalc(`[Kịch bản Kinh Tủng Lạc Viên] Đã cập nhật entry “Nội dung phụ bản ngẫu nhiên”: enabled=${!!enabled}, độ dài nội dung=${content.length}`);
        } catch (e) {
            warnCalc('[Kịch bản Kinh Tủng Lạc Viên] Ghi worldbook gặp lỗi: ', e);
        } finally {
            frightWorldbookBusy = false;
        }
    }

    // 主处理：暂存搬运 + 防重 + 按需切换条目启用状态
    function handleFrightParadiseScript(statData, statDataBefore) {
        const events = statData?.\u5F53\u524D\u4E8B\u4EF6;
        if (!events || typeof events !== 'object') return;
        const state = events[FRIGHT_STATE_PATH_KEY];
        if (!state || typeof state !== 'object' || Array.isArray(state)) return;

        // ---- 1) 副本防重：多个“进行中”时，保留本轮新开的，其余改“已完成” ----
        const beforeState = statDataBefore?.\u5F53\u524D\u4E8B\u4EF6?.[FRIGHT_STATE_PATH_KEY];
        const runningNames = Object.keys(state)
            .filter(name => name !== FRIGHT_DRAFT_KEY && String(state[name] || '').trim() === '\u8FDB\u884C\u4E2D');
        if (runningNames.length > 1) {
            // 本轮新变成“进行中”的副本（上一轮不是进行中）视为要保留的当前副本
            const newlyStarted = runningNames.filter(name => {
                const prev = beforeState && typeof beforeState === 'object' ? String(beforeState[name] || '').trim() : '';
                return prev !== '\u8FDB\u884C\u4E2D';
            });
            const keep = newlyStarted.length > 0 ? newlyStarted[newlyStarted.length - 1] : runningNames[runningNames.length - 1];
            runningNames.forEach(name => {
                if (name !== keep) {
                    state[name] = '\u5DF2\u5B8C\u6210';
                    warnCalc(`[Chống trùng Kinh Tủng Lạc Viên] Phát hiện nhiều phụ bản đang tiến hành, đã tự động kết toán "${name}" thành "Đã hoàn thành", giữ phụ bản hiện tại "${keep}"`);
                }
            });
        }

        // ---- 2) 取暂存剧本：搬运后立即从变量删除（变量不残留剧本）----
        let draftText = '';
        if (Object.prototype.hasOwnProperty.call(state, FRIGHT_DRAFT_KEY)) {
            const raw = state[FRIGHT_DRAFT_KEY];
            draftText = typeof raw === 'string' ? raw : (raw == null ? '' : (() => {
                try { return JSON.stringify(raw); } catch (_) { return String(raw); }
            })());
            delete state[FRIGHT_DRAFT_KEY];
            if (draftText.trim()) {
                logCalc(`[Kịch bản Kinh Tủng Lạc Viên] Bắt được kịch bản phụ bản tạm lưu (độ dài=${draftText.length}), đã bóc khỏi biến`);
            }
        }

        // ---- 3) 判定当前是否有“原创随机副本”进行中 ----
        const runningAfter = Object.keys(state)
            .filter(name => name !== FRIGHT_DRAFT_KEY && String(state[name] || '').trim() === '\u8FDB\u884C\u4E2D');
        const current = runningAfter[0] || '';
        const originalRunning = !!current && !FRIGHT_FIXED_MODULES.has(current);

        // ---- 4) 异步同步世界书条目 ----
        if (originalRunning && draftText.trim()) {
            // 新剧本落库并启用（全量覆盖，天然防重）
            frightWriteWorldbookEntry(draftText, true);
        } else if (originalRunning && !draftText.trim()) {
            // 原创副本进行中但本轮没有新剧本：保持现状，不动条目
        } else {
            // 非原创副本进行中（固定/已完成/无副本）：禁用并清空条目，避免注入
            frightWriteWorldbookEntry('', false);
        }
    }

    // ==========================================
    // 事件注册
    // ==========================================

    const init = async () => {
        await waitGlobalInitialized('Mvu');
        eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, handleExperienceProcessing);
        try { (window.parent || window).__\u8F85\u52A9\u8BA1\u7B97\u811A\u672C_loaded__ = true; } catch(e) { window.__\u8F85\u52A9\u8BA1\u7B97\u811A\u672C_loaded__ = true; }
        logCalc('[Script phụ trợ tính toán] Script đã tải ');
        toastr.success(translateCalcRuntimeText('[Script phụ trợ tính toán] Script đã tải '));
    };

    $(init);

    try {
        const host = window.parent || window;
        host.__card36RemapData = remapCalculatorData;
        host.__card36PrepareCalculatorRuntimeData = prepareCalculatorRuntimeData;
        host.__card36RestoreCalculatorRuntimeData = restoreCalculatorRuntimeData;
        host.__card36TranslateRuntimeText = translateCalcRuntimeText;
    } catch (e) {}

})();
