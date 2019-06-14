+function() {
    function set(name, value) {
        window.localStorage.setItem(name, value)
    }

    function get(name, defaultvalue) {
        return window.localStorage.getItem(name) || defaultvalue
    }

    var fontsizeIn = document.getElementById('fontsize')
    var showchordsIn = document.getElementById('showchords')

    function updateFontsize(size) {
        document.documentElement.style.setProperty('--song-font-size', (size || 16) + 'px');
    }

    function updateShowchords(show) {
        var song = document.querySelector('.song')
        if (!song) return
        song.classList.toggle('showchords', show)
    }

    fontsizeIn.onchange = function(ev) {
        var value = ev.target.value
        updateFontsize(value)
        set('fontsize', value)
    }

    showchordsIn.onchange = function(ev) {
        var checked = ev.target.checked
        updateShowchords(checked)
        set('showchords', '' + checked)
    }

    var fontsize = get('fontsize', 16)
    console.log('got fontsize: ', fontsize)
    updateFontsize(fontsize)
    fontsizeIn.value = fontsize

    var showchords = JSON.parse(get('showchords', 'false'))
    console.log('got showchords: ', showchords)
    showchordsIn.checked = showchords
    updateShowchords(showchords)
}()