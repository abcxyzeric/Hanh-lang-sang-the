// Dữ liệu tĩnh bản đồ - Chí dị
// Giữ cấu trúc MAP_JSON_DATA hợp lệ: node dùng id/name/type/x/y/summary; cạnh dùng source/target/label; loaderData.keepTypes điều khiển loại node được tải.
// Entry này được đọc động bởi loader bản đồ Chí dị.
var MAP_JSON_DATA = {
  "mapData": {
    "nodes": [
      {
        "id": "capital_luojing",
        "name": "Bắc Đô · Thần Đô Lạc Kinh",
        "type": "capital",
        "x": 0,
        "y": 0,
        "summary": "Bắc Đô của quốc triều, trung khu chính trị và vận chuyển thủy lộ của thiên hạ. Hàng triệu nhân khẩu quần cư tại đây, tài phú thiên hạ qua kênh đào đổ về Thái Thương, duy trì sự tiêu hao thường nhật của hoàng thất, hai mươi vạn binh mã Kinh Doanh và bộ máy quan liêu khổng lồ."
      },
      {
        "id": "capital_jiangning",
        "name": "Nam Đô · phủ Giang Ninh",
        "type": "capital",
        "x": 698,
        "y": 358,
        "summary": "Nam Đô của quốc triều, đại bản doanh chính trị của tập đoàn văn quan và trung tâm tài phú Giang Nam. Sĩ tộc phương Nam lấy nơi này làm cơ sở, dựa vào khoa cử thanh nghị cùng điền sản tông tộc hùng hậu để khống chế địa phương, dốc sức chống lại thế lực Cửu Giới Môn từ Bắc Đô tràn xuống phía Nam."
      },
      {
        "id": "city_yangzhou",
        "name": "phủ Dương Châu",
        "type": "city",
        "x": 767,
        "y": 312,
        "summary": "Trung tâm vận chuyển muối vùng Lưỡng Hoài, yết hầu của Đại Vận Hà. Đặc quyền lũng đoạn lợi ích từ muối trong thiên hạ đã nảy sinh ra sự phồn hoa và tham nhũng tột độ, diêm dẫn (giấy phép buôn muối), thuyền chở hàng và sổ sách cấu thành nên logic tầng đáy của tòa thành này."
      },
      {
        "id": "city_chengdu",
        "name": "phủ Thành Đô",
        "type": "city",
        "x": -922,
        "y": 553,
        "summary": "Cốt lõi của bồn địa Thục Trung, tổ đình Đạo môn núi Thanh Thành và địa mạch Vũ Hầu Từ là hai trụ cột lớn của đất Thục. Nông nghiệp sung túc, địa lý cách biệt; triều đình phái trọng thần đồn trú phòng bị nghiêm ngặt, nhưng ở địa phương lại tự hình thành một bộ quy tắc sinh tồn do thổ ty, Bào Ca Hội cùng hạ viện Thục Trung của Tam Chân Pháp Môn dẫn dắt."
      },
      {
        "id": "port_dengzhou",
        "name": "Đăng Châu",
        "type": "port",
        "x": 913,
        "y": -445,
        "summary": "Cảng nước sâu khổng lồ nằm ở cực đông bán đảo Sơn Đông, cửa ngõ biển Đông. Hải phòng, thương mại trên biển và ngư nghiệp đồng lập — triều đình thiết lập Thủy sư Tổng binh tiết chế hải phòng, Hải đạo Phó sứ quản lý thu thuế thương mại hải trình, nhưng sức ảnh hưởng của các tông tộc ven biển cùng đảo Bồng Lai lại đâm sâu vào từng tuyến hàng hải bí ẩn."
      },
      {
        "id": "city_nanyang",
        "name": "phủ Nam Dương",
        "type": "city",
        "x": 9,
        "y": 228,
        "summary": "Cửa ngõ phía Nam của Trung Châu, trung tâm trung chuyển hàng hóa kết nối Trung Nguyên, Kinh Sở và Quan Trung. Quan đạo, dịch trạm cùng tiêu cục dân gian cùng nhau duy trì mạng lưới vận chuyển và hộ tống khổng lồ."
      },
      {
        "id": "city_changsha",
        "name": "phủ Trường Sa",
        "type": "city",
        "x": 54,
        "y": 895,
        "summary": "Phủ thành thuộc lưu vực sông Tương, cảng trung chuyển từ Kinh Sở thông tới Nam Lĩnh. Gỗ, dược thảo cùng chướng khí nóng ẩm đan xen tại đây, thế lực của các từ đường tông tộc sâu không lường được."
      },
      {
        "id": "city_shuntian",
        "name": "phủ Thuận Thiên",
        "type": "city",
        "x": 435,
        "y": -739,
        "summary": "Thủ phủ Yến Vân, trung tâm điều động cao nhất của phòng tuyến Trường Thành. Kế Liêu Tổng đốc ở đây tiết chế biên quân Cửu Biên, thực chất là đang nhìn chằm chằm vào thủy triều xác sống không ngừng rỉ ra từ các phế thú bảo ngoại hóa ở phía Bắc Trường Thành. Thái giám giám quân do trong cung phái tới đi theo như hình với bóng, hai mươi năm qua đã có vài nhiệm kỳ Tổng đốc nếu không giáng chức thì cũng bạo tử."
      },
      {
        "id": "town_xuanfu",
        "name": "Trấn Tuyên Phủ",
        "type": "town",
        "x": 268,
        "y": -861,
        "summary": "Pháo đài trấn thi nằm ở tiền tuyến ngoài cùng của đoạn phía Bắc Trường Thành, dưới thành ba trăm dặm chính là vùng hoang nguyên chiến trường cổ thời Nam Bắc triều. Dưới hoang nguyên, cát vàng cùng tuyết lớn đè ép vô số xác sống thường, cấm chế cũ kĩ mấy chục năm lại nới lỏng một lần, mỗi một lần nới lỏng chính là một đợt triều xác sống áp cảnh. Bản lĩnh thực sự của Tổng binh trấn thủ, là phán đoán xem trận tuyết năm nào là trận tuyết \"xuất thi\"."
      },
      {
        "id": "town_jizhou",
        "name": "Trấn Kế Châu",
        "type": "town",
        "x": 545,
        "y": -760,
        "summary": "Trọng trấn Trường Thành được xây dựng tựa vào Yên Sơn, khống chế nhiều cửa ải núi thông ra Quan Ngoại. Là con đường tất yếu từ Lạc Kinh đi ra Quan Ngoại, thương đội qua lại tấp nập không ngớt; trong núi ẩn giấu lượng lớn chiến trường rải rác chôn vùi từ thời Nam Bắc triều, mưa thu quá dài sẽ khiến xác sống bước lững thững đơn độc chui ra tấn công người."
      },
      {
        "id": "city_datong",
        "name": "phủ Đại Đồng",
        "type": "city",
        "x": 93,
        "y": -764,
        "summary": "Tấm bình phong phía Tây của Yến Vân, nội ngoại Trường Thành giao thoa tại nơi này. Trung tâm thương mại Tấn Bắc và trọng địa than đá phương Bắc, là cội rễ thực sự của ngân phiếu thương nhân Sơn Tây."
      },
      {
        "id": "garrison_andong",
        "name": "An Đông",
        "type": "garrison",
        "x": 1312,
        "y": -771,
        "summary": "Yết hầu của hành lang Liêu Đông, cánh cửa chiến lược trên bộ duy nhất kết nối Trường Thành Quan Nội và bình nguyên Quan Ngoại. Mùa đông dài mùa hè ngắn, lấy lâm nghiệp và thương mại nhân sâm làm trụ cột; sâu trong rừng thông phía Bắc đè ép một mảng lớn chiến trường chôn vùi thời Nam Bắc triều, mùa tuyết tan thì sẽ có xác sống chết cóng dọc theo bờ sông đi xuống phía Nam."
      },
      {
        "id": "frontier_bohai",
        "name": "Bột Hải",
        "type": "frontier",
        "x": 1561,
        "y": -1558,
        "summary": "Khu vực cốt lõi của lưu vực sông Tùng Hoa, nơi tập kết xa nhất để Trung Nguyên và các nước ngoài biên ải giao dịch nhân sâm, lông thú cùng vật tư trấn thi. Khu vực rừng già xung quanh tài nguyên phong phú, là trạm sâu nhất của chợ giao thương triều cống."
      },
      {
        "id": "wilderness_baishanheishui",
        "name": "Bạch Sơn Hắc Thủy",
        "type": "wilderness",
        "x": 1721,
        "y": -1705,
        "summary": "Vành đai hoang dã ở Cực Bắc, quanh năm cực lạnh, rừng nguyên sinh cùng đầm lầy nối liền thành một dải. Dấu chân người hiếm tới, là một trong những điểm đến cuối cùng của các tội phạm bị đế quốc đày ải trọng hình, cũng là địa mạch khởi nguồn triều xác sâu nhất toàn cõi — những người chết trận nhiều nhất ở phương Bắc thời Nam Bắc triều, cuối cùng phân nửa bị đè dưới gầm Bạch Sơn."
      },
      {
        "id": "city_kaifeng",
        "name": "phủ Khai Phong",
        "type": "city",
        "x": 205,
        "y": -25,
        "summary": "Ngã tư đường của Hoàng Hà và Đại Vận Hà, trung tâm chuyển tiếp lớn nhất thiên hạ của thuyền lương, thuyền muối, cùng quân phí đường thủy. Hàng ngày có hàng ngàn xe thuyền vận chuyển, bến tàu vĩnh viễn không bao giờ ngủ."
      },
      {
        "id": "city_guide",
        "name": "phủ Quy Đức · Thương Khâu",
        "type": "city",
        "x": 352,
        "y": 24,
        "summary": "Cánh cửa phía Đông Trung Châu, trấn giữ khu vực đường bộ huyết mạch từ Trung Nguyên thông đi Giang Nam, Tề Lỗ. Trung tâm bí mật của dịch trạm, người đưa thư và nơi trung chuyển báo chí giấy."
      },
      {
        "id": "city_weihui",
        "name": "phủ Vệ Huy",
        "type": "city",
        "x": 177,
        "y": -109,
        "summary": "Cánh cửa phía Bắc Trung Châu, kho lương thực bồn địa dựa lưng vào dãy Thái Hành. Bề ngoài là một đại phủ trù phú lúa mì ngô, trong núi lại giấu vô số hầm lò than đá nhỏ mở lậu."
      },
      {
        "id": "city_jinan",
        "name": "phủ Tế Nam",
        "type": "city",
        "x": 500,
        "y": -284,
        "summary": "Thủ phủ của Tề Lỗ, khống chế hạ lưu Hoàng Hà cùng Đại Vận Hà, suối nước vây quanh thành phố. Cội rễ của Nho học cùng dòng khách Nam Bắc giao thoa tại nơi đây."
      },
      {
        "id": "city_qingzhou",
        "name": "phủ Thanh Châu",
        "type": "city",
        "x": 663,
        "y": -288,
        "summary": "Thành sắt miền Trung Tề Lỗ, kẹp chặt ranh giới giữa bán đảo Sơn Đông và bình nguyên nội địa, từ xưa vốn là nơi binh gia tất tranh. Số lượng hài cốt tại các chiến trường cũ tầng tầng lớp lớp dưới chân nhiều bậc nhất Cửu Châu."
      },
      {
        "id": "city_yanzhou",
        "name": "phủ Duyện Châu",
        "type": "city",
        "x": 482,
        "y": -130,
        "summary": "Quê hương của Khổng Mạnh cùng đại bản doanh in sách của thiên hạ. Dưới lớp khí tượng Thánh hiền, là ngọn nguồn thực sự của các nhánh bè đảng phân tranh âm thầm đầu tư vào \"bình luận tin tức\" và in ấn sách cấm."
      },
      {
        "id": "city_suzhou",
        "name": "phủ Tô Châu",
        "type": "city",
        "x": 899,
        "y": 462,
        "summary": "Châu phủ Giang Nam, cốt lõi dệt lụa và thủ công nghiệp ở bờ Đông Thái Hồ. Tám thế gia dệt lụa cùng các thương điếm tàu biển tổng quản khống chế toàn thành, viên lâm của phú thương cùng tiếng máy dệt phường xưởng tồn tại song hành; trục trung tâm thực sự của quyền lực nằm ở ghế hội đồng thương nghiệp bên ngoài Xương Môn cùng với tiệc đêm trong viên lâm các thế gia."
      },
      {
        "id": "city_wuchang",
        "name": "phủ Vũ Xương",
        "type": "city",
        "x": 205,
        "y": 574,
        "summary": "Nơi giao thoa của Trường Giang và Hán Thủy, ngã tư thủy vận tổng quát của thiên hạ. Vật tư của chín tỉnh trung chuyển tại đây, bến tàu ngày đêm không ngủ; người làm chủ lên tiếng quyết định thực sự không ở nha môn, mà ở tại tổng đà Thủy bang kiểm soát các đoạn luồng tàu cùng với mật thất của phân ty tào vận."
      },
      {
        "id": "city_changan",
        "name": "phủ Trường An",
        "type": "city",
        "x": -386,
        "y": 39,
        "summary": "Châu phủ Quan Trung, cốt lõi Tần Xuyên, cựu đô thời tiền triều hiện hữu. Sau khi tân triều lập quốc không đồn trú ở đây nữa, điện vũ Hoàng thành đổ nát phân nửa, cung uyển hoang vu do phủ Thiểm Tây Tổng đốc mượn chỗ đặt nha môn. Trong thành vẫn lưu lại ánh sáng rực rỡ của thời thịnh thế: núi đèn Thượng Nguyên, uống rượu Khúc Giang, làm thơ tháp Nhạn, bẻ liễu cầu Bá — nhưng dưới ánh đèn đuốc tột đỉnh chiếu soi dưới chân Hoàng thành là lớp cấm chế phong ấn sâu nhất của tiền triều."
      },
      {
        "id": "port_guangzhou",
        "name": "phủ Quảng Châu",
        "type": "port",
        "x": 90,
        "y": 1609,
        "summary": "Châu phủ Lĩnh Nam, cảng biển khổng lồ lớn nhất Nam Hải của quốc triều, nơi hợp lưu của ba dòng sông Châu Giang. Trong thành tồn tại hai cái Quảng Châu — một cái là Tây lầu Thập Tam Hàng san sát, ngàn cánh buồm kín bến, cửa ngõ thông thương hải ngoại; một bên là cố hương sâu kín của tông tộc Việt địa, cái gốc của văn hóa Quảng phủ. Hai lằn ranh trật tự luôn ma sát nảy tia lửa."
      },
      {
        "id": "city_liangzhou",
        "name": "phủ Lương Châu",
        "type": "city",
        "x": -1079,
        "y": -463,
        "summary": "Cốt lõi của hành lang Hà Tây, trạm trung chuyển tuyệt đối đoạn phía Đông Tuyến đường Tơ Lụa. Ngã tư thông thương bốn hướng: Tây xuất Đôn Hoàng, Đông nhập Quan Trung, Nam nối Phiên địa, Bắc tiếp Quan Ngoại; loại tiền tệ cứng giá trị cao thực sự trong thành là ngựa, sắt, gốm sứ và thư mật được nhét bên trong yên ngựa."
      },
      {
        "id": "city_hangzhou",
        "name": "phủ Hàng Châu",
        "type": "city",
        "x": 848,
        "y": 612,
        "summary": "Điểm chót phía Nam của tuyến thủy bộ tào vận, trung khu vật tư cùng văn hóa miền Lưỡng Chiết. Dựa lưng vào Tây Hồ, nhìn ra sông Tiền Đường, là nơi chế xuất tơ trà cực thịnh nhất triều đại cùng tụ điểm thi nhân văn khách của Giang Nam; Chiết Giang Tuần phủ thường trú ở Hàng Châu, nhưng người cầm quyền nói tiếng quyết định trong thành thực sự là thanh lưu quan văn nấp phía sau các lầu du ngoạn và tự viện lớn trên Tây Hồ."
      },
      {
        "id": "frontier_dunhuang",
        "name": "Đôn Hoàng",
        "type": "frontier",
        "x": -1957,
        "y": -773,
        "summary": "Ốc đảo mỏm tận cùng Tây của hành lang Hà Tây, cánh cổng sắt chốt chặn cuối cùng ra khỏi ải của Con Đường Tơ lụa. Ngoại ải tức là địa giới dồn nén lớp xác sống tái ngoại thâm hiểm nhất, trong thành là tổng đà phương Bắc của ba môn phái lớn: Thiên Sư Phủ, đảo Bồng Lai, và Thiên Cơ Quán."
      },
      {
        "id": "city_jiangling",
        "name": "phủ Giang Lăng",
        "type": "city",
        "x": -23,
        "y": 601,
        "summary": "Châu phủ Kinh Sở, nằm ở trung lưu Trường Giang. Xuôi dòng cập Kim Lăng, ngược dòng vào Thục Trung. Trung khu hành chính Kinh Sở kiêm trạm lưu thông phân loại vật chất cốt tử của lưu vực sông; Hồ Quảng Tuần phủ thường tọa trấn Giang Lăng, nhưng căn cơ quan hệ rễ sâu trong thành thực tế nương náu ở Ngõ Từ Đường phía nam thành — vài chi di thần cựu tộc, hậu duệ chư hầu vương tiền phong phương Nam vẫn định cư ngàn đời tại chốn này."
      },
      {
        "id": "pass_jianmen",
        "name": "Kiếm Môn Quan",
        "type": "pass",
        "x": -756,
        "y": 346,
        "summary": "Đại môn bộ đường chốn Thục, hai ngọn núi sừng sững gác tựa cửa tuyệt bích, đường độc bộ đóng kín hướng Thục Trung bồn địa từ mạn Bắc. Khách điếm, tiêu cục cùng hội phu phen bên dưới cửa ngõ nuôi sống cả một cơ ngơi quan ải tĩnh tại trọn vẹn, dẫu vậy điều diễn ra trên sạn đạo qua ải vĩnh viễn chẳng có lưu vào sổ sách giấy mực."
      },
      {
        "id": "city_qiongzhou",
        "name": "phủ Quỳnh Châu",
        "type": "city",
        "x": -231,
        "y": 2044,
        "summary": "Đại đảo bơ vơ lạc cõi khơi, chốn dừng bước tuyệt mệnh cho án ngục cực hình đày ải của triều đình, cũng là phân khu sản xuất trân châu cốt cán Nam phương. Kẻ sinh sống bám trụ hòn đảo này từ ba thế hệ trở lên đều là tàn dư lưu tội cùng phường ngư dân lặn ngọc bám biển. Mùa bão suốt bốn tháng trời cắt tuyệt toàn bộ liên hệ với cố thổ nội địa."
      },
      {
        "id": "city_fuzhou",
        "name": "phủ Phúc Châu",
        "type": "city",
        "x": 753,
        "y": 1196,
        "summary": "Cốt lõi hành chính chốn Mân địa, hốc đổ cảng hàng hải thương mại hùng cường lớn nhất vùng Đông Nam quốc triều. Phúc Kiến Tuần phủ đặt gốc ở Phúc Châu, cảng Mã Vĩ chật cứng hàng vạn buồm tàu vây phía Nam; mười đại gia thương Mân cùng bốn đại ban tuồng hát giật dây thắt bóp tuyến hải mậu kiêm việc văn sự trong nội thành, một nhánh đội ghe tuần duyên cao tốc đặc biệt trực thuộc thủy sư đóng sào tại Mã Vĩ chuyên trấn ải giặc bờ cõi hải duyên."
      },
      {
        "id": "city_xiangyang",
        "name": "phủ Tương Dương",
        "type": "city",
        "x": -36,
        "y": 365,
        "summary": "Thành rào sắt ngự trị khoảng giữa Hán Thủy, tổng đường quân đội các đường ập tới Kinh Sở của quốc triều khởi phương Bắc, tòa thành vành đối cự với Phàn Thành men Hán Thủy phân cách; binh lực sở tại đều thuộc quyền ấn Hồ Quảng Tổng binh nắm, dù thế nội bộ gia thế Ba mươi sáu nhà chế binh khí phía Tây định cư gốc truyền kiếp nắm uy lực phân định đao xịn gươm tốt rớt đâu hơn ngàn lần cái nhà lao chính phủ."
      },
      {
        "id": "city_chongqing",
        "name": "phủ Trùng Khánh",
        "type": "city",
        "x": -649,
        "y": 708,
        "summary": "Hải cổng thủy đường phương Đông Thục Trung, thành quách tọa sơn khổng lồ cắm cọc ở ngã phân ly Trường Giang giao thoa Gia Lăng. Nó là kho dồn đại hải tiếp hàng hóa trôi vào đất Thục gốc tại Giang Nam - Giang Tây; cơ ngụ Tứ Xuyên Tổng đốc dù cắm ở Thành Đô, thế cơ thực quyền phương Đông lại dính cứng tay cộm cá hội Bào Ca Trùng Khánh — mỗi niên vụ Tổng đốc chí ít buộc phái ghé ngự một vệt qua đàm ẩm trà cùng gã chủ đại đường tổng hội một nước."
      },
      {
        "id": "pass_jiayuguan",
        "name": "Gia Dục Quan",
        "type": "pass",
        "x": -1558,
        "y": -721,
        "summary": "Cửa ngõ quan ải cực Tây trấn ải biên ải quốc triều phô thế oai hùng, cánh cổng sắt phòng ngự chốt lõi ngự Hà Tây hành lang. Ngả Lương Châu giáp sườn Đông, kẹp sườn Tây với Đôn Hoàng, hầm lũy tường chắn triều phu sống rũ thây cõi Tái Ngoại ào Bắc đổ bộ; hệ thủ vệ dưới ấn trượng Tổng binh Lương Châu, song quyết lệnh điểm thắp đài phong ở cửa ải nằm gai phó mặc vào vòi lũng Ba mươi sáu nhà ngự đài phong gốc bám trong thành thâm nhập thấu hơn cả nha môn đình sở."
      },
      {
        "id": "wilderness_xueyu",
        "name": "Hoang nguyên Tuyết vực",
        "type": "wilderness",
        "x": -2345,
        "y": 696,
        "summary": "Khu vực cấm địa vùng cực tây nhất của quốc triều, cao nguyên núi tuyết trải dài ngàn dặm, là vành đai áp sát biên giới ở sườn tây nam khi thi triều (làn sóng xác sống) ngoài ải tràn xuống phía nam. Không có quận huyện của triều đình, chỉ có vài nhánh bộ lạc Thổ Phồn và những người tu hành lưu vong đến đây; cả chính phái và Cửu Giới Môn đều không muốn tùy tiện đặt chân đến nơi này, nhưng cứ cách vài năm lại luôn có người vì thứ gì đó không rõ ràng mà mạo hiểm đi lên phía bắc."
      },
      {
        "id": "pass_tongguan",
        "name": "Đồng Quan",
        "type": "pass",
        "x": -242,
        "y": 0,
        "summary": "Hùng quan đường bộ duy nhất của quốc triều khống chế đường tiến về phía tây của Trung Nguyên. Phía bắc giáp Hoàng Hà, phía nam gối lên Tần Lĩnh, đi ra phía đông chính là bình nguyên Trung Nguyên; Bến Phong Lăng dưới thành là bến đò lớn nhất nối hai bờ nam bắc Hoàng Hà, sườn bắc núi Phượng Hoàng phía nam cửa ải rải rác chiến trường cổ thời mạt triều trước. Lập quốc trăm năm chưa từng thất thủ."
      },
      {
        "id": "city_hanzhong",
        "name": "Hán Trung phủ",
        "type": "city",
        "x": -597,
        "y": 217,
        "summary": "Dược đô nằm trong bồn địa giữa Tần Lĩnh và núi Đại Ba, chợ thuốc lớn nhất quốc triều mỗi năm mở cửa ba ngày vào tiết Lập thu; Núi Tử Bách là tổ đình của Kim Khuyết tông. Phía bắc thành là Tần Lĩnh, phía nam là núi Đại Ba, phía đông giáp đường Thảng Lạc, phía tây đi đường Trần Thương, phía nam thông đường Tử Ngọ, ba con đường Thục đạo giao nhau tại Hán Trung."
      },
      {
        "id": "city_yazhou",
        "name": "Nhã Châu phủ",
        "type": "city",
        "x": -1040,
        "y": 650,
        "summary": "Cửa ngõ phía tây Thục trung, khống chế lối vào cao nguyên, là ngã ba giao dịch Trà Mã cổ đạo. Núi Mông Đỉnh phía đông thành là khu rừng trà thánh cổ nhất sản xuất trà của quốc triều; phía tây thành qua cầu sông Thanh Y là nối liền Trà Mã cổ đạo, dần tiến vào vùng đất phong tục Phiên. Người Phiên và Hán sống lẫn lộn, mùa mưa bắt đầu từ tháng tư kéo dài không dứt đến tháng tám, người địa phương gọi là 'Thiên Lậu' (Trời thủng)."
      },
      {
        "id": "city_guilin",
        "name": "Quế Lâm phủ",
        "type": "city",
        "x": -238,
        "y": 1309,
        "summary": "Cửa ngõ tây bắc Lĩnh Nam, yết hầu đường thủy nơi Tương Giang và Ly Giang giao nhau, là tuyến giao thông thủy bộ huyết mạch nối liền Kinh Sở và Lĩnh Nam. Phong cảnh non nước Ly Giang được các họa sĩ miền nam quốc triều công nhận là đệ nhất thắng cảnh, ngoài thành sơn dân sống lẫn lộn, chướng khí Ngũ Lĩnh một năm ba tháng không tan."
      },
      {
        "id": "city_xining",
        "name": "Tây Ninh châu",
        "type": "city",
        "x": -1174,
        "y": -280,
        "summary": "Cửa ngõ phía nam Lương Châu, nằm ở rìa phía đông cao nguyên, là quân trấn vùng lạnh giá khống chế địa đới giá rét, phòng bị các bộ tộc trên cao nguyên. Phía tây thành hai trăm dặm là hồ Thanh Hải; trong thành người Trung Nguyên và các tộc ngoài ải sống lẫn lộn, chợ phiên Trà Mã quán thông thảo nguyên ngoài ải và cao nguyên tuyết vực."
      },
      {
        "id": "city_yanan",
        "name": "Diên An phủ",
        "type": "city",
        "x": -326,
        "y": -277,
        "summary": "Cửa ngõ phía bắc Quan Trung, vùng yếu xung biên ải nằm trong vùng nội địa Hoàng Thổ Nguyên, cựu tuyến Trường Thành Diên Bắc ngoài thành đè lên tàn cốt của đồn quân trải dài hơn ba ngàn dặm thời mạt triều trước — khi bão cát nổi lên, trên cựu tuyến thỉnh thoảng có thể thấy binh lính dàn trận đi qua. Sông Diên uốn lượn qua thành, bên ngoài thành rải rác hàng chục ngôi làng hang động tạo thành 'Biển Diêu Động'. Một năm tám tháng không có mưa."
      },
      {
        "id": "town_dajianlu",
        "name": "Đả Tiễn Lô",
        "type": "town",
        "x": -1154,
        "y": 640,
        "summary": "Trọng trấn đầu tiên bước vào cao nguyên Tuyết vực, trạm dừng cuối cùng trước khi Trà Mã cổ đạo hướng nam đi vào Tuyết vực. Thành ba mặt bao quanh bởi núi tuyết, phía nam có thể đi xuống dòng Đại Độ Hà xuôi dòng chảy vào bồn địa Thục Trung, phía tây có thể lên cửa đèo vượt Tuyết vực. Trạm trung chuyển thương đội, hướng dẫn viên đường tuyết, chùa Cống Dát đứng sát nhau."
      },
      {
        "id": "city_wuzhou",
        "name": "Ngô Châu phủ",
        "type": "city",
        "x": -129,
        "y": 1560,
        "summary": "Điểm chốt tổng kiểm soát đường thủy Lưỡng Quảng, nơi Tây Giang và Quế Giang giao nhau, án ngữ tuyến đường thủy bộ từ núi lớn Quảng Tây tiến vào bình nguyên Quảng Đông. Phía nam thành ngày đêm không ngừng có bè gỗ xuôi theo sông Tây Giang đến đây tập kết, là trung tâm phân phối gỗ và thảo dược lớn nhất miền tây Lĩnh Nam."
      },
      {
        "id": "sect_tianshifu",
        "name": "Thiên Sư Phủ Long Hổ Sơn",
        "type": "sect",
        "x": 755,
        "y": 322,
        "summary": "Tổ đình bùa chú của Chính Nhất đạo môn, lãnh tụ tuyệt đối của những người cầu pháp chính thống trong thiên hạ. Nội hàm sâu không thể lường, coi vàng bạc quyền thế như rác rưởi, là trụ cột chống trời chân chính của chính đạo, thay trời hành đạo, diệt trừ pháp thi."
      },
      {
        "id": "sect_jiujie",
        "name": "Cửu Giới Môn",
        "type": "sect",
        "x": -101,
        "y": 111,
        "summary": "Môn phái cầu pháp hàng đầu do người thủ hộ 'Lục Sinh Ngũ Thế' mà Vạn Nghiệp Thi Tiên đưa vào trong dòng sông dài thời gian tự tay sáng lập. Từ cội nguồn đã là đại diện tuyệt đối của ý chí Vạn Nghiệp ở nhân gian, mượn hoàng quyền thần quyền để vươn lên, là thế lực tôn giáo toàn trị lớn nhất thế gian."
      },
      {
        "id": "sect_sanzhen",
        "name": "Tam Chân Pháp Môn",
        "type": "sect",
        "x": 136,
        "y": 482,
        "summary": "Lực lượng cốt lõi chống lại Vạn Nghiệp Thi Tiên, lấy việc chung kết Vạn Nghiệp làm túc mệnh. Môn phái suy tàn đệ tử thưa thớt, nhưng truyền thừa vắt ngang hàng ngàn năm."
      },
      {
        "id": "sect_penglai",
        "name": "Bồng Lai Tam Đảo",
        "type": "sect",
        "x": 1030,
        "y": -490,
        "summary": "Môn phái cầu pháp đỉnh cấp lấy ba ngọn tiên sơn trên Đông Hải làm nền móng, chủ tu pháp môn trường sinh, lấy thời gian và sinh cơ làm cốt lõi."
      },
      {
        "id": "sect_qianji",
        "name": "Thiên Cơ Quán",
        "type": "sect",
        "x": 985,
        "y": 339,
        "summary": "Tổ chức vòng ngoài của Tam Chân Pháp Môn do Khương Minh Tử sáng lập, chủ tu thuật rối cơ quan và giám thị tình báo."
      },
      {
        "id": "sect_laoshan",
        "name": "Lao Sơn Phái",
        "type": "sect",
        "x": 794,
        "y": -411,
        "summary": "Đại tông kiếm tu của Đạo gia chính thống tọa lạc trong biên giới Tề Lỗ, vang danh ngang hàng với đảo Bồng Lai, Cửu Giới Môn, Thiên Cơ Quán."
      },
      {
        "id": "sect_wangchuan",
        "name": "Vong Xuyên Thuật Viện",
        "type": "sect",
        "x": 292,
        "y": 97,
        "summary": "Nằm trong hai mươi mốt đại môn phái cầu pháp, truyền thừa thuật hồi thiên hoán mệnh, lấy việc luyện hóa tinh huyết ngưng tụ phân thân làm pháp môn cốt lõi."
      },
      {
        "id": "sect_jishan",
        "name": "Kỵ Sơn",
        "type": "sect",
        "x": -937,
        "y": -416,
        "summary": "Chuyên tu suy diễn nhân quả cùng thuật bói toán thiên địa mệnh lý, sơn môn ẩn sâu trong Kỵ Sơn phía tây bắc."
      },
      {
        "id": "sect_nanjia",
        "name": "Nam Già Tiên Động",
        "type": "sect",
        "x": -1111,
        "y": 320,
        "summary": "Tọa lạc giữa vùng nội địa đỉnh tuyết Nam Già nơi biên cương phía tây nam, truyền thừa pháp môn tu hành cổ xưa nơi dị vực, hoàn toàn khác biệt với hệ thống Đạo gia Trung Nguyên."
      },
      {
        "id": "sect_baotian",
        "name": "Bảo Thiên Viện",
        "type": "sect",
        "x": 654,
        "y": 336,
        "summary": "Tọa lạc tại Giang Nam, lấy việc giám định kỳ trân dị bảo trong thiên hạ, nghiên cứu luyện chế đan dược, thu thập cất giữ dị bảo thượng cổ làm căn cơ lập phái."
      },
      {
        "id": "sect_wenxian",
        "name": "Vấn Tiên Hội",
        "type": "sect",
        "x": 194,
        "y": 497,
        "summary": "Hành sự điệu thấp và thu mình, đệ tử một lòng dốc tâm ngộ đạo. Trụ sở hội đặt tại thâm sơn u cốc vô danh, không lập sơn môn không treo biển hiệu."
      },
      {
        "id": "sect_quanzhen",
        "name": "Toàn Chân Long Môn Phái",
        "type": "sect",
        "x": 308,
        "y": -660,
        "summary": "Tổ đình tại Bạch Vân Quán Bắc Kinh, do Khâu Xứ Cơ của Bắc Toàn Chân sáng lập, nhánh lớn nhất của Toàn Chân phái, lãnh tụ Đạo giáo miền bắc."
      },
      {
        "id": "sect_mianshan",
        "name": "Miên Sơn Đại La Cung",
        "type": "sect",
        "x": 57,
        "y": -674,
        "summary": "Tọa lạc tại núi Miên Sơn Sơn Tây, nơi giao thoa giữa Vu văn hóa và Đạo giáo thời Lý Đường, có danh xưng 'Thiên hạ đệ nhất đạo quán'."
      },
      {
        "id": "sect_shenxiao",
        "name": "Thần Tiêu Phái",
        "type": "sect",
        "x": 272,
        "y": 109,
        "summary": "Phân chi của ba phái bùa chú (Phù lục tam tông), dung hợp lôi pháp Thiên Sư và thuật nội đan, dùng bùa chú triệu gọi và điều khiển thần tướng bộ Lôi."
      },
      {
        "id": "sect_maoshan",
        "name": "Mao Sơn Thượng Thanh Phái",
        "type": "sect",
        "x": 742,
        "y": 314,
        "summary": "Tọa lạc tại núi Mao Sơn Giang Nam, thượng thanh tông đàn của Đạo giáo. Giới luật sâm nghiêm, tác phong vô cùng khiêm tốn kỷ luật."
      },
      {
        "id": "sect_yemaoshan",
        "name": "Dã Mao Sơn",
        "type": "sect",
        "x": 773,
        "y": 408,
        "summary": "Không phải là một môn phái thống nhất, là tên gọi chung trong dân gian cho tất cả các dị thuật mượn danh hiệu Mao Sơn nhưng không dùng thủ đoạn của Thượng Thanh phái."
      },
      {
        "id": "sect_shenge",
        "name": "Thần Cách Diện Cụ",
        "type": "sect",
        "x": 654,
        "y": 1083,
        "summary": "Nguồn gốc từ Cám Na (múa Na) Giang Tây, dùng việc đeo mặt nạ vẽ màu để thỉnh thần nhập xác, mượn thần cách giáng thế thi triển dị năng."
      },
      {
        "id": "sect_zhuge",
        "name": "Gia Cát Thôn Vũ Hầu Phái",
        "type": "sect",
        "x": 771,
        "y": 590,
        "summary": "Hậu nhân của Thừa tướng Thục Hán Gia Cát Lượng nối đời định cư ở Lan Khê Chiết Giang, kiêm tu luyện khí cơ quan cùng thuật số Kỳ Môn."
      },
      {
        "id": "sect_sanyi",
        "name": "Tam Nhất Môn",
        "type": "sect",
        "x": 717,
        "y": 1106,
        "summary": "Tọa lạc tại Phúc Châu phủ, Giang Nam, dung hợp điểm mạnh của ba nhà Đạo, Phật, Nho. Lý niệm cốt lõi là Nghịch Sinh Tam Trọng — rèn luyện ngược bản thân về trạng thái Tiên Thiên Nhất Khí."
      },
      {
        "id": "sect_tengshan",
        "name": "Đằng Sơn Phái",
        "type": "sect",
        "x": 731,
        "y": 1108,
        "summary": "Tọa lạc tại Vĩnh Thái thuộc Phúc Châu phủ, Giang Nam, môn phái toàn là nữ. Lấy chế thuốc, luyện thuốc và tắm thuốc làm nghề nghiệp chính, bối cảnh thuộc hệ thống vu chúc Bách Việt."
      },
      {
        "id": "sect_ganshi",
        "name": "Nhất tộc Cản Thi Tương Tây",
        "type": "sect",
        "x": -27,
        "y": 877,
        "summary": "Bí thuật đuổi xác chết do Liễu gia Tương Tây truyền thừa qua nhiều thế hệ, dùng bùa chú điều khiển thi thể để chiến đấu. Chưa từng dùng người sống luyện thi, xác chết được dùng đều là từ người tự nguyện hiến tặng hoặc từ những ngôi mộ hoang vô chủ."
      },
      {
        "id": "sect_qinghe",
        "name": "Thanh Hà Miêu Trại",
        "type": "sect",
        "x": -45,
        "y": 895,
        "summary": "Nằm ở thôn Thanh Hà Tương Tây, truyền thừa cổ sư của bộ tộc Miêu. Lấy cổ thuật làm nòng cốt, cổ thuật vô thanh vô tức, người trúng cổ thường đến lúc phát giác thì đã vô phương cứu chữa."
      },
      {
        "id": "sect_dixing",
        "name": "Giáp Long Sơn Địa Hành Tiên",
        "type": "sect",
        "x": -1,
        "y": 851,
        "summary": "Nằm ở núi Giáp Long Hồ Nam, công pháp là thuật độn thổ. Lấy Khí bao bọc đất đá xung quanh làm nó hóa lỏng, đi xuyên qua không tiếng không vết. Số lượng môn nhân cực kỳ ít, sư đồ đơn truyền."
      },
      {
        "id": "sect_danfan",
        "name": "Đảm Phiên Mãi Thủy",
        "type": "sect",
        "x": 161,
        "y": 41,
        "summary": "Tục gọi là khóc mả, dùng tiếng khóc để triệu hoán và an ủi vong linh. Lấy cờ Dẫn Hồn làm pháp khí cốt lõi, tiếng khóc có thể làm lay động tâm trí người sống, thuật vong linh chính là khắc tinh tự nhiên của pháp thi."
      },
      {
        "id": "sect_wudang",
        "name": "Võ Đang Phái",
        "type": "sect",
        "x": 77,
        "y": 495,
        "summary": "Tọa lạc tại núi Võ Đang thuộc Vũ Xương phủ, Kinh Sở, do chân nhân Trương Tam Phong khai tông lập phái, lấy Thái Cực Quyền làm truyền thừa cốt lõi. Lấy nhu khắc cương lấy tĩnh chế động, Thái Cực kính có sức thẩm thấu cực mạnh."
      },
      {
        "id": "sect_anlu",
        "name": "An Lục Tam Ma Phái",
        "type": "sect",
        "x": 87,
        "y": 481,
        "summary": "Tọa lạc tại An Lục thuộc Vũ Xương phủ, Kinh Sở, lấy việc chém Tam Thi diệt dứt dục vọng con người làm mục tiêu tu hành. Không phải tà giáo, mà là Đạo môn chính thống. Truyền nhân duy nhất còn tồn tại thời nay là Bùi Tùng Nguyên."
      },
      {
        "id": "sect_qinshou",
        "name": "Cầm Thú Sư",
        "type": "sect",
        "x": -386,
        "y": -6,
        "summary": "Phân bố toàn cảnh vùng tây bắc, dùng lượng Khí của bản thân để giao tiếp và kiểm soát cầm thú. Độ khó giao tiếp tỷ lệ thuận với linh trí của cầm thú, không thể giao tiếp với loài linh trưởng."
      },
      {
        "id": "sect_jiacun",
        "name": "Giả Gia Thôn",
        "type": "sect",
        "x": -320,
        "y": 61,
        "summary": "Tọa lạc tại Thiểm Tây, lấy Bôn Lưu Chưởng và Ngự Vật thuật làm cốt lõi truyền thừa. Đi theo con đường lấy võ nhập đạo, không tu bùa chú không luyện đan, hoàn toàn dựa vào đôi bàn tay trần cùng với những vật phẩm điều khiển mà hành tẩu thiên hạ."
      },
      {
        "id": "sect_ziyang",
        "name": "Toàn Chân Tử Dương Phái",
        "type": "sect",
        "x": -296,
        "y": 129,
        "summary": "Tổ đình Nam Toàn Chân, tọa lạc tại Cửu Khúc Bàn Hoàn Động ở Tần Lĩnh. Chủ trương tu mệnh công trước rồi mới tu tính công, lấy việc thanh tu nội đan làm gốc, cùng nguồn nhưng khác dòng với Long Môn phái nhánh phía bắc."
      },
      {
        "id": "sect_momen",
        "name": "Mặc Môn",
        "type": "sect",
        "x": -242,
        "y": 80,
        "summary": "Truyền thừa Mặc gia từ thời Tiên Tần, chủ trương kiêm ái phi công. Lấy thuật cơ quan và thuật luyện khí làm nòng cốt, cơ quan chú trọng phòng ngự và kiểm soát, trận pháp phòng thủ Mặc Thủ là tấm lá chắn quan trọng chống lại bầy xác sống."
      },
      {
        "id": "sect_tiangong",
        "name": "Thiên Công Đường",
        "type": "sect",
        "x": -239,
        "y": 68,
        "summary": "Môn phái luyện khí chủ chốt của giới Dị nhân, lấy việc chế tạo pháp khí, cơ quan, pháp bảo làm nghiệp vụ cốt lõi. Pháp khí sản xuất ra có phẩm chất thượng thừa, vật xuất xưởng có thể bảo đảm ba đời không cần bảo trì tu sửa."
      },
      {
        "id": "sect_kunlun",
        "name": "Côn Luân Kiếm Tiên Môn",
        "type": "sect",
        "x": -1414,
        "y": -678,
        "summary": "Tọa lạc tại sơn mạch Côn Luân - Lương Châu, chuyên tu thân pháp kiếm thuật. Đạo thân kiếm hợp nhất, thân pháp khu động kiếm thế, kiếm đi theo bước chân. Môn nhân cực ít xuất sơn nhưng mỗi khi xuất thế chắc chắn là kiếm khách đỉnh cao."
      },
      {
        "id": "sect_jingang",
        "name": "Kim Cương Môn",
        "type": "sect",
        "x": -1830,
        "y": -692,
        "summary": "Nhánh phụ của Thiếu Lâm, tọa lạc tại Tân Cương. Chủ tu công phu hoành luyện, nổi tiếng với kim cương bất hoại chi thân, có thể chính diện ngạnh kháng đao kiếm bổ chém và thi vật xé cắn."
      },
      {
        "id": "sect_huode",
        "name": "Hỏa Đức Tông",
        "type": "sect",
        "x": -890,
        "y": 585,
        "summary": "Tọa lạc tại Thục trung, chủ tu dương hỏa trong cơ thể. Thượng thừa công pháp có thể hóa khí thành hỏa, khí không tan thì hỏa không tắt, kim hỏa có sức thiêu đốt khắc chế cực mạnh đối với thi vật. Hỏa độn có thể di chuyển trong nháy mắt ngàn dặm giữa các hỏa chủng ở khắp nơi."
      },
      {
        "id": "sect_liangshan",
        "name": "Lương Sơn Vu Hịch",
        "type": "sect",
        "x": -940,
        "y": 661,
        "summary": "Nằm ở Lương Sơn, Tứ Xuyên, truyền thừa vu thuật của tộc Di. Lấy vũ đạo và chú ca để thiết lập liên kết với quỷ thần, tổ linh phụ thể có thể nhận được một phần năng lực chiến đấu lúc sinh tiền của tiên tổ. Không truyền cho ngoại tộc."
      },
      {
        "id": "sect_baicao",
        "name": "Bách Thảo Viên",
        "type": "sect",
        "x": -878,
        "y": 619,
        "summary": "Tọa lạc tại Thục trung, lấy việc nhận biết dược liệu, luyện chế đan dược và trị liệu các loại thương tích làm cốt lõi. Không hỏi xuất thân của bệnh nhân, chính đạo hay tán tu đều có thể tới cửa cầu chẩn."
      },
      {
        "id": "sect_tangmen",
        "name": "Đường Môn",
        "type": "sect",
        "x": -572,
        "y": 748,
        "summary": "Đường Môn ở Thục trung, thế gia thích khách có truyền thừa ngàn năm, ban đầu là tông tộc họ Đường; bốn trăm năm trước phá bỏ quy củ cũ chỉ nhận người họ Đường, từ đó chia làm hai môn nội ngoại, trở thành một trong những thế lực đáng kiêng dè nhất trong giới Dị nhân. Nơi đóng quân tại Đường Gia Bảo ở Trùng Khánh, không thờ tổ sư, người sáng lập phái tương truyền là nữ giới nhưng không thể khảo chứng. Nổi tiếng thiên hạ nhờ thuật ẩn nặc, ám sát, dùng độc, ám khí và cơ quan thuật, tuân theo tôn chỉ “chiếu theo đơn bốc thuốc, nhận đơn chôn người”, là đệ nhất môn phái ám sát được giới Dị nhân công nhận."
      },
      {
        "id": "sect_saman",
        "name": "Tát Mãn (Xuất Mã Tiên)",
        "type": "sect",
        "x": 1667,
        "y": -1633,
        "summary": "Tiến hóa từ Sát Mã (Chama) của Mãn tộc, dung hợp vu thuật của ba tộc Hán - Mông - Mãn, thờ phụng tinh quái nơi sơn dã, mượn pháp lực của chúng để xu cát tị hung."
      },
      {
        "id": "sect_wuliu",
        "name": "Ngũ Liễu Phái",
        "type": "sect",
        "x": 1689,
        "y": -1673,
        "summary": "Bắt nguồn từ Toàn Chân Long Môn Phái, lấy Liễu Hoa Dương làm tổ sư, dung hợp tư tưởng Phật - Đạo, môn nhân rất hiếm khi ẩn thế tu hành."
      },
      {
        "id": "sect_wulou",
        "name": "Vô Lậu Kim Cương",
        "type": "sect",
        "x": 1326,
        "y": -920,
        "summary": "Lưu phái Phật môn, chủ tu kim cương bất hoại chi thân, công phu hoành luyện đạt đến mức độ đỉnh cao."
      },
      {
        "id": "sect_mihua",
        "name": "Bí Họa Phường",
        "type": "sect",
        "x": 809,
        "y": 426,
        "summary": "Cùng với Vương gia Thần Đồ được mệnh danh là hai đại môn phái đan thanh của giới Dị nhân, có thể vẽ ra bí đồ ẩn chứa thuật pháp để vây địch, diệt địch và thi triển huyễn thuật."
      },
      {
        "id": "sect_putuo",
        "name": "Phổ Đà Tam Tự",
        "type": "sect",
        "x": 881,
        "y": 568,
        "summary": "Đạo tràng Quan Âm của Phật giáo, do Phổ Tế thiền tự, Pháp Vũ thiền tự và Tuệ Tế thiền tự tạo thành."
      },
      {
        "id": "sect_lingyin",
        "name": "Linh Ẩn Tự",
        "type": "sect",
        "x": 815,
        "y": 579,
        "summary": "Do sư Thiên Trúc thời Đông Tấn là Huệ Lý xây dựng, Tế Công từng tu hành tại đây."
      },
      {
        "id": "sect_liuyun",
        "name": "Lưu Vân Kiếm",
        "type": "sect",
        "x": 726,
        "y": 1115,
        "summary": "Kiếm tu môn phái ở Phúc Kiến, đại phái nổi danh ngang hàng với Thuật Tự Môn, Toàn Chân, yêu cầu về thiên phú kiếm tu cực cao."
      },
      {
        "id": "sect_quanxing",
        "name": "Toàn Tính",
        "type": "sect",
        "x": 221,
        "y": -65,
        "summary": "Tà phái tổ chức của giới Dị nhân, chủ trương 'toàn tính bảo chân, bất dĩ vật lụy hình', hành sự tùy tâm sở dục."
      },
      {
        "id": "family_wang",
        "name": "Vương gia",
        "type": "sect",
        "x": 345,
        "y": -631,
        "summary": "Dị nhân gia tộc có truyền thừa ngàn năm, một trong Tứ đại gia tộc. Tuyệt học gia truyền 'Thần Đồ' —— một trong hai đại môn phái đan thanh của giới Dị nhân."
      },
      {
        "id": "family_lv",
        "name": "Lã gia",
        "type": "sect",
        "x": 363,
        "y": -649,
        "summary": "Lấy quản lý gia tộc cực đoan khép kín để duy trì truyền thừa dị năng, một trong Tứ đại gia tộc."
      },
      {
        "id": "family_gao",
        "name": "Cao gia",
        "type": "sect",
        "x": 1539,
        "y": -1514,
        "summary": "Một trong Tứ đại gia tộc, hành sự cực kỳệu thấp, hiếm khi tham gia vào phân tranh của giới Dị nhân Trung Nguyên."
      },
      {
        "id": "family_lu",
        "name": "Lục gia",
        "type": "sect",
        "x": 329,
        "y": -633,
        "summary": "Một trong Tứ đại gia tộc, nhiều đời giao hảo với Tam Nhất Môn."
      },
      {
        "id": "sect_santong",
        "name": "Tam Thông Hỏa Châm",
        "type": "sect",
        "x": -911,
        "y": 597,
        "summary": "Y thuật môn phái ở Tứ Xuyên, lấy hỏa châm điều lý thập nhị kinh mạch. Cùng Bách Thảo Viên, Tế Thế Đường hợp xưng là ba đại y môn của giới Dị nhân."
      },
      {
        "id": "sect_jishi",
        "name": "Tế Thế Đường",
        "type": "sect",
        "x": -889,
        "y": 586,
        "summary": "Đại y quán của giới Dị nhân, lấy trung y trị liệu làm cốt lõi, lấy huyệt vị điều lý tiên thiên nhất khí."
      },
      {
        "id": "sect_wuxian",
        "name": "Ngũ Tiên Giáo",
        "type": "sect",
        "x": -45,
        "y": 1545,
        "summary": "Dùng cổ trùng chế ngự các loại độc vật, sức sát thương của độc tố cực mạnh có thể phá hủy thần kinh giết người vu vô hình."
      },
      {
        "id": "sect_mizong",
        "name": "Mật Tông",
        "type": "sect",
        "x": -2195,
        "y": 687,
        "summary": "Phật môn ở Tạng địa, tu hành cốt lõi là chuyết hỏa và du già, chú trọng phạm ngã hợp nhất."
      },
      {
        "id": "sect_yaoxian",
        "name": "Miêu Cương Dược Tiên Hội",
        "type": "sect",
        "x": -183,
        "y": 1243,
        "summary": "Tổ chức tà giáo si mê cổ thuật, chế tác Cổ Thân Thánh Đồng, gieo cổ độc vào ngũ tạng và khớp xương của cơ thể người."
      },
      {
        "id": "sect_luofu",
        "name": "La Phù Nam Mao Sơn",
        "type": "sect",
        "x": 204,
        "y": 1511,
        "summary": "Cùng nguồn với Mao Sơn phái, Cát Hồng từng tu hành tại đây, ngoại đan thuật của môn phái này có sức ảnh hưởng sâu xa đến sự phát triển của trung y dược."
      },
      {
        "id": "sect_jindan",
        "name": "Toàn Chân Kim Đan Phái",
        "type": "sect",
        "x": -130,
        "y": 1933,
        "summary": "Do Bạch Ngọc Thiềm - người thực tế đặt nền móng cho Nam Toàn Chân sáng lập, lý luận cốt lõi là thiên địa vạn vật tương đạo, thánh nhân đoạt lấy sinh cơ của thiên địa để cầu trường sinh."
      },
      {
        "id": "sect_shajia",
        "name": "Sa Gia Tế Tư Thế Gia",
        "type": "sect",
        "x": -221,
        "y": -17,
        "summary": "Thế gia được triều đại đương thời đặc cách công khai tế tự vong quân của triều đại trước, chuyên siêu độ vong hồn binh tốt tử trận tại cổ chiến trường."
      },
      {
        "id": "sect_jinque",
        "name": "Kim Khuyết Tông",
        "type": "sect",
        "x": -456,
        "y": 268,
        "summary": "Tổ đình ở Tử Bách Sơn tại Tần Lĩnh, là nhánh phụ của Biện Khí Nhất Mạch, chuyên phân biệt sơn khách thảo mộc mượn thân xác."
      },
      {
        "id": "sect_lvshan",
        "name": "Lục Sơn Học Đường",
        "type": "sect",
        "x": -121,
        "y": 1255,
        "summary": "Một nhánh Cổ Mẫu từ Ngũ Lĩnh Miêu Cương xuôi Nam, truyền lại thuật giải cổ cho người Hán."
      },
      {
        "id": "sect_mengding",
        "name": "Mông Đỉnh Sơn Cam Lộ Thiền Viện",
        "type": "sect",
        "x": -963,
        "y": 639,
        "summary": "Tông viện độc lập của thiền môn Thục địa, cai quản cống trà của Thất Tiên Thánh Trà Lâm ở Mông Đỉnh Sơn."
      }
    ],
    "edges": [
      {
        "from": "capital_luojing",
        "to": "city_shuntian"
      },
      {
        "from": "capital_luojing",
        "to": "town_xuanfu"
      },
      {
        "from": "capital_luojing",
        "to": "city_datong"
      },
      {
        "from": "capital_luojing",
        "to": "city_weihui",
        "label": "Quan đạo Trung Nguyên"
      },
      {
        "from": "capital_luojing",
        "to": "pass_tongguan",
        "label": "Sơn đạo Hào Hàm"
      },
      {
        "from": "capital_jiangning",
        "to": "city_yangzhou",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "capital_jiangning",
        "to": "city_wuchang",
        "label": "Thủy lộ Trường Giang"
      },
      {
        "from": "capital_jiangning",
        "to": "city_hangzhou",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "city_yangzhou",
        "to": "city_yanzhou",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "city_yangzhou",
        "to": "city_suzhou",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "city_chengdu",
        "to": "city_changan"
      },
      {
        "from": "city_chengdu",
        "to": "pass_jianmen",
        "label": "Sơn đạo Thục Đạo"
      },
      {
        "from": "city_chengdu",
        "to": "city_chongqing",
        "label": "Quan đạo Xuyên Đông"
      },
      {
        "from": "city_chengdu",
        "to": "city_hanzhong"
      },
      {
        "from": "city_chengdu",
        "to": "city_yazhou",
        "label": "Quan đạo Thục trung"
      },
      {
        "from": "port_dengzhou",
        "to": "garrison_andong",
        "label": "Hàng đạo Bột Hải"
      },
      {
        "from": "port_dengzhou",
        "to": "city_qingzhou",
        "label": "Quan đạo Sơn Đông"
      },
      {
        "from": "city_nanyang",
        "to": "city_kaifeng"
      },
      {
        "from": "city_nanyang",
        "to": "pass_jianmen"
      },
      {
        "from": "city_nanyang",
        "to": "city_xiangyang",
        "label": "Quan đạo Hán Thủy"
      },
      {
        "from": "city_nanyang",
        "to": "city_chongqing"
      },
      {
        "from": "city_changsha",
        "to": "port_guangzhou",
        "label": "Đại đạo Tương Việt"
      },
      {
        "from": "city_changsha",
        "to": "city_jiangling",
        "label": "Thủy lộ Động Đình Hồ"
      },
      {
        "from": "city_changsha",
        "to": "city_fuzhou"
      },
      {
        "from": "city_changsha",
        "to": "city_guilin",
        "label": "Quan đạo Tương Quế"
      },
      {

"from": "city_shuntian",
        "to": "town_xuanfu",
        "label": "Quan đạo Kinh Kỳ"
      },
      {
        "from": "city_shuntian",
        "to": "town_jizhou",
        "label": "Quan đạo Kinh Kỳ"
      },
      {
        "from": "city_shuntian",
        "to": "city_jinan",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "town_xuanfu",
        "to": "city_datong",
        "label": "Phòng tuyến Trường Thành"
      },
      {
        "from": "town_jizhou",
        "to": "garrison_andong",
        "label": "Hành lang Liêu Đông"
      },
      {
        "from": "town_jizhou",
        "to": "frontier_bohai"
      },
      {
        "from": "city_datong",
        "to": "city_yanan",
        "label": "Đường biên tường Hà Đông"
      },
      {
        "from": "garrison_andong",
        "to": "frontier_bohai",
        "label": "Hành lang Liêu Đông"
      },
      {
        "from": "frontier_bohai",
        "to": "wilderness_baishanheishui",
        "label": "Hoang nguyên Cực Bắc"
      },
      {
        "from": "city_kaifeng",
        "to": "city_guide",
        "label": "Quan đạo Trung Nguyên"
      },
      {
        "from": "city_kaifeng",
        "to": "city_weihui",
        "label": "Quan đạo Trung Nguyên"
      },
      {
        "from": "city_guide",
        "to": "city_yanzhou",
        "label": "Quan đạo Trung Nguyên"
      },
      {
        "from": "city_guide",
        "to": "city_wuchang"
      },
      {
        "from": "city_weihui",
        "to": "pass_tongguan"
      },
      {
        "from": "city_jinan",
        "to": "city_qingzhou",
        "label": "Quan đạo Sơn Đông"
      },
      {
        "from": "city_jinan",
        "to": "city_yanzhou",
        "label": "Quan đạo Sơn Đông"
      },
      {
        "from": "city_qingzhou",
        "to": "city_yanzhou",
        "label": "Quan đạo Sơn Đông"
      },
      {
        "from": "city_suzhou",
        "to": "city_hangzhou",
        "label": "Tào vận Đại Vận Hà"
      },
      {
        "from": "city_wuchang",
        "to": "city_jiangling",
        "label": "Thủy lộ Trường Giang"
      },
      {
        "from": "city_changan",
        "to": "pass_tongguan",
        "label": "Quan đạo Tam Tần"
      },
      {
        "from": "city_changan",
        "to": "city_hanzhong",
        "label": "Sơn đạo Tử Ngọ"
      },
      {
        "from": "city_changan",
        "to": "city_yanan",
        "label": "Quan đạo Tam Tần"
      },
      {
        "from": "port_guangzhou",
        "to": "city_fuzhou",
        "label": "Hải đạo Mân Quảng"
      },
      {
        "from": "port_guangzhou",
        "to": "city_wuzhou",
        "label": "Thủy lộ Tây Giang"
      },
      {
        "from": "city_liangzhou",
        "to": "pass_jiayuguan",
        "label": "Đại đạo Hà Tây"
      },
      {
        "from": "city_liangzhou",
        "to": "city_hanzhong"
      },
      {
        "from": "city_liangzhou",
        "to": "city_xining",
        "label": "Sơn đạo Cao Nguyên"
      },
      {
        "from": "city_liangzhou",
        "to": "city_yanan"
      },
      {
        "from": "city_hangzhou",
        "to": "city_fuzhou",
        "label": "Hải đạo Mân Chiết"
      },
      {
        "from": "frontier_dunhuang",
        "to": "pass_jiayuguan",
        "label": "Đại đạo Hà Tây"
      },
      {
        "from": "city_jiangling",
        "to": "city_xiangyang",
        "label": "Thủy lộ Hán Thủy"
      },
      {
        "from": "pass_jianmen",
        "to": "city_chongqing"
      },
      {
        "from": "pass_jianmen",
        "to": "pass_tongguan"
      },
      {
        "from": "city_qiongzhou",
        "to": "city_wuzhou"
      },
      {
        "from": "city_xiangyang",
        "to": "city_chongqing"
      },
      {
        "from": "city_chongqing",
        "to": "city_guilin",
        "label": "Dịch đạo Kiềm Trung"
      },
      {
        "from": "pass_jiayuguan",
        "to": "city_xining"
      },
      {
        "from": "wilderness_xueyu",
        "to": "city_hanzhong"
      },
      {
        "from": "wilderness_xueyu",
        "to": "city_xining",
        "label": "Sơn đạo Cao Nguyên"
      },
      {
        "from": "wilderness_xueyu",
        "to": "town_dajianlu",
        "label": "Sơn đạo Tuyết Vực"
      },
      {
        "from": "pass_tongguan",
        "to": "city_yanan"
      },
      {
        "from": "city_hanzhong",
        "to": "city_yazhou"
      },
      {
        "from": "city_hanzhong",
        "to": "city_xining"
      },
      {
        "from": "city_hanzhong",
        "to": "town_dajianlu"
      },
      {
        "from": "city_yazhou",
        "to": "town_dajianlu",
        "label": "Sơn đạo Trà Mã"
      },
      {
        "from": "city_guilin",
        "to": "city_wuzhou",
        "label": "Thủy lộ Ly Giang"
      },
      {
        "from": "city_qiongzhou",
        "to": "port_guangzhou",
        "label": "Hải lộ Quỳnh Châu"
      },
      {
        "from": "sect_tianshifu",
        "to": "capital_jiangning",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_tianshifu",
        "to": "city_suzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jiujie",
        "to": "capital_luojing",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_sanzhen",
        "to": "city_suzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_sanzhen",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_penglai",
        "to": "port_dengzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_qianji",
        "to": "city_suzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_laoshan",
        "to": "port_dengzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_laoshan",
        "to": "city_qingzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_wangchuan",
        "to": "city_kaifeng",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jishan",
        "to": "city_liangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_nanjia",
        "to": "town_dajianlu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_nanjia",
        "to": "city_xining",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_baotian",
        "to": "capital_jiangning",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_quanzhen",
        "to": "city_shuntian",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_mianshan",
        "to": "city_datong",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_shenxiao",
        "to": "city_kaifeng",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_maoshan",
        "to": "capital_jiangning",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_yemaoshan",
        "to": "city_suzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_shenge",
        "to": "city_fuzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_zhuge",
        "to": "city_hangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_sanyi",
        "to": "city_fuzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_tengshan",
        "to": "city_fuzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_ganshi",
        "to": "city_changsha",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_qinghe",
        "to": "city_changsha",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_dixing",
        "to": "city_changsha",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_danfan",
        "to": "city_kaifeng",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_wudang",
        "to": "city_wuchang",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_anlu",
        "to": "city_wuchang",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_qinshou",
        "to": "city_changan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jiacun",
        "to": "city_changan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_ziyang",
        "to": "city_changan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_momen",
        "to": "city_changan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_tiangong",
        "to": "city_changan",

"label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_kunlun",
        "to": "pass_jiayuguan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jingang",
        "to": "frontier_dunhuang",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_huode",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_liangshan",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_baicao",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_tangmen",
        "to": "city_chongqing",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_saman",
        "to": "wilderness_baishanheishui",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_wuliu",
        "to": "wilderness_baishanheishui",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_wulou",
        "to": "garrison_andong",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_mihua",
        "to": "city_suzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_putuo",
        "to": "city_hangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_lingyin",
        "to": "city_hangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_liuyun",
        "to": "city_fuzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "family_wang",
        "to": "city_shuntian",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "family_lv",
        "to": "city_shuntian",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "family_gao",
        "to": "frontier_bohai",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "family_lu",
        "to": "city_shuntian",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_santong",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jishi",
        "to": "city_chengdu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_wuxian",
        "to": "port_guangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_mizong",
        "to": "wilderness_xueyu",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_yaoxian",
        "to": "city_guilin",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_luofu",
        "to": "port_guangzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jindan",
        "to": "city_qiongzhou",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_shajia",
        "to": "pass_tongguan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_shajia",
        "to": "city_yanan",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_jinque",
        "to": "city_hanzhong",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_lvshan",
        "to": "city_guilin",
        "label": "Tiểu kính môn phái"
      },
      {
        "from": "sect_mengding",
        "to": "city_yazhou",
        "label": "Tiểu kính môn phái"
      }
    ]
  },
  "loaderData": {
    "keepTypes": [
      "capital",
      "city",
      "port",
      "town",
      "garrison",
      "frontier",
      "wilderness",
      "pass",
      "sect"
    ]
  }
};
