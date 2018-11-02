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
