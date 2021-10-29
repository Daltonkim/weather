import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Container } from "@material-ui/core";
import Header from "./components/header/header";
import Homepage from "./components/homepage";
import WeatherAppTheme from "./theme/theme";

const useStyles = makeStyles(() => ({
	root: {
		width: "100%",
		paddingTop: "4.5rem",
	},
}));

function App({ store, persistor, basename }) {
	const classes = useStyles();

	return (
		/* Provide Redux store */
		<Provider store={store}>
			<ThemeProvider theme={WeatherAppTheme}>
				<CssBaseline />
				<Header />
				<Container
					style={{ margin: "200px auto" }}
					className={classes.content}
					role="main"
				>
					<BrowserRouter>
						<Switch>
							<Route path="/" component={Homepage} exact />
						</Switch>
					</BrowserRouter>
				</Container>
			</ThemeProvider>
		</Provider>
	);
}
export default App;
