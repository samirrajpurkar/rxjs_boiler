import $ from 'jquery'
import Rx from 'rxjs/Rx'

// Logic (functional)
Rx.Observable.timer(0, 1000) // 0 -- 1 -- 2 -- 3 -- 4
  .map((i) => `Seconds elapsed ${i}`)
//Effects
  .subscribe(
    text => {
      const app = document.querySelector('#app')
      app.textContent = text
    }
  )








