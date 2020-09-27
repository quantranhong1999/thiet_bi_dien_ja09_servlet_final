var urlCategory ="category/"

function categoryFindAll() {
    return ajaxGet(`${urlCategory}find-all`)
}