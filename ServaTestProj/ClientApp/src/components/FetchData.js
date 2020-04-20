import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class FetchData extends Component {
  static displayName = FetchData.name;
  
  constructor(props) {
    super(props);
      this.state = {
          forecasts: [], loading: true, filter: '', filterForcast: [] };
      this.x = 2;
  }

  componentDidMount() {
    this.populateWeatherData();
  }

    myChangeHandler = (event) => {
        var filter = event.target.value;
        var filterForcast = this.state.forecasts.filter(forcast => forcast.summary.indexOf(filter) != -1) ;
        for (var i = 0; i < this.state.forecasts.length; i++) {
            if (this.state.forecasts[i].summary.indexOf(filter) != -1) {
                filterForcast.push(this.state.forecasts[i]);
            }
        }
        this.setState({ filter: filter, filterForcast: filterForcast });
    }
   renderForecastsTable(forecasts) {
      return (
          <div>
              <Link to="/">Home</Link>
              <form>
              <input type="text" onKeyUp={this.myChangeHandler} placeholder="Filter"/>
           </form>
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map(x =>
            <tr key={x.date}>
              <td>{x.date}</td>
              <td>{x.temperatureC}</td>
              <td>{x.temperatureF}</td>
              <td>{x.summary}</td>
            </tr>
          )}
        </tbody>
              </table>
              </div>
    );
  }

    render() {
        var data = null;
        if (this.state.filter != "") {
            data = this.state.filterForcast;
        }
        else {
            data = this.state.forecasts;
        }
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
          : this.renderForecastsTable(data);


    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
