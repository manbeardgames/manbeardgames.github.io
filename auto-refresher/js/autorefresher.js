(function ($) {
    //  The <div> element used when calling autoRefresher()
    let wrapper = null;

    //  The start button control
    let startButton = null;

    //  The stop button control
    let stopButton = null;

    //  The <div> element that is appended to the wrapper that acts as a 
    //  container for the progress bar
    let container = null;

    //  The <span> element that is appended to the container
    let pBar = null;

    //  The window.setTimeout function call
    let timeout = null;

    //  How much progress (0 - 100) has passed
    let progress = 0;

    //  Is the timer in progress
    let inProgress = false;

    $.fn.autoRefresher = function (opts) {
        //  Create the options object by using the defaults as a template
        //  and overriding any properties that are provided in the opts given
        //  by the caller.
        let options = $.extend({}, $.fn.autoRefresher.defaults, opts);

        //  Some of the options have to be validated. For instance, the 
        //  seconds value has to be a positive integer above 0. If a property
        //  is invalid, the just switch it back to using the defaults
        if (!Number.isInteger(options.seconds) || options.seconds <= 0) {
            console.log('autoRefresher.options.seconds must be a positive integer. Switching to default value');
            options.seconds = $.fn.autoRefresher.defaults.seconds;
        }

        if (!$.isFunction(options.callback)) {
            console.log('autoRefresher.options.callback must be a function.  Switching to default function');
            options.callback = $.fn.autoRefresher.defaults.callback;
        }

        //  The element that was used to call the autoRefresher() method is the wrapper
        //  that is used for the entire thing
        wrapper = $(this);

        //  If the caller opted to have the controls included, add them now by 
        //  appending them to the wrapper
        if (options.showControls) {
            stopButton = $('<button />')
                            .attr({type: 'button', class: options.stopButtonClass})
                            .html(options.stopButtonInner)
                            .appendTo(wrapper);
            stopButton.on('click', function() {
                stopProgress();
            });

            startButton = $('<button />')
                            .attr({type: 'button', class: options.startButtonClass})
                            .html(options.startButtonInner)
                            .appendTo(wrapper);
            startButton.on('click', function() {
                startProgress();
            });
        }

        //  Create and append the progress bar container <div> element
        if(container === null) {
            container = $('<div />')
                            .attr({'class': 'auto-refresher-container'})
                            .css({'height': options.progressBarHeight})
                            .css({'background-color': options.backgroundColor})
                            .appendTo(wrapper);
        }

        //  Create an append the progress bar <span> element
        if(pBar === null) {
            pBar = $('<span />')
                        .attr({'class': 'auto-refresher-progress-bar'})
                        .css({'background-color': options.foregroundColor})
                        .appendTo(container);
        }

        startProgress();



        function setProgress(val) {
            progress = val;
            if(progress >= 100) {progress = 100;}
            pBar.width(progress + '%');
        }

        function startProgress() {
            if(inProgress) {return;}
            inProgress = true;
            pBar.css({'transition': options.seconds + 's linear'});
            setProgress(99);
            timeout =  window.setTimeout(function () {
                pBar.css({'transition': ''});
                setProgress(100);
                if ($.isFunction(options.callback)) {
                    options.callback();
                }
            }, options.seconds * 1000);
        }
        
        function stopProgress() {
            if(!inProgress) {return;}
            inProgress = false;
            pBar.css({'transition': ''});
            setProgress(0);
            window.clearTimeout(timeout);
        }
    }

    $.fn.autoRefresher.defaults = {
        seconds: 300,
        callback: function () {
            location.reload();
        },
        showControls: true,
        progressBarHeight: '7px',
        stopButtonClass: 'auto-refresher-button',
        stopButtonInner: 'Stop',
        startButtonClass: 'auto-refresher-button',
        startButtonInner: 'Start',
        backgroundColor: '#6c757d',
        foregroundColor: '#007bff'
    }

})(jQuery);