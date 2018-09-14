import $ from 'jquery';

let gap1 = location.search.indexOf('clid');
let gap2 = location.search.indexOf('&');
let temp = gap2 != -1 ? gap2 : 9999;
let user_id = location.search.substr(gap1, temp).split('=')[1];
// console.log($('#categories option:selected').text());
$('form').on('submit', function(e) {
    e.preventDefault();
    let $select = $('#categories'),
        $email = $('[type="email"]'),
        errors = 0;
    console.log($select.val(), $email.val());
    if (!$select.val()) {
        $select.addClass('invalid');
        errors++;
    } else {
        $select.removeClass('invalid');
    }
    if (!$email.val()) {
        $email.addClass('invalid');
        errors++;
    } else {
        $email.removeClass('invalid');
    }
    if (errors) {
        return false;
    }
    $('.container.form').hide();
    $('.container.success').fadeIn('slow');
    let data = new FormData();
    data.append('client_id', user_id);
    data.append('category', $select.find('option:selected').text());
    data.append('email', $email.val());
    data.append('url', '');
    $.ajax({
        url: 'http://rdc-web-app1-test.bankrc.local:3035/v1/cashback',
        type: 'POST',
        data: data,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function(data) {
            if(data.status === 'success') {
                // Писать куку успешного выбора
                document.cookie = 'category-selected=true';
            }
        },
        error: function(xhr, status, msg) {
            console.log('error', msg);
        }
    });
});