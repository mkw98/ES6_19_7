class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
	} //nie ma średnika ani przecinka
	
    reset() {
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print();
    }

	print() { //metoda, która ustawia wewnętrzny tekst elementu DOM, pod atrybutem display
		this.display.innerText = this.format(this.times);
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
		this.print();
	}

	calculate() {
		this.times.miliseconds += 1;
		if (this.times.miliseconds >= 100) {
			this.times.seconds += 1;
			this.times.miliseconds = 0;
		}
		if (this.times.seconds >= 60) {
			this.times.minutes += 1;
			this.times.seconds = 0;
		}
	}

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}
    watchReset() {
         this.reset();
    }
}


function pad0(value) {
	let result = value.toString(); //przekształcenie wartości liczbowej w string
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');

startButton.addEventListener('click', () => stopwatch.start());
stopButton.addEventListener('click', () => stopwatch.stop());
resetButton.addEventListener('click', () => stopwatch.watchReset());