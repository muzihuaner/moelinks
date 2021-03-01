jconfirm.defaults = {
    backgroundDismiss: true
}

var isEdit = false;
var addAddid = 0;
var akey = null;


$(document).ready(function (){

    new Fingerprint2().get(function(result, components){
      
      akey = result;
      console.log("%cAesma.cn"," text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb,0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1),0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em")
      console.log("Browser id: " + result);
      console.log("您的首页自定义数据都将保存在此id上, 如果更换浏览器请联系客服迁移!");
      getAdmin(result);
      
    });

});


// auList
// customize


function getAdmin(key){
    $.ajax({
        url: '/index/index/getList',
        type: 'POST',
        data: {
            key: key
        },
        success: function(data){
            isEdit = data.isEdit
            var html = "";
            $.each(data.sys_customize, function (key, value){
                html += '<div class="nicon" id="' + value.id + '"><a href="' + value.url + '" target="_blank"><div class="naicon btn btn-raised" data-ed="false" data-tid="0" data-title="' + value.title + '" data-url="' + value.url + '"><img src="images/' + value.ico + '"></div></a><p>' + value.title + '</p></div>';
            });
            $.each(data.customize, function (key, value){
                html += '<div class="nicon" id="' + value.id + '"><a href="' + value.url + '" target="_blank"><div class="naicon btn btn-raised" data-ed="true" data-tid="0" data-title="' + value.title + '" data-url="' + value.url + '"><img src="images/' + value.ico + '"></div></a><p>' + value.title + '</p></div>';
            });
            // console.log(html);
            $(".auList").html(html);
            
            $.material.init();
            
            
            if (data.isEdit){
                $(".orAdd").each(function (key, value){
                    $(value).show();
                });
                $('.tools').show();
            }
            
        }
    });
}

function addopEdit(index){
    addAddid = index;
    opEdit();
}



var crop_base = null;




            $(document).on("focus", ".form-control, .form-group.is-fileinput",
            function() {
                $(this).prop("disabled") || $(this).closest(".form-group").addClass("is-focused")
            }).on("blur", ".form-control, .form-group.is-fileinput",
            function() {
                $(this).closest(".form-group").removeClass("is-focused")
            }).on("change", ".form-group.is-fileinput input[type='file']",
                function() {
                    // var pc = new PhotoClip('#clipArea');
//                     var pc = new PhotoClip('#clipArea', {
// 		size: 260,
// 		outputSize: 640,
// 		//adaptive: ['60%', '80%'],
// 		file: '#file',
// 		view: '#view',
// 		ok: '#clipBtn',
// 		//img: 'img/mm.jpg',
// 		loadStart: function() {
// 			console.log('开始读取照片');
// 		},
// 		loadComplete: function() {
// 			console.log('照片读取完成');
// 		},
// 		done: function(dataURL) {
// 			console.log(dataURL);
// 		},
// 		fail: function(msg) {
// 			alert(msg);
// 		}
// 	});
                    var bc = $(this),
                    c = bc.closest(".form-group"),
                    d = "";
                    // console.log(this)
                    // console.log(pc);
                    // pc.load(this.files[0]);
                    $.each(this.files,
                    function(a, b) {
                        
                        // var pc = new PhotoClip('#clipArea');
                        // $(".upIco").on('change', function() {
                            // pc.load(this.files[0]);
                        // });
                        
                        // if (b.size > 1024 * 100){
                        //     bc.val("")
                        //     $.alert({
                        //         type: 'red',
                        //         title: '错误!',
                        //         content: '文件大小不可超过100KB!',
                        //         buttons: {
                        //             cancel: {
                        //                 text: "好的"
                        //             }
                        //         }
                        //     });
                        //     return false;
                        // }
                        d += b.name + ", "
                    }),
                    d = d.substring(0, d.length - 2),
                    d ? c.removeClass("is-empty") : c.addClass("is-empty");
                    
                    
                    var _this = this;
                    
                    
                    var pc = null;
                    $.confirm({
                        type: 'blue',
                        title: "编辑图片",
                        content: '<div id="clipArea"></div>',
                        onContentReady: function () {
                            var __t = this;
                            crop_base = null;
                            if (pc == null){
                                pc = new PhotoClip('#clipArea', {
                        		size: 260,
                        		outputSize: 200,
                        		outputQuality: 0.8,
                        		//adaptive: ['60%', '80%'],
                        // 		file: '#file',
                        // 		view: '#view',
                        // 		ok: '#clipBtn',
                        		//img: 'img/mm.jpg',
                        		loadStart: function() {
                        // 			console.log('开始读取照片');
                        		},
                        		loadComplete: function() {
                        // 			console.log('照片读取完成');
                        		},
                        		done: function(dataURL) {
                        			
                        			crop_base = dataURL;
                        			__t.close();
                        		},
                        		fail: function(msg) {
                        // 			alert(msg);
                                    $.alert({
                                        type: 'red',
                                        title: '错误!',
                                        content: msg,
                                        buttons: {
                                            cancel: {
                                                text: "好的"
                                            }
                                        }
                                    });
                        		}
                        	});
                            }
                            
                        	pc.load(_this.files[0]);
                        },
                        buttons: {
                            confirm: {
                                text: "截取",
                                btnClass: 'btn-blue',
                                action: function (){
                                    pc.clip();
                                    return false;
                                }
                            },
                            canel: {
                                text: "取消",
                            }
                        },
                        onClose: function () {
                            // before the modal is hidden.
                            // alert('onClose');
                            if (crop_base === null){
                                $('input[name=ico]').val("")
                                c.find(".file-name").html("")
                            } else {
                                c.find(".file-name").html(d)
                            }
                        }
                    });
                    
                    
                    
                    
                    
                    
                    
                    
                })





function opEdit(title, url, id, tid){
    crop_base = null;
    var t = "", isAdd, cid = 0, txid = 0;
    if (typeof title != "undefined"){
        t = "编辑图标导航";
        isAdd = false;
    } else {
        t = "添加图标导航";
        isAdd = true;
    }
    if (typeof id != "undefined"){
        cid = id;
    }
    if (typeof tid != "undefined"){
        txid = tid;
    }
    if (addAddid != 0){
        txid = addAddid;
    }
    $.confirm({
        type: 'blue',
        title: t,
        content: 'url:/Index/Index/editcall.html',
        onContentReady: function () {
            // when content is fetched & rendered in DOM
            // alert('onContentReady');
            // var self = this;
            // this.buttons.ok.disable();
            // this.$content.find('.btn').click(function(){
            //     self.$content.find('input').val('Chuck norris');
            //     self.buttons.ok.enable();
            // });
            
            
            // var d = this.options.validate;

            
            // if (typeof url != "undefined"){
            //     $("#input-url").focus();
            //     $("#input-url").val(url);
            // }
            // if (typeof title != "undefined"){
            //     $("#input-name").focus();
            //     $("#input-name").val(title);
            // }
            // $("#input-name").val(title);
            // console.log(title);
            
            //-=-----------------------------

            
            if (typeof url != "undefined"){
            //     $("#input-url").focus();
                $("#input-url").val(url);
            }
            if (typeof title != "undefined"){
            //     $("#input-name").focus();
                $("#input-name").val(title);
            }
            
        },
        contentLoaded: function(data, status, xhr){
            // when content is fetched
            // alert('contentLoaded: ' + status);
        },
        onOpenBefore: function () {
            // before the modal is displayed.
            // alert('onOpenBefore');
        },
        onOpen: function () {
            // after the modal is displayed.
            // alert('onOpen');
            
            
            
        },
        onClose: function () {
            // before the modal is hidden.
            // alert('onClose');
        },
        onDestroy: function () {
            // when the modal is removed from DOM
            // alert('onDestroy');
        },
        onAction: function (btnName) {
            // when a button is clicked, with the button name
            // alert('onAction: ' + btnName);
            // console.log(this.$content.find('.btn'))
        },
        buttons: {
            confirm: {
                text: "保存",
                btnClass: 'btn-blue',
                action: function(){
                    // console.log(crop_base);
                    if (isAdd && this.$content.find('input[type=file]').val() == ""){
                        $.alert({
                            title: '错误!',
                            type: 'red',
                            content: '请上传图标!',
                            buttons: {
                                cancel: {
                                    text: "好的"
                                }
                            }
                        });
                    } else if (this.$content.find('#input-name').val() == ""){
                        $.alert({
                            title: '错误!',
                            type: 'red',
                            content: '请输入站点标题!',
                            buttons: {
                                cancel: {
                                    text: "好的"
                                }
                            }
                        });
                    } else if (this.$content.find('#input-url').val() == ""){
                        $.alert({
                            title: '错误!',
                            type: 'red',
                            content: '请输入站点链接!',
                            buttons: {
                                cancel: {
                                    text: "好的"
                                }
                            }
                        });
                    } else if (!isURL(this.$content.find('#input-url').val())){
                        $.alert({
                            title: '错误!',
                            type: 'red',
                            content: '站点链接格式错误!',
                            buttons: {
                                cancel: {
                                    text: "好的"
                                }
                            }
                        });
                    } else {
                        // $('#formup')[0]
                        // this.$content.find('input[type=file]').val("")
                        console.log(cid);
                        var data = new FormData();
                        data.append("title", $('#input-name').val());
                        data.append("url", $('#input-url').val());
                        data.append("type", txid);
                        data.append("key", akey);
                        data.append("cid", cid);
                        data.append("ico_base64", crop_base);
                        $.ajax({
                            url: "/index/index/addIco",
                            type: "POST",
                            data: data,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function(data) {
                                $.alert({
                                    title: data.errno == 1? '错误!': '成功!',
                                    type: data.errno == 1? 'red': 'green',
                                    content: data.info,
                                    buttons: {
                                        cancel: {
                                            text: "关闭并刷新",
                                            action: function (){
                                                location.reload()
                                            }
                                        }
                                    }
                                });
                            },
                            error:function(e){
                                alert("错误！！");
                            }
                        }); 
                        return true;
                    }

                    
                    return false;
                }
            },
            canel: {
                text: "取消",
            }
        }
    });
}

function delIco(tid, cid){
    $.ajax({
        url: '/index/index/delIco',
        type: 'POST',
        data: {
            key: akey,
            cid: cid,
            tid: tid
        },
        success: function(data){
            $.alert({
                title: data.errno == 1? '错误!': '成功!',
                type: data.errno == 1? 'red': 'green',
                content: data.info,
                buttons: {
                    cancel: {
                        text: "关闭并刷新",
                        action: function (){
                            location.reload()
                        }
                    }
                }
            });
        }
    });
}

function editBlock(tid, title){
    $.confirm({
        type: 'blue',
        title: "编辑分类标题",
        content: '<div class="form-group label-floating"><label class="control-label">分类标题</label><input type="text" id="block-name" class="form-control input-max" name="title" value="' + title + '"></div>',
        onContentReady: function () {
            
        },
        buttons: {
            confirm: {
                text: "保存",
                btnClass: 'btn-blue',
                action: function (){

                    
                    $.ajax({
                        url: '/index/index/editBlock',
                        type: 'POST',
                        data: {
                            key: akey,
                            tid: tid,
                            title: this.$content.find('.form-control').val()
                        },
                        success: function(data){
                            $.alert({
                                title: data.errno == 1? '错误!': '成功!',
                                type: data.errno == 1? 'red': 'green',
                                content: data.info,
                                buttons: {
                                    cancel: {
                                        text: "关闭并刷新",
                                        action: function (){
                                            location.reload()
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            },
            canel: {
                text: "取消",
            }
        }
    });
    
}

function delBlock(tid){
    $.confirm({
        type: 'red',
        title: "删除分类",
        content: '删除分类后将清空分类全部图标!',
        buttons: {
            confirm: {
                text: "确认删除",
                btnClass: 'btn-red',
                action: function (){
                    $.ajax({
                        url: '/index/index/delBlock',
                        type: 'POST',
                        data: {
                            key: akey,
                            tid: tid
                        },
                        success: function(data){
                            $.alert({
                                title: data.errno == 1? '错误!': '成功!',
                                type: data.errno == 1? 'red': 'green',
                                content: data.info,
                                buttons: {
                                    cancel: {
                                        text: "关闭并刷新",
                                        action: function (){
                                            location.reload()
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            },
            canel: {
                text: "取消",
            }
        }
    });
}


function upAddBlock(tid){
    addBlock(tid, 0);
}

function downAddBlock(tid){
    addBlock(tid, 1);
}

function addBlock(tid, dire){
    $.confirm({
        type: 'blue',
        title: "添加分类",
        content: '是否向该分类' + (dire == 0? "上方": "下方") + '添加一个新分类!',
        buttons: {
            confirm: {
                text: "确定",
                btnClass: 'btn-blue',
                action: function (){

                    $.confirm({
                        type: 'blue',
                        title: "添加分类",
                        content: '<div class="form-group label-floating"><label class="control-label">分类标题</label><input type="text" id="block-name" class="form-control input-max" name="title" value=""></div>',
                        onContentReady: function () {
                            
                        },
                        buttons: {
                            confirm: {
                                text: "保存",
                                btnClass: 'btn-blue',
                                action: function (){
                
                                    
                                    $.ajax({
                                        url: '/index/index/addBlock',
                                        type: 'POST',
                                        data: {
                                            key: akey,
                                            tid: tid,
                                            title: this.$content.find('.form-control').val(),
                                            dire: dire
                                        },
                                        success: function(data){
                                            $.alert({
                                                title: data.errno == 1? '错误!': '成功!',
                                                type: data.errno == 1? 'red': 'green',
                                                content: data.info,
                                                buttons: {
                                                    cancel: {
                                                        text: "关闭并刷新",
                                                        action: function (){
                                                            location.reload()
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                            },
                            canel: {
                                text: "取消",
                            }
                        }
                    });
                    
                }
            },
            canel: {
                text: "取消",
            }
        }
    });
}

function addFriends(){
    $.confirm({
        type: 'blue',
        title: "添加友情链接",
        content: '<div class="form-group label-floating"><label class="control-label">链接标题</label><input type="text" id="friend-name" class="form-control input-max" name="title" value=""></div><div class="form-group label-floating"><label class="control-label">链接介绍</label><input type="text" id="friend-title" class="form-control input-max" name="title" value=""></div><div class="form-group label-floating"><label class="control-label">链接地址</label><input type="text" id="friend-url" class="form-control input-max" name="title" value=""></div>',
        onContentReady: function () {
            
        },
        buttons: {
            confirm: {
                text: "保存",
                btnClass: 'btn-blue',
                action: function (){

                    
                    $.ajax({
                        url: '/index/index/addFriends',
                        type: 'POST',
                        data: {
                            key: akey,
                            name: this.$content.find('#friend-name').val(),
                            title: this.$content.find('#friend-title').val(),
                            url: this.$content.find('#friend-url').val()
                        },
                        success: function(data){
                            $.alert({
                                title: data.errno == 1? '错误!': '成功!',
                                type: data.errno == 1? 'red': 'green',
                                content: data.info,
                                buttons: {
                                    cancel: {
                                        text: "关闭并刷新",
                                        action: function (){
                                            location.reload()
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            },
            canel: {
                text: "取消",
            }
        }
    });
}

function isURL(str_url) {
    return true;
    var strRegex = "^((https|http|ftp|rtsp|mms)://)"
    + "(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" // ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var re = new RegExp(strRegex);
    return re.test(str_url);
}



var dtimeout = 0;
$(document).on('mousedown', '.fri-url', function(e, x){
    dtimeout = setTimeout(function() {
        if (!isEdit){
            return;
        }
        $.confirm({
            type: 'red',
            title: "删除该链接",
            content: '删除后将无法恢复!',
            buttons: {
                confirm: {
                    text: "确认删除",
                    btnClass: 'btn-red',
                    action: function (){
                        $.ajax({
                            url: '/index/index/delFriend',
                            type: 'POST',
                            data: {
                                key: akey,
                                fid: $(e.currentTarget).parent().attr('id')
                            },
                            success: function(data){
                                $.alert({
                                    title: data.errno == 1? '错误!': '成功!',
                                    type: data.errno == 1? 'red': 'green',
                                    content: data.info,
                                    buttons: {
                                        cancel: {
                                            text: "关闭并刷新",
                                            action: function (){
                                                location.reload()
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
                canel: {
                    text: "取消",
                }
            }
        });
        
        
    }, 1000);
}).mouseup(function() {
    clearTimeout(dtimeout);
}).mouseout(function() {
    clearTimeout(dtimeout);
});


$(".tools-1").click(function (){
        upT(1, '图1');
    });
    $(".tools-2").click(function (){
        upT(2, '图2');
    });
    $(".tools-3").click(function (){
        upT(3, '图3');
    });
    
    function upT(ii, tt){
        $.confirm({
            type: 'blue',
            title: tt,
            content: '<div class="form-group is-fileinput"><label class="control-label">点击上传站点图标</label><input type="file" class="form-control" accept="image/*" name="ico"><span class="file-name"></span></div>',
            onContentReady: function () {
                
            },
            buttons: {
                confirm: {
                    text: "保存",
                    btnClass: 'btn-blue',
                    action: function (){
                        $.alert({
                            title: '上传中',
                            content: '请稍等',
                            buttons: {
                                cancel: {
                                    text: "关闭"
                                }
                            }
                        });
                        var fd = new FormData();
                        fd.append('key', akey)
                        fd.append('sid', ii)
                        fd.append('img', this.$content.find('input[type=file]')[0].files[0]);
                        $.ajax({
                            url: '/index/index/upT',
                            type: 'POST',
                            data: fd,
                            cache: false,
                            contentType: false,
                            processData: false,
                            success: function(data){
                                $.alert({
                                    title: data.errno == 1? '错误!': '成功!',
                                    type: data.errno == 1? 'red': 'green',
                                    content: data.info,
                                    buttons: {
                                        cancel: {
                                            text: "关闭并刷新",
                                            action: function (){
                                                location.reload()
                                            }
                                        }
                                    }
                                });
                            }
                        });
                    }
                },
                canel: {
                    text: "取消",
                }
            }
        });
    }