import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import classNames from './App.module.scss';
import { UserList } from './components/userlist/UserList';
import { UserRegistrationForm } from './components/userregistrationform/UserRegistrationForm';

const theme = createTheme({
  palette: {
    mode: 'dark'
  },
  typography: {
    body1: {
      fontSize: '16px',
      fontWeight: 300
    },
    fontFamily: ['Neue Haas Grotesk Text', 'sans-serif'].join(','),
    h2: {
      fontWeight: 500,
      letterSpacing: '-0.25rem'
    }
  }
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <main className={classNames.main}>
      <UserRegistrationForm />
      <div className={classNames.verticalDivider}></div>
      <UserList />
    </main>
  </ThemeProvider>
);
