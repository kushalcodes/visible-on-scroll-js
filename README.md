# visible-on-scroll-js
Show elements when on scroll view using JS

## CDN
```javascript
<script 
src="https://cdn.jsdelivr.net/gh/kushalcodes/visible-on-scroll-js@master/visible-on-scroll.min.js">
</script>
```

## Usage
```javascript
<div class="scroll-visible"></div>

// initiliaze visible on scroll on .scroll-visible class elements
new _VOS(".scroll-visible");

// using animation
new _VOS(".scroll-visible",{
  animation: 'slide-down'
});

```