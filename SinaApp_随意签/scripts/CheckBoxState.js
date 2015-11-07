

function clickDelAll() {
	var delAll = document.getElementById('delAll');
	var fState = delAll.checked;
	//fState :father checkbox check state //总复选框的状态

	var dels = document.getElementsByName('ids[]');
	for ( i = 0; i < dels.length; i++) {
		var delsI = dels[i];
		delsI.checked = fState;
		//各个小的复选框的状态设置为总复选框的状态
	}
}

function checkDelServal() {
	// alert('check server');
	var count = 0;
	var delAll = document.getElementById('delAll');
	var dels = document.getElementsByName('ids[]');
	for ( i = 0; i < dels.length; i++) {
		if (dels[i].checked) {
			count++;
		}
	}
	
	

	if (count == dels.length) {//when all checkDels is checked delAll should be checked
		//alert(dels.length);
		delAll.checked = true;
	} else if (count < dels.length) {//when no checkDels is checked delAll should be not checked
		delAll.checked = false;
	}

	var delsBtn = document.getElementById('delSeveral');
	if (count == 0) {
		delsBtn.disabled = true;
		//一个复选框都没有选中 批量删除的按钮也是不能点的
	} else {
		delsBtn.disabled = false;
	}
}