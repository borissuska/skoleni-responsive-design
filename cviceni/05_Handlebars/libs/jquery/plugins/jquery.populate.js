//
// All credits to: http://stackoverflow.com/questions/7298364/using-jquery-and-json-to-populate-forms
//
;(function($) {
    $.fn.populate = function(json) {
        $(this).each(function() {
            var $form = this;
            $.each(json, function(key, value) {
                var $ctrl = $('[name=' + key + ']', $form);

                if($ctrl.is('select')) {
                    $("option", $ctrl).each(function(){
                        if ($(this).attr('value') == value) {
                            $(this).attr('selected', true);
                        }
                    });
                } else {
                    switch ($ctrl.attr("type")) {
                        case "radio" :
                        case "checkbox":
                            $ctrl.each(function () {
                                if ($(this).attr('value') == value) {
                                    $(this).attr('checked', value);
                                }
                            });
                            break;
                        default:
                            $ctrl.val(value);
                    }
                }
            });
        });
    };
}(jQuery));