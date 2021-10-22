const helpers = {
	formatDate: function (d) {
		if (d) {
			var date = d?.toDate();
			const day = String(date.getDate()).padStart(2, "0");
			const month = date.toLocaleString("default", { month: "short" });
			const year = date.getFullYear().toString().substr(2, 2);

			const hour = date.getHours();
			const minute = date.getMinutes();
			return `${day} ${month} ${year}, ${hour}:${minute}`;
		} else return "";
	},
};

export default helpers;
