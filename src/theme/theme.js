import {createMuiTheme} from '@material-ui/core';

export const colors = {
	white: '#ffffff',
	black: '#000000',
	red: '#D63541',
	green: '#22aa77',
	blue: '#27A1F8',
	blueA80: '#3682CE',
	blueA50: '#81B1E0',
	blueA20: '#CEE1F3',
	grayA80: '#5C5C5C',
	grayA50: '#687688',
	grayA20: '#CCCCCC',
	grayA10: '#E7E7E7',
	grayA05: '#F0F0F2'
};

export const spacing = {
	s: '6px',
	m: '18px',
	l: '24px',
}

export const appTheme = createMuiTheme({
	palette: {
		primary: {main: colors.blue, contrastText: colors.white},
		secondary: {
			main: colors.blue,
			light: colors.blueA50,
			contrastText: colors.white
		},
		error: {main: colors.red, contrastText: colors.white}
	},
	typography: {
		button: {
			textTransform: 'initial'
		},
	}
});
