const easingCoordinates = require('easing-coordinates')
const R = require('ramda')
const getColorStops = require('./lib/colorStops.js')

module.exports = ({
	variants = {},
	directions = {
		t: 'to top',
		tr: 'to top right',
		r: 'to right',
		br: 'to bottom right',
		b: 'to bottom',
		bl: 'to bottom left',
		l: 'to left',
		tl: 'to top left'
	},
	gradients = {
		test: { type: 'linear', easing: 'ease', steps: 9, color: ['#aa4', '#ea4'] },
		other: ['#4ae', '#ea4']
	},
	alphaDecimals = 5,
	colorMode = 'lrgb',
	defaults = {
		type: 'linear',
		easing: 'ease',
		steps: 10
	}
} = {}) => ({ e, addUtilities }) => {
	addUtilities(
		{
			...R.compose(
				R.reduce((acc, [key, value]) => {
					const output = R.is(Array, value)
						? {
								...defaults,
								color: value
						  }
						: {
								...defaults,
								...value
						  }

					const coordinates = easingCoordinates.easingCoordinates(
						output.easing,
						output.steps
					)
					const colorStops = getColorStops(
						output.color,
						coordinates,
						alphaDecimals,
						colorMode
					)

					R.compose(
						R.map(([dirName, dirValue]) => {
							acc[`.${e(`bg-easing-${dirName}-${key}`)}`] = {
								backgroundImage: `${
									output.type
								}-gradient(${dirValue}, ${getColorStops(
									output.color,
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
