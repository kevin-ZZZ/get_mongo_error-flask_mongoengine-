/**
 * Created by python on 17-12-27.
 */
        $(function () {

            // 绑定按钮的点击事件，发出ajax请求
            $("#query").click(function () {

//                在发送ajax请求之前先初始化
                $("#extend_ul").empty()
                $("#err_remind").hide();
                $("#err_remind").empty();

//                直接在前台判断股票代码是否为空
                var stockcode = $("#stockcode").val();
                if (!stockcode) {
                    show_error("股票代码为空")
                    return
                }

//                直接在前台判断输入字段是否为空
                var field = $("#field").val();
                if (!field) {
                    show_error("字段为空")
                    return
                }

                var array1 = [];
                array1 = stockcode.split(",");
                console.log(stockcode);
                console.log(field);
                for (i = 0; i < array1.length; i++) {

                    ajax_request(array1[i], field);

                }


            })

            // 封装ajax函数与动态加载h5标签为函数，方便调用
            var ajax_request = function (skd, field) {
                $.ajax({
                    type: 'POST',
                    url: "/index2/",
                    dataType: "json",
                    data: {"skd": skd, "field": field},
                    success: function (info) {
                        alert("请求成功！");
                        if (info.code == "3") {
                            show_error("数据上传失败")
                        } else if (info.code == "0") {
                            alert("输入字段存在问题!")
                            show_error(info.show)
                        }
                        else if (info.code == "1") {
                            show_error("发现有" + info.count + "个null值")
                            add(info, skd, field);
                        }
                        else if (info.code == "2") {
                            show_error("未发现空字段")
                        }
                    },
                    error: function () {
                        alert('请求失败,请从新查询！');
                    },
                });
            }

            var show_error = function (message) {
                var msg = "<span>" + message + "</span>";
                $("#err_remind").show();
                $("#err_remind").append(msg)
            }
//            动态添加返回的内容

            var add = function (info, skd, field) {


                var label = ""
                for (var i = 0; i < info.context.length; i++) {
                    label = "<li><div><span>股票代码：</span><span>" + info.context[i].innerCode +
                        "</span></div><div><span>" + field
                        + ":" + "</span><span>info.context[i].trade_date</span></div>"
                        + "<div><span>trade_date:</span><span>" + info.context[i].trade_date
                        + "</span></div>" + "</li><br/>";
                    $("#extend_ul").append(label);
                }

            }

        })
