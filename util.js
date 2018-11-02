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

export function getScrollTop () {
    return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}

export function setScrollTop (top) {
    document.documentElement.scrollTop = document.body.scrollTop = top;
}

export function getScrollHeight(){
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if(document.body){
        bodyScrollHeight = document.body.scrollHeight;
    }
    if(document.documentElement){
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

export function getWindowHeight(){
    var windowHeight = 0;
    if(document.compatMode == "CSS1Compat"){
        windowHeight = document.documentElement.clientHeight;
    }else{
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
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

// 元素是否在当前视野内
export function insideView(el) {
    let rect = el.getBoundingClientRect();

    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        return true;
    }
    return false;
}

// 子元素滚动到顶部或底部，父元素不滚动
export function parentNotScroll() {
    let func = (e) => {
        let scrollTop = getScrollTop();
        let scrollHeight = getScrollHeight();
        let windowHeight = getWindowHeight();
        let direction = e.deltaY > 0 ? 'down' : 'up';

        if ((direction == 'down' && (scrollTop + windowHeight) >= scrollHeight)
            || (direction == 'up' && scrollTop <= 0)) {
            e.preventDefault();
        }
    };
    window.removeEventListener('wheel', func);
    window.addEventListener('wheel', func);
}

export function deepClone(source, ...targets) {
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
