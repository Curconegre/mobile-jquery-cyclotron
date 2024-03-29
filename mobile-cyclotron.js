(function ($) {
   $.fn.cyclotron = function (options) {
      var settings = $.extend({
         dampingFactor: 0.93,
         historySize: 5
      }, options);
      return this.each(function () {
         var container, sx, dx = 0, armed, offset = 0, tick, prev, h = [];
         container = $(this);

         var startEvent = 'mousedown touchstart';
         var moveEvent = 'mousemove touchmove';
         var endEvent = 'mouseleave mouseup touchend touchcancel';

         container.on(startEvent, function (e) {
            if (e.type === 'touchstart') {
               sx = e.originalEvent.touches[0].pageX - offset;
            } else {
               sx = e.pageX - offset;
            }
            armed = true;
         });

         container.on(moveEvent, function (e) {
            var px;
            if (armed) {
               if (e.type === 'touchmove') {
                  px = e.originalEvent.touches[0].pageX;
               } else {
                  px = e.pageX;
               }
               if (prev === undefined) {
                  prev = px;
               }
               offset = px - sx;
               if (h.length > settings.historySize) {
                  h.shift();
               }
               h.push(prev - px);

               container.css('background-position', offset);

               prev = px;
            }
         });

         container.on(endEvent, function () {
            if (armed) {
               var i, len = h.length, v = h[len - 1];
               for (i = 0; i < len; i++) {
                  v = (v * len + (h[i])) / (len + 1);
               }
               dx = v;
            }
            armed = false;
         });

         tick = function () {
            if (!armed && dx) {
               dx *= settings.dampingFactor;
               offset -= dx;
               container.css('background-position', offset);
               if (Math.abs(dx) < 0.001) {
                  dx = 0;
               }
            }
         };

         setInterval(tick, 16);
      });
   };
}(jQuery));
