Page({
    data: {
        list: [],
        page: 1,
        limit: 20,
        showLoadMore: !1,
        loadMoreText: "加载中...",
        nodata: !1
    },
    init_eqs: function() {
        var t = this, a = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/earthquake/data.json",
            success: function(t) {
                var e = t.data.data, n = !0, i = !1, o = void 0;
                try {
                    for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done); n = !0) {
                        var u = r.value;
                        1 === u.magnitude.toString().length && (u.magnitude = u.magnitude + ".0");
                    }
                } catch (t) {
                    i = !0, o = t;
                } finally {
                    try {
                        !n && s.return && s.return();
                    } finally {
                        if (i) throw o;
                    }
                }
                wx.setStorage({
                    key: "init_eqs",
                    data: e
                }), a.setData({
                    list: e,
                    page: 2,
                    loadMoreText: "加载中..."
                });
            },
            fail: function(a) {
                wx.getStorage({
                    key: "init_eqs",
                    success: function(a) {
                        var e = !0, n = !1, i = void 0;
                        try {
                            for (var o, r = a.data[Symbol.iterator](); !(e = (o = r.next()).done); e = !0) {
                                var s = o.value;
                                1 === s.magnitude.toString().length && (s.magnitude = s.magnitude + ".0");
                            }
                        } catch (t) {
                            n = !0, i = t;
                        } finally {
                            try {
                                !e && r.return && r.return();
                            } finally {
                                if (n) throw i;
                            }
                        }
                        t.setData({
                            list: a.data,
                            page: 2
                        });
                    },
                    fail: function(a) {
                        wx.showToast({
                            title: "服务器繁忙",
                            icon: "none"
                        }), t.setData({
                            nodata: !0
                        });
                    }
                });
            }
        });
    },
    eq_details: function(t) {
        var a = t.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/earthquake/out_eq_info/eq_info?eq_id=" + a
        });
    },
    eq_search: function() {
        wx.navigateTo({
            url: "/pages/earthquake/eq_search/eq_search"
        });
        // 跳转到搜索界面
    },
    onLoad: function(t) {
        this.init_eqs(), t.eq_id && setTimeout(function() {
            wx.navigateTo({
                url: "/pages/earthquake/out_eq_info/eq_info?eq_id=" + t.eq_id
            });
        }, 800);
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {
        var t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/earthquake/data.json",
            success: function(a) {
                var e = a.data.data, n = !0, i = !1, o = void 0;
                try {
                    for (var r, s = e[Symbol.iterator](); !(n = (r = s.next()).done); n = !0) {
                        var u = r.value;
                        1 === u.magnitude.toString().length && (u.magnitude = u.magnitude + ".0");
                    }
                } catch (t) {
                    i = !0, o = t;
                } finally {
                    try {
                        !n && s.return && s.return();
                    } finally {
                        if (i) throw o;
                    }
                }
                wx.setStorage({
                    key: "init_eqs",
                    data: e
                }), t.setData({
                    list: e,
                    page: 2,
                    loadMoreText: "加载中..."
                }), wx.stopPullDownRefresh(), wx.showToast({
                    title: "刷新成功",
                    duration: 1500
                });
            },
            fail: function(t) {
                wx.stopPullDownRefresh(), wx.showToast({
                    title: "服务器繁忙",
                    icon: "none"
                });
            }
        });
    },
    onReachBottom: function() {
        var t = this, a = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/earthquake/data.json?page=" + this.data.page,
            success: function(e) {
                if (200 == e.statusCode) {
                    var n = e.data.data;
                    if (t.data.page > e.data.total_page) return void a.setData({
                        loadMoreText: "没有更多数据了!"
                    });
                    a.setData({
                        loadMoreText: "加载中..."
                    });
                }
                var i = !0, o = !1, r = void 0;
                try {
                    for (var s, u = n[Symbol.iterator](); !(i = (s = u.next()).done); i = !0) {
                        var d = s.value;
                        1 === d.magnitude.toString().length && (d.magnitude = d.magnitude + ".0");
                    }
                } catch (t) {
                    o = !0, r = t;
                } finally {
                    try {
                        !i && u.return && u.return();
                    } finally {
                        if (o) throw r;
                    }
                }
                a.setData({
                    list: t.data.list.concat(n),
                    showLoadMore: !0,
                    page: t.data.page + 1
                });
            }
        });
    },
    onShareAppMessage: function() {}
});