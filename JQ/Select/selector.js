;
(function($) {
  $.fn.mySelector = function(cfg) {
    cfg = $.extend(cfg, {});
    //PS 在$.fn.xx 的函数中  this就是一个JQ对象
    //为了链式使用  还需要返回当前的JQ对象
    //一定要用 .each
    //因为jQ选择器  $('.carousel') 得到的结果可能不是一个元素对象
    //如果有多个对象的话  很多操作会影响
    //比如 $(this).find('.' + itemName).length; 的道德值就不对
    return this.each(function() {
      //select的默认值就是 <select value="defalutValue">
      var self = $(this);
      var options = [];
      options = (function getOptions() {
        var optionElments = self.find('option');
        var arr = [];
        optionElments.map(function(index, optEle) {
          // console.log(optEle.value,optEle.innerHTML);
          arr.push({ value: optEle.value, text: optEle.innerHTML })
        });
        return arr;
      })();
      var selectWrapper = $('<div class="select-wrapper"></div>');
      var showSelected = $('<div class="show-selected"></div>');
      var ul = $('<ul class="fold"></ul>');
      options.forEach(function(item) {
        var li = $('<li class="option" data-value="' + item.value + '">' + item.text + '</li>')
        ul.append(li);
      });
      selectWrapper.append(showSelected);
      selectWrapper.append(ul);
      selectWrapper.on('click', '.show-selected', function(e) {
        ul.toggleClass('fold');
      })
      selectWrapper.on('click', 'li.option', function(e) {
        var target = $(e.target);
        ul.children().removeClass('selected');
        target.addClass('selected');
        showSelected.text(target.html());
        showSelected.data('value', target.data('value'));
        ul.addClass('fold');
      });
      $(document.body).on('click', function(e) {
          var target = e.target;
          if (!$.contains(selectWrapper[0], target)) {
            ul.addClass('fold');
          }
        })
        //设置默认值
      var defalutValue = (function getDefaultValue() {
        if (self.value) {} else {
          return {
            value: options[0].value,
            text: options[0].text
          }
        }
      })();
      showSelected.data('value', defalutValue.value);
      showSelected.text(defalutValue.text);
      ul.find('[data-value=' + defalutValue.value + ']').addClass('selected');
      $(this).hide();
      $(this).after(selectWrapper);
    });
  }
})(jQuery);
