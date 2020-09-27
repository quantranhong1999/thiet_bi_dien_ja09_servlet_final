let btnTimKiem, btnThemDanhMuc, btnSua, btnXoa,selectSapXep, searchDanhMuc
var listDanhMuc =[
    {
        id: 1,
        name: "Ipad",
        
    },
    {
        id: 2,
        name: "Iphone",
        
    },
];
var tableDuLieu
$(async function () {

    tableDuLieu = $("tbody")
    await categoryFindAll().then( rs => {
        if(rs.message == "success") {
            listDanhMuc = rs.data;
        } else {
            listDanhMuc = [];
        }
    }).catch(err => {
        console.log(err)
    })
    viewDanhSachDanhMuc()
})
function viewDanhSachDanhMuc() {

}