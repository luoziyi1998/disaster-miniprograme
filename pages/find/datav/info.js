function e(e, t, i, a) {
    var o = t[0], n = function(e) {
        for (var t = [], i = 0; i < e.length; i++) {
            var a = o[e[i].id];
            a && t.push({
                name: e[i].name,
                value: a.concat(e[i].value)
            });
        }
        return t;
    }, s = {
        title: {
            x: "center",
            textStyle: {
                color: "#000",
                fontSize: 15
            }
        },
        geo: {
            map: "china",
            zoom: 1.15,
            label: {
                emphasis: {
                    show: !1
                }
            },
            itemStyle: {
                normal: {
                    areaColor: "transparent",
                    borderColor: "#106ba9"
                },
                emphasis: {
                    areaColor: "#f5f5f5"
                }
            }
        },
            // visualMap: {
            //     min: 3.0,
            //     max: 9.0,
            //     text: ['High', 'Low'],
            //     realtime: false,
            //     calculable: true,
            //     inRange: {
            //         color: ['lightskyblue', 'yellow', 'orangered']
            //     }
            // },
        series: [ {
            name: "3.0-3.9",
            type: "scatter",
            coordinateSystem: "geo",
            data: n(t[1]["3.0-3.9"]),
            symbolSize: 6,
            large: !1,
            largeThreshold: 1e3,
            label: {
                normal: {
                    show: !1
                },
                emphasis: {
                    show: !1
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: "#fff",
                    borderWidth: 1
                },
                normal: {
                    color: "#006eff"
                }
            },
            silent: !0
        }, {
            name: "4.0-4.9",
            type: "scatter",
            coordinateSystem: "geo",
            data: n(t[1]["4.0-4.9"]),
            symbolSize: 6,
            large: !1,
            largeThreshold: 1e3,
            label: {
                normal: {
                    show: !1
                },
                emphasis: {
                    show: !1
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: "#fff",
                    borderWidth: 1
                },
                normal: {
                    color: "#ffc107"
                }
            },
            silent: !0
        }, {
            name: "5.0+",
            type: "scatter",
            coordinateSystem: "geo",
            data: n(t[1]["5.0+"]),
            symbolSize: 6,
            large: !1,
            largeThreshold: 1e3,
            label: {
                normal: {
                    show: !1
                },
                emphasis: {
                    show: !1
                }
            },
            itemStyle: {
                emphasis: {
                    borderColor: "#fff",
                    borderWidth: 1
                },
                normal: {
                    color: "#ff4400"
                }
            },
            silent: !0
        } ]
    };
    e.setOption(s, !0), a.setData({
        eq_statistics: "3.0-3.9级共发生：" + t[2][0] + "次;\t4.0-4.9级共发生：" + t[2][1] + "次;\t5.0级以上地震共发生：" + t[2][2] + "次。"
    });
}

function t(e, t) {
    var i = {
        legend: {
            icon: "circle",
            selectedMode: !1,
            data: [ "3.0-3.9", "4.0-4.9", "5.0+" ],
            textStyle: {
                color: "#000",
                fontSize: 14
            }
        },
        series: [ {
            name: "",
            type: "pie",
            animation: !1,
            clickable: !1,
            hoverAnimation: !1,
            radius: [ "20%", "42%" ],
            center: [ "50%", "55%" ],
            data: t,
            itemStyle: {
                normal: {
                    label: {
                        show: !0,
                        formatter: "{b}级 : \n共{c}个",
                        color: "#000"
                    },
                    labelLine: {
                        show: !0
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            silent: !0
        } ],
        color: [ "#006eff", "#ffc107", "#ff4400" ]
    };
    e.setOption(i, !0);
}

var i = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
    return t.default = e, t;
}(require("../../../pages/dist/ec-canvas/echarts"));

(function(e) {
    e && e.__esModule;
})(require("../../../pages/dist/ec-canvas/china.js")), getApp();

Page({
    data: {
        title: "",
        time: "",
        statistical_info: "",
        eq_distribution: "",
        eq_statistics: "",
        ecChinaMap: {
            lazyLoad: !0
        },
        ecPie: {
            lazyLoad: !0
        }
    },
    onLoad: function(e) {
        var t = decodeURI(decodeURI(e.time));
        this.setData({
            time: t
        });
        var i = e.id;
        "1" === i && this.setData({
            time_slot: "近一月"
        }), "6" === i && this.setData({
            time_slot: "近半年"
        }), "12" === i && this.setData({
            time_slot: "近一年"
        }), this.init_desc(t), this.ChinaMapComponent = this.selectComponent("#china_map"), 
        this.getChinaMapOption(t), this.PieComponent = this.selectComponent("#pie"), this.getPieOption(t);
    },
    onReady: function() {},
    init_desc: function(e) {
        var t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/datav/desc/?time=" + encodeURI(e),
            success: function(e) {
                var i = e.data;
                t.setData({
                    statistical_info: "全国3级以上地震共发生：" + i[0].count + "次，最大地震为：" + i[0].eq + "；全球6级以上地震共发生：" + i[1].count + "次，最大地震为：" + i[1].eq + "。"
                });
                var a = "";
                i[2].forEach(function(e) {
                    a += e[0] + "共发生：" + e[1] + "次；";
                });
                var o = /；$/gi;
                a = a.replace(o, "。"), t.setData({
                    eq_distribution: "全国地震省份排名：" + a
                });
            }
        });
    },
    init_china_map: function(t, a) {
        var o = this;
        this.ChinaMapComponent.init(function(a, n, s) {
            var r = i.init(a, null, {
                width: n,
                height: s
            });
            return e(r, t, 0, o), o.chart = r, r;
        });
    },
    getChinaMapOption: function(e) {
        var t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/datav/eq_base/?time=" + encodeURI(e),
            success: function(i) {
                t.init_china_map(i.data, e);
            }
        });
    },
    init_pie: function(e) {
        var a = this;
        this.PieComponent.init(function(o, n, s) {
            var r = i.init(o, null, {
                width: n,
                height: s
            });
            return t(r, e), a.chart = r, r;
        });
    },
    getPieOption: function(e) {
        var t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/datav/eq_base_pie/?time=" + encodeURI(e),
            success: function(e) {
                t.init_pie(e.data);
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});