const easingCoordinates = require('easing-coordinates')
const R = require('ramda')
const getColorStops = require('./lib/colorStops.js')

module.exports = ({
	variants = {},
	directions = {
		t: 'to top',
		r: 'to right',
		b: 'to bottom',
		l: 'to left'
	},
	gradients = {},
	alphaDecimals = 5,
	colorMode = 'lrgb',
	type = 'linear',
	easing = 'ease',
	colorStops = 10
} = {}) => ({ e, addUtilities }) => {
	const defaults = {
		type,
		easing,
		colorStops
	}
	addUtilities(
		{
			...R.compose(
				R.reduce((acc, [key, value]) => {
					const settings = R.is(Array, value)
						? {
								...defaults,
								color: value
						  }
						: {
								...defaults,
								...value
						  }

					const coordinates = easingCoordinates.easingCoordinates(
						settings.easing,
						settings.colorStops
					)
					const colorStops = getColorStops(
						settings.color,
						coordinates,
						alphaDecimals,
						colorMode
					)

					R.compose(
						R.map(([dirName, dirValue]) => {
							acc[`.${e(`bg-easing-${dirName}-${key}`)}`] = {
								backgroundImage: `${
									settings.type
								}-gradient(${dirValue}, ${getColorStops(
									settings.color,
									coordinates,
									alphaDecimals,
									colorMode
								)})`
							}
							return acc
						}),
						Object.entries
					)(directions)

					return acc
				}, {}),
				Object.entries
			)(gradients) // ?
		},
		variants
	)
}
