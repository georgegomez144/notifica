var _N = (function () {
    'use strict';
    // =======================================================
    // Internal
    var showToast;
    var hideToast;
    var deleteToast;
    var Toast = /** @class */ (function () {
        function Toast(message, location) {
            var _body = document.body;
            var _toast = document.createElement('div');
            var toastID = 'toast-notifica-' + new Date().getMilliseconds();
            var toastInBody;
            _toast.id = toastID;
            _toast.classList.add('toast');
            _toast.dataset.location = location;
            this.locArr(location)
                .map(function (loc) { _toast.classList.add(loc); });
            switch (this.locArr(location)[0]) {
                case 'top':
                    this.createContainer(location).append(_toast);
                    break;
                case 'bottom':
                    this.createContainer(location).prepend(_toast);
                    break;
            }
            toastInBody = document.getElementById(toastID);
            toastInBody.textContent = message;
            return toastInBody;
        }
        Toast.prototype.createContainer = function (location) {
            var container = document.getElementById(location);
            if (container) {
                return container;
            }
            else {
                container = document.createElement('div');
                container.id = location;
                container.dataset.location = location;
                container.classList.add('toast-container');
                this.locArr(location)
                    .map(function (loc) { container.classList.add(loc); });
                document.body.appendChild(container);
                return document.getElementById(location);
            }
        };
        Toast.prototype.locArr = function (location) {
            var locArr = [];
            switch (location) {
                case 'bl':
                    locArr.push('bottom', 'left');
                    break;
                case 'br':
                    locArr.push('bottom', 'right');
                    break;
                case 'tl':
                    locArr.push('top', 'left');
                    break;
                case 'tr':
                    locArr.push('top', 'right');
                    break;
            }
            return locArr;
        };
        return Toast;
    }());
    function toastShow(toastInBody, location) {
        showToast = setTimeout(function () {
            toastInBody.classList.add('show');
        }, 100);
    }
    function toastHide(toastInBody, time) {
        hideToast = setTimeout(function () {
            toastInBody.classList.remove('show');
            toastRemove(toastInBody.id);
        }, (time * 1000));
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
