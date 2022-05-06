$(function () {
    //调取这个函数获取用户基本信息
    getUserInfo()
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('Whether or not to withdraw from?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
             location.href = '/coded/login.html'

            layer.close(index)
            console.log('ok');
        });
    })
})

function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败！')
            }
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     // console.log('执行了 complete回调');
        //     // console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/coded/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    let name = user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp;${name}`)
    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar')
            .hide()

    } else {
        $('.layui-nav-img')
            .hide()
        let first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}