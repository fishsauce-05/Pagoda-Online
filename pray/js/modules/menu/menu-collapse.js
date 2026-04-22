export function initMenuCollapse() {
    if (!window.jQuery) {
        return;
    }

    window.jQuery('.navbar-collapse a').on('click', function() {
        window.jQuery('.navbar-collapse').collapse('hide');
    });
}