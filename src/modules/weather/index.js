import { useState, useEffect } from "react";
import * as actions from "./_redux/weatherActions";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Field, Formik } from "formik";
import { Input } from "../../components/Controls/Input";
import Service from "./services";
import WeatherChart from "../../components/Chart";

function Weather() {
	const [display, setDisplay] = useState(false);
	const [name, setName] = useState("");

	// Getting curret state list from store (Redux)
	const { currentState } = useSelector(
		(state) => ({ currentState: state.weather }),
		shallowEqual
	);
	const {
		actionsLoading,
		suggestions = [],
		weatherForSevenDayForecastServiceOne,
		weatherForSevenDayForecastServiceTwo,
	} = currentState;
	console.log(actionsLoading);

	useEffect(() => {
		if (suggestions.length !== 0 && name !== "") {
			setDisplay(true);
		} else if (name === "") {
			setDisplay(false);
		} else {
			setDisplay(true);
		}
		console.log(name);
	}, [suggestions, display, name]);

	const dispatch = useDispatch();

	const fetchWeatherByName = (city, coord) => {
		dispatch(actions.fetchWeatherServiceOne(city));
		dispatch(actions.fetchWeatherServiceTwo(coord?.lat, coord?.lon));
		dispatch(actions.fetchAllSuggestions());
		dispatch(actions.fetchSevenDayForeCastServiceOne(coord?.lat, coord?.lon));
		dispatch(actions.fetchSevenDayForeCastServiceTwo(coord?.lat, coord?.lon));
		// 5 second interval
		// setInterval(() => {
		// 	dispatch(actions.fetchWeatherServiceOne(city));
		// 	dispatch(actions.fetchWeatherServiceTwo(coord?.lat, coord?.lon));
		// 	dispatch(actions.fetchAllSuggestions())
		// 	dispatch(actions.fetchSevenDayForeCastServiceOne(coord?.lat, coord?.lon));
		// 	dispatch(actions.fetchSevenDayForeCastServiceTwo(coord?.lat, coord?.lon));

		// }, 5000);
	};

	return (
		<>
			{actionsLoading && <p>loading</p>}
			<section className="search">
				<Formik
					enableReinitialize={true}
					initialValues={{ city: "" }}
					onSubmit={(values) => {
						dispatch(actions.fetchAllSuggestions(values.city && values.city));
					}}
				>
					{({
						values,
						errors,
						touched,
						handleBlur,
						setFieldValue,
						handleChange,
						handleSubmit,
						isSubmitting,
					}) => (
						<>
							<Field
								name="city"
								value={values.city}
								autoComplete="off"
								component={Input}
								onChange={(e) => {
									setFieldValue("city", e.target.value);
									setName(e.target.value);
								}}
								onBlur={handleBlur}
								placeholder="City/Town"
								label="City/Town"
								className={touched.city && errors.city ? "error" : null}
							/>

							<button
								type="submit"
								onClick={() => handleSubmit()}
								className="btn btn-primary"
							>
								Search
							</button>
						</>
					)}
				</Formik>
				<ul
					className="results"
					style={{ display: `${display === true ? "block" : "none"}` }}
				>
					{suggestions &&
						suggestions.map((item, i) => {
							return (
								<li
									key={i}
									onClick={() => fetchWeatherByName(item.name, item.coord)}
								>
									{item.name}
									<br />
									<span>
										{item?.coord.lat} -- {item?.coord.lon}
									</span>
								</li>
							);
						})}
				</ul>
			</section>
			<Service />
			<WeatherChart
				weatherForSevenDayForecastServiceOne={
					weatherForSevenDayForecastServiceOne
				}
				weatherForSevenDayForecastServiceTwo={
					weatherForSevenDayForecastServiceTwo &&
					weatherForSevenDayForecastServiceTwo
				}
			/>
		</>
	);
}

export default Weather;
