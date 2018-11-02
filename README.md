# 常用工具函数

### insideView

判断元素是否在视野内

```js
function insideView(el) {
    let rect = el.getBoundingClientRect();

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        return true;
    }
    return false;
}

insideView(document.body);
```

### deepClone

深拷贝

- 支持数组
- 支持多个target

```js
function deepClone(source, ...targets) {
    let target = targets.shift();

    if (!source) {
        if (typeof target == 'object' && target instanceof Array == true) {
            source = [];
        } else {
            source = {};
        }
    }

    if (target) {
        for (let key in target) {
            let val = target[key];

            if (typeof val == 'object') {
                source[key] = deepClone(source[key], val);
            } else if (val !== undefined) {
                source[key] = val;
            }
        }
        return deepClone(source, ...targets);
    }

    return source
}

deepClone({}, {a: 1});
deepClone({}, {a: 1}, {b: 2});
deepClone([], [1]);
deepClone([], [1], [2]);
```

## scroll（滚动）

### getScrollTop

获取元素的scrollTop

```js
function getScrollTop (el = window) {
    const globalObj = [document, window, document.documentElement, document.body];
    if (globalObj.indexOf(el) === -1) return el.scrollTop;
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

getScrollTop();
getScrollTop(document.querySelector('div'));
```

### setScrollTop

设置元素的scrollTop

```js
function setScrollTop (top, el = window) {
    const globalObj = [document, window, document.documentElement, document.body];
    if (globalObj.indexOf(el) === -1) return el.scrollTop = top;
    document.documentElement.scrollTop = document.body.scrollTop = top;
}

setScrollTop(0);
setScrollTop(0, document.querySelector('div'));
```

### getScrollHeight

获取元素的scrollHeight

```js
function getScrollHeight(el = window){
    const globalObj = [document, window, document.documentElement, document.body];
    if (globalObj.indexOf(el) === -1) return el.scrollHeight;

    let scrollHeight, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

getScrollHeight();
getScrollHeight(document.querySelector('div'));
```

### doScroll

滚动到指定元素

```js
function doScroll(el, time) {
    if (el) {
        let getScrollTop = function() {
            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        };

        let setScrollTop = function(top) {
            document.documentElement.scrollTop = document.body.scrollTop = top;
        };

        time = time || 400;
        let top = getScrollTop();
        let targetTop = top + el.getBoundingClientRect().top;
        let dir = top < targetTop ? 'down' : 'up';
        let step = Math.ceil(Math.abs(top - targetTop) / time * 1000 / 60);
        let topArr = [top];

        let handle = function() {
            let top = getScrollTop();
            if (Math.abs(top - targetTop) < step) {
                step = Math.abs(top - targetTop);
            }

            if (top > targetTop) {
                setScrollTop(top - step);
            } else if (top < targetTop) {
                setScrollTop(top + step);
            }

            let newTop = getScrollTop();

            let next = topArr.every((item) => {
                if (dir == 'down') {
                return newTop > item;
            }
            return newTop < item;

        });

            if (next) {
                topArr.push(newTop);
                window.requestAnimationFrame(handle);
            }
        };

        window.requestAnimationFrame(handle);
    }
}

doScroll(document.body);
doScroll(document.body, 1000);
```

## network（网络）

### isWifi

判断是否是wifi环境，依赖navigator.connection兼容性

- 不支持此属性或`type`属性不存在，返回`true`
- 支持此属性且是`wifi`，返回`true`
- 否则返回`false`

```js
function isWifi() {
    // 支持该属性并且不是wifi返回false，否则返回true
    if (navigator.connection) {
        let type = navigator.connection.type;

        if (type && type != 'wifi' && type != 'unknown' && type != 'none') {
            return false;
        }
    }
    return true;
}

isWifi();
```

### networkChange

监听网络状态变化，依赖navigator.connection兼容性

```js
function networkChange(fn) {
    if (navigator.connection) {
        navigator.connection.addEventListener('change', (e) => {
            fn(e, navigator.connection.type);
        });
        return true;
    }
    return false;
}

networkChange((e, type) => {
    console.log(type);
});
```

## 浏览器userAgent

### isBaidu

百度浏览器

```js
function isBaidu() {
    return navigator.userAgent.indexOf('baiduboxapp') > -1
        || navigator.userAgent.indexOf('baidubrowser') > -1;
}

isBaidu();
```

### isUc
### isIosUc

uc浏览器

```js
function isUc() {
    return navigator.userAgent.indexOf('UCBrowser') > -1;
}

isUc();
```

```js
function isIosUc() {
    return navigator.userAgent.indexOf('UCBrowser') > -1
        && navigator.userAgent.indexOf('iPhone') > -1;
}

isIosUc();
```

### isQQ

qq浏览器

```js
function isQQ() {
    return navigator.userAgent.indexOf('MQQBrowser') > -1
        && navigator.userAgent.indexOf('MicroMessenger') == -1;
}

isQQ();
```

### isAndroidWx

android微信

```js
function isAndroidWx() {
    return navigator.userAgent.indexOf('MQQBrowser') > -1
        && navigator.userAgent.indexOf('MicroMessenger') > -1;
}

isAndroidWx();
```
