// const { lazyrouter } = require("express/lib/application")
// const { format } = require("express/lib/response")

$(function () {
    let form = layui.form
    let layer = layui.layer

    let $image = $('#image')
    // 2. 裁剪选项
    let options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    initCate()
    // 初始化富文本编辑器
    initEditor()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('初始化文章失败！')
                }
                // 调用模板引擎，渲染分类下拉菜单
                let htmlStr = template('tpl-id', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })
    // 监听coverFile事件 绑定change事件
    $('#coverFile').on('change', function (e) {
        let files = e.target.files
        // 判断是否选择了文件
        if (files.length === 0) {
            return
        }
        let newImgURL = URL.createObjectURL(files[0])
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 定义文章状态
    let art_state = '已发布'
    //为草稿按钮，绑定点击事件处理函数
    $('#btnSave2').on('click', function (e) {
        art_state = '草稿'
    })

    //为表单绑定submit提交事件处理函数
    $('#form-pub').on('submit', function (e) {
        e.preventDefault()
        let fd = new FormData($(this)[0])
        fd.append('state', art_state)
        //将封面才建国后的图片转化为文件对象
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)

            })
           


    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                location.href = '/coded/article/art_list.html'
            }
      })
    }


    
})  