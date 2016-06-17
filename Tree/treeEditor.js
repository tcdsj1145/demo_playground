// $(function() {
//     $(".tree .text-wrapper").append($("<i class='fa fa-plus fa-fw'></i>"));
//     $(".tree>ul ul").hide();
//     $(".tree .text-wrapper i").click(function(event) {
//         var $this = $(this);
//         var $ul = $this.closest('li').children("ul");
//
//         if ($ul.length > 0) {
//             if ($ul.is(":visible")) {
//                 $ul.slideUp();
//                 $this.removeClass("fa-minus").addClass("fa-plus");
//             } else {
//                 $ul.slideDown();
//                 $this.removeClass("fa-plus").addClass("fa-minus");
//             }
//         }
//     });
// });



$(function() {
    $('.tree').click(function(e) {
        var target = e.target;
        if(target.tagName.toLowerCase() == 'i') return;
        var $target = $(target);
        var $li = $target.closest('li');
        var $parentsUl = $li.parents('ul');
        var addControls = 1;
        if ($target.hasClass('fa-plus')) {

            //层级判断
            if($parentsUl.length >= 3) {
                addControls = 0;
            }

            var $ul = $li.children('ul');
            if ($ul && $ul.length) { //有子节点 增加一个
                $ul.append(_createLi(addControls));
            } else {   //没有子节点  创建ul再加
                $li.append(_createUlWithLi(addControls));
            }
        }else if($target.hasClass('fa-minus')){
            $li.remove();
        }
    });
});

/*addControls 必须   控制是否增加action */
/* text 则是创建有text的元素 */
function _createUlWithLi(addControls, text){
    $ul = $('<ul>');
    $ul.append(_createLi(addControls, text));
    return $ul;
}
function _createLi(controls, text){
    text = text || '';
    var $li = $('<li><div class="text-wrapper"><div class="text"><input type="text" value="'+  text+'"></div></li>');
    if(controls){
        $li.children('.text-wrapper').append('<div class="action"><span class="fa fa-plus fa-fw"></span><span class="fa fa-minus fa-fw"></span></div>');
    }
    return $li;
}

function html2json($treeElem){
    var tree = {};
    var li = $treeElem.children('ul').children('li');
    function _htmlToJson(obj, elem){
        var text = elem.find('input').val();
        var $lis = elem.children('ul').children('li');
        obj.text = text;
        if($lis.length){
            obj.children = [];
            $lis.each(function(idx){
                obj.children.push(_htmlToJson({}, $(this)));
            });
        }
        return obj;
    }
    return _htmlToJson(tree, li);
}


function json2html(obj){
    var $tree = $('.tree');
    var $treeUl = $tree.children('ul');
    var layer = 0;

    $treeUl.html(_json2html(obj));

    //创建li
    function _json2html(obj){
        layer++;
        var $li = _createLi(layer == 4 ? 0: 1, obj.text); //加上根节点 最多4层
        if(obj.children && obj.children.length){
            var $ul = $('<ul>');
            obj.children.forEach(function(item){
                $ul.append(_json2html(item));
            });
            $li.append($ul);
        }
        layer--;
        return $li;
    }
    console.log($treeUl.html());
    return $treeUl;
}
//{"text":"Root","children":[{"text":"a","children":[{"text":"aa"}]},{"text":"b"},{"text":"c"}]}
// {"text":"Root","children":[{"text":"a","children":[{"text":"aa"}]},{"text":"b","children":[{"text":"ba","children":[{"text":"baa"}]},{"text":"bb","children":[{"text":"bba"}]}]},{"text":"c","children":[{"text":"ca"}]}]}
// json2html(JSON.parse('{"text":"Root","children":[{"text":"a","children":[{"text":"aa"}]},{"text":"b"},{"text":"c"}]}'));
json2html(JSON.parse('{"text":"Root","children":[{"text":"a","children":[{"text":"aa"}]},{"text":"b","children":[{"text":"ba","children":[{"text":"baa"}]},{"text":"bb","children":[{"text":"bba"}]}]},{"text":"c","children":[{"text":"ca"}]}]}'))



// console.log(html2json($('.tree')));
