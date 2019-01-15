# # Easing Gradients Tailwind CSS Plugin

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
        'pink-blue': ['#a4e', '#03d'], // must be two colors
        'teal-green': { type: 'radial', easing: 'ease-in-out', steps: 5, color: ['#4ae', '#0da'] },
      },
      // defaults
      alphaDecimals: 5,
      colorMode: 'lrgb',
      defaults: {
        type: 'linear',
        easing: 'ease',
        steps: 10
      },
      directions: {
        't': 'to top',
        'r': 'to right',
        'b': 'to bottom',
        'l': 'to left',
      },
    }),
  ],
}
```

This plugin generates the following utilities:

```css
/* configurable with the "directions" and "gradients" options */
.bg-gradient-[direction-name]-[gradient-name] {
	background-image: linear-gradient(
		[direction-value],
		hsl([gradient-color-1]),
		hsl([gradient-color-2])
	);
}
```
