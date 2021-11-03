const helpers = {
	formatDate: function (d) {
		if (d) {
			var date = d?.toDate();
			const day = String(date.getDate()).padStart(2, '0');
			const month = date.toLocaleString('default', { month: 'short' });
			const year = date.getFullYear().toString().substr(2, 2);

			const hour = date.getHours();
			const minute = date.getMinutes();
			return `${day} ${month} ${year}, ${hour}:${minute}`;
		} else return '';
	},

	getTimePassed: function (d) {
		if (d) {
			var date = d?.toDate();
			const day = String(date.getDate()).padStart(2, '0');
			const month = date.getMonth();
			const year = date.getFullYear().toString().substr(2, 2);

			const hour = date.getHours();
			const minute = date.getMinutes();
			const second = date.getSeconds();

			const currDate = new Date();
			const currDay = String(currDate.getDate()).padStart(2, '0');
			const currMonth = currDate.getMonth();
			const currYear = currDate.getFullYear().toString().substr(2, 2);

			const currHour = currDate.getHours();
			const currMinute = currDate.getMinutes();
			const currSecond = currDate.getSeconds();

			if (currYear == year) {
				if (currMonth == month) {
					if (currDay == day) {
						if (currHour == hour) {
							if (currMinute == minute) {
								if (currSecond - second < 10){
									return `just now`
								}

								return `${currSecond - second}s`;
							}

							return `${currMinute - minute}m`;
						}
						return `${currHour - hour}h`;
					}
					return `${currDay - day}d`;
				}
				return `${currMonth - month}mo`;
			}
			return `${currYear - year}y`;
		}
		return '';
	},
};

export default helpers;
