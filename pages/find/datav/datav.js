function e(e, t, a, n) {
    var o = t[0], i = function(e) {
        for (var t = [], a = 0; a < e.length; a++) {
            var n = o[e[a].id];
            n && t.push({
                name: e[a].name,
                value: n.concat(e[a].value)
            });
        }
        return t;
    }, r = {
        title: {
            text: "近一年全国地震分布",
            subtext: a,
            x: "center",
            textStyle: {
                color: "#000",
                fontSize: 15
            }
        },
        // legend: {
        //     orient: "vertical",
        //     selectedMode: !1,
        //     y: "top",
        //     x: "left",
        //     left: 10,
        //     data: [ "3.0-3.9", "4.0-4.9", "5.0+" ],
        //     textStyle: {
        //         color: "#000",
        //         fontSize: 14
        //     },
        //     rich: {}
        // },
        geo: [{
            map: "china",
            zoom:1.2,
            roam: true,
            silent: true,
            label: {
                emphasis: {
                    show: !1
                }
            },
            itemStyle: {
                normal: {
                    areaColor: "transparent",
                    borderColor: "#106ba9",
                },
                emphasis: {
                    areaColor: "#f5f5f5"
                }
                
            }
        }],
        visualMap: {
            min: 3.0,
            max: 9.0,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered','red','purple']
            }
        },
        series: [ {
            name: "3.0-3.9",
            type: "scatter",
            coordinateSystem: "geo",
            data: i(t[1]["3.0-3.9"]),
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
            data: i(t[1]["4.0-4.9"]),
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
            data: i(t[1]["5.0+"]),
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
    e.setOption(r, !0), n.setData({
        eq_statistics: "3.0-3.9级共发生：" + t[2][0] + "次;\t4.0-4.9级共发生：" + t[2][1] + "次;\t5.0级以上地震共发生：" + t[2][2] + "次。"
    });
}

var t = function(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (null != e) for (var a in e) Object.prototype.hasOwnProperty.call(e, a) && (t[a] = e[a]);
    return t.default = e, t;
}(require("../../../pages/dist/ec-canvas/echarts"));

(function(e) {
    e && e.__esModule;
})(require("../../../pages/dist/ec-canvas/china.js")), getApp();

Page({
    data: {
        times: [],
        timeIndex: 0,
        ecChinaMap: {
            lazyLoad: !0
        },
        eq_statistics: ""
    },
    bindTimeChange: function(e) {
        var t = void 0;
        "0" === e.detail.value && (t = this.getTime(1)), "1" === e.detail.value && (t = this.getTime(6)), 
        "2" === e.detail.value && (t = this.getTime(12)), this.getChinaMapOption(t), this.setData({
            timeIndex: e.detail.value
        });
    },
    info: function(e) {
        var t = e.currentTarget.dataset.id, a = this.getTime(parseInt(t));
        wx.navigateTo({
            url: "/pages/find/datav/info?id=" + t + "&time=" + encodeURI(a)
        });
    },
    onLoad: function(e) {
        this.setData({
            times: [ this.getTime(1), "[半年]" + this.getTime(6), "[一年]" + this.getTime(12) ]
        });
    },
    onReady: function() {
        this.ChinaMapComponent = this.selectComponent("#china_map");
        var e = this.getTime(12);
        this.getChinaMapOption(e);
    },
    init_china_map: function(a, n) {
        var o = this;
        this.ChinaMapComponent.init(function(i, r, s) {
            var l = t.init(i, null, {
                width: r,
                height: s
            });
            return e(l, a, n, o), o.chart = l, l;
        });
    },
    getChinaMapOption: function(e) {
        var t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/datav/eq_base/?time=" + encodeURI(e),
            success: function(a) {
                console.log(1), console.log(a), t.init_china_map(a.data, e);
            }
        });
    },
    getTime: function(e) {
        var t = void 0, a = new Date();
        return 1 === e && (t = a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月1日 - " + a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月" + a.getDate() + "日"), 
        6 === e && (t = a.getMonth() <= 4 ? a.getFullYear() - 1 + "年" + parseInt(a.getMonth() + 8) + "月 - " + a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月" : a.getFullYear() + "年" + parseInt(a.getMonth() - 4) + "月 - " + a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月"), 
        12 === e && (t = a.getMonth() <= 10 ? a.getFullYear() - 1 + "年" + parseInt(a.getMonth() + 2) + "月 - " + a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月" : a.getFullYear() + "年1月 - " + a.getFullYear() + "年" + parseInt(a.getMonth() + 1) + "月"), 
        t;
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});