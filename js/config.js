// 自動判斷當前環境
function getBaseUrl() {
    const hostname = window.location.hostname;
    
    switch (hostname) {
        case 'localhost':
            return 'http://localhost:8080';
        case '35.234.25.82':
            return 'http://35.234.25.82:8080';
        case 'fbsep-bookcart.ddns.net':
            return 'http://fbsep-bookcart.ddns.net:8080';
        default:
            // 預設使用本機開發環境
            return 'http://localhost:8080';
    }
}

// 設定 BASE_URL
window.BASE_URL = getBaseUrl();





//window.BASE_URL = 'http://localhost:8080';
//範例fetch(`${BASE_URL}/api/members/logout`)
//<script src="./js/config.js"></script>
//引入一定要把 config.js 放在最前面引入，否則其他 script 會找不到這些全局變數
//<script src="./js/config.js"></script>
//`${BASE_URL}`