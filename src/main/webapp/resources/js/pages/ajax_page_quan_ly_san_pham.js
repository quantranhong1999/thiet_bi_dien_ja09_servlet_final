// cu phap  de dam bao tat ca cac phan tu da duoc load xong
// de co the thuc hien thao tac len no

//b1: dinh nghia cac thanh phan can thao tac
let selectSearchDanhMuc, selectSearchSapXep, textSearchTen, numberSearchGia, numberSearchDaBan, dateSearchNgayTao, selectSearchConHang, btnTimKiem, tableDuLieu, textTen, selectDanhMuc, numberGia, numberDaBan, numberBaoHanh, numberKhuyenMai, fileAnh, dateNgayTao, textareaGioiThieu, textareaThongSo, checkboxHetHang, btnLuuLai, btnXacNhanXoa;
let indexProduct, elementProduct;
let btnThem;
let listProduct = [
    {
        id: 1,
        name: "Iphone 10",
        price: 10000,
        createDate: "2020-08-20",
        image: "https://alofone.vn/wp-content/uploads/2019/07/iphone-5-16gb-den.jpg",
        introduction: "Iphone tai thỏ",
        specification: "Chip A11",
        soldOut: true,
        guarantee: 12,
        categoryId: 1,
        bouth: 1000,
        promotion: 10
    },
    {
        id: 2,
        name: "Iphone 11",
        price: 10000,
        createDate: "2020-08-20",
        image: "https://cdn.tgdd.vn/Products/Images/42/60546/iphone-5s-16gb-13-300x300.jpg",
        introduction: "Iphone tai thỏ",
        specification: "Chip A11",
        soldOut: false,
        guarantee: 12,
        categoryId: 2,
        bouth: 1000,
        promotion: 10
    },
];
$(function () {
    selectSearchDanhMuc =$("#select-search-danh-muc");
    selectSearchSapXep =$("#select-search-sap-xep");
    textSearchTen =$("#text-search-ten");
    numberSearchGia =$("#number-search-gia");
    numberSearchDaBan =$("#number-da-ban");
    dateSearchNgayTao =$("#date-search-ngay-tao");
    selectSearchConHang =$("#select-search-con-hang");
    btnTimKiem =$("#btn-tim-kiem");
    tableDuLieu =$("tbody");
    textTen =$("#text-ten");
    selectDanhMuc =$("#select-danh-muc");
    numberGia =$("#number-gia");
    numberDaBan =$("#number-da-ban");
    numberBaoHanh =$("#number-bao-hanh");
    numberKhuyenMai =$("#number-khuyen-mai");
    fileAnh =$("#file-anh");
    dateNgayTao =$("#date-ngay-tao");
    textareaGioiThieu =$("#textarea-gioi-thieu");
    textareaThongSo =$("#textarea-thong-so");
    checkboxHetHang =$("#checkbox-het-hang");
    btnLuuLai =$("#btn-luu-lai");
    btnXacNhanXoa=$("#btn-xac-nhan-xoa");
    btnThem = $("#btn-them")
    viewDanhSachSanPham()
    searchSanPham()
    xacNhanXoaSanPham()
})
//b2: TAO RA CAC HAM THAO TAC
// can phai thao tac voi mot list san pham duoc tra ve tu api
function viewDanhSachSanPham() {
    let view = "<tr><td colspan='8'><strong>Khong co du lieu!</strong></td></tr>"
    // ham nay co chuc nang xoa het html cu va in vao html moi truyen vao
    if (listProduct && listProduct.length > 0){
        // map thuc hien duyet lan luot cac phan tu trong mang, neu co return no se tra ve mot mang moi
        view = listProduct.map((data, index) => {
            // template string
            // 1 chuoi cho phep thuc hien cac phep toan
            return `<tr data-index="${index}">
                                <th scope="row">${index + 1}</th>
                                <td><img src="${data.image}"
                                         alt="" width="80px"></td>
                                <td>${viewField(data.name)}</td>
                                <td>${viewField(data.price)}</td>
                                <td>${data.bouth}</td>
                                <td>${viewField(data.createDate)}</td>
                                <td class="text-center">${data.soldOut ? `<span class="badge badge-success">Còn hàng</span>`: `<span class="badge badge-danger">Hết hàng</span>`}</td>
                                <td>
                                    <button type="button" class="btn btn-warning sua-san-pham" ><i class="fas fa-pen"></i>
                                        Sửa</button>
                                    <button type="button" class="btn btn-danger xoa-san-pham"><i class="fas fa-trash-alt"></i>
                                        Xóa</button>
                                </td>
                            </tr>`
        }).join("")
    }
    tableDuLieu.html(view)
    xoaSanPham()
    suaSanPham()
    luuSanPham()
    themSanPham()
}
function searchSanPham() {
    //gan su kien click nut Tim Kiem
    btnTimKiem.click(function () {
        //b1: lay ra cac gia tri la cac thong tin can tim kiem va xu ly dau vao
        let valSearchTen = textSearchTen.val();
        let valSearchGia = textSearchTen.val();
        valSearchGia = valSearchGia.length > 0 ? valSearchGia :-1
        // let varSeachDaBan = numberSearchDaBan.val();
        // valSearchDaBan = varSeachDaBan.length > 0 ? valSearchDaBan :-1
        let varSearchDaBan = numberSearchDaBan.val();
        varSearchDaBan = varSearchDaBan.length > 0? valSearchDaBan :-1
        let valSearchNgayTao = textSearchTen.val();
        valSearchNgayTao = valSearchNgayTao.length > 0 ? valSearchNgayTao :-1
        //b2: sau khi lay ra gia tri thi goi API search va truyen vao cac gia tri can tim kiem
        //api search se tra ve 1 list san pham tim kiem tuong ung
        //sau do lay list tra ve tu API gan vao listProduct va view lai list san pham
        listProduct = []
        viewDanhSachSanPham();
    })
}

function xoaSanPham() {
    $(".xoa-san-pham").click(function () {
        //b1: lay ra index cua phan tu trong mang thong qua thuoc itnh data index trong tr
        //b2: lay ra id phan tu tuong ung trong mang
        //b3: goi den api xoa san pham truyen vao id vua tim kiem duoc
        //b4 neu api tra ve true thi thuc hien xoa san pham trong list hien tai va view lai san pham
        //tu khoa this chi nut minh dang click( phan biet cac nut trong cung 1 class)
        //.parents de lay ra tr cua nut vua click
        //.attr("name") lay gia tri thuoc tinh name
        indexProduct = $(this).parents("tr").attr("data-index")
        //phai dam bao duoc indexProduct tuong ung voi nut xoa minh vua click
        $("#exampleModal1").modal("show")

    })
}
function xacNhanXoaSanPham() {
    btnXacNhanXoa.click(function () {
        let idProduct = listProduct[indexProduct-0].id
        //call api va truyen vao idProduct va neu tra ve true
        //thuc hien xoa san pham o trong list
        listProduct = listProduct.filter((data, index) => {
            return index != indexProduct
        })
        viewDanhSachSanPham()
        $("#exampleModal1").modal("hide")
    })
}
function suaSanPham() {
    $(".sua-san-pham").click(function () {
        indexProduct = $(this).parents("tr").attr("data-index")-0;
        elementProduct = listProduct[indexProduct]
        textTen.val(elementProduct.name);
        selectDanhMuc.val(elementProduct.categoryId);
        numberGia.val(elementProduct.price);
        numberDaBan.val(elementProduct.bouth);
        numberBaoHanh.val(elementProduct.guarantee);
        numberKhuyenMai.val(elementProduct.promotion);
        dateNgayTao.val(elementProduct.createDate);
        textareaGioiThieu.val(elementProduct.introduction);
        textareaThongSo.val(elementProduct.specification);
        checkboxHetHang.prop("checked",elementProduct.soldOut );
        $("#exampleModal").modal("show");
    })
}
function checkData(selector, textError) {
    let val = $(selector).val();
    let check = false;
    if(val.length > 0){
        check = true
        hiddenError(selector)
    } else {
        viewError(selector, textError)
    }
    // tra ve mot doi tuong co 2 thuoc tinh la val va check
    // thuoc tinh val se mang gia tri cua bien val
    // thuoc tinh check se mang gia tri cua bien check
    return {val, check}
}
function luuSanPham() {
    btnLuuLai.click(function () {
        //kiem tra cac du lieu nguoi dung nhap vao co dung dinh dang hay khong
        let {val:valTen, check:checkTen} = checkData(textTen, "Định dạng tên chưa đúng");
        let valDanhMuc = selectDanhMuc.val();
        let {val:valGia, check:checkGia}= checkData(numberGia, "Giá bán phải là số");
        let {val:valDaBan, check:checkDaBan}= checkData(numberDaBan, "Nhập số lượng đã bán");
        let {val:valBaoHanh, check:checkBaoHanh}= checkData(numberBaoHanh, "Nhập thời gian bảo hành");
        let {val:valKhuyenMai, check:checkKhuyenMai}= checkData(numberKhuyenMai, "Nhập phần trăm khuyến mãi");
        let valGioiThieu = textareaGioiThieu.val();
        let valThongSo = textareaThongSo.val();
        let valHetHang = checkboxHetHang.is(":checked");
        if(checkTen && checkGia && checkDaBan && checkBaoHanh && checkKhuyenMai) {
            //neu element product la null thi tuong ung voi them
            let checkAction = elementProduct // true la sua. false la xoa
            if(elementProduct) { //neu san pham da co san
                checkAction = true
            } else { //neu san pham null => them moi
                elementProduct = {}
            }
            elementProduct.name = valTen;
            elementProduct.categoryId = valDanhMuc;
            elementProduct.price = valGia;
            elementProduct.bouth = valDaBan;
            elementProduct.guarantee = valBaoHanh;
            elementProduct.promotion = valKhuyenMai;
            elementProduct.introduction = valGioiThieu;
            elementProduct.specification = valThongSo;
            elementProduct.soldOut = valHetHang;
            //call API sua san pham va truyen vao element product hien tai
            // Khi API tra ve ket qua update thanh cong thi gan doi tuong vua tra ve
            if (checkAction) {
                listProduct[indexProduct] = elementProduct
            } else {
                listProduct.push(elementProduct)
            }

            //them va sua chi khac nhau 1 la them moi vao mang 2 la sua phan tu cua list
            viewDanhSachSanPham()
            $("#exampleModal").modal("hide")

        }
    })
}
// nhiem vu xoa doi tuong elementProduct va thuc hien mo modal
function themSanPham() {

    btnThem.click(function () {
        elementProduct =null
        $("#exampleModal").modal("show")
    })
}