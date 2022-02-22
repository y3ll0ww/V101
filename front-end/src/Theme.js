import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

export const bodyFont = createMuiTheme({
    typography: {
        fontFamily: [
            'Assistant',
            'normal',
        ].join(','),
    },
});

export const headFont = createMuiTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'normal',
        ].join(','),
    }
})

export const btnFont = createMuiTheme({
    typography: {
        fontFamily: [
            'Poppins',
            'normal',
        ].join(','),
    }
})

export const colors = createMuiTheme({
    palette: {
        primary: {
            main: '#212B40',
        },
        secondary: {
            light: '#BADCDD',
            main: '#547B97',
            dark: '#212B40',

        },
    }
})