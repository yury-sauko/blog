import AppHeader from '../AppHeader/AppHeader';
import AppMainContent from '../AppMainContent/AppMainContent';
import classes from './app.module.scss';

export default function App() {
  return (
    <div className={classes.app}>
      <AppHeader />
      <AppMainContent />
    </div>
  );
}
