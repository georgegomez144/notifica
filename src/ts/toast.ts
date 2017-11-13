let _N = (() => {
  'use strict';

  // =======================================================
  // Internal

  let showToast
  let hideToast
  let deleteToast

  function toastShow(toastInBody, location: string) {
    showToast = setTimeout(() => {
      toastInBody.classList.add('show');
    }, 100);
  }

  function toastHide(toastInBody, time: number) {
    if(typeof toastInBody === 'string') {
      toastInBody = document.getElementById(toastInBody)
    }
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
    location = location || 'bl'
    time = time || 4

    let toastInBody = new Toast(message, location, {dismiss:true});

    toastShow(toastInBody, location)
    toastHide(toastInBody, time)
  }

  function confirm(message: string, location: string, time: number) {
    console.log('Need to build functionality') // TODO: Need to build functionality
  }

  return {
    toast: toast,
    dismiss: dismiss,
    confirm: confirm,
    toastHide: toastHide
  }
})()