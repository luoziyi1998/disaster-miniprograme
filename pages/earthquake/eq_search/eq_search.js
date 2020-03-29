Page({
    data: {
        list: [],
        page: 1,
        limit: 20,
        showLoadMore: !1,
        loadMoreText: "加载中...",
        search: ""
    },
    eq_details: function(a) {
        var t = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/earthquake/out_eq_info/eq_info?eq_id=" + t
        });
    },
    search: function(a) {
        var t = a.detail.value.replace(/(^\s*)|(\s*$)/g, "");
        this.setData({
            loadMoreText: "加载中...",
            showLoadMore: !0
        }), this.setData({
            search: t
        });
        var e = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/earthquake/data.json?search=" + t,
            success: function(a) {
                if (200 == a.statusCode) {
                    var t = a.data.data, o = !0, n = !1, r = void 0;
                    try {
                        for (var i, s = t[Symbol.iterator](); !(o = (i = s.next()).done); o = !0) {
                            var d = i.value;
                            1 === d.magnitude.toString().length && (d.magnitude = d.magnitude + ".0");
                        }
                    } catch (a) {
                        n = !0, r = a;
                    } finally {
                        try {
                            !o && s.return && s.return();
                        } finally {
                            if (n) throw r;
                        }
                    }
                    if (e.setData({
                        list: t
                    }), t.length < e.data.limit) return void e.setData({
                        loadMoreText: "没有更多数据了!"
                    });
                    e.setData({
                        page: e.data.page + 1
                    });
                }
            },
            fail: function(a) {
                e.setData({
                    loadMoreText: "服务器繁忙!"
                });
            }
        });
    },
    onLoad: function(a) {},
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        var a = this, t = this;
        wx.request({
            url: "https://www.earthquakeim.com/system/weixin/earthquake/data.json?search=" + t.data.search + "&page=" + this.data.page,
            success: function(e) {
                if (200 == e.statusCode) {
                    var o = e.data.data;
                    if (a.data.page > e.data.total_page) return void t.setData({
                        loadMoreText: "没有更多数据了!"
                    });
                    t.setData({
                        loadMoreText: "加载中..."
                    });
                }
                var n = !0, r = !1, i = void 0;
                try {
                    for (var s, d = o[Symbol.iterator](); !(n = (s = d.next()).done); n = !0) {
                        var u = s.value;
                        1 === u.magnitude.toString().length && (u.magnitude = u.magnitude + ".0");
                    }
                } catch (a) {
                    r = !0, i = a;
                } finally {
                    try {
                        !n && d.return && d.return();
                    } finally {
                        if (r) throw i;
                    }
                }
                t.setData({
                    list: a.data.list.concat(o),
                    showLoadMore: !0,
                    page: a.data.page + 1
                });
            }
        });
    },
    onShareAppMessage: function() {}
});