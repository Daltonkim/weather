import { shallowEqual } from 'react-redux';
import { useSelector } from 'react-redux';
import './index.scss'

const Service = () => {
    const { currentState } = useSelector(
        (state) => ({ currentState: state.weather }),
        shallowEqual
    );
    const { weatherForServiceOne, weatherForServiceTwo = {}, actionsLoading } = currentState;

    return (
        <>
            <div className="service">
                <div className="service__one">
                    {actionsLoading && <p>loading</p>}
                    <h1>Service One</h1>
                    <h2>{weatherForServiceOne && weatherForServiceOne.name}</h2>

                    <div className="service__one-wrapper">
                        <div className="service__one-town">
                            {weatherForServiceOne?.main?.temp} °C
                        </div>
                        <div className="service__one-details">
                            <div className="service__one-humidity">
                                Humidity: {weatherForServiceOne?.main.humidity}%
                            </div>
                            <div className="service__one-width">
                                Wind: speed : {weatherForServiceOne?.wind.speed}
                            </div>
                            <div className="service__one-precipitation">
                            Cloud Cover: {weatherForServiceTwo?.clouds?.all}%
                            </div>
                        </div>
                    </div>
                </div>
                <div className="service__two">
                    <h1>Service Two</h1>
                    <h2>{weatherForServiceOne && weatherForServiceOne.name}</h2>
                    <div className="service__two-wrapper">
                        <div className="service__two-town">
                            {weatherForServiceTwo?.temperature} °C
                        </div>
                        <div className="service__two-details">
                            <div className="service__one-humidity">
                                Humidity: {weatherForServiceTwo?.temperaturey}%
                            </div>
                            <div className="service__one-width">
                                Wind: speed : {weatherForServiceTwo?.windSpeed}
                            </div>
                            <div className="service__one-precipitation">
                                Precipitation Intensity: {weatherForServiceTwo?.precipitationIntensity}%
                            </div>
                            <div className="service__one-precipitation">
                                Cloud Cover: {weatherForServiceTwo?.cloudCover}%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Service