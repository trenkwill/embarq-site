Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(
        /(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(
        n - i).toFixed(c).slice(2) : "");
};
jQuery(function () {

    jQuery('.calc__embarq_popup_close').click(function () {
        jQuery('.calc__embarq_popup').fadeOut();
    });
    jQuery('.calculator__embarq input[name="switch_2"]').change(function () {
        jQuery('.calc__embarq_hidden').fadeIn();
        if (jQuery(this).filter(':checked').val() == "facturation") {
            jQuery('#embarq_input_label').html('Facturation mensuelle en €:');
        }
        if (jQuery(this).filter(':checked').val() == "brut") {
            jQuery('#embarq_input_label').html('Salaire brut mensuel en €:');
        }
        if (jQuery(this).filter(':checked').val() == "salairenet") {
            jQuery('#embarq_input_label').html('Salaire net mensuel en €:');
        }
    });
    jQuery('.calculator__embarq input[name="switch_professionnels"]').change(function () {
        if (jQuery(this).filter(':checked').val() == "yes") {
            jQuery('.calc_input_row').css('display', 'block');
        } else {
            jQuery('.calc_input_row').css('display', 'none');
            jQuery('.calc_input_row input').autoNumeric('set', '');
        }
    });
    jQuery('.calculator__embarq input[type="text"]').autoNumeric('init', {
        currencySymbol: '',
        digitGroupSeparator: ',',
        decimalCharacter: '.',
        decimalPlacesOverride: 2,
        minimumValue: -0,
        maximumValue: 9999999999999.99
    });
});

function calcuate_Embarq() {
    var connais = jQuery("input[name=switch_2]:checked").val();
    var switch_professionnels = jQuery("input[name=switch_professionnels]:checked").val();
    var calc__embarq_user_input = parseFloat(jQuery('#calc__embarq_user_input').autoNumeric('get')) ||
        0; //fm, sb , sn
    if (calc__embarq_user_input == 0) {
        return false;
    }
    var calc__embarq_fonctionnement = parseFloat(jQuery('#calc__embarq_fonctionnement').autoNumeric(
        'get')) || 0; //fd
    var calc__embarq_client = parseFloat(jQuery('#calc__embarq_client').autoNumeric('get')) || 0; //ff
    var result_calc = {
        "facturation": {
            "factu": calc__embarq_user_input,
            "brut": calc__embarq_user_input * 0.6330 + calc__embarq_fonctionnement * 0.69,
            "snet": calc__embarq_user_input * 0.4865 + calc__embarq_fonctionnement * 0.46 +
                calc__embarq_client
        },
        "brut": {
            "factu": calc__embarq_user_input * 1.5798,
            "brut": calc__embarq_user_input + calc__embarq_fonctionnement * 0.69,
            "snet": calc__embarq_user_input * 0.4865 + calc__embarq_fonctionnement * 0.46 +
                calc__embarq_client
        },
        "salairenet": {
            "factu": calc__embarq_user_input * 2.0552,
            "brut": calc__embarq_user_input * 1.3009 + calc__embarq_fonctionnement * 0.69,
            "snet": calc__embarq_user_input + calc__embarq_fonctionnement * 0.46 +
                calc__embarq_client
        }
    };

    jQuery('.calc__embarq_popup_results').html('<div>Votre facturation mensuelle: <span>' + (
            result_calc[connais]["factu"]).formatMoney(2, '.',
            ' ') +
        ' €</span></div><div>Votre salaire brut: <span>' + (result_calc[connais]["brut"]).formatMoney(
            2,
            '.',
            ' ') +
        ' €</span></div><div>Votre salaire net: <span>' + (result_calc[connais]["snet"]).formatMoney(
            2, '.',
            ' ') +
        ' €</span></div>');
    jQuery('.calc__embarq_popup').slideDown().addClass('.calc__embarq_popup_show ');
    jQuery('.calc__embarq_popup_container').addClass('.calc__embarq_popup_show ');
}
