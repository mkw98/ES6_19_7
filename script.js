class Stopwatch extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
        this.running = false;
    }

    reset () {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }


	format(times) { //metoda, która zwraca szablon, który wykorzystuje obiekt(times) podany do metody
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
	//pad0 to funkcja,któa dodaje 0 do liczb jednocyfrowych
	start() {
		if (!this.running) { //sprawdzamy,czy stoper nie chodzi
			this.running = true; //jeśli stał - zmieniamy flagę running na true
			this.watch = setInterval(()=>this.step(), 10); //co 10s odpalana metoda step
		}
	}


	step() {
		if (!this.running) return;
		this.calculate();
	//	this.print();
	}

	calculate() {
		const times = this.state.times;
		times.miliseconds += 1;
		if (times.miliseconds >= 100) {
			times.seconds += 1;
			times.miliseconds = 0;
		}
		if (times.seconds >= 60) {
			times.minutes += 1;
			times.seconds = 0;
		}
		this.setState({times});
	}
	
  //  }
	stop() {
		this.running = false;
		clearInterval(this.watch);
	}
//    watchReset() {
//         this.reset();
//    }

	render() {
    	return (
        	<div className='stopwatch'>
            	<div className='controls'>
                	<button onClick={() => this.start()}>Start</button>
                	<button onClick={() => this.stop()}>Stop</button>
                	<button onClick={() => this.reset()}>Reset</button>
            	</div>
            	<div>
            	{this.format(this.state.times)}
            	</div>
        	</div>
    	)
	}     
}


function pad0(value) {
	let result = value.toString(); //przekształcenie wartości liczbowej w string
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

const app = document.getElementById('app');
ReactDOM.render(<Stopwatch />, app);

