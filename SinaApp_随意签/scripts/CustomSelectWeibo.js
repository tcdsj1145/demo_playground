/*******************************
 * @author Mr.Think
 * @author blog http://mrthink.net/
 * @2012.02.28
 * @可自由转载及使用,但请注明版权归属
 *******************************/
;(function($) {
	/*
	 * 统一select样式并实现样式高度自定义的jQuery插件@Mr.Think(http://mrthink.net/)
	 */
	$.fn.iSimulateSelect = function(iSet) {
		iSet = $.extend({
			selectBoxCls : 'i_selectbox', //string类型,外围class名
			curSCls : 'i_currentselected', //string类型,默认显示class名
			optionCls : 'i_selectoption', //string类型,下拉列表class名
			selectedCls : 'selected', //string类型,当前选中class名
			width : 62, //number类型，模拟select的宽度
			height : 300, //number类型，模拟select的最大高度
			zindex : 20//层级顺序
		}, iSet || {});
		this.hide();
		//这里this可不是当前窗体 //在调用的时候$('.iselect').iSimulateSelect();//那么在iSimulateSelect函数中this就是$('.iselect')
		return this.each(function() {
			var self = this;
			//目前this指的是select下拉框
			var thisCurVal, thisSelect, cIndex = 0;
			//计算模拟select宽度
			if (iSet.width == 0) {
				iSet.width = $(self).width();
			}
			//var html = '<div class="' + iSet.selectBoxCls + '" style="z-index:' + iSet.zindex + '"><div class="' + iSet.curSCls + '" style="width:' + iSet.width + 'px">' + $(self).find('option:selected').text() + '</div><dl class="' + iSet.optionCls + '" style="display:none;width:' + iSet.width + 'px">';
			var html;
			html = '<div class="' + iSet.selectBoxCls + '" style="z-index:' + iSet.zindex + '">';
			html += '<div class="' + iSet.curSCls + '" style="width:' + iSet.width + 'px">';
			html += $(self).find('option:selected').text();
			html += '</div><dl class="' + iSet.optionCls + '" style="display:none;width:' + iSet.width + 'px">';
			//判断select中是否有optgroup//本例子中没有optgroup
			//用dt替代optgroup，用dd替代option
			if ($(self).find('optgroup').size() > 0) {
				$(this).find('optgroup').each(function() {
					html += '<dt>' + $(this).attr('label') + '</dt>';
					$(this).find('option').each(function() {
						if ($(this).is(':selected')) {
							html += '<dd class="' + iSet.selectedCls + '">' + $(this).text() + '</dd>';
						} else {
							html += '<dd>' + $(this).text() + '</dd>';
						}
					});
				});
			} else {
				$(this).find('option').each(function() {
					if ($(this).is(':selected')) {
						html += '<dd class="' + iSet.selectedCls + '">' + $(this).text() + '</dd>';
					} else {
						html += '<dd>' + $(this).text() + '</dd>';
					}
				});
			}
			//将模拟dl插入到select后面
			$(self).after(html);
			//当前模拟select外围box元素
			thisBox = $(self).next('.' + iSet.selectBoxCls);
			//i_selectbox
			//当前模拟select初始值元素
			thisCurVal = thisBox.find('.' + iSet.curSCls);
			//i_currentselected
			//当前模拟select列表
			thisSelect = thisBox.find('.' + iSet.optionCls);
			//i_selectoption
			/*
			若同页面还有其他原生select,请前往https://github.com/brandonaaron/bgiframe下载bgiframe，同时在此处调用thisSelect.bgiframe()
			*/
			//thisSelect.bgiframe();

			//弹出模拟下拉列表
			thisCurVal.click(function() {
				$('.' + iSet.optionCls).hide();
				//i_currentselected
				$('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex);
				$(self).next('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex + 1);
				thisSelect.show();
			});
			//若模拟select高度超出限定高度，则自动overflow-y:auto
			if (thisSelect.height() > iSet.height) {
				thisSelect.height(iSet.height);
			}
			//模拟列表点击事件-赋值-改变y坐标位置-...
			thisSelect.find('dd').click(function() {
				//$(this).addClass(iSet.selectedCls).siblings().removeClass(iSet.selectedCls);//selectedCls=selected
				$(this).addClass(iSet.selectedCls);
				//添加class属性 且class值为selected
				$(this).siblings().removeClass(iSet.selectedCls);
				//这个仅仅是删除了class中的内容
				$(this).siblings().removeAttr('class');
				//
				cIndex = thisSelect.find('dd').index(this);
				//this 是当前被选中的dd对象
				thisCurVal.text($(this).text());//thisCurVal 就是i_currentselected
				//$(this).text()就是当前被选中对象的值
				$(self).find('option').removeAttr('selected');
				$(self).find('option').eq(cIndex).attr('selected', 'selected');
				$('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex);
				thisSelect.hide();
				currentpage=new Number(thisCurVal.html());
				if ($('#backseq').prop('checked')) {
					//alert('back');
					seq = 1;
				} else {
					seq = 0;
				}
				var weiboType = $("input[name='weiboType']:checked").val();		
				$.ajax({
					url : './getMoreWeibo.php',
					type : 'post',
					data : {
						'pageNumber' : currentpage,
						'weiboType' : weiboType,
						'backseq' : seq
					},
					dataType : 'text',
					success : function(data) {
						$('#weibolist').html(data);
						$('#page_select').val($(this).text());
						//$('.i_currentselected').html(currentpage);
					},
					error : function() {
						alert('sorry @!');
					}
				});

			});
			//非模拟列表处点击隐藏模拟列表
			//$(document)点击事件不兼容部分移动设备
			$('html,body').click(function(e) {
				if (e.target.className.indexOf(iSet.curSCls) == -1) {
					thisSelect.hide();
					$('.' + iSet.selectBoxCls).css('zIndex', iSet.zindex);
				}
			});
			//取消模块列表处取消默认事件
			thisSelect.click(function(e) {
				e.stopPropagation();
			});
		});
	}
})(jQuery);

$(function() {
	//插件调用
	$('.iselect').iSimulateSelect();
});

