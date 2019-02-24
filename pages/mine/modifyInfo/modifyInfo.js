// pages/modifyInfo/modifyInfo.js
const mine = require('../../../server/mine.js');
const util = require('../../../utils/utils.js');
Page({
  data: {
    unselect:'https://www.beishuibao.com/web_pic/program/icon_unselect.png',
    select: 'https://www.beishuibao.com/web_pic/program/icon_select.png',
    radioValues: [
      { 'value': '男', 'selected': true },
      { 'value': '女', 'selected': false }
    ],
    nameERR:false,
    phoneERR:false,
    idERR:false,
    emailERR:false,
    // 表单信息
    info_radio:0,
    info_name:'',
    info_tel:'',
    info_idcard:'',
    info_email:''
  },
  onLoad: function () {
    var that = this;
    var info = wx.getStorageSync('USERINFO');
    console.log(info)
    var params = {
      token: wx.getStorageSync('TOKEN'),
      mobile: info.mobile // 手机号
    }
    mine.getmodifyInfo(params, function (data) {
      console.log(data.id)
      that.setData({
        info_radio: data.sex == 'n' ? 0 : 1,
        info_name: data.name,
        info_tel: data.mobile,
        info_idcard: data.ic_card,
        info_email: data.email
      })
    })
  },
  // 切换radio
  changeRadio(e){
    var index = e.currentTarget.dataset.radio;
    var arr = this.data.radioValues;
    for (var v in arr) {
      if (v == index) {
        arr[v].selected = true;
      } else {
        arr[v].selected = false;
      }
    }
    this.setData({
      radioValues: arr,
      info_radio:index
    })
  },
  // 姓名输入框获取
  fullNameFunc:function (e) {
    this.setData({
      info_name: e.detail.value,
      nameERR: false
    })
  },
  delname(){
    this.setData({
      info_name:''
    })
  },
  // 手机号输入框获取
  mobileFunc:function (e){
    this.setData({
      info_tel: e.detail.value,
      phoneERR: false
    })
  },
  // 清空手机号
  delTel(){
    this.setData({
      info_tel: ''
    })
  },
  // 身份证号获取
  cardFunc(e){
    this.setData({
      info_idcard: e.detail.value,
      idERR: false
    })
  },
  // 身份证号清空
  delIDcard(){
    this.setData({
      info_idcard: ''
    })
  },
  // 邮箱获取
  emailFunc(e){
    this.setData({
      info_email: e.detail.value,
      emailERR: false
    })
  },
  // 邮箱清空
  delEmail(){
    this.setData({
      info_email: ''
    })
  },
  submit(){
    var that = this;

    if (!that.data.info_name){
      that.setData({
        nameERR: true
      })
      return;
    }
    if (!that.data.info_tel){
      that.setData({
        phoneERR: true
      })
      return;
    }
    if (!that.data.info_idcard) {
      that.setData({
        idERR: true
      })
      return;
    }
    if (!that.data.info_email) {
      that.setData({
        emailERR: true
      })
      return;
    }
    var params = {
      token: wx.getStorageSync('TOKEN'),
      name: that.data.info_name,
      mobile: that.data.info_tel,// 手机号
      ic_card: that.data.info_idcard,// 证件号
      email: that.data.info_email,// 邮箱
      sex: that.data.info_radio == 0 ? 'n' : 'f' // f:女，n：男
    }
    console.log(params)
    mine.modifyInfo(params, function (data) {
      console.log(data)
      util.toast("修改信息成功！", "none", 2000);
    })
  }
})