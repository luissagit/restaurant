const NotificationHelper = {
	sendNotification({title, options}) {
		if (!this._checkAvailability()) {
			console.log('fitur notifikasi tak didukung oleh browser ini');
			return;
		}

		if (!this._checkPermission()) {
			console.log('fitur notifikasi belum diijinkan');
			this._requestPermission();
			return;
		}

		this._showNotification({title, options});
	},

	_checkAvailability() {
		return !!('Notification' in window);
	},

	_checkPermission() {
		return Notification.permission === 'granted';
	},

	async _requestPermission() {
		const status = await Notification.requestPermission();

		if (status === 'denied') {
			console.log('fitur notifikasi tak diijinkan');
		}

		if (status === 'closed') {
			console.log('permintaan ijin ditutup');
		}
	},

	async _showNotification({title, options}) {
		const serviceWorkerRegistration = await navigator.serviceWorker.ready;
		serviceWorkerRegistration.showNotification(title, options);
	},
};

export default NotificationHelper;
