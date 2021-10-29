import { useState } from "react";
import * as actions from "./_redux/weatherActions";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { Field, Formik } from "formik";
import { Input } from "../../components/Controls/Input";
import Service from "./services";
import { Link } from "react-router-dom";
import WeatherChart from "../../components/Chart";

function Weather() {
	const [loading, setLoading] = useState(false);

	// Getting curret state list from store (Redux)
	const { currentState } = useSelector(
		(state) => ({ currentState: state.weather }),
		shallowEqual
	);
	const { weatherForServiceOne, weatherForServiceTwo , actionsLoading, suggestions = [], weatherForSevenDayForecastServiceOne, weatherForSevenDayForecastServiceTwo } = currentState;

	const dispatch = useDispatch();

	const fetchWeatherByName = (city, coord) => {
		dispatch(actions.fetchWeatherServiceOne(city));
		dispatch(actions.fetchWeatherServiceTwo(coord?.lat, coord?.lon));
		dispatch(actions.fetchSevenDayForeCastServiceOne(weatherForServiceOne?.coord?.lat, weatherForServiceOne?.coord?.lon ));
		dispatch(actions.fetchSevenDayForeCastServiceTwo(weatherForServiceTwo?.coord?.lat, weatherForServiceTwo?.coord?.lon ));
	};

	return (
		<>
			<section className="search">
				<Formik
					enableReinitialize={true}
					initialValues={{ city: '' }}
					onSubmit={(values) => {
						dispatch(actions.fetchAllSuggestions(values.city && values.city))
					}}
				>
					{({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
						<>
							<Field
								name="city"
								value={values.city}
								autoComplete='off'
								component={Input}
								onChange={handleChange}
								onBlur={handleBlur}
								placeholder="City/Town"
								label="City/Town"
								className={touched.city && errors.city ? 'error' : null}
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
				<ul className="results">
					{suggestions &&
						suggestions.map((item) => {
							return (
								<li onClick={() => fetchWeatherByName(item.name, item.coord)}>
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
			<WeatherChart  weatherForSevenDayForecastServiceOne={weatherForSevenDayForecastServiceOne && weatherForSevenDayForecastServiceOne} weatherForSevenDayForecastServiceTwo={weatherForSevenDayForecastServiceTwo && weatherForSevenDayForecastServiceTwo}/>
		</>
	);

}

export default Weather;
