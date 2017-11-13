class Toast {
  private _body
  private _toast
  private _toastID: string
  private _container
  private _locArr: Array<string> = []
  protected toastInBody

  constructor(message: string, location: string) {
    this._body = document.body
    this._toast = document.createElement('div')
    this._toastID = 'toast-notifica-' + new Date().getMilliseconds()

    this._toast.id = this._toastID
    this._toast.classList.add('toast')
    this._toast.dataset.location = location

    this.locArr(location)
      .map(loc => { this._toast.classList.add(loc) })
    switch (this.locArr(location)[0]) {
      case 'top':
        this.createContainer(location).append(this._toast)
        break
      case 'bottom':
        this.createContainer(location).prepend(this._toast)
        break
    }
    this.toastInBody = document.getElementById(this._toastID)
    this._toast.innerHTML = message + '<div class="progress-bar"><div id="' + this._toastID + '_progress_fill" class="fill"></div></div>'

    return this.toastInBody
  }

  createContainer(location: string) {
    this._container = document.getElementById(location)
    if (this._container) {
      return this._container
    } else {
      this._container = document.createElement('div')
      this._container.id = location
      this._container.dataset.location = location
      this._container.classList.add('toast-container')
      this.locArr(location)
        .map(loc => { this._container.classList.add(loc) })
      document.body.appendChild(this._container)
      return document.getElementById(location)
    }
  }

  locArr(location: string) {
    switch (location) {
      case 'bl':
        this._locArr.push('bottom', 'left')
        break
      case 'br':
        this._locArr.push('bottom', 'right')
        break
      case 'tl':
        this._locArr.push('top', 'left')
        break
      case 'tr':
        this._locArr.push('top', 'right')
        break
    }
    return this._locArr
  }
}