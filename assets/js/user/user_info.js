$(function () {
    let form = layui.form
    let layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度必须在6个以内"
            }
        }
    })
    initUserInfo()

    // 初始化用户的基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }   
                layer.msg('更新用户信息成功！')
               window.parent.getUserInfo()   
            }
        })
    })
})