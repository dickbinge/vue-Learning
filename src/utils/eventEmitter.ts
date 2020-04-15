const EventEmitter = (() => {
	let instance = null
	let map = new Map()

	return class {

		// 构造器
		constructor() {
			if (!instance) {
				instance = this
			}
			return instance
		}

		// 添加监听
		addListener(eventName, callback) {
			map.set(eventName, callback)
		}

		// addListener 别名
		on(eventName, callback) {
			this.addListener(eventName, callback)
		}

		// 移除监听
		remove(eventName) {
			map.remove(eventName)
		}

		// 触发监听
		emit(eventName, args) {
			const callback = map.get(eventName)
			if (typeof callback === 'function') {
				callback(args)
			} else {
				throw new Error(`${eventName} is not found`);
			}
		}

		// 只触发一次的监听
		once(eventName) {
			this.emit(eventName)
			this.remove(eventName)
		}

	}
})()

export default new EventEmitter();