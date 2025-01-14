(function() {
    // 確認使用者是否登入
    const memberStr = localStorage.getItem('user');
    if (memberStr === null) {
        window.location.href = '/login.html';
    }

    // 取得使用者資訊
    const member = JSON.parse(memberStr);
    
    // 取得目前頁面路徑
    const currentPath = window.location.pathname;
    
    // 檢查登入後的跳轉標記
    const hasRedirected = sessionStorage.getItem('adminRedirected');
    
    // 如果在登入頁面且尚未跳轉過，檢查是否為管理者並進行跳轉
    if (currentPath.includes('login.html') && !hasRedirected) {
        fetch('http://localhost:8080/api/members/' + member.memberNo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            if (data.memberStatus === 2) {
                // 設置跳轉標記
                sessionStorage.setItem('adminRedirected', 'true');
                window.location.href = '/admin/admin-index.html';
            }
        })
        .catch(error => {
            console.error('驗證錯誤:', error);
        });
        return;
    }

    // 只在管理者頁面檢查權限
    if (currentPath.startsWith('/admin/') || currentPath.startsWith('admin/')) {
        fetch('http://localhost:8080/api/members/' + member.memberNo, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('驗證失敗');
            }
            return response.json();
        })
        .then(data => {
            if (data.memberStatus !== 2) {
                alert('您沒有管理者權限');
                window.location.href = '/index.html';
            }
        })
        .catch(error => {
            console.error('驗證錯誤:', error);
            window.location.href = '/login.html';
        });
    }
})();