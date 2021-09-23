const app = new Vue({
    el: '#app',
    data: {
        titulo: 'Pomodoro // To Do List',
        tareas: [],
        busquedaArray:[],
        nuevaTarea: '',
        searching: '',
        alert:'',

    },
    methods:{
        agregarTarea(){
            this.tareas.push({
                queHacer: this.nuevaTarea,
                estado: false
            });

            this.nuevaTarea = "";
            this.busqueda();
        },
        editarTarea(index){
            this.tareas[index].queHacer = this.nuevaTarea
            this.nuevaTarea = "";
            this.busqueda();
        },
        eliminar(index){
            this.tareas.splice(index,1);
            this.busqueda();
        },
        hecho(index){
            this.tareas[index].estado = !this.tareas[index].estado;
            this.busqueda();
        },
        busqueda()
        {
            if(this.searching == ""){
                this.busquedaArray = this.tareas
            }
            else{
                this.busquedaArray = [];
                
            for(let x = 0; x < this.tareas.length; x++){
                if(this.tareas[x].queHacer.includes(this.searching)){
                    this.busquedaArray.push(this.tareas[x])
                }
            }

            }
        },
    }
});

var pomodoro = {
    started : false,
    minutes : 0,
    seconds : 0,
    fillerHeight : 0,
    fillerIncrement : 0,
    interval : null,
    minutesDom : null,
    secondsDom : null,
    fillerDom : null,
    init : function(){
      var self = this;
      this.minutesDom = document.querySelector('#minutes');
      this.secondsDom = document.querySelector('#seconds');
      this.fillerDom = document.querySelector('#filler');
      this.interval = setInterval(function(){
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector('#work').onclick = function(){
        self.startWork.apply(self);
      };
      document.querySelector('#shortBreak').onclick = function(){
        self.startShortBreak.apply(self);
      };
      document.querySelector('#longBreak').onclick = function(){
        self.startLongBreak.apply(self);
      };
      document.querySelector('#stop').onclick = function(){
        self.stopTimer.apply(self);
      };
    },
    resetVariables : function(mins, secs, started){
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200/(this.minutes*60);
      this.fillerHeight = 0;  
    },
    startWork: function() {
      this.resetVariables(25, 0, true);
    },
    startShortBreak : function(){
      this.resetVariables(5, 0, true);
    },
    startLongBreak : function(){
      this.resetVariables(15, 0, true);
    },
    stopTimer : function(){
      this.resetVariables(25, 0, false);
      this.updateDom();
    },
    toDoubleDigit : function(num){
      if(num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom : function(){
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + 'px';
    },
    intervalCallback : function(){
      if(!this.started) return false;
      if(this.seconds == 0) {
        if(this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete : function(){
      this.started = false;
      this.fillerHeight = 0;
    }
};
window.onload = function(){
  pomodoro.init();
};
  
