//========================================
//
//      指令处理
//
//========================================
Aaron.register('Directive', [
    'directives-on'
], function(on) {
    

	var dirId = 1;

	var registerHandlers = {
		'on': on
	}
    

    //ָ���������
	function Directive(type, value, handlers, node, vm) {
		this.id       = dirId++
		this.type     = type
		this.vm       = vm
		this.compiler = vm.compiler
		this.el       = node
		this.value    = value;

		var isEmpty = '';

		//����ÿһ�ֲ��Է�����ָ�����
		if (typeof handlers === 'function') {
			this[isEmpty ? 'bind' : '_update'] = handlers
		} else {
			for (var prop in handlers) {
				if (prop === 'unbind' || prop === 'update') {
					this['_' + prop] = handlers[prop]
				} else {
					this[prop] = handlers[prop]
				}
			}
		}

	};


	var DirProto = Directive.prototype;

	/**
	 * ����Ƿ��ж�Ӧ�Ĵ�����
	 * @return {[dirname]} [description]
	 */
	Directive.checkHandlers = function(dirname){
		return registerHandlers[dirname];
	}


	/**
	 * ����ָ���İ󶨴�����
	 */
	Directive.createHandlers = function(type, value, node, vm) {
		var handlers = this.checkHandlers(type)
		if (!handlers) {
			return;
		}
		return new Directive(type, value, handlers, node, vm);
	}


	return Directive;
});



