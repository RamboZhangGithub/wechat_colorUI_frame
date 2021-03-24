//全局存储﻿
var event = {};

//接收消息 传入params={name:"string 监听事件名",success:"function 监听事件回调",tg:"当前页面或App.js  传入this即可"}
const $on = function (params) {
  if (!params) {
    return false;
  }
  if (!params.name) {
    console.error("事件监听未设置名称 属性key=name");
    return false;
  }
  if (!params.success) {
    console.error("事件监听未设置回调函数 属性key=success");
    return false;
  }
  if (!params.tg) {
    console.error("事件监听未设置目标对象   属性key=tg");
    return false;
  }
  if (event[params.name]) {
    var list = event[params.name];
    list.push([params.tg, params.success]);
  } else {
    event[params.name] = [
      [params.tg, params.success]
    ];
  }
  pageStatus(params.tg);
}
//消息发送 传入{name:"string 发送消息事件名",data:"可选  可以是任意数据类型"}
const $emit = function (params) {
  if (!params) {
    return false;
  }
  if (!params.name) {
    console.error("事件监听未设置名称 属性key=name");
    return false;
  }
  if (event[params.name]) {
    var list = event[params.name];
    list.forEach(item => {
      item[1].call(item[0], params.data);
    })
  }
}

//移除监听  传入params={name:"string 监听事件名",tg:"当前页面或App.js  传入this即可"}
//如未移除监听  页面onUnload时将会自动移除 

const $remove = function (params) {
  if (!params) {
    return false;
  }
  if (!params.tg) {
    console.error("事件监听未设置目标对象   属性key=tg");
    return false;
  }

  if (params.name && event[params.name]) {
    event[params.name] = event[params.name].filter(a => {
      return a[0] != params.tg;
    })
  } else {
    for (let key in event) {
      event[key] = event[key].filter(a => {
        return a[0] != params.tg;
      })
    }
  }
}

//页面onUnload触发监听
const pageStatus = function (self) {
  if (self["onUnload"]) {
    var s = self["onUnload"];
    self["onUnload"] = function (a) {
      s.call(this, a);
      $remove({
        tg: this
      });
    }
  } else {
    self["onUnload"] = function () {
      $remove({
        tg: this
      });
    }
  }
}

exports.$on = $on;
exports.$emit = $emit;
exports.$remove = $remove;