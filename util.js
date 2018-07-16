export function isWifi() {
    // 支持该属性并且不是wifi返回false，否则返回true
    if (navigator.connection) {
        let type = navigator.connection.type;

        if (type && type != 'wifi' && type != 'unknown' && type != 'none') {
            return false;
        }
    }
    return true;
}

export function networkChange(fn) {
    if (navigator.connection) {
        navigator.connection.addEventListener('change', (e) => {
            fn(e, navigator.connection.type);
        });
        return true;
    }
    return false;
}

// 百度浏览器
export function isBaidu() {
    return navigator.userAgent.indexOf('baiduboxapp') > -1
        || navigator.userAgent.indexOf('baidubrowser') > -1;
}

// uc浏览器
export function isUc() {
    return navigator.userAgent.indexOf('UCBrowser') > -1;
}

export function isIosUc() {
    return navigator.userAgent.indexOf('UCBrowser') > -1
        && navigator.userAgent.indexOf('iPhone') > -1;
}

// qq浏览器
export function isQQ() {
    return navigator.userAgent.indexOf('MQQBrowser') > -1
        && navigator.userAgent.indexOf('MicroMessenger') == -1;
}

// android微信浏览器
export function isAndroidWx() {
    return navigator.userAgent.indexOf('MQQBrowser') > -1
        && navigator.userAgent.indexOf('MicroMessenger') > -1;
}

export function isEmpty(obj) {
    if (!obj) {
        return true;
    }
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        if (obj.length === 0) {
            return true;
        }
    } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        let keys = Object.keys(obj);
        if (keys.length === 0) {
            return true;
        }
    }
    return false;
}

export function getScrollTop () {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

export function setScrollTop (top) {
    document.documentElement.scrollTop = document.body.scrollTop = top;
}

export function doScroll(el, time) {
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