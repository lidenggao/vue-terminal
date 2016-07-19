/*
控制台面板
<console-panel name="message"></console-panel> 
示例：
```js
var demo = new Vue({
  el: '#demo',
});
setInterval(function(){
 demo.$broadcast('console:message','123123');
},2000);
```
 */
Vue.component('console-panel', {
    template: '<div></div>',
    props: ['name', 'value'],
    ready: function(){
      var addData, name, row_number;
      var element = this.$el;
      $(element).css({
        height: '100%',
        overflow: 'auto',
        background: '#101010'
      });
      row_number = 0;
      addData = function(data) {
        var log, pre;
        if (typeof data === "object") {
          data = data.toString();
        } else {
          if (typeof data === "string") {
            data = ansi2html($('<div/>').text(data).html());
          }
        }
        log = void 0;
        row_number++;
        if ($(element).find(".log-line").length < 200) {
          log = $(document.createElement("div")).addClass("log-line").css({
            position: "relative"
          });
        } else {
          log = $(element).find(".log-line:first").html("");
        }
        log.appendTo(element);
        pre = $("<pre></pre>").css({
          paddingLeft: 55,
          fontSize: 14
        }).html(data).appendTo(log);
        $("<p>" + row_number + "</p>").css({
          position: "absolute",
          margin: 0,
          textAlign: "right",
          paddingRight: 5,
          left: 0,
          width: 50,
          top: 0,
          bottom: 0,
          background: "#292929"
        }).prependTo(log);
        return $(element).scrollTop($(element)[0].scrollHeight);
      };
      name = this.name || 'console';
      this.$on('console:' + name, function(data) {
        return addData(data);
      });
    }
});
