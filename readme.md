# Mobile jquery.cyclotron.js ([Demo](https://explora.cat/turodelhome/panoramica/index.html))

## Based on [https://github.com/mahonnaise/cyclotron](https://github.com/mahonnaise/cyclotron) it works on mobile devices

## 1. You need some element with a background image. E.g.:

```html
<div class="cycle" style="background:url(panorama.jpg);height:512px"></div>
```

## 2. Cyclotronify:

```javascript
$(document).ready(function ($) {
	$('.cycle').cyclotron();
});
```

## 3. Options:

`dampingFactor` - should be somewhere around 0.9, should be > 0 and < 1 (default: 0.93)

`historySize` - size of the array which stores the deltas (default: 5)