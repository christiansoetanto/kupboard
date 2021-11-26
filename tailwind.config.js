const colors = require("./node_modules/tailwindcss/colors");
module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				rose: colors.rose,
				fuchsia: colors.fuchsia,
				indigo: colors.indigo,
				teal: colors.teal,
				lime: colors.lime,
				orange: colors.orange,
				warmGray: colors.warmGray,
				amber: colors.amber,
			},
			minWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
			},
			maxWidth: {
				0: "0",
				"1/4": "25%",
				"1/2": "50%",
				"3/4": "75%",
				full: "100%",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
	],
	important: true,
};
