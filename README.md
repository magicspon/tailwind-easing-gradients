# Easing Gradients Tailwind CSS Plugin

## Credit

Based largely on @benface’s [GitHub - benface/tailwindcss-gradients: Tailwind CSS plugin to generate gradient background utilities](https://github.com/benface/tailwindcss-gradients). The color functions are from @larsenwork’s [GitHub - larsenwork/postcss-easing-gradients: PostCSS plugin to create smooth linear-gradients that approximate easing functions.](https://github.com/larsenwork/postcss-easing-gradients)

## Installation

```bash
npm install tailwind-easing-gradients
```

## Usage

```js
// In your Tailwind CSS config
{
  plugins: [
    require('tailwind-easing-gradients')({
      variants: ['responsive'],
      // required
      gradients: {
        'ex1': ['#a4e', '#03d'], // must be two colors
        'ex2': { easing: 'ease-in-out', steps: 5, color: ['#4ae', '#0da'] }, // overwrite all settings
        'ex3': {
					easing: 'cubic-bezier(0.48, 0.3, 0.64, 1)',
					color: ['#4ae', '#0da']
        },
        'ex4': {
					easing: 'steps(4, skip-none)',
					color: ['#4ae', '#0da']
        }
      },
      // defaults
      alphaDecimals: 5,
      colorMode: 'lrgb',
      type: 'linear',
      easing: 'ease', // default settings
      colorStops: 10
      directions: {
        't': 'to top',
        'r': 'to right',
        'b': 'to bottom',
        'l': 'to left'
      },
    }),
  ],
}
```

## Options

You can overwrite the easing, type, colorStops per gradient.

### ease: 'ease'

is the default, [see](https://github.com/larsenwork/postcss-easing-gradients/blob/master/README.md) for more examples

### type: 'linear'

is the default, you could use radial, but you will need to create a compatible direction

[see](https://github.com/larsenwork/postcss-easing-gradients/blob/master/README.md)

### colorStops: 15

is the default. A lower number creates a more "low poly" gradient with less code but a higher risk of banding.

### alphaDecimals: 5

is the default. A lower number can result in banding.

### colorMode: 'lrgb'

This plugin generates the following utilities:

```css
/* configurable with the "directions" and "gradients" options */
.bg-easing-[direction-name]-[gradient-name] {
	background-image: linear-gradient(
		[direction-value],
		hsl([gradient-color-1]),
		hsl([gradient-color-2])
	);
}
```
