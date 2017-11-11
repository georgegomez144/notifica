let _N = (() => {
  'use strict';

  // =======================================================
  // Internal

  let showToast
  let hideToast
  let deleteToast

  class Toast {
    constructor(message: string, location: string) {
      let _body: any = document.body
      let _toast: any = document.createElement('div')
      let toastID = 'toast-notifica-' + new Date().getMilliseconds()
      let toastInBody
      let progressContainer = document.createElement('div')
      let progressFill = document.createElement('div')

      _toast.id = toastID
      _toast.classList.add('toast')
      _toast.dataset.location = location

      this.locArr(location)
        .map(loc => {_toast.classList.add(loc)})
      switch(this.locArr(location)[0]) {
        case 'top':
          this.createContainer(location).append(_toast)
          break
        case 'bottom':
          this.createContainer(location).prepend(_toast)
          break
      }
      toastInBody = document.getElementById(toastID)
      // toastInBody.textContent = message
      _toast.innerHTML = message + '<div class="progress-bar"><div id="'+toastID+'_progress_fill" class="fill"></div></div>'
      
      return toastInBody
    }

    createContainer(location:string) {
      let container: any = document.getElementById(location)
      if(container) {
        return container
      }else{
        container = document.createElement('div')
        container.id = location
        container.dataset.location = location
        container.classList.add('toast-container')
        this.locArr(location)
          .map(loc => {container.classList.add(loc)})
        document.body.appendChild(container)
        return document.getElementById(location)
      }
    }

    locArr(location: string) {
      let locArr: Array<string> = []
      switch (location) {
        case 'bl':
          locArr.push('bottom','left')
          break
        case 'br':
          locArr.push('bottom','right')
          break
        case 'tl':
          locArr.push('top','left')
          break
        case 'tr':
          locArr.push('top','right')
          break
      }
      return locArr
    }
  }

  function toastShow(toastInBody, location: string) {
    showToast = setTimeout(() => {
      toastInBody.classList.add('show');
    }, 100);
  }

  function toastHide(toastInBody, time: number) {
    let timeMilli = time * 1000
    let progressDelay = (timeMilli/10/2)
    let progressBar = document.getElementById(toastInBody.id+'_progress_fill')
    progressBar.style.transitionDuration = timeMilli + 'ms'
    setTimeout(() => {
      progressBar.style.width = 100 + '%'
    },50)
    hideToast = setTimeout(() => {
      toastInBody.classList.remove('show')
      toastRemove(toastInBody.id)
    }, timeMilli);
  }

  function toastRemove(toastID) {
    deleteToast = setTimeout(() => {
      document.getElementById(toastID).remove();
    }, 310)
  }


  // =======================================================
  // Public API

  function toast(message: string, location: string, time: number) {
    // let otherToast: any = document.querySelectorAll('[data-location='+location+']');
    // if(otherToast.length > 0) {
    //   let other: any
    //   for(other of otherToast) {
    //     other.remove()
    //     clearTimeout(hideToast)
    //   }
    // }

    // Base 'settings'
    location = location || 'bl'
    time = time || 4

    let toastInBody = new Toast(message, location);

    toastShow(toastInBody, location)
    toastHide(toastInBody, time)

  }

  function dismiss(message: string, location: string, time: number) {
    console.log('Need to build functionality') // TODO: Need to build functionality
  }

  function confirm(message: string, location: string, time: number) {
    console.log('Need to build functionality') // TODO: Need to build functionality
  }

  return {
    toast: toast,
    dismiss: dismiss,
    confirm: confirm
  }
})()