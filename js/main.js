
const refs = {
  start: document.querySelector('[data-action="start"]'),
  stop: document.querySelector('[data-action="stop"]'),
};

class CountdownTimer{
  constructor({ targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.selector = selector;
    this.isActive = false;
    refs.stop.setAttribute("disabled", "disabled");
    this.initTimer();
  }

  initTimer() {
    document.querySelector(this.selector).innerHTML = this.timerTemplate({ days: this.pad(0), hours: this.pad(0), mins: this.pad(0), secs: this.pad(0) });
    const restTime = this.getTime(0);
    this.updateTimer(restTime);
  }


  getTime(time){
      const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

      const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

      const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

      const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    
      return { days, hours, mins, secs };
  };
  
  
  start(){
    if (this.isActive) {
      return;
    };

    const expectTime = this.targetDate;
    this.isActive = true;
    refs.start.setAttribute("disabled", "disabled");
    refs.stop.removeAttribute("disabled");

     
    document.querySelector(this.selector).innerHTML = this.timerTemplate({ days: this.pad(0), hours: this.pad(0), mins: this.pad(0), secs: this.pad(0) });

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const differentTime = expectTime - currentTime;
      const restTime = this.getTime(differentTime);
      this.updateTimer(restTime);
    }, 1000);

  };

  

  stop() {
    this.isActive = false;
    clearInterval(this.intervalId);
    const restTime = this.getTime(0);
    this.updateTimer(restTime);
    refs.stop.setAttribute("disabled", "disabled");
    refs.start.removeAttribute("disabled");
  };

    pad(value) {
          return String(value).padStart(2, '0');
      };

  timerTemplate({ days, hours, mins, secs }){
        return `<div class="field">
                      <span class="value" data-value="days">${days}</span>
                      <span class="label">Days</span>
                  </div>
          
                  <div class="field">
                      <span class="value" data-value="hours">${hours}</span>
                      <span class="label">Hours</span>
                  </div>
          
                  <div class="field">
                      <span class="value" data-value="mins">${mins}</span>
                      <span class="label">Mins</span>
                  </div>
          
                  <div class="field">
                      <span class="value" data-value="secs">${secs}</span>
                      <span class="label">Seconsd</span>
                  </div>`;
  };
  
  updateTimer ({ days, hours, mins, secs }) {
        document.querySelector('[data-value="days"]').textContent = `${days}`;
        document.querySelector('[data-value="hours"]').textContent = `${hours}`; 
        document.querySelector('[data-value="mins"]').textContent = `${mins}`;
        document.querySelector('[data-value="secs"]').textContent = `${secs}`;
    };
};


const newTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('September 17, 2021'),
});

refs.start.addEventListener('click', newTimer.start.bind(newTimer));
refs.stop.addEventListener('click',  newTimer.stop.bind(newTimer));