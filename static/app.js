+function() {
    function set(name, value) {
        window.localStorage.setItem(name, value)
    }

    function get(name, defaultvalue) {
        return window.localStorage.getItem(name) || defaultvalue
    }

    function updateFontsize(size) {
        document.documentElement.style.setProperty('--song-font-size', (size || 16) + 'px');
    }

    function updateShowchords(show) {
        var classlist = document.querySelector('.song').classList
        if (show) {
            classlist.add('showchords')
        } else {
            classlist.remove('showchords')
        }
    }

    document.getElementById('fontsize').onchange = function(ev) {
        var value = ev.target.value
        updateFontsize(value)
        set('font-size', value)
    }

    document.getElementById('showchords').onchange = function(ev) {
        var checked = ev.target.checked
        updateShowchords(checked)
        set('show-chords', checked)
    }

    var fontsize = get('font-size', 16)
    updateFontsize(fontsize)
    document.getElementById('fontsize').value = fontsize

    var showchords = get('show-chords', false)
    document.getElementById('showchords').checked = showchords
    updateShowchords(showchords)
}()