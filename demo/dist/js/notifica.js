var _N = (function () {
    'use strict';
    // =======================================================
    // Internal
    var showToast;
    var hideToast;
    var deleteToast;
    function toastShow(toastInBody, location) {
        showToast = setTimeout(function () {
            toastInBody.classList.add('show');
        }, 100);
    }
    function toastHide(toastInBody, time) {
        var timeMilli = time * 1000;
        var progressDelay = (timeMilli / 10 / 2);
        var progressBar = document.getElementById(toastInBody.id + '_progress_fill');
        progressBar.style.transitionDuration = timeMilli + 'ms';
        setTimeout(function () {
            progressBar.style.width = 100 + '%';
        }, 50);
        hideToast = setTimeout(function () {
            toastInBody.classList.remove('show');
            toastRemove(toastInBody.id);
        }, timeMilli);
    }
    function toastRemove(toastID) {
        deleteToast = setTimeout(function () {
            document.getElementById(toastID).remove();
        }, 310);
    }
    // =======================================================
    // Public API
    function toast(message, location, time) {
        // let otherToast: any = document.querySelectorAll('[data-location='+location+']');
        // if(otherToast.length > 0) {
        //   let other: any
        //   for(other of otherToast) {
        //     other.remove()
        //     clearTimeout(hideToast)
        //   }
        // }
        // Base 'settings'
        location = location || 'bl';
        time = time || 4;
        var toastInBody = new Toast(message, location);
        toastShow(toastInBody, location);
        toastHide(toastInBody, time);
    }
    function dismiss(message, location, time) {
        console.log('Need to build functionality'); // TODO: Need to build functionality
    }
    function confirm(message, location, time) {
        console.log('Need to build functionality'); // TODO: Need to build functionality
    }
    return {
        toast: toast,
        dismiss: dismiss,
        confirm: confirm
    };
})();
var Alert = /** @class */ (function () {
    function Alert() {
    }
    Alert.prototype.show = function () {
        console.log('show alert');
    };
    return Alert;
}());
var Toast = /** @class */ (function () {
    function Toast(message, location) {
        var _this = this;
        this._locArr = [];
        this._body = document.body;
        this._toast = document.createElement('div');
        this._toastID = 'toast-notifica-' + new Date().getMilliseconds();
        this._toast.id = this._toastID;
        this._toast.classList.add('toast');
        this._toast.dataset.location = location;
        this.locArr(location)
            .map(function (loc) { _this._toast.classList.add(loc); });
        switch (this.locArr(location)[0]) {
            case 'top':
                this.createContainer(location).append(this._toast);
                break;
            case 'bottom':
                this.createContainer(location).prepend(this._toast);
                break;
        }
        this.toastInBody = document.getElementById(this._toastID);
        this._toast.innerHTML = message + '<div class="progress-bar"><div id="' + this._toastID + '_progress_fill" class="fill"></div></div>';
        return this.toastInBody;
    }
    Toast.prototype.createContainer = function (location) {
        var _this = this;
        this._container = document.getElementById(location);
        if (this._container) {
            return this._container;
        }
        else {
            this._container = document.createElement('div');
            this._container.id = location;
            this._container.dataset.location = location;
            this._container.classList.add('toast-container');
            this.locArr(location)
                .map(function (loc) { _this._container.classList.add(loc); });
            document.body.appendChild(this._container);
            return document.getElementById(location);
        }
    };
    Toast.prototype.locArr = function (location) {
        switch (location) {
            case 'bl':
                this._locArr.push('bottom', 'left');
                break;
            case 'br':
                this._locArr.push('bottom', 'right');
                break;
            case 'tl':
                this._locArr.push('top', 'left');
                break;
            case 'tr':
                this._locArr.push('top', 'right');
                break;
        }
        return this._locArr;
    };
    return Toast;
}());
