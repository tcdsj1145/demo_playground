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
            if ($ul && $ul.length) {
                $ul.append(_createLi(addControls));

            } else {
                $ul = $('<ul>');
                $ul.append(_createLi(addControls));
                $li.append($ul);
            }
        }else if($target.hasClass('fa-minus')){
            $li.remove();
        }

    });
    function _createLi(controls){
        var $li = $('<li><div class="text-wrapper"><div class="text"><input type="text"></div></li>');
        if(controls){
            $li.children('.text-wrapper').append('<div class="action"><span class="fa fa-plus fa-fw"></span><span class="fa fa-minus fa-fw"></span></div>');
        }
        return $li;
    }
});

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
console.log(html2json($('.tree')));
