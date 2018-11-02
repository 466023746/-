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
