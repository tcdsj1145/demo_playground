var dragSrcEl;
function handleDragStart(e) {
    this.style.opacity = '0.4'; // this / e.target is the source node.
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}
function handleDragEnter(e) {
    // this / e.target is the current hover target.
    // console.log(e.target.classList[1]);//类似于mouseEnter  选中一个DIV不松手 进入到某个DIV时触发
    this.classList.add('over');
}
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    e.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.
    // console.log(e.target); //类似于mousemove  当鼠标选中一个DIV(不松手) 在某个DIV上move的时候触发(很多次)
    return false;
}
function handleDragLeave(e) {
    this.classList.remove('over'); // this / e.target is previous target element.
}
function handleDrop(e) {
    // this e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }
    // See the section on the DataTransfer object.
    // console.log(e.target); //拖放结束时目标DIV
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the columnwe dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }
    dragSrcEl.style.cssText = '';
    return false;
}
function handleDragEnd(e) {
    // this  e.target is the source node.
    // console.log(e.target.classList[1]); //被拖拽的DIV
    this.classList.remove('over');
    this.style.opacity = 1; // this / e.target is the source node.
}
var cols = document.querySelectorAll('#columns .column');
//类数组元素 想要使用 forEach 的话可以这么做
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
});
//====FILE========================================
var fileWrapper = document.querySelector('.file-wrapper');
fileWrapper.addEventListener('dragover', handleDragOver, false); //必须 有这个才允许drop
fileWrapper.addEventListener('drop', fileDrop, false);
function fileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    var files = e.dataTransfer.files;
    var formData = new FormData();
    for (var i = files.length - 1; i >= 0; i--) {
        readImg(files[i]);
        formData.append('files[]', files[i]);
    };
    ajax(formData);
}
function readImg(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        var preview = document.querySelector('.img-preview');
        var img = document.createElement('div');
        img.classList.add('item');
        img.style.cssText = 'background:url(' + e.target.result + '); background-size: cover;';
        preview.appendChild(img);
    }
    reader.readAsDataURL(file);
}
function ajax(formData) {
    var xhr = new XMLHttpRequest();
    xhr.open("post", "upload.php");
    xhr.onload = function() {
        alert("上传完成！");
    }
        // 上传进度
    xhr.upload.onprogress = function(e) {
        if (e.lengthComputable) {
            var percent = (e.loaded / e.total * 100 | 0) + "%";
            console.log(percent);
        }
    }
    xhr.send(formData);
}
// list container ===================================
var items = document.querySelectorAll('.items .item');
[].forEach.call(items, function(item) {
    item.addEventListener('dragstart', function(e) {
        this.style.opacity = '0.4';
        this.id = 'item' + +new Date();
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('item', this.id);
    }, false);
    item.addEventListener('dragend', handleDragEnd, false);
});
var container = document.querySelector('.container');
container.addEventListener('dragenter', handleDragEnter, false);
container.addEventListener('dragover', handleDragOver, false); //必须 有这个才允许drop
container.addEventListener('dragleave', handleDragLeave, false);
container.addEventListener('dragend', handleDragEnd, false);
container.addEventListener('drop', function(e) {
    var id = e.dataTransfer.getData('item');
    var ele = document.querySelector('#' + id);
    this.appendChild(ele); //通过传id 真正的移动元素  而不是 innerHTML删除一个而后创建那种做法
    this.style.opacity = 1;
}, false);
container.addEventListener('dargStart', function(e){
    var target = e.target;
    if(target.hasClass('item')){
        e.dataTransfer.setData('item', this.id);
    }
}, false);

var itemlist = document.querySelector('.items');
itemlist.addEventListener('dragenter', handleDragEnter, false);
itemlist.addEventListener('dragover', handleDragOver, false); //必须 有这个才允许drop
itemlist.addEventListener('dragleave', handleDragLeave, false);
itemlist.addEventListener('dragend', handleDragEnd, false);
itemlist.addEventListener('drop', function(e){
    var id = e.dataTransfer.getData('item');
    var ele = document.querySelector('#' + id);
    this.appendChild(ele); //通过传id 真正的移动元素  而不是 innerHTML删除一个而后创建那种做法
    this.style.opacity = 1;
},false);
