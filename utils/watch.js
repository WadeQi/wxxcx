function observe(obj, key, watchFun, deep, page) {
  let val = obj[key];
  console.log(obj[key])
  if (val != null && typeof val === "object" && deep) {
    Object.keys(val).forEach((item) => {
      observe(val, item, watchFun, deep, page);
    });
  }

  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      // console.log(page,value,val)
      watchFun.call(page,value, val);
      val = value;

      if (deep) {
        observe(obj, key, watchFun, deep, page);
      }
    },
    get: function () {
      // console.log(val)
      return val;
    }
  });
}

export function setWatcher(page) {
  let data = page.data;
  let watch = page.watch;
  // console.log(Object.keys(watch))
  Object.keys(watch).forEach((item) => {
    let targetData = data;
    let keys = item.split(".");
    // console.log(keys)
    for (let i = 0; i < keys.length - 1; i++) {
      targetData = targetData[keys[i]];
      // console.log(targetData)
    }

    let targetKey = keys[keys.length - 1];
    // console.log(keys)
    let watchFun = watch[item].handler || watch[item];
    // console.log(targetData, targetKey, watchFun, deep, page)
    let deep = watch[item].deep;
    observe(targetData, targetKey, watchFun, deep, page);
  });
}