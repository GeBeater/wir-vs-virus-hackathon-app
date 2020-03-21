import {createMuiTheme} from '@material-ui/core';

export const colors = {
	white: '#ffffff',
	black: '#000000',
	red: '#D63541',
	green: '#22aa77',
	blue: '#0463C2',
	blueA80: '#3682CE',
	blueA50: '#81B1E0',
	blueA20: '#CEE1F3',
	grayA80: '#5C5C5C',
	grayA50: '#7F7F7F',
	grayA20: '#CCCCCC',
	grayA10: '#E7E7E7',
	grayA05: '#f5f5f5'
};

export const appTheme = createMuiTheme({
	palette: {
		primary: {main: colors.green, contrastText: colors.white},
		secondary: {
			main: colors.blue,
			light: colors.blueA50,
			contrastText: colors.white
		},
		error: {main: colors.red, contrastText: colors.white}
		// warning: purple,
		// info: {},
		// success: {},
		// text: {primary: colors.blue, secondary: colors.grayA50, disabled: colors.grayA80}
	},
	typography: {
		fontFamily: ['Lato', 'sans-serif'].join(','),
		h1: {
			fontSize: 36,
			lineHeight: '48px',
			fontWeight: 600 // demibold
		},
		h2: {
			fontSize: 26,
			lineHeight: '34px',
			fontWeight: 600
		},
		h3: {
			fontSize: 18,
			lineHeight: '24px',
			fontWeight: 600
		},
		h4: {
			fontSize: 16,
			lineHeight: '22px',
			fontWeight: 600
		},
		h5: {
			fontSize: 16,
			lineHeight: '22px',
			fontWeight: 600
		},
		h6: {
			fontSize: 16,
			lineHeight: '22px',
			fontWeight: 600
		},
		subtitle1: {
			fontSize: 16,
			lineHeight: '22px',
			fontWeight: 600
		},
		subtitle2: {
			fontSize: 14,
			lineHeight: '20px',
			fontWeight: 600
		},
		body1: {
			fontSize: 16,
			lineHeight: '22px',
			fontWeight: 400 // regular
		},
		body2: {
			fontSize: 14,
			lineHeight: '20px',
			fontWeight: 400
		},
		button: {
			fontSize: 16,
			lineHeight: '20px',
			fontWeight: 600,
			textTransform: 'initial'
		},
		caption: {
			fontSize: 12,
			lineHeight: '18px',
			fontWeight: 400
		},
		overline: {
			fontSize: 12,
			lineHeight: '18px',
			fontWeight: 400
		}
	}
});
