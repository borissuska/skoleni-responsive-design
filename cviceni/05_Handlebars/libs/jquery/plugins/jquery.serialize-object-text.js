;(function($) {
    function addValue(obj, key, value) {
        if (typeof(obj[key]) === 'undefined') {
            obj[key] = value;
        } else if (!$.isArray(obj[key])) {
            obj[key] = [obj[key], value];
        } else {
            obj[key].push(value);
        }
    }

    $.fn.serializeObjectText = function() {
        var $form = $(this).first(),
            json = {};
        $form.find('input,select,textarea').each(function() {
            var $ctrl = $(this),
                name = $ctrl.attr('name');

            if($ctrl.is('select')) {
                $("option:selected", $ctrl).each(function() {
                    if ($(this).attr('value') &&  $(this).val() !== '') {
                        addValue(json, name, $(this).text());
                    }
                });
            } else {
                switch ($ctrl.attr("type")) {
                    case "radio" :
                    case "checkbox":
                        if ($ctrl.is(':checked')) {
                            addValue(json, name, $(this).closest('form,body').find('label[for=' + $(this).attr('id') + ']').first().text() || $(this).parent().text());
                        }
                        break;
                    default:
                        addValue(json, name, $ctrl.val());
                }
            }
        });

        return json;
    };
}(jQuery));