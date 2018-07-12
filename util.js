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

export function doScroll(el, time) {
    time = time || 400
    let top = document.documentElement.scrollTop
    let targetTop = top + el.getBoundingClientRect().top
    let step = Math.ceil(Math.abs(top - targetTop) / time * 1000 / 60)

    window.requestAnimationFrame(handle)

    function handle() {
        let top = document.documentElement.scrollTop
        if (Math.abs(top - targetTop) < step) step = Math.abs(top - targetTop)

        if (top > targetTop) {
            document.documentElement.scrollTop -= step
        } else if (top < targetTop) {
            document.documentElement.scrollTop += step
        }

        if (Math.abs(top - targetTop) > step) {
            window.requestAnimationFrame(handle)
        }
    }
}