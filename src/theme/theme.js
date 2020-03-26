import {createMuiTheme} from '@material-ui/core';

export const colors = {
	white: '#ffffff',
	black: '#000000',
	red: '#D63541',
	green: '#22aa77',
	blue: '#27A1F8',
	turquoise: '#8EE5C0',
	purple: '#362F64',
	purpleA80: '#272148',
	blueA80: '#3682CE',
	blueA50: '#81B1E0',
	blueA20: '#CEE1F3',
	grayA80: '#5C5C5C',
	/* Standard gray: */
	grayA50: '#687688',
	grayA20: '#CCCCCC',
	grayA10: '#E7E7E7',
	grayA05: '#F0F0F2'
};

export const spacing = {
	s: '6px',
	m: '18px',
	l: '24px'
}

export const appTheme = createMuiTheme({
	palette: {
		primary: {main: colors.purple, contrastText: colors.white},
		secondary: {
			main: colors.purple,
			light: colors.blueA50,
			contrastText: colors.white
		},
		text: {
			primary: colors.black,
			secondary: colors.purple
		},
		error: {main: colors.red, contrastText: colors.white}
	},
	typography: {
		fontFamily: [
			'Montserrat',
			'DejaVu Sans',
			'Verdana',
			'Helvetica Neue',
			'Roboto',
			'Ubuntu',
			'sans-serif'
		].join(','),
		color: {
			secondary: '#fab400',
			textSecondary: '#fab400',
			text: {
				secondary: '#fab400',
				textSecondary: '#fab400'
			},
		},
		button: {
			fontFamily: 'Montserrat',
			fontWeight: '600',
			height: '45px',
			textTransform: 'initial'
		},
		subtitle1: {
			fontSize: 16,
			lineHeight: '20px',
			color: '#3E4650'
		},
		subtitle2: {
			fontSize: 13,
			lineHeight: '16px',
			color: '#566270'
		},
	}
});
