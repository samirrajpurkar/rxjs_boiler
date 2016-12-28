import $ from 'jquery'
import Rx from 'rxjs/Rx'

function main() {

  return {
    DOM: Rx.Observable.timer(0, 1000) // 0 - 1 - 2 - 3 - 4
          .map(i => `Seconds elapsed ${i}`),
    Log: Rx.Observable.timer(0,2000) // 0 -- 1 -- 2 -- 3
          .map(i => 2 * i)
  }
}

//Effects (imperatives)
function DOMEffect(text$) {
  text$.subscribe(
    text => {
      const app = document.querySelector('#app')
      app.textContent = text
    }
  )
}

function consoleLogEffect(msg$) {
  msg$.subscribe(
    msg => {
      console.log(msg)
    }
  )
}

const sink = main()
DOMEffect(sink.DOM)
consoleLogEffect(sink.Log)







